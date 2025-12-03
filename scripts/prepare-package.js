const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const distDir = path.join(__dirname, '../dist');
const sourcePackageJson = require('../package.json');

async function preparePackage() {
    // 1. Clean dist directory
    await fs.emptyDir(distDir);

    // 2. Copy files based on 'files' allowlist
    const filesToCopy = sourcePackageJson.files || ['*'];

    for (const pattern of filesToCopy) {
        const files = glob.sync(pattern, { cwd: path.join(__dirname, '..') });
        for (const file of files) {
            const srcPath = path.join(__dirname, '..', file);
            const destPath = path.join(distDir, file);
            await fs.copy(srcPath, destPath);
        }
    }

    // 3. Create clean package.json
    const {
        scripts,
        devDependencies,
        files,
        ...cleanPackageJson
    } = sourcePackageJson;

    // Ensure 'files' is NOT in the clean package.json (implicit inclusion in dist)

    // Write clean package.json to dist
    await fs.writeJson(path.join(distDir, 'package.json'), cleanPackageJson, { spaces: 2 });

    console.log('Package prepared in dist/');
}

preparePackage().catch(console.error);
