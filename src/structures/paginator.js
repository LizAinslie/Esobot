const { Embeds: EmbedsMode } = require('discord-paginationembed');

export default (msg, title, embeds) => {
    const myImage = msg.author.displayAvatarURL();
    new EmbedsMode()
    .setArray(embeds)
    .setAuthorizedUsers([msg.author.id])
    .setChannel(msg.channel)
    .showPageIndicator(true)
    .setPage(0)
    .setThumbnail(myImage)
    .setTitle(title)
    .setURL(myImage)
    .setColor(0xDD4535)
    .build();
};