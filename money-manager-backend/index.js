require('dotenv').config();
const db = require('./models/index');
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/User');
const transactionRoutes = require('./routes/Transaction');

require('./config/passport/passport');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

db.sequelize.sync({force: true}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is Running at port ${process.env.PORT}`);
  })
});




