const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('join bot to current channel'),
    async execute(interaction) {
       await joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        });
        await interaction.reply({ content: 'Bot joined', ephemeral: true });
        await interaction.deleteReply();
    }
};