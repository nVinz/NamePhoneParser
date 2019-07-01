$(document).ready(function(){
    if ($('input.input-type-tel').length) {
        $('input.input-type-tel').attr('type', 'tel');
    }

    $('input, textarea').placeholder();
    $("select").selectmenu({width : 'auto'});
    $('.fancy').fancybox();
    initProductTitle()

    //Плавающий баннер
    if ($('.side-fixed-anchor').length) {
        $(document).scroll(function(){
            if ($(document).scrollTop() > $('.side-fixed-anchor').offset().top && $(document).scrollTop() < $('.pagination').offset().top-700) {
                $('.side-fixed').addClass('fixed');
            } else {
                $('.side-fixed').removeClass('fixed');
            }
        });
    }

    //Автопоиск
    $('#header .categories-form input[type="text"]').on('change', function(){
        var column = $(this).closest('.column');
        var min = column.find('.min');
        var max = column.find('.max');
        if (min.length && max.length) {
            var minValue = +min.val();
            var maxValue = +max.val();
            if (minValue > maxValue) {
                max.val('');
            }
        }
        $('#header form input[type="submit"]').css('background-color','#0074ad');
        $('#inputChange').text('1');
        setTimeout(function () {
            if($('#inputChange').text() == '1'){
                $('#header form').submit();
            }
        }, 5000);
    });

    $('#header .categories-form input').on('focus', function(){
        $('#header form input[type="submit"]').css('background-color','#45b0e6');
        $('#inputChange').text('0');
    });

    $('#header .categories-form select').selectmenu({
        change:function(event,ui) {
            $('#header form input[type="submit"]').css('background-color','#0074ad');
            $('#inputChange').text('1');
            setTimeout(function () {
                if($('#inputChange').text() == '1'){
                    $('#header form').submit();
                }
            }, 5000);1
        },
        focus:function(event,ui) {
            $('#header form input[type="submit"]').css('background-color','#45b0e6');
            $('#inputChange').text('0');
        }
    });

    $(window).load(function(){
        //initYaImg();
        setTimeout(function() {
            initNavListHeight();
        }, 500);
        $('.fixed-info-box').each(function(){
            var _item = $(this);
            var _top = _item.offset().top+500;
            if( $('.fixed-info-box').size() ){
                var _wind = $(window).scrollTop()
                if(_wind > _top){
                    _item.addClass('fixed')
                    _item.css('left', function(){
                        var _left = $(this).closest('#sidebar').offset().left;
                        if( $('#sidebar').hasClass('.product-info-bar') ){
                            _left = _left + 30;
                            alert(_left)
                        }
                        return _left;
                    })
                } else {
                    _item.removeClass('fixed')
                }
                var _bot = $('#sidebar').parent().offset().top + $('#sidebar').parent().height();
                if(_wind + _item.height() > _bot){
                    _item.css('top', function(){
                        var _temp = $('#sidebar').parent().height() + $('#sidebar').parent().offset().top -_wind - _item.height();
                        return _temp
                    });
                } else {
                    _item.css('top', '0');
                }
                $(window).scroll(function(){
                    var _wind = $(window).scrollTop()
                    if(_wind > _top){
                        _item.addClass('fixed')
                        _item.css('left', function(){
                            var _left = $(this).closest('#sidebar').offset().left;
                            if($(this).closest('#sidebar').hasClass('product-info-bar')){
                                _left = _left + 30;
                            }
                            return _left;
                        })
                    } else {
                        _item.removeClass('fixed')
                    }
                    var _bot = $('#sidebar').parent().offset().top + $('#sidebar').parent().height();
                    if(_wind + _item.height() > _bot){
                        _item.css('top', function(){
                            var _temp = $('#sidebar').parent().height() + $('#sidebar').parent().offset().top -_wind - _item.height();
                            return _temp
                        });
                    } else {
                        _item.css('top', '0');
                    }
                })
                $(window).resize(function(){
                    _item.css('left', function(){
                        var _left = $(this).closest('#sidebar').offset().left;
                        if($(this).closest('#sidebar').hasClass('product-info-bar')){
                            _left = _left + 30;
                        }
                        return _left;
                    })
                })
            }
        })
    })
    $(window).resize(function(){
        //initYaImg();
        initProductTitle();
        setTimeout(function() {
            initNavListHeight();
        }, 500);
    })

    /*
     function initYaImg() {
     if (location.hostname.indexOf('gde.ru') != -1){
     $('.product-list > li.info-box').each(function () {
     if ($(this).find('.yap-layout__picture').length || $(this).find('.ya-inline-decorated').length) {
     } else {
     $(this).css('margin-left', function () {
     var _temp = 150;
     if ($(window).width() < 1013) {
     _temp = 120
     }
     if ($(window).width() < 801) {
     _temp = 0
     }
     return _temp;
     });
     }
     });
     }
     };
     */


    $('select.error').each(function(){
        $(this).closest('.select-holder').addClass('error');
    })
    $('input:radio.error').each(function(){
        $(this).closest('label').addClass('error');
    })
    $('input:checkbox.error').each(function(){
        $(this).closest('.check-holder').addClass('error');
    })
    $('.pay-cover').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 40);
        e.preventDefault();
    });

    /*
     $('.comments-list').hide();
     $('.social-holder .open-comments').click(function(){
     var _item = $('.comments-list');
     _item.slideDown(400);
     setTimeout(function() {
     _item.addClass('opened');
     }, 400);
     })
     */


    $('.nav-block .nav-list li .drop').hide();
    $('.nav-block .link-holder a').click(function(){
        $(this).closest('.nav-block').toggleClass('active');
        if($(this).closest('.nav-block').hasClass('active')) {
            $(this).closest('.nav-block').find('.nav-list li .drop').slideDown(200);
            window.location.hash = "show-cat";
        } else {
            $(this).closest('.nav-block').find('.nav-list li .drop').slideUp(500);
            window.location.hash = "";
        }
        return false;
    });

    $('.expanded-item a.heading').click(function(e){
        //$(this).closest('.expanded-item').find('.expanded').slideToggle();
        $(this).closest('.expanded-item').toggleClass('opened')
        e.preventDefault();
    });

    //Действия и отображение кнопки "Уточнить"
    if ($('.categories-form').length) {
        $('.save-search .clarify').click(function(){
            $('.save-search').addClass('save-search-categories-form-show');
            $('.categories-form').addClass('categories-form-show');
            /*$('.submit-categories-form').addClass('submit-categories-form-show');
             $('#header').addClass('header-categories-form-show');*/
            $('#header').addClass('header-margin-bottom-prop-'+$('.categories-form .col-row .prop').length);
            return false;
        });
    } else {
        $('.save-search .clarify').remove();
    }

    $('.js-search-show').click(function(){
        $('#header').toggleClass('info-show-search');
        $('.place').toggleClass('place-hidden');
        $('.search-form').toggleClass('search-form-hidden');
    })


    $('.show-map').click(function(){
        $('.product .map-block').addClass('open')
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $('html, body').stop().animate({
            scrollTop: $(elementClick).offset().top-10
        }, 1000);
        return false;
    });
    $(document).on('click', '.town-select-block .close', function(){
        $.cookie('detectgeo', Math.floor(Date.now() / 1000)+60*30)
        $(this).closest('.town-select-block').slideToggle();
    });

    $('.categories-block .title').click(function(){
        $(this).closest('.categories-block').toggleClass('active');
        return false;
    })

    $('.top-list .content').click(function(){
        $('.top-list li').removeClass('hover');
        $(this).addClass('hover');
        return false;
    })
    $('.default-form .password-input input.text').focus(function(){
        if($(this).closest('.password-input').hasClass('show')){
            $(this).keyup(function(){
                temp = $(this).val();
                $(this).closest('.password-input').find('input.hide').val(temp);
            })
        } else {
            $(this).keyup(function(){
                temp = $(this).val();
                $(this).closest('.password-input').find('input.show').val(temp);
            })
        }
    })
    if ($('.default-form .password-input label').hasClass('active')){
        $('.default-form .password-input').addClass('show');
    }
    $('.default-form .password-input input.show').val('');
    var inc = false;
    $('.default-form .password-input label').click(function(){
        if(inc == false){
            inc = true;
        } else {
            $(this).closest('.password-input').toggleClass('show');
            inc = false;
        }
    })
    $('.search-form .placeholder').click(function(){
        $(this).addClass('hide')
        $(this).closest('.input-holder').find('input.text').focus();
    });
    $('.search-form input.text').focusout(function(){
        if($(this).val()){} else {
            $(this).closest('.input-holder').find('.placeholder').removeClass('hide');
        }
    });

    if($('.search-form input.text').val()){
        $('.search-form .placeholder').addClass('hide');
    } else {
        $('.search-form .placeholder').removeClass('hide');
    }
});





