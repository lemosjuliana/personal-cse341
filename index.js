const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8082;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
 
const db = require('./models');
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(port, () => {
    console.log(`DB Connected! Server running on ${port}.`);
    });
})
.catch((err) => {
    console.log('Cannot connect', err);
    process.exit();
});