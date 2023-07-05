const joinedAt = require("../schemas/voiceJoinedAt");
const voiceUser = require("../schemas/voiceUser");
const voiceGuild = require("../schemas/voiceGuild");
const Discord = require("discord.js");
const a = require("../configs/settings.json")
const client = global.bot;
const ms = require("ms");
const moment = require("moment")
require("moment-duration-format");
module.exports = async (oldState, newState) => {
if ((oldState.member && oldState.member.user.bot) || newState.member && newState.member.user.bot) return;
if (!oldState.channelId && newState.channelId) await joinedAt.updateOne({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
const joinedAtData = (await joinedAt.findOne({ userID: oldState.id }))
? await joinedAt.findOne({ userID: oldState.id })	
: await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true, new: true });
if (!joinedAtData) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
if (!joinedAtData.date) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
const data = Date.now() - joinedAtData.date;

if (oldState.channelId && !newState.channelId) {
await saveDatas(oldState, oldState.channel, data);
await joinedAt.deleteOne({ userID: oldState.id });
} else if (oldState.channelId && newState.channelId) {
await saveDatas(oldState, oldState.channel, data);
await joinedAt.updateOne({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
}  
}
async function saveDatas(user, channel, data) {
await voiceUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data, monthStat: data } }, { upsert: true })
await voiceUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $set: { channels: channel.id} }, { upsert: true })  
await voiceGuild.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data, monthStat: data} }, { upsert: true })
}  
module.exports.conf = {
name: Discord.Events.VoiceStateUpdate,
};