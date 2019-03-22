#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk');
const path = require('path')
const fs = require('fs')
const exists = require('fs').existsSync
const home = require('user-home')
const download = require('../lib/download')
const ask = require('../lib/ask')
const generate = require('../lib/generate')
const logger = require('../lib/logger')
const figlet = require('figlet')
const exec = require('child_process').execFile
program
    .usage('<project-name>')
    .option('--offline', 'use cached template')
    .parse(process.argv)

/**
 * 输入格式是否合法
 */
const help = () => {
    if (program.args.length < 2) return program.help()
}
help()

/**
 * 输入内容是否合法
 */
const supportList = ['vue', 'react', 'react-beta', 'mina', 'express', 'koa2']
const supportNameList = {
    'vue': 'vue',
    'react': 'react',
    'react-beta': 'react练手版',
    'mina': '小程序',
    'express': 'node-express',
    'koa2': 'node-koa2'
}
let templateType = program.args[0]
const rawName = program.args[1]
const inPlace = rawName === '.'
const to = path.resolve(rawName || '.')

// return
if (!supportList.includes(templateType)) {
    logger.nonSupport(templateType)
    return;
}
if (inPlace || exists(to)) {
    logger.exist(rawName)
}else{
    run()
}

async function run() {
    const { isError,targetPath } = await download.run(templateType, rawName)
    if (isError) return
    const askResult = await ask.run(rawName, targetPath)
    const sourcePath = path.join(targetPath, 'tempalte')
    const generateResult = await generate.run(askResult, sourcePath, path.parse(targetPath).dir);
    const msg = generateResult.msg
    console.log('');
    console.log(figlet.textSync('s u c c e s s',{
        kerning: "full"
    }));
    console.log('');
    console.log('');
    console.log(chalk `{green.bold ${supportNameList[templateType]}模板初始化完成}, ${msg}, 愉快的code吧`);
    console.log('');
    console.log('');
}