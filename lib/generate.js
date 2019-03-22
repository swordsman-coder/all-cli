const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const rm = require('rimraf').sync
const path = require('path');

const runGenerate = (metadata = {}, src, dest = '.') => {
    
    if (!src) {
        return Promise.reject(new Error(`无效的source：${src}`))
    } else {
        !metadata.vuex && rm(path.resolve(`${src}/src/store`));
    }
    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
        .metadata(metadata)
        .clean(false)
        .source(src)
        .destination(dest)
        .use((files, metalsmith) => {
            const meta = metalsmith.metadata()
            Object.keys(files).forEach(e => {
                if (['html', 'js', 'json', 'md', 'vue', 'scss', 'css'].includes(e.split('.').pop())) {
                    let con = files[e].contents.toString()
                    files[e].contents = new Buffer.from(Handlebars.compile(con)(meta))
                }
            })
        })
        .build(err => {
            rm(path.parse(src).dir)
            err ? reject(err) : resolve({
                msg: '项目已经创建成功'
            })
        })
    })
}
const run = async (metadata, src, dest) => await runGenerate(metadata, src, dest)
module.exports = {
    run
}
