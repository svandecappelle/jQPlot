(function(){

    var getRootNode = function(){
        // figure out the path to this loader
        if(this["document"] && this["document"]["getElementsByTagName"]){
            var scripts = document.getElementsByTagName("script");
            var pat = /\$\.jqplot\.demo\.common\.js/i;
            var minpat = /\$\.jqplot\.demo\.common\.min\.js/i;
            for(var i = 0; i < scripts.length; i++){
                var src = scripts[i].getAttribute("src");
                if(!src){ continue; }
                var m = src.match(pat);
                var minified = src.match(minpat);
                if(m){
                    return { 
                        node: scripts[i], 
                        root: src.substring(0, m.index),
                        minified: false
                    };
                }else if(minified){
                    return { 
                        node: scripts[i], 
                        root: src.substring(0, minified.index),
                        minified: true
                    };
                }
            }
        }
    };

    var files = ['codemirror-4.0/lib/codemirror.js','codemirror-4.0/lib/codemirror.css','codemirror-4.0/addon/fold/foldcode.js','codemirror-4.0/addon/fold/foldgutter.js','codemirror-4.0/addon/fold/foldgutter.css','codemirror-4.0/addon/fold/brace-fold.js','codemirror-4.0/addon/fold/xml-fold.js','codemirror-4.0/addon/fold/comment-fold.js','codemirror-4.0/theme/mdn-like.css','codemirror-4.0/mode/xml/xml.js','codemirror-4.0/mode/javascript/javascript.js','codemirror-4.0/mode/css/css.js','codemirror-4.0/mode/htmlmixed/htmlmixed.js','common.css','run.js'];
    var minfiles = [''];
    
    var rootNode = getRootNode();
    var rn = rootNode.root;
    
    if(rootNode.minified){
        files = minfiles;
    }

    for (var i=0; i<files.length; i++) {
        var pp = rn+files[i];
        try {
            if(pp.lastIndexOf("js") != -1){
                document.write("<scr"+"ipt type='text/javascript' src='"+pp+"'></scr"+"ipt>\n");
            }else if (pp.lastIndexOf("css") != -1){
                document.write("<link"+" rel='stylesheet' type='text/css' href='"+pp+"'></link>\n");
            }
        } catch (e) {
            var script = document.createElement("script");
            script.src = pp;
            document.getElementsByTagName("head")[0].appendChild(script);
            // avoid memory leak
            script = null;
        }
    }
})();