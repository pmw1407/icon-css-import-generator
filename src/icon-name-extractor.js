#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var find_package_json_1 = require("find-package-json");
var fs_1 = require("fs");
var packageInfo = (0, find_package_json_1["default"])().next().value;
var config = packageInfo['icon-import-generator'];
var destination = config['destination'];
var root = config['root'];
var newLine = '\n';
var makeAvailableIconNames = function (iconName, isNewLine) {
    return isNewLine ? "'".concat(iconName, "',").concat(newLine) : "'".concat(iconName, "',");
};
var generateAvailableIconNames = function () {
    var content = 'export const availableDesignedIconNames = [\n';
    var iconFiles = (0, fs_1.readdirSync)(root, { withFileTypes: true });
    iconFiles.forEach(function (_file) {
        var fileName = _file.name.split('.')[0];
        content += makeAvailableIconNames(fileName, true);
    });
    content += '] as const';
    return content;
};
var generateAvailableIconNameCss = function () {
    var content = '$iconNames: ';
    var iconFiles = (0, fs_1.readdirSync)(root, { withFileTypes: true });
    iconFiles.forEach(function (_file) {
        var fileName = _file.name.split('.')[0];
        content += makeAvailableIconNames(fileName, false);
    });
    content += ';';
    return content;
};
var availableIconNames = generateAvailableIconNames();
var availableIconNameCss = generateAvailableIconNameCss();
console.log(availableIconNames, availableIconNameCss);
(0, fs_1.writeFile)("".concat(destination, "/AvailableIconNames.ts"), availableIconNames, function (e) {
    console.log(e);
});
(0, fs_1.writeFile)("".concat(destination, "/AvailableIconNameCss.ts"), availableIconNameCss, function (e) {
    console.log(e);
});
