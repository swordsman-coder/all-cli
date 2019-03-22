const inquirer = require('inquirer')
const metadata = require('read-metadata')
const exists = require('fs').existsSync
const fs = require('fs')
const path = require('path')

function getMetadata(dir) {
    const json = path.join(dir, 'meta.json')
    const js = path.join(dir, 'meta.js')
    let opts = {}
    if (exists(json)) {
        opts = metadata.sync(json) || []
    } else if (exists(js)) {
        const req = require(path.resolve(js))
        if (req !== Object(req)) {
            throw new Error('meta.js needs to expose an object')
        }
        opts = req
    }
    
    
    return opts
}
const ask = async (projectName, dir) => {
    const promptJson = getMetadata(dir).prompts;
    
    return inquirer
    .prompt(promptJson).then(answers => answers)
}

const run = async (projectName, dir) => await ask(projectName, dir)
module.exports = {
    run
}