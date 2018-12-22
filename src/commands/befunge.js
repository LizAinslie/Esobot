const Befunge = require('befunge93');
const { formatOutput, stripNewlines, formatErrorOutput } = require('../utils');

exports.run = (bot, msg, args) => {
    const input = stripNewlines(args.join(' '));
    try {
        let befunge = new Befunge();
        befunge.run(input).then(output => {
            msg.channel.send({
                embed: formatOutput('Befunge93', input, null, output)
            });
        });
    } catch (e) {
        msg.channel.send({
            embed: formatErrorOutput(input, '', e.message)
        });
    }
};

exports.help = {
    name: 'befunge',
    usage: '<code>',
    aliases: []
};