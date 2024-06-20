const excludeVendorFromSourceMapPlugin = (includes = []) => ({
    name: 'excludeVendorFromSourceMap',
    setup(build) {
        const emptySourceMap = '\n//# sourceMappingURL=data:application/json;base64,' + Buffer.from(JSON.stringify({
            version: 3,
            sources: [''],
            mappings: 'A',
        })).toString('base64');
        const includePattern = new RegExp(includes.join('|'), 'u');
        const fileIsIncluded = includes.length === 0
            ? () => false
            : (filepath) => includePattern.test(filepath.split(path.sep).join(path.posix.sep))

        build.onLoad({ filter: /node_modules/u }, async (args) => {
            if (fileIsIncluded(args.path)) {
                return;
            }

            if (/\.[mc]?js$/.test(args.path)) {
                return {
                    contents: `${await fs.promises.readFile(args.path, 'utf8')}${emptySourceMap}`,
                    loader: 'default',
                };
            }
        });
    },
});

const notifyBuild = (_build) => ({
    name: 'notifyBuild',
    setup(build) {
        build.onEnd(result => {
            console.log(`[build] ended with ${result.errors.length} errors`);
        })
    }
})

export {
    excludeVendorFromSourceMapPlugin,
    notifyBuild
}