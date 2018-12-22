const Brainfuck = require('../interpreters/brainfuck');
const { formatOutput, stripNewlines } = require('../utils');

exports.run = (bot, msg, args) => {
    args = args.join(' ').split('|');
    const source = stripNewlines(args[0].trim());
    const input = args[1] ? args[1].trim() : '';
    const output = new Brainfuck(source, input).exec();
    msg.channel.send({
        embed: formatOutput('Brainfuck', source, input, output, 0x2F2530)
    });
};

exports.help = {
    name: 'brainfuck',
    usage: '<code>[ | <input>]',
    aliases: ['bf', 'brainfk']
};