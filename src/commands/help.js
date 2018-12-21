const { RichEmbed } = require('discord.js');
// const paginator = require('../structures/paginator');

// let embeds = [];

exports.run = (bot, msg, args) => {
    const page1 = new RichEmbed()
        .addField('Befunge', `
        **Usage:** \`${bot._config.prefix} befunge <code>\``)
        .addField('Fish', `
        **Usage:** \`${bot._config.prefix} fish <code>\``)
        .addField('Brainfuck', `
        **Usage:** \`${bot._config.prefix} brainfuck <code>[ | <input>]\``)
        .addField('Help', `
        **Usage:** \`${bot._config.prefix} help\``);
    // embeds.push(page1);
    // paginator(msg, 'help', embeds);
    
    msg.channel.send(page1);
};

exports.help = {
    name: 'help',
    usage: '',
    aliases: ['cmds', 'commands', 'halp']
};