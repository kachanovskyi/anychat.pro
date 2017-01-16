(function() {
    //Load Stylesheet
   // var root = 'https://rawgit.com/kachanovskyi/anychat.pro/master/';
    var root = './';
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
                anychat: 'transparent',
                // email: '#2D70E7',
                email: '#da3337',
                sms: '#2F80ED',
                phone: '#0AD02C',
                messenger: '#0084FF',
                viber: '#675CA8',
                kik: '#82BC23',
                whatsapp: '#30BE2D',
                alexa: '#2F80ED',
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

        var btnBg = '<?xml version="1.0" encoding="UTF-8"?> <svg width="260px" height="266px" viewBox="0 0 445 278" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 41 (35326) - http://www.bohemiancoding.com/sketch --> <title>White</title> <desc>Created with Sketch.</desc> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="White" transform="translate(0.000000, -1.000000)" fill="#FFFFFF"> <g id="Layer_1"> <g id="Group"> <path d="M358.2,207.8 C359.7,220.4 361.7,232.4 362.5,244.5 C363.2,253.8 358.1,260.3 349.2,262.7 C337.1,265.9 324.9,268.6 312.7,270.7 C276.3,277 239.7,279.3 202.8,277.8 C159.2,276 116.2,270.2 74.5,257.4 C53.8,251 35.4,240.5 22.1,222.6 C11.7,208.6 6.2,192.7 3.6,175.7 C-0.4,149.2 -1.1,122.5 4.5,96.2 C13,56.9 38,32.2 75.1,18.9 C98.2,10.6 122.3,7.4 146.4,4.3 C158.6,2.8 170.9,1.5 183.2,1 C196.4,0.5 202.2,6 203.1,19.2 C203.5,25 203.3,30.9 202.4,36.6 C200.4,48.9 194.4,54.4 182,56.4 C162,59.6 141.9,62.6 121.9,66.1 C112.1,67.8 102.3,70 92.7,72.9 C75.7,78 64.8,89.8 60.4,106.8 C54.9,127.6 54.8,148.7 60.6,169.5 C65.6,187.5 77.3,199.5 95,205.4 C118.2,213 142.1,217.6 166.5,218.9 C190.6,220.2 214.8,221.3 238.9,220.7 C277,219.8 315,216.7 352.5,208.9 C353.9,208.4 355.4,208.2 358.2,207.8 Z" id="Shape"></path> <path d="M444.1,171.1 C444.1,196.9 444.1,222.7 444,248.6 C444,251.9 443.5,255.3 442.9,258.5 C441,267.4 435.7,273.2 426.6,275.4 C412.1,278.9 397.8,274.4 392.9,262.8 C389.8,255.4 388.6,246.7 388.4,238.5 C387.9,204.5 388.5,170.5 387.9,136.5 C387.7,125.8 386,114.9 383.1,104.6 C377.6,85.6 362.8,75.7 344.8,69.9 C321.8,62.5 297.9,60.1 274.2,57 C261.8,55.3 249.5,53.6 237.1,51.9 C235.8,51.7 234.5,51.4 233.2,51 C223.3,47.8 217.4,35.5 219.3,21.8 C221,8.8 228.1,0.5 239.5,1.3 C259.5,2.7 279.7,4.2 299.4,8.2 C328.1,14 356.6,21 384.6,29.4 C421.5,40.5 442.8,69.6 444.1,108.2 C444.6,129.1 444,150.1 444.1,171.1 C444,171.1 444.1,171.1 444.1,171.1 Z" id="Shape"></path> <path d="M214,139 L214,76.5 C214,75 213.6,73.2 214.2,72.1 C215.2,70.3 217.2,67.4 218.4,67.6 C220.3,67.8 222.2,70 223.4,71.9 C224.2,73.1 223.8,75.1 223.8,76.8 L223.8,202.2 C223.8,206.2 224.4,211.4 219,211.5 C213.3,211.7 214,206.4 214,202.5 C214,181.3 214,160.1 214,139 Z" id="Shape"></path> <path d="M145.2,152.2 C147.4,161.2 147,161.5 138.5,163.2 C124.2,166 110,165.1 96,161.6 C86,159.1 81.3,153 80.9,142.6 C80.2,125.3 86,118.3 103.3,115.9 C106.4,115.5 109.6,115.2 112.7,114.8 C115.4,114.5 117.5,115.4 117.6,118.4 C117.7,121.3 117.2,124.2 113.5,124.8 C109.1,125.5 104.6,126.2 100.2,127 C93.9,128.2 91.2,131.6 91,138.1 C90.6,146.1 93,150.3 99.5,151.9 C113.3,155.4 127.2,154.6 141.1,152.6 C142.4,152.5 143.7,152.4 145.2,152.2 Z" id="Shape"></path> <path d="M233.2,139.5 C233.2,128.9 233.3,118.2 233.2,107.6 C233.2,103.5 234.1,100.2 238.7,99.6 C242.1,99.2 244.5,102.4 244.5,107.3 L244.5,171.6 C244.5,175.3 243.6,178.3 239.6,179.2 C236.1,180 233.1,176.9 233.1,172.4 C233.1,161.5 233.2,150.5 233.2,139.5 Z" id="Shape"></path> <path d="M283,139.9 C283,150.6 282.9,161.2 283,171.9 C283,175.9 282,179.1 277.5,179.2 C273,179.3 271.8,176.2 271.8,172.1 C271.9,150.5 271.9,128.8 271.8,107.2 C271.8,103.2 272.8,100 277.3,100 C281.8,100 283,103 283,107.1 L283,139.9 Z" id="Shape"></path> <path d="M203,140 L203,172.4 C203,175.9 202.4,179 198.2,179.1 C193.9,179.2 193.2,176 193.2,172.6 L193.2,106.3 C193.2,102.8 194.2,99.6 198.3,99.7 C202.3,99.8 203.1,103 203.1,106.6 C203,117.7 203,128.8 203,140 Z" id="Shape"></path> <path d="M313.2,139.5 C313.2,128.5 313,117.5 313.4,106.6 C313.5,104.3 315.2,101.2 317.1,100 C319.9,98.3 322.9,101.4 323,105.8 C323.1,113.9 323,122.1 323,130.2 L323,172.1 C323,175.7 322.6,179.2 318,179.1 C313.4,179 313.1,175.4 313.1,171.9 C313.2,161.1 313.2,150.3 313.2,139.5 Z" id="Shape"></path> <path d="M161.1,146.8 L161.1,158.8 C161.1,162 160.2,164.5 156.4,164.5 C152.7,164.5 151,162.2 151,158.7 C150.9,153.2 150.9,147.7 150.9,142.3 C150.9,130.9 148.5,127.9 137.3,126 C133.2,125.3 129.1,124.9 125,124.3 C121.8,123.9 120.2,122 120.4,118.9 C120.6,115.5 123.1,114.3 126,114.9 C134.6,116.5 143.3,118 151.7,120.4 C157.8,122.2 160.7,127.5 161,133.8 C161.2,138.1 161,142.5 161.1,146.8 L161.1,146.8 Z" id="Shape"></path> <path d="M303.8,139.8 L303.8,154.8 C303.8,158.5 302.1,161 298.3,161.1 C294.4,161.2 292.6,158.6 292.6,155 C292.5,144.7 292.5,134.3 292.6,124 C292.6,120.3 294.4,117.6 298.2,117.7 C302.1,117.8 304.1,120.3 304,124.3 C303.7,129.5 303.8,134.7 303.8,139.8 Z" id="Shape"></path> <path d="M333.9,138.9 L333.9,124 C333.9,120.5 334.8,117.4 338.9,117.5 C342.6,117.6 343.7,120.4 343.7,123.7 L343.7,154.5 C343.7,157.9 342.9,161.1 338.6,161 C334.4,160.9 333.8,157.7 333.8,154.3 C334,149.1 333.9,144 333.9,138.9 L333.9,138.9 Z" id="Shape"></path> <path d="M263.8,139.3 L263.8,155.2 C263.8,158.6 262.4,161.1 258.6,161 C255,160.9 254,158.2 254,155.1 L254,123.7 C254,120.2 255.3,117.6 259,117.6 C262.8,117.6 263.9,120.5 263.9,123.8 C263.8,129 263.8,134.2 263.8,139.3 Z" id="Shape"></path> <path d="M361.7,139.7 C361.7,142.5 362.3,145.5 361.5,148.1 C360.9,150.2 358.5,151.8 357,153.7 C355.3,152 352.3,150.5 352.1,148.7 C351.4,142.6 351.4,136.4 352,130.3 C352.2,128.5 355.2,126.9 357,125.3 C358.6,127.1 360.9,128.7 361.5,130.9 C362.3,133.6 361.7,136.7 361.7,139.7 Z" id="Shape"></path> <path d="M185,139.8 L185,148.2 C185,151.3 183.4,153.8 180.4,153.4 C178.6,153.1 175.7,150.7 175.6,149 C175,142.6 175,136.1 175.6,129.7 C175.7,128.1 178.9,125.5 180.5,125.6 C182.1,125.7 184.4,128.4 184.8,130.4 C185.6,133.4 185,136.6 185,139.8 Z" id="Shape"></path> </g> </g> </g> </g> </svg>';

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
                var imgType = '.svg';
                var labelText = key.charAt(0).toUpperCase() + key.slice(1);
                if(key === 'anychat') {
                    labelText = 'AnyCHAT';
                }

                if(key === 'allo') {
                    labelText = 'Allo/Home';
                }

                if(key === 'sms') {
                    labelText = 'SMS/Text';
                }

                $('<div>')
                    .addClass('anychat-overlay-chat-icon')
                    .attr('data-type', key)
                    .css('background-color', colors[key])
                    .append(
                        $('<img>')
//                            .attr('srcset', root + 'images/' + key + imgType + '1000w, ' + root + 'images/allo.png')
                            .attr('src', root + 'images/' + key + imgType)
                            .attr('alt', key)
                    )
                    .append($('<div class="anychat-label">').text(labelText))

                    .appendTo(overlayBody);
            });

            launcher.click(function() {
                overlayMask.fadeIn();
            });

        } else {
            $.each(settings.apps, function(key, value) {
                if (Mobile || (key != 'sms')) {
                    var color,
                        imgType  = '.svg',
                        labelText = key.charAt(0).toUpperCase() + key.slice(1);
                    if(key === 'anychat') {
                        color = '#783bd2';
                        labelText = 'AnyCHAT';
                    } else {
                        color = colors[key];
                    }

                    if(key === 'allo') {
                        labelText = 'Allo/Home';
                    }

                    $('<div>')
                        .addClass('anychat-chat-icon')
                        .attr('data-type', key)
                        .css('background-color', colors[key])
                        .append(
                            $('<img>')
//                                .attr('srcset', root + 'images/' + key + imgType + '1000w, ' + root + 'images/allo.png 2000w')
                                .attr('src', root + 'images/' + key + imgType)
                                .attr('alt', key)
                        )
                        .append($('<div class="anychat-label">').text(labelText))
                        .css('color', color)
                        .hide()
                        .appendTo(anchor);
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
                    container.css('color', '#2F80ED').css('padding', '8px').css('padding-top', '32px').text("Alexa skill ID:");
                    // $('<a class="anychat-close-button"><img src="./images/close.png"/></a>').appendTo(container);
                    $('<a target="_blank" class="anychat-button" style="color:#2F80ED; border-color:#2F80ED;">').attr('href', "https://www.alexaskillstore.com/" + settings.apps.alexa).text(settings.apps.alexa).appendTo(container);
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
