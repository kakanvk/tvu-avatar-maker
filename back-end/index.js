// index.js
const app = require('./app');
const connectDB = require('./config/db');

const port = 3000;

connectDB.sync({ alter: true })
  .then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    // console.error('Unable to connect to the database:', err);
    console.log(`Can not connect to Database`);
  });
