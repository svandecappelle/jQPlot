$(".coding").each(function (){
    $(this).parent().append("<textarea class='code'>"+$(this).html()+"</textarea>");
    var editor = CodeMirror.fromTextArea($(this).parent().find("textarea.code")[0], {
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        theme: 'mdn-like',
        readOnly: true,
        mode: 'text/html',
        lineWrapping: true,
        extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
    editor.setSize($(this).width()-25, $(this).find("div").height());
});