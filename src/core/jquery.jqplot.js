/*jslint browser: true, plusplus: true, nomen: true, white: false*/
/*global $, console, jqPlot, jQuery*/

/**
 * jqPlot
 * Pure JavaScript plotting plugin using jQuery
 *
 * Version: @VERSION
 * Revision: @REVISION
 *
 * Copyright (c) 2009-2013 Chris Leonello
 * jqPlot is currently available for use in all personal or commercial projects 
 * under both the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL 
 * version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html) licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly. 
 *
 * Although not required, the author would appreciate an email letting him 
 * know of any substantial use of jqPlot.  You can reach the author at: 
 * chris at jqplot  or see http://www.jqplot.com/info.php .
 *
 * If you are feeling kind and generous, consider supporting the project by
 * making a donation at: http://www.jqplot.com/donate.php .
 *
 * sprintf functions contained in jqplot.sprintf.js by Ash Searle:
 *
 *     version 2007.04.27
 *     author Ash Searle
 *     http://hexmen.com/blog/2007/03/printf-sprintf/
 *     http://hexmen.com/js/sprintf.js
 *     The author (Ash Searle) has placed this code in the public domain:
 *     "This code is unrestricted: you are free to use it however you like."
 * 
 */

 /**
 * 
 * This is a boot loader for the source version of jqplot.
 * It will load all of the necessary core jqplot files that
 * are concated together in the distribution.
 * 
 */

(function () {
    "use strict";
    var jqutils = {};

    jqutils.loadjscssfile = function (filename, filetype) {
        var fileref;
        if (filetype === "js") { //if filename is a external JavaScript file
            fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        } else if (filetype === "css") { //if filename is an external CSS file
            fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (fileref) {
            try {
                if (filetype === "js") {
                    document.write("<scr" + "ipt type='text/javascript' src='" + filename + "'></scr" + "ipt>\n");
                } else {
                    document.getElementsByTagName("head")[0].appendChild(fileref);
                }
            } catch (e) {
                document.getElementsByTagName("head")[0].appendChild(fileref);
                // avoid memory leak
                fileref = null;
            }
        }
    };

    jqutils.getRootNode = function () {
        var scripts, pat, minpat, i, src, m, minified;

        // figure out the path to this loader
        if (document && document.getElementsByTagName) {
            scripts = document.getElementsByTagName("script");
            pat = /jquery\.jqplot\.js/i;
            minpat = /jquery\.jqplot\.min\.js/i;

            for (i = 0; i < scripts.length; i++) {
                src = scripts[i].getAttribute("src");
                console.log("test: ".concat(src));
                if (!src) {
                    continue;
                }
                m = src.match(pat);
                minified = src.match(minpat);

                if (m) {
                    return {
                        node: scripts[i],
                        root: src.substring(0, m.index),
                        minified: false
                    };
                } else if (minified) {
                    return {
                        node: scripts[i],
                        root: src.substring(0, minified.index),
                        minified: true
                    };
                }
            }
        }
    };

    var files = ['jqplot.core.js', 'jqplot.linearTickGenerator.js', 'jqplot.linearAxisRenderer.js', 'jqplot.axisTickRenderer.js', 'jqplot.axisLabelRenderer.js', 'jqplot.tableLegendRenderer.js', 'jqplot.lineRenderer.js', 'jqplot.markerRenderer.js', 'jqplot.divTitleRenderer.js', 'jqplot.canvasGridRenderer.js', 'jqplot.linePattern.js', 'jqplot.shadowRenderer.js', 'jqplot.shapeRenderer.js', 'jqplot.sprintf.js', 'jsdate.js', 'jqplot.themeEngine.js', 'jqplot.toImage.js', 'jqplot.effects.core.js', 'jqplot.effects.blind.js', 'jqplot.stairsRenderer.js'],
        minfiles = ['jqplot.core.min.js', 'jqplot.linearTickGenerator.min.js', 'jqplot.linearAxisRenderer.min.js', 'jqplot.axisTickRenderer.min.js', 'jqplot.axisLabelRenderer.min.js', 'jqplot.tableLegendRenderer.min.js', 'jqplot.lineRenderer.min.js', 'jqplot.markerRenderer.min.js', 'jqplot.divTitleRenderer.min.js', 'jqplot.canvasGridRenderer.min.js', 'jqplot.linePattern.min.js', 'jqplot.shadowRenderer.min.js', 'jqplot.shapeRenderer.min.js', 'jqplot.sprintf.min.js', 'jsdate.min.js', 'jqplot.themeEngine.min.js', 'jqplot.toImage.min.js', 'jqplot.effects.core.min.js', 'jqplot.effects.blind.min.js', 'jqplot.stairsRenderer.min.js'],
        i,
        rootNode,
        rn,
        pp,
        fileref;

    rootNode = jqutils.getRootNode();
    rn = rootNode.root;

    if (rootNode.minified) {
        files = minfiles;
    }

    for (i = 0; i < files.length; i++) {
        pp = rn + files[i];
        fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", pp);
        jqutils.loadjscssfile(pp, "js");
    }

    jqutils.loadjscssfile(rn + 'font-awesome.min.css', 'css');

}());