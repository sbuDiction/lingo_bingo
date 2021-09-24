module.exports = (app, scoreApi) => {
    app.get('/api/users/highscore', scoreApi.getHighestScores);   
}