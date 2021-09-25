module.exports = (app, scoreApi, userApi) => {
    // score api endpoints
    app.get('/api/users/highscore', scoreApi.getHighestScores);
    app.get('/api/users/leader-bord', scoreApi.getLeaderBord);
    app.get('/api/score/:userId?', scoreApi.getUserHighestScores);

    // user api endpoints
    app.post('/signup', userApi.signUp);
    app.post('/signin', userApi.signIn);
}