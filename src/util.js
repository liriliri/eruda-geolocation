// Built by eustia.
"use strict";

var _ = {};

/* ------------------------------ noop ------------------------------ */

var noop = _.noop = (function ()
{
    /* A no-operation function.
     *
     * ```javascript
     * noop(); // Does nothing
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports() {}

    return exports;
})();

/* ------------------------------ loadCss ------------------------------ */

_.loadCss = (function ()
{
    /* Inject link tag into page with given href value.
     *
     * |Name|Type    |Desc           |
     * |----|--------|---------------|
     * |src |string  |Style source   |
     * |cb  |function|Onload callback|
     *
     * ```javascript
     * loadCss('style.css', function (isLoaded)
     * {
     *     // Do something...
     * });
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * noop 
     */ 

    function exports(src, cb) 
    {
        cb = cb || noop;

        var link = document.createElement('link');

        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.onerror = function () { cb(false); }
        link.onload = function () { cb(true); }
        link.href = src;

        document.head.appendChild(link);
    }

    return exports;
})();

/* ------------------------------ loadJs ------------------------------ */

_.loadJs = (function ()
{
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

    function exports(src, cb)
    {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function ()
        {
            var isNotLoaded = script.readyState &&
                script.readyState != 'complete' &&
                script.readyState != 'loaded';

            cb && cb(!isNotLoaded);
        };
        document.body.appendChild(script);
    }

    return exports;
})();

module.exports = _;