const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./DB');
const userRoute = require('./routes/UserRoute');
const budgetRoute = require('./routes/BudgetRoute')
const PORT = process.env.PORT || 5000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



mongoose.connect(config.DB).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();


app.use(static(__dirname + '/dist'));

app.all('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/index.html');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let corsOptions = {
  origin: 'https://safe-woodland-35734.herokuapp.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use('/api/users', userRoute);
// app.use('/api/users', budgetRoute)



app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
