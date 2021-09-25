module.exports = (gameScoreManager) => {

    const getHighestScores = async (req, res) => {
        const scores = await gameScoreManager.getHighestScores();

        res.json({
            scores: scores,
            userCounter: scores.length,
            status: 200
        });
    }

    const getLeaderBord = async (req, res) => {
        const leaderBord = await gameScoreManager.getLeaderBord();
        res.json({
            leader_bord: leaderBord,
            status: 'success'
        });
    }

    const getUserHighestScores = async (req, res) => {
        let { userId } = req.body;
        let account = {
            id: userId
        }
        const userHighestScores = await gameScoreManager.getScoreHistory(account);
        res.json({
            scores: userHighestScores,
            status: 'success'
        });
    }

    return {
        getHighestScores,
        getLeaderBord,
        getUserHighestScores
    }
}