function initProductTitle(){
    $('.product-list').each(function(){
        $(this).find('> li').each(function(){
            var _height = $(this).find('.title').height()
            var _lineHeight = $(this).find('.title').css('line-height');
            _lineHeight = parseInt(_lineHeight);
            if(_height > _lineHeight*2){
                $(this).closest('li').find('.info-content').addClass('hidden');
            } else{

            }
        })
    })
}


$('.open-popup-contact').on('click', function(){
    var url=$(this).attr('data-url')
    $.magnificPopup.open({
        items: {
            src: url,
            type: 'ajax'
        }
    })
    return false;
})

$(document).on('submit', '.feedback-ajax', function(){
    var request  = $(this).serialize();
    var action = $(this).attr('action');
    var form = $(this);
    form.find('.message').remove();
    form.find('input[type=submit]').val('Отправляется...').attr('disabled', true);
    $.post(
        action,
        request,
        function(response){
            if(response == "Ok"){

                form.prepend(response);
                window.location.reload();
            } else {
                form.prepend(response);
                form.find('input[type=submit]').val('Отправить').attr('disabled', false);

                form.find('input[type=text]').val('');
                form.find('textarea').val('');
                form.find('input[type=submit]').val('Отправить').attr('disabled', false);
            }


        }
    );
    return false;
})
/*
 function initNavListHeight() {
 $('.nav-list').each(function() {
 var maxHeight = 0;
 $(this).find('> li > a').css('height', 'auto');
 $(this).find('> li').each(function() {
 if ($(this).find('a').height() > maxHeight){
 maxHeight = $(this).find('a').height();
 }
 });
 $(this).find('> li > a').height(maxHeight);
 });
 }
 */

