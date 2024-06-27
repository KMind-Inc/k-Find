var _createForOfIteratorHelper2 = require("../@babel/runtime/helpers/createForOfIteratorHelper");

var _regeneratorRuntime2 = require("../@babel/runtime/helpers/regeneratorRuntime");
var _asyncToGenerator2 = require("../@babel/runtime/helpers/asyncToGenerator");
var common_vendor = require("../common/vendor.js");
require("../api/request.js");

var tryRedirectToKFindViewer = function() {
    var _ref = _asyncToGenerator2(_regeneratorRuntime2().mark(function _callee() {
        var webViewPageUrl, isValid, res, url, _args = arguments;
        return _regeneratorRuntime2().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                webViewPageUrl = _args.length > 0 && _args[0] !== undefined ? _args[0] : "/";
                isValid = true;
                _context.prev = 4;
                _context.next = 7;
                return api_login.getMyInfo();

              case 7:
                res = _context.sent;
                if (!(res.data.errCode !== 0)) {
                    _context.next = 10;
                    break;
                }
                throw res.data.errMsg;

              case 10:
                _context.next = 16;
                break;

              case 16:
                if (!isValid) {
                    _context.next = 22;
                    break;
                }
                url = resolveRedirectKFindViewerUrl([], webViewPageUrl);
                _context.next = 20;
                return common_vendor.index.redirectTo({
                    url: url
                });

              case 20:
                _context.next = 23;
                break;

              case "end":
                return _context.stop();
            }
        }, _callee, null, [ [ 4, 12 ] ]);
    }));

    return function tryRedirectToKFindViewer() {
        return _ref.apply(this, arguments);
    };
}();

var resolveRedirectKFindViewerUrl = function resolveRedirectKFindViewerUrl(cmdList) {
    var webViewPageUrl  = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
    var viewerPageQuery = getViewerPageQuery(cmdList, webViewPageUrl);
    return "/pages/KFindViewer?page=".concat(viewerPageQuery);
};

exports.getViewerPageQuery = getViewerPageQuery;
exports.tryRedirectToKFindViewer = tryRedirectToKFindViewer;