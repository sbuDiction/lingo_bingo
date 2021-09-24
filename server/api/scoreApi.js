module.exports = (gameScoreManager) => {

    const getHighestScores = async (req, res) => {
        const scores = await gameScoreManager.getHighestScores();

        res.json({
            scores: scores,
            userCounter: scores.length,
            status: 200
        });
    }

    return {
        getHighestScores
    }
}