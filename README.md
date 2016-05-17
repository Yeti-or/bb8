# bb8
extend bem-walk possibilities

Example of usage:

```js
var bemWalk = require('bem-walk');
var bb8 = require('bb8');

bemWalk([
    'libs/islands/common.blocks',
    'libs/islands/desktop.blocks',
    'libs/islands/touch.blocks',
    'libs/islands/touch-pad.blocks',
    'libs/islands/touch-phone.blocks',
    'libs/islands/examples.blocks'
])
.pipe(bb8({
    'examples': '*blocks',
    'tests': '*blocks',
    'tmpl-specs': '*blocks'
}))
.pipe(...)
...
```
