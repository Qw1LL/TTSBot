const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exit')
        .setDescription('kick bot from current channel'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.channel.guild.id);
        connection.destroy();
        await interaction.reply({ content: 'Bot quit', ephemeral: true });
        await interaction.deleteReply();
    }
};