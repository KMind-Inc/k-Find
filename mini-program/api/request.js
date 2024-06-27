var common_vendor = require("../common/vendor.js");
var constants_url = require("../constants/url.js");

var request = new common_vendor.Request({
    baseURL: constants_url.Url.uranusUrl,
    header: {
        "extra-agent": "minipro",
        "is-mini-webview": "1"
    }
});

exports.request = request;
