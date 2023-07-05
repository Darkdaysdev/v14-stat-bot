const { CronJob } = require("cron");
const client = global.bot;
const Discord = require("discord.js")
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const messageGuild = require("../schemas/messageGuild");
const voiceGuild = require("../schemas/voiceGuild");
const conf = require("../configs/settings.json")
module.exports = () => {

  const daily = new CronJob("0 0 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: conf.guildID }, { $set: { dailyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: conf.guildID }, { $set: { dailyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: conf.guildID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: conf.guildID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: true });
      });
 });
  }, null, true, "Europe/Istanbul");
  daily.start();

  const weekly = new CronJob("0 0 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: conf.guildID }, { $set: { weeklyStat: 0} });
      await voiceGuild.findOneAndUpdate({ guildID: conf.guildID }, { $set: { weeklyStat: 0} });
      await messageUser.findOneAndUpdate({ guildID: conf.guildID, userID: member.user.id }, { $set: { weeklyStat: 0} }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: conf.guildID, userID: member.user.id }, { $set: { weeklyStat: 0} }, { upsert: true });
      });
 });
  }, null, true, "Europe/Istanbul");
  weekly.start();
  const month = new CronJob("0 0 1 * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: conf.guildID }, { $set: { monthStat: 0} });
      await voiceGuild.findOneAndUpdate({ guildID: conf.guildID }, { $set: { monthStat: 0} });
      await messageUser.findOneAndUpdate({ guildID: conf.guildID, userID: member.user.id }, { $set: { monthStat: 0} }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: conf.guildID, userID: member.user.id }, { $set: { monthStat: 0} }, { upsert: true });
        });
 });
  }, null, true, "Europe/Istanbul");
  month.start();
  
};

module.exports.conf = {
  name: Discord.Events.ClientReady,
};