var walk = require('bem-walk');
var _ = require('lodash');

function listEntities(levels) {
    return new Promise(function(resolve, reject) {
        var buf = [];
        function emitNode(node) {
            buf.push(node);
        }

        function done() {
            resolve(buf);
        }

        walk(levels /*, config */)
            .on('data', emitNode)
            .on('error', reject)
            .on('end', done);
    });
}

module.exports = {
    listEntities: listEntities
};
