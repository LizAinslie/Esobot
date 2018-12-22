const FishExecutor = require('fish-interpreter');
const { formatOutput, stripNewlines, formatErrorOutput } = require('../utils');

exports.run = (bot, msg, args) => {
    const source = stripNewlines(args.join(' '));
    try {
        const executor = new FishExecutor(source);
         
        executor.onUpdate((e) => {
            if (e.hasTerminated) msg.channel.send({
                embed: formatOutput('Fish', source, null, e.output)
            });
        });
        
        executor.run();
    } catch (e) {
        msg.channel.send({
            embed: formatErrorOutput(source, '', e.message)
        });
    }
};

exports.help = {
    name: 'fish',
    usage: '<code>',
    aliases: []
};