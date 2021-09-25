const { equal, deepEqual, strict } = require('assert');
const pg = require('pg');
const CreateAccount = require('../server/services/account/CreateAccount');

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL || "postgresql://pgadmin:pg123@localhost:5432/lingo_bingo_db_test";
const pool = new Pool({ connectionString });


describe("Testing the lingo bingo create account functionality", () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM users');
    });

    it('Should return that "Jason Gama" was added as new account', async () => {
        const accountInstance = CreateAccount(pool);
        const account = {
            firstName: 'Jason',
            lastName: 'Gama',
            userName: 'jasonG123',
            email: 'jasongama@gmail.com',
            password: "sbu123"
        }
        const res = await accountInstance.createAccount(account);
        equal(res.status, true);
    });

    it('Should return that "Jason & Sibusiso" was added as new accounts', async () => {
        const accountInstance = CreateAccount(pool);
        const jason = {
            firstName: 'Jason',
            lastName: 'Gama',
            userName: 'jasonG123',
            email: 'jasongama@gmail.com',
            password: "sbu123"
        }

        const user1 = await accountInstance.createAccount(jason);

        const sibusiso = {
            firstName: 'Sibusiso',
            lastName: 'Nkosi',
            userName: 'sbunko123',
            email: 'sbudiction@gmail.com',
            password: "sbu123"
        }
        const user2 = await accountInstance.createAccount(sibusiso);
        equal(user1.status, true);
        equal(user2.status, true);
    });

    after(() => {
        pool.end();
    });

});