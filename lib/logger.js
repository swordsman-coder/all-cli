const chalk = require('chalk');
module.exports = {
    exist(rawName) {
        console.log(chalk `{gray 项目名}{red.bold ${rawName}}{gray 已存在或含有特殊字符，请重新输入}`);
    },
    nonSupport(rawName) {
        console.log(chalk `{gray 暂不支持模版{red.bold ${rawName}}, 如有需要，请xxx}`);
    }
}