var common_vendor = require("../common/vendor.js");

var domain = "kfind.hikos.cn";

var environment = {
    local: {
        host: "https://kfind.hikos.cn",
        webview: "http://kfind.hikos.cn",    
        uranusUrl: "https://".concat(domain)   
    },
    develop: {
        host: "https://kfind.hikos.cn",
        webview: "https://kfind.hikos.cn",  
        uranusUrl: "https://".concat(domain)
    },
    production: {
        host: "https://".concat(domain),
        uranusUrl: "https://".concat(domain) 
    },
    alpha: {
        host: "https://kfind.hikos.cn",
        webview: "https://kfind.hikos.cn",
        uranusUrl: "https://kfind.hikos.cn"
    },
    prerelease: {
        host: "https://kfind.hikos.cn",
        webview: "https://kfind.hikos.cn",
        uranusUrl: "https://kfind.hikos.cn"
    }
};

var Url = {
    base: "",
    host: "https://".concat(domain),
    webview: "https://".concat(domain),
    uranusUrl: "https://".concat(domain),
    domain: domain
};

var checkEnv = function checkEnv() {
    var environmentName = "local";
    var accountInfo = common_vendor.index.getAccountInfoSync();
    if (accountInfo.miniProgram.envVersion === "release") {
        environmentName = "production";
    } else if (accountInfo.miniProgram.envVersion === "trial") {
        environmentName = "prerelease";
    } else {
        environmentName = "production";
    }
    Object.assign(Url, environment[environmentName]);
    Url.base = Url.host;
};

checkEnv();

exports.Url = Url;