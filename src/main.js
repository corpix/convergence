var walker = require('./walker');
var bemdecl = require('./bemdecl');

function main(args) {
    var decls = args.decls.map(function(x) {
        return bemdecl.load(x, args.declsType);
    });
    var flatDecls = [];
    flatDecls = flatDecls.concat.apply(flatDecls, decls);

    return walker.listEntities(args.levels)
        .then(
            function(entities) {
                return bemdecl.intersect(flatDecls, entities);
            },
            console.error
        );
}

module.exports = main;
