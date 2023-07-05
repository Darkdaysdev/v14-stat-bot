const Discord = require("discord.js");
const client = global.bot;
const ayar = require("../configs/settings.json");
module.exports = function (client) {

Discord.Collection.prototype.array = function () {
    return [...this.values()]
  }
 Array.prototype.random = function() {
    return this[(Math.floor(Math.random()*this.length))];
  };  
  Discord.Guild.prototype.emojiGöster = function(content) {
    let emoji = client.emojis.cache.find(e => e.name === content) || client.emojis.cache.find(e => e.id === content) || client.emojis.cache.find(e => e.id === content) || client.emojis.cache.find(e => e.name === content)
    if(!emoji) return;
    return emoji;
}
  Discord.Guild.prototype.kanalBul = function(content) {
    let kanal = client.channels.cache.find(e => e.name === content) || client.channels.cache.find(e => e.id === content) || client.channels.cache.find(e => e.id === content) || client.channels.cache.find(e => e.name === content)
    if(!kanal) return;
    return kanal;
}
  
  Promise.prototype.sil = function (time) {
    if (this) this.then(s => {
        if (s.deletable) {
            setTimeout(async () => {
                s.delete().catch(e => { });
            }, time * 1000)
        }
    });
};
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };
};