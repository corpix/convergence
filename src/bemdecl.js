var path = require('path');

function load(p) {
    var rp = path.resolve(p);
    var content = require(rp);
    if (content && content.blocks) {
        return content.blocks;
    } else {
        return [];
    }
}

module.exports = {
    load: load
};
