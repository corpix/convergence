convergence
------------

Tool and library to intersect entities from `bemdecl.js` with entities from BEM levels on filesystem.

```
npm install git://github.com/corpix/convergence.git
```

Usage example on https://github.com/bem/project-stub:
```console
$ cd project-stub
$ node_modules/.bin/convergence -l libs/bem-components/desktop.blocks desktop.bundles/index/index.bemdecl.js  | jq '.[] | select(.tech == "js")'
{
    "block": "input",
    "level": "libs/bem-components/desktop.blocks",
    "tech": "js",
    "path": "libs/bem-components/desktop.blocks/input/input.js",
    "id": "input",
    "bem": "input"
}
{
    "block": "input",
    "modName": "has-clear",
    "modVal": true,
    "level": "libs/bem-components/desktop.blocks",
    "tech": "js",
    "path": "libs/bem-components/desktop.blocks/input/_has-clear/input_has-clear.js",
    "id": "input_has-clear",
    "bem": "input_has-clear"
}
```
