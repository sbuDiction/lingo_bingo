module.exports = (pool) => {

    const createAccount = async (account) => {
        const res = await pool.query('select * from users where username = $1', [account.username]);
        if (res.rows.length !== 1) {
            const user = await pool.query('insert into users (firstname, lastname, username, email, password) values ($1, $2, $3, $4, $5) RETURNING *',
                [account.firstName, account.lastName, account.userName, account.email, account.password]);
            return { response: 'Account created', status: true };
        }
        return { response: `Username ${account.userName} already exists`, status: false };
    }
    return {
        createAccount
    }
}