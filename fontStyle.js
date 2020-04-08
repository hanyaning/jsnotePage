var fontList = (function(){
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
        if(cfg.style === '斜体') {
          sample.css({'font-style': 'italic'});
          return;
        }
        if(cfg.style === '粗体') {
          sample.css({'font-weight': 'bold'});
          return;
        }
        if(cfg.style === '粗偏斜体') {
          sample.css({'font-weight': 'bold', 'font-style': 'italic'});
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
})()