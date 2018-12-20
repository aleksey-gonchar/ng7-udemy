const { join } = require('path');

/**
 * Surrounds asterisk - `@app/*` => `@app/(.*)`
 *
 * @param {string} key
 * @returns {string}
 */
function resolveJestModuleNameMapperKey(key) {
    return key.replace(/\*/, '(.*)');
}

/**
 * Replaces asterisk with `$1` - `src/app/*` => `src/app/$1`
 *
 * @param {string} path
 * @returns {string}
 */
function resolveJestModuleNameMapperValue(path) {
    return join(__dirname, path.replace(/\*/, '$1'));
}

/**
 * @returns {object}
 */
function getTypescriptPaths() {
    const config = require('./tsconfig.spec.json');
    const { paths } = config.compilerOptions;

    if (!paths) {
        return;
    }

    const jestModuleNameMapper = {};

    Object.keys(paths).forEach((key) => {
        const [path] = paths[key];
        jestModuleNameMapper[resolveJestModuleNameMapperKey(key)] = resolveJestModuleNameMapperValue(path);
    });

    return jestModuleNameMapper;
}

module.exports = {
    moduleNameMapper: getTypescriptPaths()
};
