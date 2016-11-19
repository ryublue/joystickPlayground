
            // create joystick
            (function createJoystick () {
                joystick = nipplejs.create({
                    zone: $('.zone')[0],
                    color: 'blue',
                    mode: 'static',
                    position: {left: '70%', top: '50%'},
                    multitouch: true
                });
                bindJoystick();
            })();

            function bindJoystick () {
                joystick.on('start', function (evt, data) {
                    debug(data);
                }).on('move', function (evt, data) {
                    debug(data);
                    joystickData = data;
                }).on('end', function (evt, data) {
                    joystickData = null;
                });
            }

            // Get debug elements and map them
            var elDebug = $('#debug')[0];
            var els = {
                position: {
                    x: elDebug.querySelector('.position .x .data'),
                    y: elDebug.querySelector('.position .y .data')
                },
                force: elDebug.querySelector('.force .data'),
                pressure: elDebug.querySelector('.pressure .data'),
                distance: elDebug.querySelector('.distance .data'),
                angle: {
                    radian: elDebug.querySelector('.angle .radian .data'),
                    degree: elDebug.querySelector('.angle .degree .data')
                },
                direction: {
                    x: elDebug.querySelector('.direction .x .data'),
                    y: elDebug.querySelector('.direction .y .data'),
                    angle: elDebug.querySelector('.direction .angle .data')
                }
            };


            // Print data into elements
            function debug (obj) {

                function parseObj(sub, el) {
                    for (var i in sub) {
                        if (typeof sub[i] === 'object' && el) {
                            parseObj(sub[i], el[i]);
                        } else if (el && el[i]) {
                            el[i].innerHTML = sub[i].toFixed(0);
                        }
                    }
                }
                setTimeout(function () {
                    parseObj(obj, els);
                }, 0);
            }
