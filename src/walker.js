var walk = require('bem-walk');
var _ = require('lodash');

function listEntities(levels) {
    return new Promise(function(resolve, reject) {
        var buf = [];
        function emitNode(node) {
            console.log('emit', node);
            buf.push(node);
        }

        function done() {
            resolve(buf);
        }

        // var config = _.zipObject(
        //     levels,
        //     levels.map(function(){
        //         return {scheme: 'nested'};
        //     })
        // );

        console.log(levels);
        walk(levels /*, config */)
            .on('data', emitNode)
            .on('error', reject)
            .on('end', done);
    });
}

module.exports = {
    listEntities: listEntities
};
