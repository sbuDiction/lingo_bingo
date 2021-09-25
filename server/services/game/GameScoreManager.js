module.exports = (pool) => {

    const getHighestScores = async () => {
        const res = await pool.query('select users.firstname, users.lastname, users.username, scores.score from scores inner join users on users.id = scores.users_id order by score desc');
        return res.rows;
    }

    const addScore = async (account) => {
        await pool.query('insert into scores (score, users_id) values ($1, $2)',
            [account.score, account.id]);
        return { response: 'Score was added', status: true };
    }

    const getLeaderBord = async () => {
        const res = await pool.query('select users.firstname, users.lastname, users.username, scores.score from scores inner join users on users.id = scores.users_id order by score desc');
        return res.rows;
    }

    const getScoreHistory = async (account) => {
        const res = await pool.query('select users.firstname, users.lastname, users.username, scores.score from scores inner join users on users.id = scores.users_id where users_id = $1 order by score desc', [account.id]);
        return res.rows;
    }

    return {
        getHighestScores,
        addScore,
        getLeaderBord,
        getScoreHistory
    }
}