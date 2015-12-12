var walk = require('bem-walk');
var levels = [
    'libs/bem-core/common.blocks',
];


function listEntities(levels) {
    return new Promise(function(resolve, reject) {
        var buf = [];
        function emitNode(node) {
            buf.push(node);
        }

        function done() {
            resolve(buf);
        }

        walk(levels)
            .on('data', emitNode)
            .on('error', reject)
            .on('end', done);
    });
}

listEntities(levels)
    .then(
        function(entities) {
            console.log(entities);
        },
        console.error
    );
