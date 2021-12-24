const express = require('express');
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '4ccf6fde70e845159dab7c9f818215d4',
        clientSecret: '424f6e2ba53e4199a0d8e8bd0b0f12a2'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400);
    })
})

app.listen(3001)