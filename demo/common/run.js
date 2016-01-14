var codemirrorTheme = $.codemirrorTheme;

$(".coding").each(function (){
    $(this).append("<textarea class='code'>"+$(this).html().trim()+"</textarea>");
    var editor = CodeMirror.fromTextArea($(this).find("textarea.code")[0], {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        theme: codemirrorTheme,
        readOnly: true,
        mode: 'text/html',
        lineWrapping: true,
        extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
    //editor.setSize($(this).width()-25, $(this).find("div.jqplot-target").height());
});

// Take the code and put it into the textarea.
$(".code.hidden").each(function (){
    $(this).append("<textarea class='code'>"+$(this).html().replace("code", "script").trim()+"</textarea>");
    var cm = CodeMirror.fromTextArea($(this).find('textarea')[0], {
        lineNumbers: true,
        matchBrackets: true,
        readOnly: true,
        lineNumbers: true,
        styleActiveLine: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: 'text/html'
    });
});
