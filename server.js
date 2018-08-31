const express = require('express'); //565.6k (gzipped: 165.2k)
const morgan = require('morgan'); // 38.k (gzipped: 12.6K)
const bodyParser = require('body-parser'); // 747.5k (gzipped: 256.1K)

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// letting the app know where to find my template files
app.set('views', './views');

//default engine ejs -- express will require for me
app.set('view engine', 'ejs');

// use res.render to send output of template by filename
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});