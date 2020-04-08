function FontDiv(){
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