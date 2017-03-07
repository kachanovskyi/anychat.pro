(function() {
    //Load Stylesheet
    var root = './';
    // var root = 'https://rawgit.com/kachanovskyi/anychat.pro/master/';
    var accessToken = "afc2e32efdff44819a7cbc62e58009ca";
    var baseUrl = "https://api.api.ai/v1/";

    var head = document.getElementsByTagName('head')[0],
        stylesheet = document.createElement('link');
    stylesheet.type = 'text/css';
    stylesheet.rel = 'stylesheet';
    stylesheet.href = root + 'css/widget.css';
    head.appendChild(stylesheet);

    setTimeout(function() {
        (window.jQuery && init()) || loadScript("https://code.jquery.com/jquery-3.1.1.min.js", init);
    }, 1000);

    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function() {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function init() {
        var $ = window.jQuery;

        var settings = {},
            script = $('#anychat-script'),
            site = window.location.host,
            salt = '\x26\x63\x69\x64\x3D' + Math.round(2147483647 * Math.random()),
            kga = ["aHR0cHM6Ly9zc2wuZ29vZ2xlLWFuYWx5dGljcy5jb20vY29sbGVjdD92PTEmdGlkPVVBLTU1OTEzMzY2LTEz", "JnQ9cGFnZXZpZXcmZGw9", "JnQ9ZXZlbnQmZWM9aW50ZXJhY3Rpb24mZWE9YWN0aXZhdGU="],
            cipher = script.data('apps'),
            answers = script.data('answers'),
            align = script.data('align'),
            whitelabel = script.data('whitelabel'),
            colors = {
                anychat: '#783bd2',
                // email: '#2D70E7',
                email: '#da3337',
                sms: '#2F80ED',
                phone: '#0AD02C',
                messenger: '#0084FF',
                // viber: '#675CA8',
                kik: '#82BC23',
                whatsapp: '#30BE2D',
                alexa: '#54ABD8',
                allo: '#F5B900'
            },
            groups = {
                anychat: 'chatbot',
                email: 'classic',
                sms: 'classic',
                phone: 'classic',
                messenger: 'messaging',
                // viber: 'messaging',
                kik: 'messaging',
                whatsapp: 'messaging',
                alexa: 'voice',
                allo: 'voice'
            },
            labels = {
                anychat: 'ask our chatbot',
                email: 'email',
                sms: 'sms/text',
                phone: 'phone',
                messenger: 'messenger',
                // viber: 'viber',
                kik: 'kik',
                whatsapp: 'whatsapp',
                alexa: 'amazon echo',
                allo: 'google home'
            },
            descriptions = {
                anychat: 'about us, hours, locations',
                email: 'just email us',
                sms: 'just text us',
                phone: 'just call us',
                messenger: 'chat with us on fb messenger',
                // viber: 'messaging',
                kik: 'chat with us on kik',
                whatsapp: 'chat with us on whatsapp',
                alexa: 'enable our skill',
                allo: 'add our action'
            };

        settings.apps = JSON.parse(decodeURI(atob(cipher)));
        settings.answers = JSON.parse(decodeURI(atob(answers)));

        settings.tags = {
            page: [atob(kga[0]), atob(kga[1]), site, salt].join(''),
            event: [atob(kga[0]), atob(kga[2]), salt].join('')
        };

        settings.color = script.data('color');
        settings.overlay = script.data('overlay');
        var numberOfApps = Object.keys(settings.apps).length;
        var aboutPrefixes = ["Here's a little something about us", "Here's a little something about our team", "Here's a little secret offer just for you"];
        var aboutOptions = [];
        // if (!Mobile) {
        //     if (settings.apps.sms) {
        //         numberOfApps--;
        //     }
        // }
        for (var x in settings.answers) {
            if(x.includes("About")) {
                aboutOptions.push(settings.answers[x]);
            }
        }

        var maxIconCount = Math.floor((window.innerHeight - 130) / 1); //mocked up.

        var anchor = $('<div>')
            .attr('id', 'anychat-container')
            .appendTo($('body'));

        var classic = $('<div>')
            .addClass('classic')
            .appendTo(anchor);
        var voice = $('<div>')
            .addClass('voice')
            .appendTo(anchor);
        var messaging = $('<div>')
            .addClass('messaging')
            .appendTo(anchor);
        var chatbot = $('<div>')
            .addClass('chatbot')
            .appendTo(anchor);

        // anchor.children().each(function () {
        //     console.log($(this));
        // });

        if (align == 'left') {
            anchor.addClass('left');
        }

        var btnBg = '<?xml version="1.0" encoding="UTF-8"?> <svg width="97px" height="92px" viewBox="0 0 100 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 41 (35326) - http://www.bohemiancoding.com/sketch --> <title>Shape@2x</title> <desc>Created with Sketch.</desc> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Purple" transform="translate(-40.000000, -59.000000)" fill="#FFFFFF"> <path d="M120.33158,106.506104 C122.536403,118.160168 122.536403,118.475143 112.142238,120.364991 C94.818629,123.514738 77.4950204,122.884788 60.4863865,118.790117 C45.0526262,115.010421 39.6980562,106.821079 40.0130309,88.8675207 C40.3280056,74.3786845 46.9424744,65.8743675 61.7462853,62.4096458 C67.4158299,61.149747 73.0853746,60.5197976 78.7549192,59.8898482 C82.2196409,59.5748735 85.6843626,59.5748735 85.6843626,64.6144687 C85.6843626,69.0241145 85.0544132,72.1738616 79.6998433,72.4888363 C73.715324,73.1187857 67.7308046,74.3786845 62.06126,75.6385833 C54.1868925,77.5284315 52.612019,83.8279255 52.612019,90.7573689 C52.612019,98.0017871 54.5018672,103.986306 62.06126,106.191129 C67.4158299,107.766003 72.7703999,108.710927 78.1249698,109.025902 C85.0544132,109.655851 92.2988313,109.655851 99.2282748,109.025902 C106.472693,109.025902 113.087162,107.766003 120.33158,106.506104 Z M92.613806,71.2289375 C87.9437905,70.2701404 87.9969092,60.9193879 92.613806,60 C97.2307028,59.0806121 116.551883,62.7246205 127.261023,66.5043169 C135.450365,69.3390892 139.860011,76.5835074 139.860011,85.7177737 C140.174986,95.4819895 139.860011,105.246205 139.860011,114.695446 C139.860011,118.790117 138.915087,121.939864 133.875492,121.939864 C128.835897,121.939864 127.261023,118.475143 127.261023,114.065497 L127.261023,92.0172677 C127.261023,80.3632038 123.796301,76.2685327 112.142238,74.0637098 C105.842744,72.803811 97.2838216,72.1877345 92.613806,71.2289375 Z" id="Shape"></path> </g> </g> </svg>';

        var launcher = $('<div>')
            .addClass('anychat-launcher')
            .addClass('anychat-effect')
            .css( 'background-image', 'url(data:image/svg+xml,' + escape(btnBg) + ')')
            .css('background-color', settings.color)
            .appendTo(anchor);

        var ua = navigator.userAgent;
        var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        var Android = !!ua.match(/Android/i);
        var Mobile = !!ua.match(/Mobi/i);
        var Mac = !!ua.match(/Macintosh/i);

        $.get(settings.tags.page);


        //Add overlay
        if (settings.overlay && !Mobile) {
            var overlayMask = $('<div id="anychat-overlay">').appendTo($('body')).click(function() {
                overlayMask.hide();
            }).hide();

            overlayBody = $('<div>').addClass('overlay-body').appendTo(overlayMask).click(function(event) {
                event.stopPropagation();
            });

            $.each(settings.apps, function(key, value) {
                var anychat = false;
                var imgType = '.svg';
                var labelText = key.charAt(0).toUpperCase() + key.slice(1);
                if(key === 'anychat') {
                    labelText = 'ask our chatbot';
                    anychat = true;
                }

                if(key === 'allo') {
                    labelText = 'google home';
                }

                if(key === 'sms') {
                    labelText = 'sms/text';
                }

                if(anychat) {
                    // console.log('AAAAAA');
                    $('<div>')
                        .addClass('anychat-overlay-chat-icon')
                        .attr('data-type', key)
                        .css('background-color', colors[key])
                        // .css('background-size', '80%')
                        .css('background-position', 'center')
                        .css('background-repeat', 'no-repeat')
                        .append(
                            // $('<a>').attr('href', 'anychat.pro').attr('target', '_blank').append(
                                $('<img>')
                                    .attr('src', root + 'images/' + key + imgType)
                                    .attr('alt', key)
                            // )
                        )
                        .append(
                            $('<div class="anychat-label">')
                                .append($('<p class="heading">').text(labels[key]))
                                .append($('<p class="subheading">').text(descriptions[key]))
                        )
                        // .append($('<div class="anychat-description">')).text(descriptions[key])

                        .appendTo(overlayBody);
                } else {
                    $('<div>')
                        .addClass('anychat-overlay-chat-icon')
                        .attr('data-type', key)
                        .css('background-color', colors[key])
                        .append(
                            $('<img>')
                                .attr('src', root + 'images/' + key + imgType)
                                .attr('alt', key)
                        )
                        .append(
                            $('<div class="anychat-label">')
                                .append($('<p class="heading">').text(labels[key]))
                                .append($('<p class="subheading">').text(descriptions[key]))
                        )
                        // .append($('<div class="anychat-description">')).text(descriptions[key])

                        .appendTo(overlayBody);
                }
            });

            launcher.click(function() {
                // overlayMask.fadeIn();
            });

        } else {
            $.each(settings.apps, function(key, value) {
                // if (Mobile || (key != 'sms')) {
                //
                // }
                var color,
                    href,
                    img,
                    anychat = false,
                    alexa = false,
                    imgType  = '.svg',
                    labelText = key.charAt(0).toUpperCase() + key.slice(1);
                if(key === 'anychat') {
                    // color = 'rgba(106, 106, 106, .7)';
                    labelText = 'ask our chatbot';
                    anychat = true;
                    img = $('<img>')
                        .attr('src', root + 'images/' + key + imgType)
                        .attr('alt', key)
                        .css('width', '40px')
                        .css('height', '40px')
                } else {
                    // color = '#686868';
                    // color = colors[key];
                }

                if(key === 'allo') {
                    labelText = 'Allo/Home';
                } else if(key === 'alexa') {
                    alexa = true;
                    img = $('<img>')
                        .attr('src', root + 'images/' + key + imgType)
                        .attr('alt', key);
                }

                if(alexa) {
                    var chatIcon = $('<div>')
                        .addClass('anychat-chat-icon')
                        .attr('data-type', key)
                        // .css('background-color', colors[key])
                        .append(
                            $('<a>').attr('href', 'http://www.anychat.pro/').attr('target', '_blank')
                                .css('border', 'none')
                                .append(img)
                        )
                        .append(
                            $('<div class="anychat-label">')
                                .append($('<p class="heading">').text(labels[key]))
                                .append($('<p class="subheading">').text(descriptions[key]))
                        );
                    // .append($('<div class="anychat-description">')).text(descriptions[key])
                    chatIcon.css('color', color).hide();
                    var container = anchor.find('.' + groups[key]);
                    chatIcon.appendTo(container);
                } else {
                    chatIcon = $('<div>')
                        .addClass('anychat-chat-icon')
                        .attr('data-type', key)
                        // .css('background-color', colors[key])
                        .append(
                            $('<img>')
                                .attr('src', root + 'images/' + key + imgType)
                                .attr('alt', key)
                        )
                        .append(
                            $('<div class="anychat-label">')
                                .append($('<p class="heading">').text(labels[key]))
                                .append($('<p class="subheading">').text(descriptions[key]))
                        )
                        // .append($('<div class="anychat-description">')).text(descriptions[key])
                        // .css('color', color)
                        .hide();
                    if(anychat) {
                        chatIcon.append(
                            $('<a class="chat-close">').append(
                                $('<img>')
                                    .attr('src', root + 'images/back.svg')
                                )
                                .css('float', 'left')
                                .css('border-bottom', 'none')
                        )
                    }
                    container = anchor.find('.' + groups[key]);
                    chatIcon.appendTo(container);
                }
            });

            if(classic.children().length > 0) {
                $('<div>')
                    .addClass('anychat-chat-icon')
                    .addClass('group-title')
                    // .css('background-color', colors[key])
                    .append(
                        $('<p>classic channels</p>').css('position', 'absolute').css('right', '14px').css('top', '35px').css('line-height', '100%').css('font-size', '10pt')
                    )
                    // .append($('<div class="anychat-description">')).text(descriptions[key])
                    // .css('color', color)
                    .hide()
                    .appendTo(anchor.find('.classic'));
            }
            if(voice.children().length > 0) {
                $('<div>')
                    .addClass('anychat-chat-icon')
                    .addClass('group-title')
                    // .css('background-color', colors[key])
                    .append(
                        $('<p>voice channels</p>').css('position', 'absolute').css('right', '14px').css('top', '35px').css('line-height', '100%').css('font-size', '10pt')
                    )
                    // .append($('<div class="anychat-description">')).text(descriptions[key])
                    // .css('color', color)
                    .hide()
                    .appendTo(anchor.find('.voice'));
            }
            if(messaging.children().length > 0) {
                $('<div>')
                    .addClass('anychat-chat-icon')
                    .addClass('group-title')
                    // .css('background-color', colors[key])
                    .append(
                        $('<p>messaging channels</p>').css('position', 'absolute').css('right', '14px').css('top', '35px').css('line-height', '100%').css('font-size', '10pt')
                    )
                    // .append($('<div class="anychat-description">')).text(descriptions[key])
                    // .css('color', color)
                    .hide()
                    .appendTo(anchor.find('.messaging'));
            }

            // $(messaging.children()[messaging.children().length - 1]).css('padding-top', '24px').prepend(
            //     // $('<div class="channels-group-heading">').append(
            //     //     $('<p>messaging channels</p>').css('position', 'absolute').css('right', '14px').css('top', '0').css('line-height', '100%').css('font-size', '10pt')
            //     // )
            // );
            // $(classic.children()[classic.children().length - 1]).css('padding-top', '24px').prepend(
            //     $('<div class="channels-group-heading">').append(
            //         $('<p>classic channels</p>').css('position', 'absolute').css('right', '14px').css('top', '0').css('line-height', '100%').css('font-size', '10pt')
            //     )
            // );
            // $(voice.children()[voice.children().length - 1]).css('padding-top', '24px').prepend(
            //     $('<div class="channels-group-heading">').append(
            //         $('<p>voice channels</p>').css('position', 'absolute').css('right', '14px').css('top', '0').css('line-height', '100%').css('font-size', '10pt')
            //     )
            // );
            $(chatbot.children()[0]).css('border-top', '1px solid rgba(0, 0, 0, 0.139216)');
            // $(chatbot.children()[0]).css('border-bottom', '1px solid rgba(0, 0, 0, 0.439216)');

            anchor.children().each(function () {
                $($(this).children()[0]).css('border-bottom', '1px solid rgba(0, 0, 0, .44)');
            });

            //Add a more icon
            var more = $('<div>')
                .css('background-color', '#888888')
                .addClass('anychat-chat-icon')
                .attr('data-type', 'more')
                .append(
                    $('<img>')
                    .attr('src', root + 'images/' + 'more' + '.svg')
                    .attr('alt', 'more')
                        .css('transform', 'scale(-1,1)')
                )
                // .append($('<div class="anychat-label">').text('More').css('color', 'white'))
                .hide()
                .click(function() {
                    anchor.find('.anychat-chat-icon').each(function(index, img) {
                        img = $(img);

                        if (index <= numberOfApps - maxIconCount) {
                            if (img.is(':visible')) {
                                img.animate({
                                    'bottom': "",
                                    'right': "",
                                    'opacity': 0
                                }, 'fast', function() {
                                    img.hide();
                                });

                            } else {
                                //Setting
                                var option = {
                                    'opacity': 1,
                                    'bottom': 72 + index % maxIconCount * 52
                                };

                                option[(align == 'left' ? 'left' : 'right')] = 52 + 16 + Math.floor(index / maxIconCount) * 52;
                                option[(align == 'left' ? 'right' : 'left')] = "auto";
                                img.show().animate(option, 'fast');
                            }
                        }
                    });
                });

            if (numberOfApps > maxIconCount) {
                more.appendTo(anchor);
                $(".anychat-label").each(function () {
                    $(this).css('display', 'none');
                })
            }

            // $(window).resize(function() {
            //     maxIconCount = Math.floor((window.innerHeight - 130) / 72);
            //     if (numberOfApps > maxIconCount) {
            //         more.appendTo(anchor);
            //         $(".anychat-label").each(function () {
            //             $(this).css('display', 'none');
            //         })
            //     } else {
            //         more.detach();
            //         $(".anychat-label").each(function () {
            //             $(this).css('display', 'inline-block');
            //         })
            //     }
            //
            //     console.log($(window).width());
            //     if($(window).width() < 980) {
            //         console.log('less');
            //         $('.preview').css('display', 'none');
            //     } else {
            //         $('.preview').css('display', 'block');
            //     }
            // });

            var $w = $(window);

            var launcherCont = {},
                chatIconHeight = 60,
                iconHeight = 50;
            var chatTop = 520,
                chatBottom = 60,
                chatWidth = 290;
            launcherCont.bottom = 10;
            launcherCont.right = 18;

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // if($w.width() < 500) {
                launcherCont.bottom = 0;
                launcherCont.right = 0;
                chatTop = $w.height() - chatIconHeight;
                iconHeight = ($w.height() - chatIconHeight - (chatIconHeight - iconHeight)) / (numberOfApps);
                console.log(numberOfApps);
                chatWidth = $w.width();
                $('.anychat-chat-icon').css('right', 0).css('width', chatWidth).css('height', iconHeight);
                $('.anychat-launcher').css('right', '-=18').css('bottom', '-=10');
            }

            launcher.click(function() {
                $('#anychat-container .anychat-chat-icon').each(function(index, img) {
                    img = $(img);
                    if (launcher.is('.anychat-launcher-active')) {
                        // chatClose();
                        img.animate({
                            'bottom': 20,
                            'right': 16,
                            'opacity': 0
                        }, 'fast', function() {
                            img.css('right', '')
                                .css('bottom', '')
                                .hide();
                        });

                        $('.launcher-container').fadeOut("fast");

                    } else {
                        // if (numberOfApps > maxIconCount) {
                        //     if (index > numberOfApps - maxIconCount) {
                        //         img.show().animate({
                        //             'opacity': 1,
                        //             'bottom': 72 + (maxIconCount - ((numberOfApps - index) % maxIconCount) - 1) * 52
                        //         }, 'fast');
                        //     }
                        // } else {
                            // console.log(launcher.find('.launcher-container'));
                        if(anchor.find('.launcher-container').length === 0) {
                            anchor.append(
                                $('<div class="launcher-container">')
                                    .css('position', 'absolute')
                                    .css('bottom', launcherCont.bottom)
                                    .css('height', '60px')
                                    .css('width', chatWidth)
                                    .css('background', '#FFFFFF')
                                    .css('right', launcherCont.right)
                                    .css('z-index', '-1')
                                    .css('border', 'solid rgba(0, 0, 0, .14)')
                                    .css('border-width', '0 1px 1px')
                                    .append(
                                        $('<a class="add-anychat-link">')
                                            .attr('href', 'http://www.anychat.pro/')
                                            .text('add anychat to your website')
                                    )
                            )
                        } else {
                            $('.launcher-container').fadeIn("fast");
                        }

                        var diffClassic = 0,
                            diffVoice,
                            diffMessaging;
                        var bottomValue = chatIconHeight + index * iconHeight;

                        if( classic.children().length > 0 ) {
                            diffClassic = -chatIconHeight/2;
                        }

                        if( voice.children().length > 0 ) {
                            diffVoice = -chatIconHeight/2 + diffClassic;
                        } else {
                            diffVoice = diffClassic;
                        }
                        if(img.parent().hasClass('voice')) {
                            bottomValue = chatIconHeight + index * iconHeight + diffClassic;
                        }

                        if( messaging.children().length > 0 ) {
                            diffMessaging = -chatIconHeight/2 + diffVoice;

                        } else {
                            diffMessaging = diffVoice;
                        }
                        if(img.parent().hasClass('messaging')) {
                            bottomValue = chatIconHeight + index * iconHeight + diffVoice;
                        }

                        if(img.parent().hasClass('chatbot')) {
                            bottomValue = chatIconHeight + index * iconHeight + diffMessaging;
                        }

                        // if(img.data('type') === "anychat") {
                        //     bottomValue = chatTop;
                        // }

                        img.show().animate({
                            'opacity': 1,
                            'bottom': bottomValue
                        }, 'fast');

                        // if(chatIconHeight + index * iconHeight > chatTop) {
                        //     chatTop = chatIconHeight + index * iconHeight + diffMessaging;
                        // }

                            // anchor.children().each(function () {
                            //     if($($(this).children()[0]).data('type') === img.data('type')) {
                            //         console.log($($(this).children()[0]).data('type'));
                            //         var prev = $(this).prev().children();
                            //         $(prev[prev.length - 1]).animate({
                            //             'bottom': '+=10px'
                            //         });
                            //         console.log($(this).prev().children());
                            //         console.log($(this).next().children());
                            //         console.log(prev[prev.length - 1]);
                            //         img.animate({
                            //             // 'bottom': '+=10px',
                            //             'height': '+=10px',
                            //             'padding-top': '+=10px'
                            //         })
                            //     }
                            // });
                            // if(img.data('type') === $($(anchor.children()[0]).children()[0]).data('type')
                            // || img.data('type') === $($(anchor.children()[1]).children()[0]).data('type')
                            // || img.data('type') === $($(anchor.children()[2]).children()[0]).data('type')
                            // || img.data('type') === $($(anchor.children()[3]).children()[0]).data('type')) {
                            //     console.log($($(anchor.children()[0]).children()[0]).data('type'));
                            // }
                        //     console.log(chatbot.find('.anychat-chat-icon').css('bottom'));
                        // }
                        // anchor.children().each(function () {
                        //     console.log($(this));
                        // });
                    }
                });

                // function getInnerWidth(element) {
                //
                //     var wrapper = document.createElement('span'),
                //         result;
                //
                //     while (element.firstChild) {
                //         wrapper.appendChild(element.firstChild);
                //     }
                //
                //     element.appendChild(wrapper);
                //
                //     result = wrapper.offsetWidth;
                //
                //     element.removeChild(wrapper);
                //
                //     while (wrapper.firstChild) {
                //         element.appendChild(wrapper.firstChild);
                //     }
                //
                //     return result;
                //
                // }

                var chatHeight = (chatTop);

                var messageContainer = $('<div class="message-container">')
                    .css('width', chatWidth)
                    .css('height', ((chatHeight - 60) + 'px'));

                if($('.chat-window').length === 0) {
                    var chatWindow = $('<div class="chat-window">')
                        .css('height', chatHeight)
                        .css('top', '-' +  ((chatBottom - 60 + chatHeight) + 'px'))
                        .css('width', chatWidth)
                        .css('position', 'absolute')
                        .css('right', launcherCont.right)
                        .css('display', 'none')
                        .css('z-index', '10001')
                        .append(messageContainer)
                        .append(
                            $('<div class="bottom">')
                                .css('border', '1px solid rgba(0, 0, 0, 0.139216)')
                                .css('position', 'absolute')
                                .css('bottom', '0')
                                .css('margin', 0)
                                .css('right', '-1px')
                                .css('width', chatWidth)
                                .css('height', '60px')
                                .css('background-color', '#FFFFFF')
                                .append(
                                    $('<input type="text" placeholder="type message">')
                                        .attr('id', 'chatInput')
                                        .addClass('black-placeholder')
                                        .css('background', 'rgb(200, 200, 200)')
                                        .css('height', '30px')
                                        .css('width', '220px')
                                        .css('max-width', '80%')
                                        .css('padding', '0 0.75em')
                                        // .css('color', '#000000')
                                        .css('font-size', '12px')
                                        .css('border-radius', '10px')
                                        .keypress(function(event) {
                                            if (event.which == 13) {
                                                event.preventDefault();
                                                send();
                                            }
                                        })
                                )
                                .append(
                                    $('<a class="send-message">').append(
                                        $('<img>')
                                            .attr('src', root + 'images/send.svg')
                                        )
                                        .css('float', 'right')
                                        .css('border-bottom', 'none')
                                        .click(send)
                                )
                        )
                        .appendTo(chatbot);
                }

                if (!launcher.is('.anychat-launcher-active')) {
                    $.get(settings.tags.event);
                }

                launcher.toggleClass('anychat-launcher-active');
            });
        }

        var chatShow = false,
            anychatIconBottom,
            anychatIcon = $(chatbot.children()[0]);


        function chatWindowShow() {
            $('.chat-window').slideDown("fast").addClass('expanded');

            $('.chat-close').show();
            chatbot.find('.heading').text('our chatbot');
            chatbot.find('.subheading').text('go ahead, ask about our hours, directions or just say hello');
            $("#chatInput").val('').focus();
        }
        function chatWindowClose(callback) {
            $('.chat-window').slideUp("fast", callback).removeClass('expanded');
            $('.chat-close').hide();
            chatbot.find('.heading').text(labels["anychat"]);
            chatbot.find('.subheading').text(descriptions["anychat"]);
        }

        function chatOpen() {
            if(!chatShow) {
                chatShow = true;
                anychatIconBottom = parseInt(anychatIcon.css('bottom'), 10);

                anychatIcon.animate({
                    bottom: chatTop
                }, 150, chatWindowShow);
                // if( anychatIconBottom < chatTop ) {
                //     console.log(chatTop - anychatIconBottom);
                // } else {
                //     chatWindowShow();
                // }
            }
        }

        function chatClose() {
            if(chatShow) {
                chatShow = false;
                chatWindowClose(function () {
                    anychatIcon.animate({
                        bottom: anychatIconBottom
                    }, 150)
                });
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function setResponse(val) {
            var response = JSON.parse(val);
            var message = $('<div class="chat-message bot">');
            console.log(response.result.action);

            switch (response.result.action) {
                case 'input.welcome':
                    var quickContainer = $('<div class="quick-reply-container">'),
                        quickInner = $('<div class="inner">').appendTo(quickContainer),
                        quickBackground = $('<div class="background">').appendTo(quickContainer);
                    var quickIterator = 0,
                        quickScroll = true;

                    $('<div>')
                        .append(
                            $('<div class="chat-message bot">').text("Hi there")
                            // message.text(response.result.fulfillment.speech + " I'm " + settings.answers["BusinessName"] + " chatbot. How can I help you?")

                        )
                        .prependTo($('.chat-window').find('.message-container'));
                    setTimeout(function () {
                        $('<div>')
                            .append(
                                $('<div class="chat-message bot">').text("How can I help you?")
                            )
                            .prependTo($('.chat-window').find('.message-container'));
                    }, 999);
                    setTimeout(function () {
                        quickContainer
                            .prependTo($('.message-container'));
                    }, 999);

                    for(var x in settings.answers) {
                        if(x === "Location" || x === "Hours") {
                           var quickReply = $('<div class="quick-reply">')
                               .text(x)
                               .on("click", function () {
                                   send("quick", $(this));
                               })
                               .appendTo(quickInner);
                        }
                    }
                    $('<div class="quick-reply">')
                        .text("About")
                        .on("click", function () {
                            send("quick", $(this));
                        })
                        .appendTo(quickInner);

                    // $('<a class="btn-prev">')
                    //     .append(
                    //         $('<img>')
                    //             .attr('src', root + 'images/back.svg')
                    //     )
                    //     .on("click", function () {
                    //         var arrQuick = $(this).parent().parent().find($('.quick-reply')),
                    //             firstQuick = $(arrQuick[0]),
                    //             lastQuick = $(arrQuick[arrQuick.length - 1]);
                    //
                    //         if(quickScroll && ((firstQuick.offset().left - parseInt($(this).css('width'), 10)) < $('.message-container').offset().left)) {
                    //             quickScroll = false;
                    //             $(this).parent().parent().animate({
                    //                 'margin-left': '+=' + $(arrQuick[quickIterator]).css('width')
                    //             }, 200, function () {
                    //                 quickScroll = true;
                    //             });
                    //             if(quickIterator > 0) {
                    //                 quickIterator--;
                    //             }
                    //         }
                    //
                    //     })
                    //     .appendTo(quickBackground);
                    // $('<a class="btn-next">')
                    //     .append(
                    //         $('<img>')
                    //             .attr('src', root + 'images/back.svg')
                    //             .css('transform', 'scaleX(-1)')
                    //     )
                    //     .on("click", function () {
                    //         console.log('clicked');
                    //         var arrQuick = $(this).parent().parent().find($('.quick-reply')),
                    //             firstQuick = $(arrQuick[0]),
                    //             lastQuick = $(arrQuick[arrQuick.length - 1]);
                    //         console.log(arrQuick);
                    //
                    //         if(quickScroll && (( lastQuick.offset().left + parseInt(lastQuick.css('width'), 10) + parseInt(lastQuick.css('width'), 10) ) > ( $('.message-container').offset().left + parseInt(chatWidth, 10)
                    //             + parseInt($(this).css('width'), 10) ))) {
                    //             quickScroll = false;
                    //             $(this).parent().parent().animate({
                    //                 'margin-left': '-=' + $(arrQuick[quickIterator]).css('width')
                    //             }, 200, function () {
                    //                 quickScroll = true;
                    //             });
                    //             if(quickIterator < arrQuick.length) {
                    //                 quickIterator++;
                    //             }
                    //         }
                    //     })
                    //     .appendTo(quickBackground);

                    var arrQuickWidth = 0;
                    $('.quick-reply').each(function () {
                        arrQuickWidth += parseInt($(this).css('width'), 10);
                    });
                    if( arrQuickWidth > (parseInt(chatWidth, 10) - 2*parseInt($('.quick-reply-container .btn-next').css('width'), 10)) ) {
                        $('.quick-reply-container .btn-next, .quick-reply-container .btn-prev').each(function () {
                            $(this).css('display', 'block');
                        })
                    }

                    break;
                case 'BusinessName':
                    $('<div>')
                        .append(
                            message.text(settings.answers["BusinessName"])
                        )
                        .prependTo($('.chat-window').find('.message-container'));
                    break;
                case 'Location':
                    $('<div>')
                        .append(
                            $('<div class="chat-message bot">').text("This is our address:")
                        )
                        .prependTo($('.chat-window').find('.message-container'));
                    setTimeout(function () {
                        $('<div>')
                            .append(
                                message.text(settings.answers["Location"])
                            )
                            .prependTo($('.chat-window').find('.message-container'));
                    }, 600);
                    break;
                case 'Hours':
                    $('<div>')
                        .append(
                            $('<div class="chat-message bot">').text("These are our hours:")
                        )
                        .prependTo($('.chat-window').find('.message-container'));
                    setTimeout(function () {
                        $('<div>')
                            .append(
                                message.text(settings.answers["Hours"])
                            )
                            .prependTo($('.chat-window').find('.message-container'));
                    }, 600);
                    break;
                case 'Email':
                    $('<div>')
                        .append(
                            message.text(settings.answers["EMail"])
                        )
                        .prependTo($('.chat-window').find('.message-container'));
                    break;
                case 'Phone':
                    $('<div>')
                        .append(
                            message.text(settings.answers["Phone"])
                        )
                        .prependTo($('.chat-window').find('.message-container'));
                    break;
                case 'About':
                    $('<div>')
                        .append(
                            $('<div class="chat-message bot">').text(aboutPrefixes[getRandomInt(0, 2)])
                        )
                        .prependTo($('.chat-window').find('.message-container'));
                    setTimeout(function () {
                        $('<div>')
                            .append(
                                message.text(aboutOptions[getRandomInt(0, 2)])
                            )
                            .prependTo($('.chat-window').find('.message-container'));
                    }, 600);
                    // message.text(aboutOptions[getRandomInt(0, 2)]).appendTo($('.chat-window').find('.message-container'));
                    break;
                default:
                    if(response.result.fulfillment.speech !== "") {
                        $('<div>')
                            .append(
                                message.text(response.result.fulfillment.speech)
                            )
                            .prependTo($('.chat-window').find('.message-container'));
                    } else {
                        $('<div>')
                            .append(
                                message.text("I'm sorry, but I can't really understand you.")
                            )
                            .prependTo($('.chat-window').find('.message-container'));
                    }
                    break;
            }

            chatScrollBottom();
            // console.log(val);
        }

        function send(param, elem) {
            var text = $("#chatInput").val();
            if(param === "quick") {
                text = elem.text();
            }

            if(text.length && text !== " ") {

                $("#chatInput").val('');
                console.log(text);
                console.log(JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }));
                $.ajax({
                    type: "POST",
                    url: baseUrl + "query?v=20150910",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    },
                    data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),

                    success: function(data) {
                        setResponse(JSON.stringify(data, undefined, 2));
                    },
                    error: function() {
                        setResponse("Internal Server Error");
                    }
                });
                // setResponse("Loading...");

                var message = $('<div class="chat-message user">');
                $('<div>')
                    .append(message.text(text))
                    .prependTo($('.chat-window')
                    .find('.message-container'));

                chatScrollBottom();
            } else {
                $("#chatInput").val('').focus();
            }
            chatScrollBottom();
        }

        function chatScrollBottom() {
            $(".message-container").animate({ scrollTop: $('.message-container').prop("scrollHeight")}, 0);
        }

        $('.chat-close').on("click", function (e) {
            chatClose();
            e.stopImmediatePropagation();
        });

        $('.anychat-chat-icon, .anychat-overlay-chat-icon').each(function(index, icon) {
            var link, qr, app = $(icon);
            var container = $('<div>').addClass('anychat-qr');

            switch (app.data('type')) {
                case 'anychat':
                    $(chatbot.children()[0]).click(chatOpen);
                    break;
                case 'email':
                    link = "mailto:" + settings.apps.email;
                    break;
                case 'sms':
                    link = "sms:" + settings.apps.sms;
                    break;
                case 'phone':
                    if (Mobile) {
                        link = "tel:" + settings.apps.phone;
                    } else {
                        container.css('color', 'white').css('padding', '8px').css('padding-top', '32px');
                        // $('<a class="anychat-close-button"><img src="./images/close.png"/></a>').appendTo(container);
                        $('<a target="_blank" class="anychat-button">').attr('href', "tel://" + settings.apps.phone).text(settings.apps.phone).appendTo(container);
                        qr = true;
                        break;
                    }
                    break;
                case 'messenger':
                    if (iOS) {
                        link = "fb-messenger://user-thread/" + settings.apps.messenger;
                    } else if (Android) {
                        link = "fb-messenger://user/" + settings.apps.messenger;
                    } else if (!Mobile) {
                        link = "https://m.me/" + settings.apps.messenger;
                    }
                    break;
                case 'whatsapp':
                    var name = site.split('.')[0];
                    var card = "BEGIN:VCARD" +
                        "\nVERSION:3.0" +
                        "\nN:" + name +
                        "\nFN:" + name +
                        "\nORG:" + site +
                        "\nTEL;TYPE=WORK,VOICE:" + settings.apps.whatsapp +
                        "\nEND:VCARD";

                    container.css('color', 'white').css('padding', '8px').css('padding-top', '32px').text("1: Add to Contacts");

                    if (Android) {
                        $('<a target="_blank" class="anychat-button">').attr('href', "tel:" + settings.apps.whatsapp).text(settings.apps.whatsapp).appendTo(container);
                    } else  {
                        $('<a target="_blank" class="anychat-button">').attr('rel', 'external').attr('download', name + ".vcf").attr('href', "data:text/directory;base64," + btoa(card)).text(settings.apps.whatsapp).appendTo(container);
                    }

                    $('<br><span>').text('2: Start chat').appendTo(container);

                    if (Mobile) {
                        $('<br><a class="anychat-button" href="whatsapp://send?text=Hi">Open Whatsapp</a>').appendTo(container);
                    } else {
                        $('<br><a class="anychat-button" target="_blank" href="https://web.whatsapp.com">Open Whatsapp</a>').appendTo(container);
                    }

                    qr = true;
                    break;

                // case 'viber':
                //     var name = site.split('.')[0];
                //     var card = "BEGIN:VCARD" +
                //         "\nVERSION:3.0" +
                //         "\nN:" + name +
                //         "\nFN:" + name +
                //         "\nORG:" + site +
                //         "\nTEL;TYPE=WORK,VOICE:" + settings.apps.viber +
                //         "\nEND:VCARD";
                //
                //     container.css('color', 'white').css('padding', '8px').css('padding-top', '32px').text("1: Add to Contacts");
                //
                //     if (Android) {
                //         $('<a target="_blank" class="anychat-button">').attr('href', "viber://tel:" + settings.apps.viber).text(settings.apps.viber).appendTo(container);
                //     } else if (iOS) {
                //         $('<a target="_blank" class="anychat-button">').attr('href', "viber://calls").text(settings.apps.viber).appendTo(container);
                //     } else {
                //         $('<a target="_blank" class="anychat-button">').attr('rel', 'external').attr('download', name + ".vcf").attr('href', "data:text/directory;base64," + btoa(card)).text(settings.apps.viber).appendTo(container);
                //     }
                //
                //     $('<br><span>').text('2: Start chat').appendTo(container);
                //
                //     if (Mobile) {
                //         $('<br><a class="anychat-button" href="viber://forward?text=Hello">Open Viber</a>').appendTo(container);
                //     } else {
                //         $('<br><a class="anychat-button" target="_blank" href="https://viber.com">Viber Website</a>').appendTo(container);
                //     }
                //
                //     qr = true;
                //     break;

                case 'kik':
                    var name = site.split('.')[0];
                    var card = "BEGIN:VCARD" +
                        "\nVERSION:3.0" +
                        "\nN:" + name +
                        "\nFN:" + name +
                        "\nORG:" + site +
                        "\nTEL;TYPE=WORK,VOICE:" + settings.apps.viber +
                        "\nEND:VCARD";

                    container.css('color', 'white').css('padding', '8px').css('padding-top', '32px').text("1: Add User");

                    $('<a class="anychat-block" style="border-color: rgba(255,255,255,0.3)">').text(settings.apps.kik).appendTo(container);
                    $('<br><span>').text('2: Start chat').appendTo(container);

                    if (Mobile) {
                        $('<br><a class="anychat-button">Open Kik</a>').attr('href', 'kik://findpeople/findbyusername/' + settings.apps.kik).appendTo(container);
                    } else {
                        $('<br><a class="anychat-button" target="_blank" href="https://www.kik.com">Kik Website</a>').appendTo(container);
                    }

                    qr = true;
                    break;

                case 'alexa':
                    // container.css('color', 'white').css('padding', '8px').css('padding-top', '32px');
                    // container.css('color', 'white').css('padding', '8px').css('padding-top', '32px').text("Alexa skill ID:");
                    // // $('<a class="anychat-close-button"><img src="./images/close.png"/></a>').appendTo(container);
                    // $('<a target="_blank" class="anychat-button" style="color:white; border-color:#2F80ED;">').attr('href', "http://www.chatbotstudios.co/").text(settings.apps.alexa).appendTo(container);
                    // qr = true;
                    break;

                case 'allo':
                    var name = site.split('.')[0];
                    var card = "BEGIN:VCARD" +
                        "\nVERSION:3.0" +
                        "\nN:" + name +
                        "\nFN:" + name +
                        "\nORG:" + site +
                        "\nTEL;TYPE=WORK,VOICE:" + settings.apps.allo +
                        "\nEND:VCARD";

                    container.css('color', 'white').css('padding', '8px').css('padding-top', '32px').text("1: Add User");

                    $('<a class="anychat-block" style="border-color: rgba(255,255,255,0.3)">').text(settings.apps.allo).appendTo(container);
                    $('<br><span>').text('2: Start chat').appendTo(container);

                    if (Mobile) {
                        $('<br><a class="anychat-button">Open Allo</a>').attr('href', 'allo://' + settings.apps.allo).appendTo(container);
                    } else {
                        $('<br><a class="anychat-button" target="_blank" href="https://allo.google.com/">Allo Website</a>').appendTo(container);
                    }

                    qr = true;
                    break;

                default:
                    break;
            }

            if (qr) {
                app.append(container);
            }

            function qrClose() {
                if (qr) {
                    if (app.is('.anychat-panel')) {
                        app.removeClass('anychat-panel');
                        app.find('.anychat-qr').removeClass('active');
                        app.css('background-color', '#FFFFFF');
                        app.find('img').css('width', '33px').css('height', '33px');
                    }
                }
            }

            $(window).click(function () {
                qrClose();
            });

            app.click(function(event) {
                event.stopPropagation();

                if (qr) {
                    if (app.not('.anychat-panel')) {
                        app.siblings().removeClass('anychat-panel');
                        app.addClass('anychat-panel');
                        app.css('background-color', colors[app.data('type')]);
                        app.find('.anychat-qr').addClass('active');
                        app.find('img').css('width', '50px').css('height', '50px');
                    }
                }

                if (link) {
                    app.siblings().removeClass('anychat-panel');

                    if (Mobile) {
                        window.location = link;
                    } else {
                        var a = $('<a>').attr('target', '_blank').attr('href', link);
                        a.appendTo(anchor)[0].click();
                        a.detach();
                    }
                }
            });

            $('.anychat-chat-icon').each(function () {
                if($(this).attr('data-type') === 'alexa') {
                    $(this).addClass('alexa');
                }
            })

        });

        if( $(window).width() > 980) {
            $('.preview').css('display', 'none');
        }
        window.initializeShopchat = init;
        return true;
    }
})();
