const download = require('download-git-repo')
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');

const rundownload = (templateType, targetPath) => {
    targetPath = path.join(targetPath || '.', '.download-temp')
    let spinner = ora(chalk `模板下载中 {green.bold 网络不好时可能需要较长时间(可能会很长)},请耐心等待`).start()
    return new Promise((resolve, reject) => {
        download(`swordsman-coder/${templateType}`, targetPath, err => {
            if (err) {
                spinner.fail('模板下载失败')
                reject({
                    isError: true,
                    targetPath: targetPath,
                    msg: err
                })
            } else {
                spinner.succeed('模板下载完成')
                resolve({
                    isError: false,
                    targetPath: targetPath,
                    msg: '下载成功'
                })
            }
        })
    })
}
const run = async (templateType, targetPath) => await rundownload(templateType, targetPath)
module.exports = {
    run
}
