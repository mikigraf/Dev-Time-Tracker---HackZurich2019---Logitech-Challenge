const WebSocket = require('ws');

const serverUrl = 'ws://localhost:9876';

const ws = new WebSocket(serverUrl);

const find = require('find-process');
const ps = require('ps-node');
const cmd = require('node-cmd');

const express = require('express')
const app = express()
const port = 3000

const distractions = ['steam_osx'];

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// distractions.forEach(distraction => {
//     find('name', distraction, true)
//     .then(function (list) {
//         console.log('there are %s chrome process(es)', list.length);
//         console.log(list);
//         list.forEach(process => {
//             cmd.run('kill -9 ' + process.pid);
//             console.log('Killing ' + process.name);
//         })
//     });
// })

let mouse = null;
let keyboard = null;

function getDevices(){
    ws.send(JSON.stringify({
        verb: 'get',
        path: 'devices'
    }));
}

function setupSpying(){
    
}
ws.on('open', () => {
    console.log('Connected to server');
    // Send command to server
    ws.on('message', messageJson => {
        const msg = JSON.parse(messageJson);
        if(msg.path.localeCompare('devices') === 0) {
            console.log('devices path!');
            msg.value.forEach(device => {
                console.log(device);
                if(device.type.localeCompare('keyboard') === 0 && msg.verb.localeCompare('get') == 0){
                    console.log('found keyboard')
                    keyboard = device.unitId
                    ws.send(JSON.stringify(
                        {
                            "verb": "set",
                            "path": "spyConfig",
                            "args":
                            {
                                "value":
                                {
                                    "unitId": keyboard,
                                    "spyButtons": true,
                                    "spyKeys": true,
                                    "spyPointer": false,
                                    "spyThumbWheel": false,
                                    "spyWheel": false,
                                }
                            }
                        }
                    ))
                } else if(device.type.localeCompare('mouse') === 0 && msg.verb.localeCompare('get') == 0){
                    console.log('found mouse')
                    mouse = device.unitId;
                    ws.send(JSON.stringify(
                        {
                            "verb": "set",
                            "path": "spyConfig",
                            "args":
                            {
                                "value":
                                {
                                    "unitId": mouse,
                                    "spyButtons": true,
                                    "spyKeys": false,
                                    "spyPointer": true,
                                    "spyThumbWheel": true,
                                    "spyWheel": true,
                                }
                            }
                        }
                    ))
                }
            });
        } else if(msg.path.localeCompare('spyConfig')) {
            console.log('spyConfig path!');
        }
        // Parse received message
        const message = JSON.parse(messageJson);
        console.log(message);        // console.log(messageJson);
        if(keyboard == null || mouse == null){
            getDevices();
        }
    });
});

ws.on('close', () => {
    console.log('Connection closed');

    // End test case
    done();
});

// ws.on('error', error => {
//     console.log('An error occurred');
//     console.error(error);
// });

// ws.on('message', messageAsJson => {
//     const message = JSON.parse(messageAsJson);
    
//     if(message.verb )
// })