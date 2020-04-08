var webPage = (function () {
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
