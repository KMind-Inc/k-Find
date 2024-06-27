Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
});

var common_vendor = require("./common/vendor.js");
require("./api/request.js");
require("./constants/url.js");
require("./util/toast.js");

if (!Math) {
    "./pages/KFindViewer.js";
}

var _sfc_main = common_vendor.defineComponent({
    __name: "App",
    setup: function setup(__props) {
  
        common_vendor.onLaunch(function(params) {
            console.log("App Launch");
        });

        common_vendor.onShow(function(params) {
            console.log("App Show");   
        });

        common_vendor.onHide(function() {
            console.log("App Hide");
        });

        return function() {};
    }
});

var App   = common_vendor._export_sfc(_sfc_main, [ [ "__file", "" ] ]);

function createApp() {
    var app = common_vendor.createSSRApp(App);
    app.use();
    return {
        app: app
    };
}

createApp().app.mount("#app");
exports.createApp = createApp;