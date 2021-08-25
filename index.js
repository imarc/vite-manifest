import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

export default function (manifest) {
    manifest = typeof manifest === 'string' ? require(manifest) : manifest

    const manifestAssets = (entry, extension = '') => {
        if (!manifest[entry]) {
            return []
        }

        const deps = []

        if (manifest[entry].imports) {
            manifest[entry].imports.forEach(file => {
                deps.push(manifestAssets(file))
            })
        }

        if (manifest[entry].css) {
            manifest[entry].css.forEach(file => {
                deps.push(file)
            })
        }

        deps.push(manifest[entry].file)

        return deps.flat().filter(dep => dep.endsWith(extension))
    }

    return manifestAssets
}
