const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials, Events } = require("discord.js");
const client = global.bot = new Client({
    intents: Object.keys(GatewayIntentBits).filter(f => isNaN(Number(f))).map(m => GatewayIntentBits[m]),
    partials: Object.keys(Partials).filter(f => isNaN(Number(f))).map(m => Partials[m])
});
const settings = require("./src/configs/settings.json")
const fs = require("fs")
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.invites = new Discord.Collection();
client.cooldown = new Map();

require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});

client
  .login(settings.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

 process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(0);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
      });

client.on("error", (e) => {
console.log(`Hata: `+e)
});