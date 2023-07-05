const client = global.bot;
const settings = require("../configs/settings.json")
const Discord = require("discord.js")
const { CronJob } = require("cron");
const moment = require("moment")
const fetch = require("node-fetch");
module.exports = async () => {
  
let guild = client.guilds.cache.get(settings.guildID);
await guild.members.fetch();  
  
const { joinVoiceChannel } = require("@discordjs/voice");
  
    const VoiceChannel = client.channels.cache.get(settings.voiceChannel);
    if(VoiceChannel) {
    joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true
   })
    }
  setInterval(() => { sesKontrol(); }, 5 * 1000);
    async function sesKontrol()  {
    const member = client.user
    if(!member.voice) {
//!Yapılıcak iş
const { joinVoiceChannel } = require("@discordjs/voice");
    const VoiceChannel = client.channels.cache.get(settings.voiceChannel);
    if(VoiceChannel) {
    joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true
    });
      }
}};
setInterval(() => {
      const oynuyor = settings.botDurum
      const index = Math.floor(Math.random() * (oynuyor.length));
      client.user.setPresence({
                activities: [{
                    name: `${oynuyor[index]}`, 
                    url: "https://www.twitch.tv/darkdays",
                    type: Discord.ActivityType.Streaming
                }],
                });
    }, 10000);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////           
  
};

module.exports.conf = {
  name: Discord.Events.ClientReady
};
