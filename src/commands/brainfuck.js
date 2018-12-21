var brainfuck  = require('brainfuck');
const { formatOutput, stripNewlines } = require('../utils');

exports.run = (bot, msg, args) => {
    const input = stripNewlines(args.join(' '));
    brainfuck.exec(input, function(err, output) {
        if (err) throw err;
        msg.channel.send({
            embed: formatOutput('Brainfuck', input, output, 0x2F2530)
        });
    });
};