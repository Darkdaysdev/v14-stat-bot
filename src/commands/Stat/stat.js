const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const moment = require("moment");
require("moment-duration-format");
const fetch = require('node-fetch')
const client = global.bot;
moment.locale("tr")
const wait = require('node:timers/promises').setTimeout;
const Discord = require("discord.js");
module.exports = { 
conf: {
aliases: ["me","stat"],
name: "stat",
help: "stat"
},
run: async (client, message, args, embed, prefix) => {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
const msj = await message.reply({embeds: [embed.setDescription(`${message.guild.name} sunucusunda ${member} kullanıcısına ait veriler yükleniyor. Lütfen bekleyin!`)]})    
const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });  
embed.setDescription(`${member.toString()} üyesinin <t:${Math.floor(Date.now() / 1000)}> tarihinden  itibaren **${message.guild.name}** sunucusunda mesaj/ses bilgileri aşağıda belirtilmiştir.

••❯ __**Mesaj Bilgileri:**__

❯ Toplam Mesaj: \`${messageData ? messageData.topStat : 0}\`
❯ Aylık Mesaj: \`${messageData ? messageData.monthStat : 0}\`
❯ Haftalık Mesaj: \`${messageData ? messageData.weeklyStat : 0}\`
❯ Günlük Mesaj: \`${messageData ? messageData.dailyStat : 0}\`
❯ Son Mesaj Yazdığı Kanal: ${messageData ? `<#${messageData.channels}>` : "Bulunamadı."}

••❯ __**Ses Bilgileri:**__

❯ Toplam Ses: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika], s [saniye]")}\`
❯ Aylık Ses: \`${moment.duration(voiceData ? voiceData.monthStat : 0).format("H [saat], m [dakika], s [saniye]")}\`
❯ Haftalık Ses: \`${moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika], s [saniye]")}\`
❯ Günlük Ses: \`${moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika], s [saniye]")}\`
❯ Son Sese Girdiği Kanal: ${voiceData ? `<#${voiceData.channels}>` : "Bulunamadı."}
`)
msj.edit({ embeds: [embed]})
}                                                                         
}