const Discord = require('discord.js');
const fs = require('fs');

class Bot {
    constructor(config) {
        if (!config.token) throw new Error('Config must include `token`!');
        if (!config.prefix) config.prefix = '!';
        
        this._config = config;
        this._commands = new Discord.Collection();
        this._aliases = new Discord.Collection();
        this._client = new Discord.Client();
    }
    
    start() {
        this.loadCommands();

        this._client.on('ready', () => {
            this._client.user.setStatus('online');
            console.log('ready');
        });

        this._client.on('message', msg => {
            if (msg.author.bot) return;
            
            // const prefix = this.loadPrefixes(msg.content);
            
            if (msg.content.indexOf(this._config.prefix) !== 0) return;
            const args = msg.content.slice(this._config.prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            
            let cmd;
            if (this._commands.has(command)) {
                cmd = this._commands.get(command);
            } else if (this._aliases.has(command)) {
                cmd = this._commands.get(this._aliases.get(command));
            } else {
                return;
            }
            
            if (!cmd) return;
            
            cmd.run(this, msg, args);
        });

        this._client.login(this._config.token);
        console.log('logged in');
    }
    
    loadPrefixes(messageContent) {
        const prefixes = [this._config.prefix, `<@${this._client.user.id}>`];
        let prefix = null;
        for (const thisPrefix of prefixes) {
            if (messageContent.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
        }
        return prefix;
    }
    
    loadCommands() {
        fs.readdir(`${__dirname}/commands/`, (err, files) => {
            if (err) return console.error(err);
            files.forEach((file) => {
                let commandName = file.split('.')[0];
                if (!file.endsWith('.js')) return console.warn(`${commandName} is not a valid command file. Commands must be stored in either .js or .ts files!`);
                let props = require(`${__dirname}/commands/${file}`);
                console.log(`Attempting to load command ${commandName}`);
                this._commands.set(commandName, props);
                props.help.aliases.forEach(alias => {
                    this._aliases.set(alias, props.help.name);
                });
                console.log(`Successfully loaded command ${commandName}`);
            });
        });
    }
}

module.exports = Bot;