var _regeneratorRuntime2 = require("../@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("../@babel/runtime/helpers/asyncToGenerator");
var common_vendor = require("../common/vendor.js");
var constants_url = require("../constants/url.js");

require("../api/request.js");
require("../util/toast.js");

var _sfc_defineComponent = common_vendor.defineComponent({
    __name: "KFindViewer",
    setup: function setup(__props) {
        var onMessage = function() {
            return function onMessage(_x) {
                return _ref.apply(this, arguments);
            };
        }();

        var pagePath = common_vendor.ref("/");

        common_vendor.onLoad(function(query) {
            common_vendor.index.showShareMenu({
                withShareTicket: true,
                menus: [ "shareAppMessage", "shareTimeline" ]
            });
            if (!query) return;
            pagePath.value = decodeURIComponent(query.page || "/");
        });

        common_vendor.onShow(function() { 
        });

        var defaultShareObj = {
            title: "kFind(Demo)搜索，一触即达",
            imageUrl: "/static/kFind.png"
        };

        // 分享消息回调
        common_vendor.onShareAppMessage(function() {
            var _ref2 = _asyncToGenerator2(_regeneratorRuntime2().mark(function _callee2(options) {
                var url, info, isSearchPage;
                return _regeneratorRuntime2().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 4:
                        url          = new common_vendor.URL(options.webViewUrl);
                        info         = shareObj.value;
                        info.title   = defaultShareObj.title;
                        isSearchPage = url.pathname.includes("search");
                        // 判断是否是搜索页面
                        if (isSearchPage) {
                            delete info.imageUrl;
                        } else {
                            info.imageUrl  = defaultShareObj.imageUrl;
                            shareObj.value = null;
                        }
                        info.path = "/pages/KFindViewer?page=".concat(info.path || "");
                        return _context2.abrupt("return", info);

                      case "end":
                        return _context2.stop();
                    }
                }, _callee2);
            }));
            return function(_x2) {
                return _ref2.apply(this, arguments);
            };
        }());

        return function(_ctx, _cache) {
            return {
                // 返回Url
                a: common_vendor.unref(constants_url.Url).webview + pagePath.value,
                b: common_vendor.o(onMessage)
            };
        };
    }
});

_sfc_defineComponent.__runtimeHooks = 2;
var MiniProgramPage = common_vendor._export_sfc(_sfc_defineComponent, [ [ "__file", "" ] ]);
wx.createPage(MiniProgramPage);