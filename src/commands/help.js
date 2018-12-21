const { RichEmbed } = require('discord.js');
// const paginator = require('../structures/paginator');

// let embeds = [];

exports.run = (bot, msg, args) => {
    const page1 = new RichEmbed()
        .addField('Befunge', `**Usage:** \`${bot._config.prefix} befunge <code>\`
**TIP:** Only use the befunge93 dialect 
__[On Esolang](https://esolangs.org/wiki/Befunge)__`)
        .addField('Fish', `**Usage:** \`${bot._config.prefix} fish <code>\`
__[On Esolang](https://esolangs.org/wiki/Fish)__`)
        .addField('Brainfuck', `**Usage:** \`${bot._config.prefix} brainfuck <code>[ | <input>]\`
**I'm working on my own interpreter, so this is in progress**
__[On Esolang](https://esolangs.org/wiki/Brainfuck)__`)
        .addField('Unfuck', `**Usage:** \`${bot._config.prefix} unfuck <code>[ | <input>]\`
__[On Esolang](https://esolangs.org/wiki/Unfuck)__`)
        .addField('Help', `**Usage:** \`${bot._config.prefix} help\``);
    // embeds.push(page1);
    // paginator(msg, 'help', embeds);
    
    msg.channel.send(page1);
};

exports.help = {
    name: 'help',
    usage: '',
    aliases: ['cmds', 'commands', 'halp']
};