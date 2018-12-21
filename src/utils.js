exports.formatOutput = (name, input, output, color = null) => {
    return {
        title: name,
        color: color,
        fields: [
            {
                name: ':inbox_tray: | Input',
                value: `\`\`\`${input}\`\`\``
            },
            {
                name: ':outbox_tray: | Output',
                value: `\`\`\`${output}\`\`\``
            }
        ]
    };
};

exports.stripNewlines = str => {
    return str.replace(/\r?\n|\r/g, ' ');
};