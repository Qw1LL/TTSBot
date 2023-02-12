const fs = require('fs');
const url = require('node:url');
const {SlashCommandBuilder} = require('discord.js');
const fetch = require('node-fetch');
const config = require("../config.json");
const {
    createAudioResource,
    StreamType,
    createAudioPlayer,
    getVoiceConnection
} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Text to speech')
        .addStringOption(option =>
            option
                .setName('phrase')
                .setDescription('phrase to speech')
                .setRequired(true)),
    async execute(interaction) {
        const phrase = interaction.options.getString('phrase');
        const player = createAudioPlayer();
        const connection = getVoiceConnection(interaction.channel.guild.id);

        const params = new url.URLSearchParams(
            {
                text: phrase,
                lang: 'ru-RU',
                voice: 'filipp'
            }
        );

        fetch('https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize', {
            method: 'post',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Api-Key ' + config.yandex_API_key,
            },
        })
            .then(res => {
                console.log(res);
                let stream = res.body.pipe(fs.createWriteStream('./ttsfiles\\octocat.ogg'));

                stream.on('finish', async () => {
                    let resource = createAudioResource(fs.createReadStream('C:\\Users\\Lenovo\\Desktop\\DiscordTtsBot\\ttsfiles\\octocat.ogg'), {
                        inputType: StreamType.OggOpus,
                    });

                    player.play(resource);

                    const subscription = connection.subscribe(player);

                    await interaction.reply({content: 'say', ephemeral: true});
                    await interaction.deleteReply();

                    if (subscription) {
                        setTimeout(() => subscription.unsubscribe(), 10000);
                    }
                });

            })
            .catch(err => console.error(err));
    }
}