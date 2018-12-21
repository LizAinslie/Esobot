exports.run = (bot, msg) => {
    msg.channel.send(`:ping_pong: | **Latency:** \`${bot._client.ping}ms\``);
};

exports.help = {
    name: 'ping',
    usage: '',
    aliases: []
};