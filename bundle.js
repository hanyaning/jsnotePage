$(function(){
    var menuData = [
        {
            title:'文件(F)',
            menuItem:[
                {title:'新建(N)',shortcut:'Ctrl+N',enabled:true},
                {title:'新窗口(W)',shortcut:'Ctrl+Shift+N',enabled:true},
                {title:'打开(O)...',shortcut:'Ctrl+O',enabled:true},
                {title:'保存(S)',shortcut:'Ctrl+S',enabled:true},
                {title:'另存为(A)',shortcut:'Ctrl+Shift+S',enabled:true},
                {title:'hr',shortcut:'',enabled:true},
                {title:'页面设置(U)',shortcut:'',enabled:true},
                {title:'打印(P)',shortcut:'Ctrl+P',enabled:true},
                {title:'hr',shortcut:'',enabled:true},
                {title:'退出(X)',shortcut:'',enabled:true}
            ],
            width:'202px',
            left:'0px'
        },
        {
            title:'编辑(E)',
            menuItem:[
                {title:'撤销(U)',shortcut:'Ctrl+Z',enabled:false},
                {title:'hr',shortcut:'',enabled:true},
                {title:'剪切(T)',shortcut:'Ctrl+X',enabled:false},
                {title:'复制(C)',shortcut:'Ctrl+C',enabled:false},
                {title:'粘贴(V)',shortcut:'Ctrl+V',enabled:true},
                {title:'删除(L)',shortcut:'Del',enabled:false},
                {title:"hr",shortcut:'',enabled:true},
                {title:'使用Bing搜索',shortcut:'Ctrl+E',enabled:true},
                {title:'查找(F)...',shortcut:'Ctrl+F',enabled:true},
                {title:'查找下一个(N)',shortcut:'F3',enabled:true},
                {title:'查找上一个(V)',shortcut:'Shift+F3',enabled:true},
                {title:'替换(R)...',shortcut:'Ctrl+H',enabled:true},
                {title:'转到(G)...',shortcut:'Ctrl+G',enabled:true},
                {title:'hr',shortcut:'',enabled:true},
                {title:'全选(A)',shortcut:'Ctrl+A',enabled:true},
                {title:'时间/日期(D)',shortcut:'F5',enabled:true},
            ],
            width:'218px',
            left:"52px"
        },
        {
            title:'格式(O)',
            menuItem:[
                {title:'自动换行(W)',shortcut:'',enabled:true},
                {title:'字体(F)...',shortcut:'',enabled:true},
            ],
            width:'156px',
            left:'106px'
        },
        {
            title:'查看(V)',
            menuItem:[
                {title:'缩放(Z)',shortcut:'',enabled:true},
                {title:'状态栏',shortcut:'',enabled:true},
            ],
            width: '138px',
            left: '162px'
        },
        {
            title:"帮助(H)",
            menuItem:[
                {title:'查看帮助(H)',shortcut:'',enabled:true},
                {title:'发送反馈(F)',shortcut:'',enabled:true},
                {title:'hr',shortcut:'',enabled:true},
                {title:'关于记事本(A)',shortcut:'',enabled:true},
            ],
            width: '166px',
            left: '216px'
        }
    ];
    webPage.start(menuData);
    textArea.createTextArea();
});var webPage = (function () {
    //创建菜单栏
    var bar = $('<div class="web_bar"></div>');
    //创建列表项
    var meunList = [];
    //是否展开
    var active = -1;
    //创建每项菜单
    function createMeun(meunData) {
        var navList = $('<ul class="menu-title"></ul>');
        for (var i = 0; i < meunData.length; i++) {
            (function (i) {
                var navtitle = $('<li class="title"></li>');
                navtitle.html(meunData[i].title);
                navtitle.attr('id', i)
                navList.append(navtitle);
                navtitle.click(function (e) {
                    var id = Number(navtitle.attr('id'));
                    //console.log(typeof id);
                    if (active === -1) {
                        meunList[id].css('display', 'inline-block');
                        active = id;
                    } else if (active !== id) {
                        //console.log(meunList[id]);
                        meunList[active].css('display', 'none');
                        meunList[id].css('display', 'inline-block');
                        active = id
                    } else {
                        meunList[active].css('display', 'none');
                        active = -1;
                    }
                    e.stopPropagation();
                });
                navtitle.hover(function() {
                    if(active !== -1) {
                      var id = Number(navtitle.attr('id'));
                      meunList[active].css('display', 'none');
                      meunList[id].css('display', 'inline-block');
                      active = id
                    }
                  });
            })(i)

        }
        bar.append(navList);

    }
    //创建每项菜单下的子菜单
    function createMeunList(meunData) {
        for (var i = 0; i < meunData.length; i++) {
                var list = $('<ul class="munelist"></ul>');
                content = meunData[i].menuItem;
                for (var j = 0; j < content.length; j++) {
                        if (content[j].title === 'hr') {
                            var hr = $('<li class="menu-hr"></li>');
                            //hr.html('');
                            list.append(hr);
                            continue;
                        }
                        var list_li = $('<li class="menu-item"></li>');
                        list_li.html(content[j].title);
                        //console.log(i,j);
                        list_li.attr('id',i);
                        list_li.attr('y',j);
                        //console.log(list_li.attr('id'),list_li.attr('y'));
                        if (content[j].shortcut !== '') {
                            var shortcut = $('<span class="shortcut"></span>');
                            shortcut.html(content[j].shortcut);
                            list_li.append(shortcut);
                        }
                        //console.log(content[j] === false);
                        if (!content[j].enabled) {
                            //console.log(j);
                            list_li.addClass('disable');
                        }
                        list.append(list_li);
                        list_li.click(function(e){
                            e.stopPropagation();
                            if($(this).hasClass('disabled')){
                                return;
                            }
                            var id =Number($(this).attr('id'));
                            var j = Number($(this).attr('y'));
                            console.log(id,j);
                            meunList[id].css('display','none');
                            // list[id].css('display','none');
                            active = -1;
                            if(id === 2 && j === 1){
                                fontList.show({
                                    okHandler: function(e) {
                                        console.log(e);
                                      }
                                });
                                meunList[id].css('display','none');
                                active = -1;
                            }
                        });
                   
                }
                list.css({
                    width: meunData[i].width,
                    left: meunData[i].left,
                    display: 'none'
                })
                bar.append(list);
                meunList.push(list);
            }
            //console.log(list);
    }
    function start(meunData) {
        createMeun(meunData);
        createMeunList(meunData);
        $('body').append(bar);
    }
    return {
        start: start
    }
})()
;var fontList = (function(){
    var box = $(
        '<div class="notepad-dlg-mask notepad-dlg-font">'
        + '<div class="dialogbox notepad-dlgbox">'
          + '<div class="notepad-dlg-titlebar">'
            + '<p class="title">字体</p>'
            + '<span class="close-btn" title="关闭">✖</span>'
          + '</div>'
          + '<div class="main notepad-dlg-main">'
            + '<div class="font-family"><p>字体(F):</p></div>'
            + '<div class="font-style"><p>字形(Y):</p></div>'
            + '<div class="font-size"><p>大小(S):</p></div>'
            + '<fieldset class="sample">'
              + '<legend>示例</legend>'
              + '<p class="sample-txt">AaBbYyZz</p>'
            + '</fieldset>'
            + '<div class="script">'
              + '<label>'
                + '脚本(R):<br>'
                + '<select>'
                  + '<option value="西欧语言">西欧语言</option>'
                  + '<option value="中文 GB2312">中文 GB2312</option>'
                + '</select>'
              + '</label>'
            + '</div>'
            + '<input class="btn-ok btn" type="button" value="确定">'
            + '<input class="btn-cancel btn" type="button" value="取消">'
          + '</div>'
        + '</div>'
      + '</div>');
    var btnOK = box.find('.btn-ok');
    var btnClose = box.find('.close-btn');
    var btnCancel = box.find('.btn-cancel');
    var sample = box.find('.sample-txt');
    var titleBar = box.find('.notepad-dlg-titlebar');

    var cfg = {
        family: 'Arial',
        style: '常规',
        size: '16',
        okHandler:null
      };
    function samples() {
        sample.css({ 'font-family': cfg.family, 'font-size': cfg.size + 'pt' });
        if(cfg.style === '常规'){
          sample.css({'font-weight':'normal','font-style':'normal'});
          return;
        }
        if(cfg.style === '斜体') {
          sample.css({'font-weight':'normal','font-style':'italic'});
          return;
        }
        if(cfg.style === '粗体') {
          sample.css({'font-weight':'bold','font-style':'normal'});
          return;
        }
        if(cfg.style === '粗偏斜体') {
          sample.css({'font-weight':'bold','font-style':'italic'});
          return;
        }
      }

    function create(){
        var font = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'];
        var style = ['常规', '斜体', '粗体', '粗偏斜体'];
        var size = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

        var fonts = new FontDiv();
        fonts.show({
            container: '.notepad-dlg-font .font-family',
            width: '176px',
            list: font,
            isFont: true,
            selectHandler: function(e) {
                cfg.family = font[e];
                samples();
              }
        });
        var styles = new FontDiv();
        styles.show({
            container: '.notepad-dlg-font .font-style',
            select: 3,
            width: '132px',
            list: style,
            isFontStyle: true,
            selectHandler: function(e) {
                cfg.style = style[e];
                samples();
              }
        });
        var sizes = new FontDiv();
        sizes.show({
            container: '.notepad-dlg-font .font-size',
            width: '64px',
            list: size,
            selectHandler: function(e) {
                cfg.size = size[e];
                samples();
              }
        });
        samples();
    }
    function cancel(){
        box.remove();
    }
    function show(conf){
        $.extend(cfg,conf)
        $('body').append(box);
        create();
        box.find('.dialogbox').draggable({handle: titleBar});
        btnClose.click(cancel);
        btnCancel.click(cancel);
        btnOK.click(cancel);
        btnOK.click(function() {
            cfg.okHandler({
              family: cfg.family,
              style: cfg.style,
              size: cfg.size
            });
            cancel();
          });
        box.click(function(e) {
            e.stopPropagation();
        });
    }
    return {
        show:show
    }
})();var textArea = (function () {
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
})();function FontDiv(){
    //创建每一个列表
    var selectList = $(
        '<div class="listBox">'+
            '<input class="content" type="type">'
            +'<br>'
            +'<ul class="selectList">'
            +'</ul>'
        +'</div>'
    );
    //每项选择的内容
    var selectContent = selectList.find('.content');
    var listContent = selectList.find('.selectList');
    var itemContent;
    //设置配置项
    var cfg = {
        container:'',
        list:[],
        select:0,
        width:'200px',
        isFont:false,
        isFontStyle:false,
        selectHandler: null
    }
    function setFontStyle(item,style){
        if(cfg.style === '常规'){
            item.css({'font-weight':'normal','font-style':'normal'});
            return;
        }
        if(style === '斜体'){
            item.css({'font-weight':'normal','font-style':'italic'});
            return;
        }
        if(style === '粗体') {
            item.css({'font-weight':'bold','font-style':'normal'});
            return;
        }
        if(style === '粗偏斜体') {
            item.css({'font-weight':'bold','font-style':'italic'});
            return;
        }
    }
    function fillData(){
        if(cfg.isFont){
            for(var i = 0;i<cfg.list.length;i++){
                var item = $('<li class="item"></li>');
                item.css('font-family',cfg.list[i]);
                item.html(cfg.list[i]);
                listContent.append(item);
            }
        }else if(cfg.isFontStyle){
            for(var i = 0 ;i<cfg.list.length;i++){
                var item = $('<li class="item"></li>');
                item.html(cfg.list[i]);
                setFontStyle(item,cfg.list[i]);
                listContent.append(item);
            }
        }else{
            for(var i = 0 ; i < cfg.list.length ;i++){
                var item = $('<li class="item"></li>');
                item.html(cfg.list[i]);
                listContent.append(item);
            }
        }
        itemContent = listContent.find('.item');
    }
    function setSelectList(n){
        $(itemContent[n]).addClass('selected');
        selectContent.val(cfg.list[n]);
        selectContent.select();
    }
    function create(){
        var oldList = $(cfg.container).find('.listBox');
        if(oldList.length !== 0){
            oldList.remove();
        }
        $(cfg.container).append(selectList);
        selectList.css('width',cfg.width);
        fillData();
        setSelectList(cfg.select);
    }
    this.show = function(conf){
        $.extend(cfg, conf);
        create();
        listContent.click(function(e){
            $(itemContent[cfg.select]).removeClass('selected');
            cfg.select = cfg.list.indexOf($(e.target).html());
            $(itemContent[cfg.select]).addClass('selected');
            selectContent.val(cfg.list[cfg.select]);
            selectContent.select();
            cfg.selectHandler(cfg.select);
        });
        selectContent.keyup(function(){
            var i = 0;
            for(i = 0;i<cfg.list.length;i++){
                if(cfg.list[i].indexOf(selectContent.val()) === 0){
                    break;
                }
            }
            if(i === cfg.list.length){
                return;
            }
            itemContent[i].scrollIntoView({behavior: 'smooth', block: 'start'});
            $(itemContent[cfg.select]).removeClass('selected');
            $(itemContent[i]).addClass('selected');
            cfg.select = i;
        })
    }
}