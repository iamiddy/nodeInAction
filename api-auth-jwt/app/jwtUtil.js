//jwtUtil.js
module.exports = {
    getSubject: function (token) {
            return token ? token.body.sub : '';
    }
}