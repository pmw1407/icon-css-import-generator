#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var find_package_json_1 = require("find-package-json");
var packageInfo = (0, find_package_json_1["default"])().next().value;
var config = packageInfo['icon-import-generator'];
var destination = config['destination'];
var root = config['root'];
var newLine = '\n';
var makeAvailableIconNames = function (iconName) {
    return "".concat(iconName, ",").concat(newLine);
};
var content = 'export const availableDesignedIconNames = [\n';
var generateAvailableIconNames = function () {
    var iconFiles = (0, fs_1.readdirSync)(root, { withFileTypes: true });
    iconFiles.forEach(function (_file) {
        var fileName = _file.name.split('.')[0];
        content += makeAvailableIconNames(fileName);
    });
    content += '] as const';
};
generateAvailableIconNames();
console.log(content);
