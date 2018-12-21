const Befunge = require('befunge93');
const { formatOutput, stripNewlines } = require('../utils');

exports.run = (bot, msg, args) => {
    const input = stripNewlines(args.join(' '));
    let befunge = new Befunge();
    befunge.run(input).then(output => {
        msg.channel.send({
            embed: formatOutput('Befunge93', input, output)
        });
    });
};

exports.help = {
    name: 'befunge',
    usage: '<code>',
    aliases: []
};