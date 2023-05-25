const express = require("express");
const cors = require('cors')
const app = express();

// const PORT = process.env.PORT || 3001;

// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';

// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 3000;

const cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});


// app.use(cors())
// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
// app.get('/products/:id', function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function () {
//     console.log('CORS-enabled web server listening on port 80')
// })
