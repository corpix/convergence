var path = require('path');
var decl = require('bem-decl');

function load(p) {
    var rp = path.resolve(p);
    var content = require(rp);
    var res = null;
    if (content && content.blocks) {
        res = content.blocks;
    } else {
        res = [];
    }
    return decl.normalize(res);
}

module.exports = {
    load: load,
    intersect: decl.intersect
};
