module.exports = (pool) => {

    const getHighestScores = async () => {
        const res = await pool.query('select users.firstname, users.lastname, users.username, scores.score from scores inner join users on users.id = scores.users_id order by score desc');
        return res.rows;
    }

    const addScore = async (account) => {
        const res = await pool.query('select * from scores where users_id = $1', [account.id]);
        if (res.rows.length !== 1) {
            await pool.query('insert into scores (score, users_id) values ($1, $2)',
                [account.score, account.id]);
            return { response: 'Score was added', status: true };
        }
        await pool.query('update scores set score = $1 where users_id = $2',
            [account.score, account.id]);
        return { response: 'Score was updated', status: true };
    }

    return {
        getHighestScores,
        addScore
    }
}