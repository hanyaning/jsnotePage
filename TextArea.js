var textArea = (function () {
    //进行拼写检查的可编辑段落
    var textDiv = $('<div class="textArea">' +
        '<textarea  id="textArea" contenteditable="true" spellcheck="false"></textarea>' +
        '</div>');
    var textArea = textDiv.find('textarea');
    function createTextArea(){
        $('body').append(textDiv);
        //默认触发事件
        textArea.trigger('focus');
    }
    return{
        createTextArea:createTextArea
    }
})()