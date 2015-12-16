var walk = require('bem-walk');
var _ = require('lodash');

function listEntities(levels) {
    return new Promise(function(resolve, reject) {
        var buf = [];
        function emitNode(node) {
            buf.push(node);
        }

        function done() {
            console.log('AAH', buf);
            resolve(buf);
        }

        walk(levels /*, config */)
            .on('data', emitNode)
            .on('error', function(err) {
                console.log('FUCK', err);
                reject(err);
            })
            .on('end', done);
    });
}

module.exports = {
    listEntities: listEntities
};
