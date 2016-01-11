/*jslint node:true, browser:true */
'use strict';

module.exports = function (options) {
    return options;
};

module.exports.options = function () {
    return require('./options.json');
};

module.exports.echo = function (options) {
    return options;
};
