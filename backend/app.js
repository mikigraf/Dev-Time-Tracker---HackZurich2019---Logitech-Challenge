const WebSocket = require('ws');

const serverUrl = 'ws://localhost:9876';

const ws = new WebSocket(serverUrl);

const find = require('find-process');
const ps = require('ps-node');
const cmd = require('node-cmd');

const vkey = require('vkey');

const express = require('express')
const app = express()
const port = 3000

const distractions = ['steam_osx'];

let ratio = 0;
let keywordWords = 0;
let normalWords = 0;

let startTime = null;
let endTime = null;

let clockedTimes = [];

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

ws.on('open', () => {
    console.log('Connected to server');

    let words = [];
    let currentWord = '';
    // Send command to server
    ws.on('message', messageJson => {
        const msg = JSON.parse(messageJson);
        // handle devices
        if(msg.path.localeCompare('devices') === 0) {
            msg.value.forEach(device => {
                if(device.type.localeCompare('keyboard') === 0 && msg.verb.localeCompare('get') === 0){
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
                } else if(device.type.localeCompare('mouse') === 0 && msg.verb.localeCompare('get') === 0){
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
        } else if(msg.path.localeCompare('key') === 0) {
            // either space bar (49) or ; (41) are pressed meaning end of statement or word
            if(isKeyPressed(msg, '49') || isKeyPressed(msg, '41')) {
                console.log('space pressed!');
            } else {
                if(getVkeyMapping(msg.value.vkey) !== null) {
                    const letter = getVkeyMapping(msg.value.vkey);
                    if(letter.localeCompare('space') === 0 || letter.localeCompare('enter') === 0) {
                        if(isKeyword(currentWord)) {
                            console.log('is keyword')
                            keywordWords = keywordWords + 1;
                        } else {
                            normalWords = normalWords + 1;
                        }
                        ratio = keywordWords / (keywordWords + normalWords);

                        if(ratio < 0.45) {
                            endTime = new Date();
                            let t = ((endTime - startTime) / 60000);
                            clockedTimes.push(parseFloat(t).toFixed(2));
                            console.log('Clocked: ' + parseFloat(t).toFixed(2) + ' minutes')
                        } else {
                            if(startTime == null) {
                                startTime = new Date();
                            }
                        }
                        console.log('normalWords: ' + normalWords + ':' + keywordWords + ' keywordWords, ration: ' + ratio )
                        currentWord = '';
                    } else { 
                        if(msg.value.pressed) {
                            currentWord = currentWord + letter;
                        }
                    }
                }
            }
        }
        // Parse received message
        // const message = JSON.parse(messageJson);
        // console.log(message);


        if(keyboard == null || mouse == null){
            getDevices();
        }
    });
});

function isKeyPressed(msg, vkeyCode) {
    // console.log(vkey[parsedMsg.value.vkey]);
    if(msg.value.vkey.toString().localeCompare(vkeyCode) === 0 && msg.value.pressed){
         return true;
    } else {
         return false;
    }
}

function getVkeyMapping(vkeyCode) {
    try {
        return mappings[vkeyCode].toLowerCase();
    } catch (err) {
        return null;
    }
}
const mappings = [
    'A', // 0
    'S', // 1r
    'D', // 2
    'F', // 3
    'H', // 4
    'G', // 5
    'Z', // 6
    'X', // 7
    'C', // 8
    'V', // 10
    'V', // 9
    'B', // 11
    'Q', // 12
    'W', // 13
    'E', // 14
    'R', // 15
    'Y', // 16
    'T', // 17
    '1', // 18
    '2', // 19
    '3', // 20
    '4', // 21
    '6', // 22
    '5', // 23
    '=', // 24
    '9', // 25
    '7', // 26
    '-', // 27
    '8', // 28
    '0', // 29
    ']', // 30
    'o', // 31
    'u', // 32
    '[', // 33
    'i', // 34
    'p', // 35
    'enter', // 36
    'l', // 37
    'j', // 38
    ',', // 39
    'k', // 40
    ';', // 41
    '\\', // 42
    ',', // 43
    '/', // 44
    'n', // 45
    'm', // 46
    '.', // 47
    'tab', // 48
    'space' // 49
]

const keywords = [
    'abstract',
    'break', 
    'char',
    'debugger',
    'double',
    'export',
    'finally',
    'goto',
    'in',
    'let',
    'null',
    'public',
    'super',
    'throw',
    'try',
    'volatile',
    'arguments',
    'byte',
    'class',
    'default',
    'else',
    'extends',
    'float',
    'if',
    'instanceof',
    'long',
    'package',
    'return',
    'switch',
    'throws',
    'typeof',
    'while',
    'await',
    'case',
    'const',
    'delete',
    'enum',
    'false',
    'for',
    'implements',
    'int',
    'native',
    'private',
    'short',
    'synchronized',
    'transient',
    'var',
    'with',
    'boolean',
    'catch',
    'continue',
    'do',
    'eval',
    'final',
    'function',
    'import',
    'interface',
    'new',
    'protected',
    'static',
    'this',
    'true',
    'void',
    'yield'
]

function isKeyword(word){
    if(keywords.includes(word.toLowerCase())){
        return true;
    } else {
        return false;
    }
}
ws.on('close', () => {
    console.log('Connection closed');
    keyboard = null;
    mouse = null;
});

// ws.on('error', error => {
//     console.log('An error occurred');
//     console.error(error);
// });

// ws.on('message', messageAsJson => {
//     const message = JSON.parse(messageAsJson);
    
//     if(message.verb )
// })