exports.formatOutput = (name, source, input, output, color = null) => {
    let embed = {
        title: name,
        color: color,
        fields: [
            {
                name: ':inbox_tray: | Code',
                value: `\`\`\`${source}\`\`\``
            },
            {
                name: ':outbox_tray: | Output',
                value: `\`\`\`${output}\`\`\``
            }
        ]
    };
    
    if (input.length > 0) {
        embed.fields[2] = embed.fields[1];
        embed.fields[1] = {
            name: ':notepad_spiral: | Input',
            value: `\`\`\`${input}\`\`\``
        };
    }
    
    return embed;
};

exports.formatErrorOutput = (source, input, output) => {
    let embed = {
        title: 'There was an error!',
        color: 0xdd4535,
        fields: [
            {
                name: ':inbox_tray: | Code',
                value: `\`\`\`${source}\`\`\``
            },
            {
                name: ':warning: | Error',
                value: `\`\`\`${output}\`\`\``
            }
        ]
    };
    
    if (input.length > 0) {
        embed.fields[2] = embed.fields[1];
        embed.fields[1] = {
            name: ':notepad_spiral: | Input',
            value: `\`\`\`${input}\`\`\``
        };
    }
    
    return embed;
};

exports.stripNewlines = str => {
    return str.replace(/\r?\n|\r/g, ' ');
};

exports.chr = code => {
    let b = new Buffer(1);
    b[0] = code;
    return b.toString();
};