const WebSocket = require('ws');

const serverUrl = 'ws://localhost:9876';

const ws = new WebSocket(serverUrl);

const find = require('find-process');
const ps = require('ps-node');
const cmd = require('node-cmd');

const distractions = ['steam_osx'];

distractions.forEach(distraction => {
    find('name', distraction, true)
    .then(function (list) {
        console.log('there are %s chrome process(es)', list.length);
        console.log(list);
        list.forEach(process => {
            cmd.run('kill -9 ' + process.pid);
            console.log('Killing ' + process.name);
        })
    });
})
 
// ws.on('open', () => {
//     console.log('Connected to server');

//     // Send command to server
//     ws.send(JSON.stringify({
//         verb: 'get',
//         path: 'devices'
//     }));
// });

// ws.on('close', () => {
//     console.log('Connection closed');

//     // End test case
//     done();
// });

// ws.on('error', error => {
//     console.log('An error occurred');
//     console.error(error);
// });

// ws.on('message', messageAsJson => {
//     const message = JSON.parse(messageAsJson);
    
//     if(message.verb )
// })