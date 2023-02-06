const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies Pong!')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to reply')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('message')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const message = interaction.options.getString('message');
        await interaction.reply(`${target} ${message} Pong!`);
    },
};