var {expressjwt} = require('express-jwt');
var jwks = require('jwks-rsa');
module.exports= expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-tsvpp07v3bagspkr.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://dev-tsvpp07v3bagspkr.us.auth0.com/api/v2/',
  issuer: 'https://dev-tsvpp07v3bagspkr.us.auth0.com/',
  algorithms: ['RS256']
})
