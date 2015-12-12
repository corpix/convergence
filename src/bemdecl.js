var path = require('path');
var decl = require('bem-decl');
var _ = require('lodash');

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

function fingerprint(node) {
    return JSON.stringify([
        node.block,
        node.modName,
        node.modVal,
        node.elem
    ]);
}

function same(a, b) {
    return fingerprint(a) === fingerprint(b);
}

function intersect(bemdecl, entities) {
    var bemdeclNodes = _.groupBy(bemdecl, fingerprint);
    var entityNodes = _.groupBy(entities, fingerprint);
    var intersectedFingers = _.intersection(
        _.keys(bemdeclNodes),
        _.keys(entityNodes)
    );

    return _.reduce(intersectedFingers, function(res, k) {
        return res.concat(entityNodes[k]);
    }, []);
}

module.exports = {
    load: load,
    intersect: intersect
};
