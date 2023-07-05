const a = require("../configs/settings.json")
const client = global.bot;
const nums = new Map();
const messageUser = require("../schemas/messageUser");
const messageGuild = require("../schemas/messageGuild");
const Discord = require("discord.js");
module.exports = async (message) => {
if (message.author.bot || !message.guild || message.content.startsWith(a.prefix)) return;   
await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1, monthStat: 1 } }, { upsert: true })
await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { channels: message.channel.id} }, { upsert: true })  
await messageGuild.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1, monthStat: 1 } }, { upsert: true })    
};
module.exports.conf = {
  name: Discord.Events.MessageCreate,
};


