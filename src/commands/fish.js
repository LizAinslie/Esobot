const FishExecutor = require('fish-interpreter');
const { formatOutput, stripNewlines } = require('../utils');

exports.run = (bot, msg, args) => {
    const source = stripNewlines(args.join(' '));
    const executor = new FishExecutor(source);
     
    executor.onUpdate((e) => {
        if (e.hasTerminated) msg.channel.send({
            embed: formatOutput('Fish', source, e.output)
        });
    });
    
    executor.run();
};

exports.help = {
    name: 'fish',
    usage: '<code>',
    aliases: []
};