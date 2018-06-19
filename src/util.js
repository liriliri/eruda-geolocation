// Built by eustia.
"use strict";

var _ = {};

/* ------------------------------ loadCss ------------------------------ */_.loadCss = (function () {
    function exports(src, container) {
      var link = document.createElement('link');

      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = src;

      container = container || document.head
      container.appendChild(link);
    }

    return exports;
})();

/* ------------------------------ loadJs ------------------------------ */_.loadJs = (function () {
    /* Inject script tag into page with given src value.
     *
     * |Name|Type    |Desc           |
     * |----|--------|---------------|
     * |src |string  |Script source  |
     * |cb  |function|Onload callback|
     *
     * ```javascript
     * loadJs('main.js', function (isLoaded)
     * {
     *     // Do something...
     * });
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    function exports(src, cb) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function() {
            var isNotLoaded =
                script.readyState &&
                script.readyState != 'complete' &&
                script.readyState != 'loaded';

            cb && cb(!isNotLoaded);
        };
        document.body.appendChild(script);
    }

    return exports;
})();

module.exports = _;