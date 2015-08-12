/*jslint browser: true, plusplus: true, nomen: true, white: false, continue: true */
/*global  */

(function () {

    "use strict";
    
    var getRootNode = function () {
            
            var scripts,
                pat,
                minpat,
                i,
                src,
                m,
                minified;
        
            // figure out the path to this loader
            if (window.document && window.document.getElementsByTagName) {
                
                scripts = document.getElementsByTagName("script");
                pat = /\$\.jqplot\.demo\.common\.js/i;
                minpat = /\$\.jqplot\.demo\.common\.min\.js/i;
                
                for (i = 0; i < scripts.length; i++) {
                    src = scripts[i].getAttribute("src");
                    if (!src) { continue; }
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
        },

        files = ['codemirror-4.0/lib/codemirror.js', 'codemirror-4.0/lib/codemirror.css', 'codemirror-4.0/addon/fold/foldcode.js', 'codemirror-4.0/addon/fold/foldgutter.js', 'codemirror-4.0/addon/fold/foldgutter.css', 'codemirror-4.0/addon/fold/brace-fold.js', 'codemirror-4.0/addon/fold/xml-fold.js', 'codemirror-4.0/addon/fold/comment-fold.js', 'codemirror-4.0/theme/mdn-like.css', 'codemirror-4.0/mode/xml/xml.js', 'codemirror-4.0/mode/javascript/javascript.js', 'codemirror-4.0/mode/css/css.js', 'codemirror-4.0/mode/htmlmixed/htmlmixed.js', 'common.css', 'run.js'],

        minfiles = [''],
        rootNode = getRootNode(),
        rn = rootNode.root,
        i,
        pp,
        script;
    
    if (rootNode.minified) {
        files = minfiles;
    }

    for (i = 0; i < files.length; i++) {
        pp = rn + files[i];
        try {
            if (pp.lastIndexOf("js") !== -1) {
                document.write("<scr" + "ipt type='text/javascript' src='" + pp + "'></scr" + "ipt>\n");
            } else if (pp.lastIndexOf("css") !== -1) {
                document.write("<link" + " rel='stylesheet' type='text/css' href='" + pp + "'></link>\n");
            }
        } catch (e) {
            script = document.createElement("script");
            script.src = pp;
            document.getElementsByTagName("head")[0].appendChild(script);
            // avoid memory leak
            script = null;
        }
    }
    
}());