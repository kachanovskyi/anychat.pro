(function() {
    //Load Stylesheet
   var root = 'https://rawgit.com/kachanovskyi/anychat.pro/master/';
   //  var root = './';
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
            align = script.data('align'),
            whitelabel = script.data('whitelabel'),
            colors = {
                anychat: '#783bd2',
                // email: '#2D70E7',
                email: '#da3337',
                sms: '#2F80ED',
                phone: '#0AD02C',
                messenger: '#0084FF',
                viber: '#675CA8',
                kik: '#82BC23',
                whatsapp: '#30BE2D',
                alexa: '#54ABD8',
                allo: '#F5B900'
            };

        settings.apps = JSON.parse(decodeURI(atob(cipher)));

        settings.tags = {
            page: [atob(kga[0]), atob(kga[1]), site, salt].join(''),
            event: [atob(kga[0]), atob(kga[2]), salt].join('')
        };

        settings.color = script.data('color');
        settings.overlay = script.data('overlay');
        var numberOfApps = Object.keys(settings.apps).length;
        if (!Mobile) {
            if (settings.apps.sms) {
                numberOfApps--;
            }
        }

        var maxIconCount = Math.floor((window.innerHeight - 130) / 56);

        var anchor = $('<div>')
            .attr('id', 'anychat-container')
            .appendTo($('body'));

        if (align == 'left') {
            anchor.addClass('left');
        }

        var btnBg = '<?xml version="1.0" encoding="UTF-8"?> <svg width="97px" height="92px" viewBox="0 0 100 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 41 (35326) - http://www.bohemiancoding.com/sketch --> <title>Shape@2x</title> <desc>Created with Sketch.</desc> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Purple" transform="translate(-40.000000, -59.000000)" fill="#783BD2"> <path d="M120.33158,106.506104 C122.536403,118.160168 122.536403,118.475143 112.142238,120.364991 C94.818629,123.514738 77.4950204,122.884788 60.4863865,118.790117 C45.0526262,115.010421 39.6980562,106.821079 40.0130309,88.8675207 C40.3280056,74.3786845 46.9424744,65.8743675 61.7462853,62.4096458 C67.4158299,61.149747 73.0853746,60.5197976 78.7549192,59.8898482 C82.2196409,59.5748735 85.6843626,59.5748735 85.6843626,64.6144687 C85.6843626,69.0241145 85.0544132,72.1738616 79.6998433,72.4888363 C73.715324,73.1187857 67.7308046,74.3786845 62.06126,75.6385833 C54.1868925,77.5284315 52.612019,83.8279255 52.612019,90.7573689 C52.612019,98.0017871 54.5018672,103.986306 62.06126,106.191129 C67.4158299,107.766003 72.7703999,108.710927 78.1249698,109.025902 C85.0544132,109.655851 92.2988313,109.655851 99.2282748,109.025902 C106.472693,109.025902 113.087162,107.766003 120.33158,106.506104 Z M92.613806,71.2289375 C87.9437905,70.2701404 87.9969092,60.9193879 92.613806,60 C97.2307028,59.0806121 116.551883,62.7246205 127.261023,66.5043169 C135.450365,69.3390892 139.860011,76.5835074 139.860011,85.7177737 C140.174986,95.4819895 139.860011,105.246205 139.860011,114.695446 C139.860011,118.790117 138.915087,121.939864 133.875492,121.939864 C128.835897,121.939864 127.261023,118.475143 127.261023,114.065497 L127.261023,92.0172677 C127.261023,80.3632038 123.796301,76.2685327 112.142238,74.0637098 C105.842744,72.803811 97.2838216,72.1877345 92.613806,71.2289375 Z" id="Shape"></path> </g> </g> </svg>';

        var launcher = $('<div>')
            .addClass('anychat-launcher')
            .addClass('anychat-effect')
            .css( 'background-image', 'url(data:image/svg+xml,' + escape(btnBg) + ')')
            .css('background-color', settings.color)
            .css('background-size', '44px')
            .css('background-position', 'center')
            .css('background-repeat',' no-repeat')
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
                    labelText = 'AnyCHAT';
                    anychat = true;
                }

                if(key === 'allo') {
                    labelText = 'Allo/Home';
                }

                if(key === 'sms') {
                    labelText = 'SMS/Text';
                }

                if(anychat) {
                    console.log('AAAAAA');
                    $('<div>')
                        .addClass('anychat-overlay-chat-icon')
                        .attr('data-type', key)
                        .css('background-color', colors[key])
                        .append(
                            $('<a>').attr('href', 'chatbotstudios.co').attr('target', '_blank').append(
                                $('<img>')
                                    .attr('src', root + 'images/' + key + imgType)
                                    .attr('alt', key)
                            )
                        )
                        .append($('<div class="anychat-label">').text(labelText))

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
                        .append($('<div class="anychat-label">').text(labelText))

                        .appendTo(overlayBody);
                }
            });

            launcher.click(function() {
                overlayMask.fadeIn();
            });

        } else {
            $.each(settings.apps, function(key, value) {
                if (Mobile || (key != 'sms')) {
                    var color,
                        anychat = false,
                        imgType  = '.svg',
                        labelText = key.charAt(0).toUpperCase() + key.slice(1);
                    if(key === 'anychat') {
                        color = '#783bd2';
                        labelText = 'AnyCHAT';
                        anychat = true;
                    } else {
                        color = colors[key];
                    }

                    if(key === 'allo') {
                        labelText = 'Allo/Home';
                    }

                    if(anychat) {
                        $('<div>')
                            .addClass('anychat-chat-icon')
                            .attr('data-type', key)
                            .css('background-color', colors[key])
                            .append(
                                $('<a>').attr('href', 'http://www.chatbotstudios.co/').attr('target', '_blank')
                                    .css('border', 'none')
                                    .append(
                                    $('<img>')
                                        .attr('src', root + 'images/' + key + imgType)
                                        .attr('alt', key)
                                )
                            )
                            .append($('<div class="anychat-label">').text(labelText))
                            .css('color', color)
                            .hide()
                            .appendTo(anchor);
                    } else {
                        $('<div>')
                            .addClass('anychat-chat-icon')
                            .attr('data-type', key)
                            .css('background-color', colors[key])
                            .append(
                                $('<img>')
                                    .attr('src', root + 'images/' + key + imgType)
                                    .attr('alt', key)
                            )
                            .append($('<div class="anychat-label">').text(labelText))
                            .css('color', color)
                            .hide()
                            .appendTo(anchor);
                    }
                }
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

            $(window).resize(function() {
                maxIconCount = Math.floor((window.innerHeight - 130) / 72);
                if (numberOfApps > maxIconCount) {
                    more.appendTo(anchor);
                    $(".anychat-label").each(function () {
                        $(this).css('display', 'none');
                    })
                } else {
                    more.detach();
                    $(".anychat-label").each(function () {
                        $(this).css('display', 'inline-block');
                    })
                }

                console.log($(window).width());
                if($(window).width() < 980) {
                    console.log('less');
                    $('.preview').css('display', 'none');
                } else {
                    $('.preview').css('display', 'block');
                }
            });


            launcher.click(function() {
                $('#anychat-container > .anychat-chat-icon').each(function(index, img) {
                    img = $(img);
                    if (launcher.is('.anychat-launcher-active')) {
                        img.animate({
                            'bottom': 20,
                            'right': 16,
                            'opacity': 0
                        }, 'fast', function() {
                            img.css('right', '')
                                .css('bottom', '')
                                .hide();
                        });

                    } else {
                        if (numberOfApps > maxIconCount) {
                            if (index > numberOfApps - maxIconCount) {
                                img.show().animate({
                                    'opacity': 1,
                                    'bottom': 72 + (maxIconCount - ((numberOfApps - index) % maxIconCount) - 1) * 52
                                }, 'fast');
                            }
                        } else {
                            img.show().animate({
                                'opacity': 1,
                                'bottom': 80 + index * 62
                            }, 'fast');
                        }
                    }
                });

                if (!launcher.is('.anychat-launcher-active')) {
                    $.get(settings.tags.event);
                }

                launcher.toggleClass('anychat-launcher-active');
            });
        }

        $('.anychat-chat-icon, .anychat-overlay-chat-icon').each(function(index, icon) {
            var link, qr, app = $(icon);
            var container = $('<div>').addClass('anychat-qr');
            switch (app.data('type')) {
                case 'anychat':
                    console.log('anychat in development');
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

                case 'viber':
                    var name = site.split('.')[0];
                    var card = "BEGIN:VCARD" +
                        "\nVERSION:3.0" +
                        "\nN:" + name +
                        "\nFN:" + name +
                        "\nORG:" + site +
                        "\nTEL;TYPE=WORK,VOICE:" + settings.apps.viber +
                        "\nEND:VCARD";

                    container.css('color', 'white').css('padding', '8px').css('padding-top', '32px').text("1: Add to Contacts");

                    if (Android) {
                        $('<a target="_blank" class="anychat-button">').attr('href', "viber://tel:" + settings.apps.viber).text(settings.apps.viber).appendTo(container);
                    } else if (iOS) {
                        $('<a target="_blank" class="anychat-button">').attr('href', "viber://calls").text(settings.apps.viber).appendTo(container);
                    } else {
                        $('<a target="_blank" class="anychat-button">').attr('rel', 'external').attr('download', name + ".vcf").attr('href', "data:text/directory;base64," + btoa(card)).text(settings.apps.viber).appendTo(container);
                    }

                    $('<br><span>').text('2: Start chat').appendTo(container);

                    if (Mobile) {
                        $('<br><a class="anychat-button" href="viber://forward?text=Hello">Open Viber</a>').appendTo(container);
                    } else {
                        $('<br><a class="anychat-button" target="_blank" href="https://viber.com">Viber Website</a>').appendTo(container);
                    }

                    qr = true;
                    break;

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
                    container.css('color', 'white').css('padding', '8px').css('padding-top', '32px');
                    container.css('color', 'white').css('padding', '8px').css('padding-top', '32px').text("Alexa skill ID:");
                    // $('<a class="anychat-close-button"><img src="./images/close.png"/></a>').appendTo(container);
                    $('<a target="_blank" class="anychat-button" style="color:white; border-color:#2F80ED;">').attr('href', "http://www.chatbotstudios.co/").text(settings.apps.alexa).appendTo(container);
                    qr = true;
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
                    }
                }
            }

            $(window).click(function () {
                qrClose();
            });

            // $('.anychat-close-button').click(function () {
            //     console.log($(this).parent().parent().find('.anychat-qr.active').removeClass('active'));
            //     if (qr) {
            //         if (app.is('.anychat-panel')) {
            //             console.log('qr closed');
            //             $(this).parent().parent().removeClass('anychat-panel');
            //             $(this).parent().parent().find('.anychat-qr').removeClass('active');
            //         }
            //     }
            //     // $(document).find('.anychat-qr').removeClass('active');
            // });

            app.click(function(event) {
                event.stopPropagation();

                if (qr) {
                    if (app.not('.anychat-panel')) {
                        app.siblings().removeClass('anychat-panel');
                        app.addClass('anychat-panel');
                        app.find('.anychat-qr').addClass('active');
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
            $('.preview').css('display', 'block');
        }
        window.initializeShopchat = init;
        return true;
    }
})();
