// config.exports
module.exports = {
    'secret': 'someverysecretkey',
    'databaseUrl': 'mongodb://nodeuser:nodepwd@localhost:27017/node-users'
};

// secret: used when we create and verify JSON Web Tokens
// database: the URI with username and password to your MongoDB installation