const app = require('./server.js');
const { config } = require('dotenv');
const mongoose = require('mongoose');

(async () => {
  try {
    config();
    console.log(process.env.DB_CNN);
    await mongoose.connect(process.env.DB_CNN);

    console.log('DB Online');
    app.listen(process.env.PORT, () =>
      console.log(`API listening on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar BD');
  }
})();
