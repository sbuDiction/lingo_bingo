module.exports = (pool) => {

    const findByUserName = async (userName) => {
        const res = await pool.query('select * from users where username = $1', [userName]);
        if (res.rows.length !== 0) {
            return { response: 'Account found', account: res.rows[0], status: true }
        }
        return { response: 'Account not found', status: false }
    }

    return {
        findByUserName
    }
}