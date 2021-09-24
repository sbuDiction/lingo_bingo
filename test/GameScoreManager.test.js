const { equal, deepEqual, strict } = require('assert');
const pg = require('pg');
const GameScoreManager = require('../server/services/game/GameScoreManager');
const FindAccount = require('../server/services/account/FindAccount');

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL || "postgresql://pgadmin:pg123@localhost:5432/lingo_bingo_db_test";
const pool = new Pool({ connectionString });


describe("Testing the lingo bingo scores functionality", () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM scores');
    });

    it('Should return "Jason Gama" new added game score status', async () => {
        const gameScoreManager = GameScoreManager(pool);
        const findAccount = FindAccount(pool);
        let res = await findAccount.findByUserName('jasonG123');
        const { id } = res.account;
        let account = {
            id: id,
            score: 100
        }
        const score = await gameScoreManager.addScore(account);
        strict.deepEqual(score, { response: 'Score was added', status: true });
    });

    after(() => {
        pool.end();
    });

});