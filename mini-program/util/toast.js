var common_vendor = require("../common/vendor.js");

var toastSuccess = function toastSuccess(title) {
    common_vendor.wx$1.showToast({
        title: title,
        icon: "success"
    });
};

var toastError = function toastError(title) {
    common_vendor.wx$1.showToast({
        title: title,
        icon: "error"
    });
};

var toastNetError = function toastNetError() {
    return toastError("网络错误");
};

function toastInfo(title) {
    common_vendor.wx$1.showToast({
        title: title,
        icon: "none"
    });
}

exports.toastError    = toastError;
exports.toastInfo     = toastInfo;
exports.toastNetError = toastNetError;
exports.toastSuccess  = toastSuccess;