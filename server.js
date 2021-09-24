const express = require('express');
const { urlencoded, json } = require('body-parser');
const session = require('express-session');
const app = express();

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))
// parse application/json
app.use(json());

app.get('/', (req, res) => {
    res.json({
        state: "App running"
    })
})

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});