var path = require('path');
var assert = require('assert');
var app = require('./main');

function sanitizeLevel(s) {
    return (s || '').replace(/\/$/, '');
}

function logJSON(d) {
    console.log(JSON.stringify(d));
}

function main(argv) {
    var args = require('minimist')(argv.slice(2));
    var res = {_: args._};
    if (args.h || args.help) {
        usage();
    }
    if (args._.length === 0) {
        usage(1);
    }

    res.levels = args.l || args.levels;
    if (typeof res.levels === 'string') {
        res.levels = [res.levels];
    }
    assert(Array.isArray(res.levels), 'Levels should be a list of strings');
    res.levels = res.levels.map(sanitizeLevel);

    return app.main(res).then(logJSON);
}

function usage(exitCode) {
    var space = '    ';
    process.stderr.write([
        '',
        space + 'Usage: ' + path.basename(process.argv[1]) + ' [-l level/path ...] path/to/bemdecl.js',
        '',
        '',
    ].join('\n'));
    process.exit(exitCode || 0);
}

module.exports = {
    main: main,
    usage: usage
};
