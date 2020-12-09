const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./DB');
const userRoute = require('./routes/UserRoute');
const budgetRoute = require('./routes/BudgetRoute')
const PORT = process.env.PORT || 8080;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



mongoose.connect(config.DB).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();
const path = require('path');


// Serve static files....
app.use(express.static( './pb-final'));

// // Send all requests to index.html
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/dist/pb-final/index.html'));
// });



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pb-final/index.html"));
});

app.use(cors())
app.use('/api/users', userRoute);




app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
