const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./services/user');
const areaRoute = require('./routes/area.router');
const buildingRoute = require('./routes/building.router');
dotenv.config();
const app = express();
mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  });

app.use(express.json());
app.use(cors());
app.use(cookieParser());
//ROUTES

app.use('/v1/auth', authRoute);
app.use('/v1/user', userRoute);
app.use('/v1/area', areaRoute);
app.use('/v1/building', buildingRoute);
// AUTHENTICATION
// AUTHORIZATION

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

//JSON WEB TOKEN
