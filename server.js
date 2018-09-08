const express = require('express'); //565.6k (gzipped: 165.2k)
const morgan = require('morgan'); // 38.k (gzipped: 12.6K)
const bodyParser = require('body-parser'); // 747.5k (gzipped: 256.1K)
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
var profile = require('./profile')

// ...
// then define the route that will use your custom router

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/profile', profile)

// letting the app know where to find my template files
app.set('views', './views');

//default engine ejs -- express will require for me
app.set('view engine', 'ejs');

// use res.render to send output of template by filename
app.get('/', (req, res) => {    
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
  });

  app.post('/thanks', (req, res) => {
    const { name, email, message } = req.body;
  
    const msg = {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail.send(msg);
  
    res.render('thanks', { contact: req.body });
  });


app.listen(8080, () => {
console.log('listening at http://localhost:8080');
});