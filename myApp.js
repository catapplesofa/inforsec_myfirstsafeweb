const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true,    // Override Gitpod's default HSTS settings
  })
);

app.use(helmet.dnsPrefetchControl());  // performance tradeoff
app.use(helmet.noCache());             // performance tradeoff









































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  helmet.xssFilter()
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🍎 Your app is listening on port ${port}`);
});
