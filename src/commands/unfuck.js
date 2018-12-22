const Unfuck = require('../interpreters/unfuck');
const { formatOutput, stripNewlines } = require('../utils');

exports.run = (bot, msg, args) => {
    args = args.join(' ').split('|');
    const source = stripNewlines(args[0].trim());
    const input = args[1] ? args[1].trim() : '';
    const output = new Unfuck(source, input).exec();
    msg.channel.send({
        embed: formatOutput('Unfuck', source, input, output, 0x2F2530)
    });
};

exports.help = {
    name: 'unfuck',
    usage: '<code>[ | <input>]',
    aliases: ['uf', 'unfk']
};