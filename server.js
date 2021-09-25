const express = require('express');
const { urlencoded, json } = require('body-parser');
const app = express();
const pg = require('pg');
const Pool = pg.Pool;
const GameScoreManager = require('./server/services/game/GameScoreManager');
const ScoreApi = require('./api/scoreApi');
const GameRoutes = require('./routes/Lingo-Bingo-Routes');
const UserApi = require('./api/userApi');
const CreateAccount = require('./server/services/account/CreateAccount');
const FindAccount = require('./server/services/account/FindAccount');

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || "postgresql://pgadmin:pg123@localhost:5432/lingo_bingo_db";
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

// { rejectUnauthorized: false }
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))
// parse application/json
app.use(json());

app.get('/', (req, res) => {
    res.json({
        state: "App running"
    })
});

const createAccount = CreateAccount(pool);
const findAccount = FindAccount(pool);
const gameScoreManager = GameScoreManager(pool);
const scoreApi = ScoreApi(gameScoreManager);
const userApi = UserApi(createAccount, findAccount);
GameRoutes(app, scoreApi, userApi);

const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});