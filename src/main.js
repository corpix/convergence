var walker = require('./walker');
var bemdecl = require('./bemdecl');
var _ = require('lodash');

function main(args) {
    var decls = _([]).concat(args._.map(bemdecl.load)).value();
    console.log(decls);
    return walker.listEntities(args.levels)
        .then(
            function(entities) {
                console.log(entities);
            },
            console.error
        );
}

module.exports = {
    main: main
};
