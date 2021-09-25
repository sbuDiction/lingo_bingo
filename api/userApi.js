const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const config = require('../config/config.json');
module.exports = (Account, findAccount) => {

    const signUp = async (req, res) => {
        let { firstName, lastName, userName, email, password } = req.body;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            let userAccount = {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: hash
            };

            let verify = await Account.createAccount(userAccount);
            console.log(verify);
            if (verify.status) {
                res.json({
                    status: 'success',
                    reason: 'Created account'
                });
            } else {
                res.json({
                    status: 'failer',
                    reason: verify.rosponse
                });
            }
        });
    }

    const signIn = async (req, res) => {
        let { userName, password } = req.body;
        const user = await findAccount.findByUserName(userName);
        console.log(user);
        if (user.status) {
            bcrypt.compare(password, user.account.password, async (err, match) => {
                const token = jwt.sign({ username: user.username }, config.secret, { expiresIn: config.tokenLife });
                console.log(match);
                if (match) {
                    res.json({
                        status: 'success',
                        data: 'Token created',
                        token
                    });
                } else {
                    res.json({
                        status: 'failer',
                        data: 'Password incorrect'
                    });
                }
            })

        }

    }

    return {
        signUp,
        signIn
    }
}