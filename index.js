var path = require('path');
var fs = require('fs');

var bemWalk = require('bem-walk');
var minimatch = require('minimatch');
var through = require('through2');

/*
    config: {
        examples: '*.blocks'
    }
*/

function bb8(config) {

    return function bundleWalker(bundlePath) {
        var tech = path.extname(bundlePath).split('.').join('');
        var levelsGlob = config[tech];

        if (!levelsGlob) return null;

        var files = fs.readdirSync(bundlePath);
        files = files.filter(file => minimatch(file, levelsGlob));
        files = files.map(file => path.join(bundlePath, file));

        return bemWalk(files)
    }

}

function walkBundles(config) {
    var bundleWalker = bb8(config);
    return through.obj(function(entity, enc, next) {
        var walker = bundleWalker(entity.path);
        if (walker) {
            walker.on('data', (entity) => {
                this.push(entity);
            });
            walker.on('end', () => {
                next()
            });
        } else {
            next(null, entity);
        }
    });
}

module.exports = walkBundles;
