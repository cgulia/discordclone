const axios = require("axios");
const https = require('https');

async function fetchmd(arg, rm) {
    try {
        const { data } = await axios.get(arg[0]);
        const datasplit = data.split(/\r?\n/);
        formatmessage(datasplit, arg, rm);
    } catch (err) {
        console.error(err);
        //rm.channel.send("error message lul");
    }
}

function formatmessage(data, arg, rm) {
    let msgcache = '';
    let delay = 300;
    let promise = Promise.resolve();
    data.forEach(function (d) {
        promise = promise.then(function () {
            if (d[0] == '!') {
                const imagelink = d.split('![]').pop().slice(1,-1);
                rm.channel.send({ files: [imagelink] });
            } else if (d[0] == '|') {
                rm.channel.send(msgcache);
                msgcache = '';
            } else if (d.length == 0) {
                msgcache += '\n';
            } else {
                msgcache += d + '\n';
            }

            return new Promise(function (resolve) {
                setTimeout(resolve, delay);
            });
        });
    });

    promise.then(function () {
        console.log('Loop finished.');
    });
}