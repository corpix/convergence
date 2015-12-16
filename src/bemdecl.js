var path = require('path');
var decl = require('bem-decl');
var _ = require('lodash');

function load(p, t) {
    var rp = path.resolve(p);
    var content = require(rp);
    var res = null;
    return decl.normalize(
        content && content.deps,
        {harmony: t === 'harmony'}
    );
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
    var entityNodes = _.groupBy(entities, function(x) {
        return fingerprint(x.entity);
    });
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
