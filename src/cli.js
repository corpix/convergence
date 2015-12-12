var path = require('path');
var assert = require('assert');
var docopt = require('docopt').docopt;
var package = require('../package');
var app = require('./main');

var cli = [
    'Usage:',
    '  convergence (-l <levels>|--levels <levels>...) <decls>...',
    '',
    '    -l <levels>, --levels <levels> is a path to BEM level',
    '    <decls>                        is a path to BEM decl file',
    ''
].join('\n');

function sanitizeLevel(s) {
    return (s || '').replace(/\/$/, '');
}

function logJSON(d) {
    console.log(JSON.stringify(d));
}

function main(argv) {
    var args = docopt(cli, {
        argv: argv.slice(2),
        version: package.version
    });

    var params = {};
    params.levels = args['<levels>'].map(sanitizeLevel);
    params.decls = args['<decls>'];

    return app.main(params).then(logJSON);
}

module.exports = {
    main: main
};
