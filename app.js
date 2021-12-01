const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const libraryRoutes = require('./routes/libraryRoutes');
const authAndGenRoutes = require('./routes/authAndGenRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const onlineTutsRoutes = require('./routes/onlineTutsRoutes');

const cookieParser = require('cookie-parser');
const { requireAuthStudent, requireAuthFaculty, requireAuthAdmin, checkStudent, checkAdmin, checkFaculty } = 
require('./middleware/authMiddleware');


const app = express();

app.use('/public', express.static('public'));

app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');


const dburl = 'mongodb://localhost/uohlht';
mongoose.connect(dburl)
  .then((result) => app.listen(3000, () => {
    console.log("Now listening to port 3000");
  }))
  .catch((err) => console.log(err));

app.get('/', (req, res) =>{
    res.statusCode = 200;
    res.render('index', {qs : req.query});
});

app.get('/student*', checkStudent);

app.get('/student*', requireAuthStudent);

app.get('/faculty*', checkFaculty);
app.get('/faculty*', requireAuthFaculty);

app.get('/admin*', checkAdmin);
app.get('/admin*', requireAuthAdmin);


app.use(authAndGenRoutes);
app.use(libraryRoutes);
app.use(hostelRoutes);
app.use(onlineTutsRoutes);


