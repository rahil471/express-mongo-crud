let chalk = require('chalk');
module.exports = function(level, message, options){
    let logtemplate = `ExpressMongoCRUD: ${level.toUpperCase()} - ${message}`;
    switch(level){
        case 'error':
            console.log(chalk.red(logtemplate));
        break;
        case 'warn':
            console.log(chalk.magenta(logtemplate));
        break;
        case 'info':
            console.log(chalk.green(logtemplate));
        break;
        default:
            console.log(message);
        break;
    }
}