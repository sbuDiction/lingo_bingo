module.exports = (app, scoreApi, userApi) => {
    // score api endpoints
    app.get('/api/users/highscore', scoreApi.getHighestScores);
    app.get('/api/users/leader-bord', scoreApi.getLeaderBord);
    app.get('/api/score/:userId?', scoreApi.getUserHighestScores);
    app.post('/api/save-score/:userId?', scoreApi.addUserScore);

    // add a post for adding score to user

    // user api endpoints
    app.post('/signup', userApi.signUp);
    app.post('/signin', userApi.signIn);
}