// popup на странице АВТОРИЗАЦИЯ (зависит от перезагрузки страницы)
var remind_pwd = $('.remind_pwd'),
    remaind_pwd_mess = $('#remaind_pwd_mess');
if ( remind_pwd.length ){
    //инициализация попапа
    remind_pwd.magnificPopup({
        type: 'inline',
        focus: false,
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        fixedContentPos: false,
        callbacks: {
            afterClose: function(){
                // очистка от сообщений об ошибках (если они были)
                if ( remaind_pwd_mess.length ){
                    /*if ( remaind_pwd_mess.hasClass('good') ){
                     remaind_pwd_mess.siblings('.to_hide, .remaind_txt').show();
                     } else*/ if ( $('#remaind_pwd_mess').hasClass('bad') ){
                        remaind_pwd_mess.siblings('.remaind_txt').show();
                    }
                    remaind_pwd_mess.remove();
                }
                $('#r_pwd_mail').val('');  // очистка инпута
            }
        }
    });
    // если попап содержит какоето сообщение
    if ( remaind_pwd_mess.length ){
        /*if ( remaind_pwd_mess.hasClass('good') ){
         remaind_pwd_mess.siblings('.to_hide, .remaind_txt').hide();
         } else*/ if ( $('#remaind_pwd_mess').hasClass('bad') ){
            remaind_pwd_mess.siblings('p').hide();
        }
        remind_pwd.magnificPopup('open');
    }
}

$(document).ready(function(){
    var favorite = $.cookie('favorite');
    if (favorite===undefined) favorite = new Array();
    if (!$.isArray(favorite)) favorite=JSON.parse(favorite);
    $('#header .favorite').html(favorite.length);
});

if($('#popup_message').length) {
    $.magnificPopup.open({
        items: {
            src: '#popup_message',
            type: 'inline'
        }
    })
}
var confirmProccess = false;
var confirmResult = false;
var confirmDialog = function(message, element, oktext='', canceltext='') {
    if(confirmProccess == false) {
        var dialog = '<div class="confirm-dialog mfp-close-btn-in">';
        dialog += '<h1>' + message + '</h1>';
        dialog += '<button type="button" class="btn btn-ok">'+(oktext == '' ?'Ok':oktext)+'</button>';
        dialog += '<button type="button" class="btn btn-cancel">'+(canceltext == '' ?'Cancel':canceltext)+'</button>';
        dialog += '<button  class="mfp-close" title="Close (Esc)" type="button">×</button>';
        dialog += '</div>';
        $.magnificPopup.open({
            modal: true,
            items: {
                src: dialog,
                type: 'inline'
            },
            callbacks: {
                open: function () {
                    var $content = $(this.content);
                    $content.on('click', '.btn-ok', function () {
                        confirmResult = true;
                        confirmProccess = true;
                        $.magnificPopup.close();
                        $(document).off('keydown', keydownHandler);
                        element.click();
                    });
                    $content.on('click', '.btn-cancel', function () {
                        confirmProccess = false;
                        $.magnificPopup.close();
                        $(document).off('keydown', keydownHandler);
                    });
                    var keydownHandler = function (e) {
                        if (e.keyCode == 13) {
                            $content.find('.btn-ok').click();
                            return false;
                        } else if (e.keyCode == 27) {
                            $content.find('.btn-cancel').click();
                            return false;
                        }
                    };
                    $(document).on('keydown', keydownHandler);
                }
            }
        });
    }else{
        confirmProccess = false;
    }
    return confirmResult;
};
