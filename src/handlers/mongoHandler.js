const mongoose = require("mongoose");
const settings = require("../configs/settings.json");
mongoose.connect(settings.mongoUrl,  {
  useUnifiedTopology: true,
	useNewUrlParser: true
       })
    mongoose.connection.on('connected', () => {
        console.log('[DATABASE] Mongoose başarıyla bağlandı!');
    });

    mongoose.connection.on('err', err => {
        console.error(`[HATA] Mongoose bağlanma hatası: \n${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('[UYARI] Mongoose bağlanamıyor');
    });