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

function nodeFingerprint(node) {
    return JSON.stringify([
        node.block,
        node.modName,
        node.modVal,
        node.elem
    ]);
}

function isSame(a, b) {
    return nodeFingerprint(a) === nodeFingerprint(b);
}

function intersect() {
    var decl, nextDecl;
    var i, j, dl;
    var set = {};
    var keys = [];
    var finger;
    var node;
    var args = arguments;
    var argsLen = args.length;
    for (i = 0; i < argsLen; ++i) {
        decl = args[i];
        for (j = 0, dl = decl.length; j < dl; ++j) {
            node = decl[j];
            finger = nodeFingerprint(node);
            if (!set[finger]) {
                set[finger] = {
                    counter: 1,
                    owner: i,
                    node: node
                };
                keys.push(finger);
            } else {
                if(set[finger].owner !== i) {
                    set[finger].counter++;
                    set[finger].owner = i;
                    set[finger].node = _.merge(
                        set[finger].node,
                        node
                    );
                }
            }
        }
    }

    var res = keys
            .map(function(key) {
                return set[key];
            })
            .filter(function(setItem) {
                return setItem.counter > 1;
            })
            .map(function(setItem) {
                return setItem.node;
            });
    return res;
}

module.exports = {
    load: load,
    intersect: intersect
};
