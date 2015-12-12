var walker = require('./walker');
var bemdecl = require('./bemdecl');

function main(args) {
    var decls = args._.map(bemdecl.load);
    var flatDecls = [];
    flatDecls = flatDecls.concat.apply(flatDecls, decls);
    return walker.listEntities(args.levels)
        .then(
            function(entities) {
                console.log(flatDecls);
                console.log(entities);
            },
            console.error
        );
}

module.exports = {
    main: main
};
