const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON body
app.use(bodyParser.json());

// Middleware for CORS
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', productRoutes);

// Synchronize with database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
