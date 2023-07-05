const moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
const Discord = require("discord.js");
const messageGuild = require("../../schemas/messageGuild");
const voiceGuild = require("../../schemas/voiceGuild");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
module.exports = {

    conf: {
      aliases: ["top","topstat"],
      name: "top",
      help: "top"
    },
  
run: async (client, message, args, embed, prefix) => {
const msj = await message.reply({embeds: [embed.setDescription(`${message.guild.name} sunucusuna ait veri sıralaması yükleniyor. Lütfen bekleyin!`)]})
const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
let messageList = messageUsersData
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `❯ [\`${index+1}.\`] <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``)
.join("\n");
const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
let voiceList = voiceUsersData
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `❯ [\`${index+1}.\`] <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``)
.join("\n"); 
const voiceUsersData2 = await voiceUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
let voiceList2 = voiceUsersData2
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `❯ [\`${index+1}.\`] <@${x.userID}>: \`${moment.duration(x.weeklyStat).format("H [saat], m [dakika]")}\``)
.join("\n"); 
const messageUsersData2 = await messageUser.find({ guildID: message.guild.id }).sort({ weeklyStat: -1 });
let messageList2 = messageUsersData2
.filter((x) => message.guild.members.cache.has(x.userID))
.splice(0, 20)
.map((x, index) => `❯ [\`${index+1}.\`] <@${x.userID}>: \`${Number(x.weeklyStat).toLocaleString()} mesaj\``)
.join("\n");   
embed.setDescription(`Aşağıda **${message.guild.name}** sunucusunun <t:${Math.floor(Date.now() / 1000)}> tarihli tüm zamanlar ve haftalık istatistik verilerini görebilirsiniz.

••❯ __**Top 20 Toplam Mesaj Bilgileri:**__

${messageList}

••❯ __**Top 20 Toplam Ses Bilgileri:**__

${voiceList}

••❯ __**Top 20 Haftalık Mesaj Bilgileri:**__

${messageList2}

••❯ __**Top 20 Haftalık Ses Bilgileri:**__

${voiceList2}`)
msj.edit({embeds: [embed]})   
  }
}