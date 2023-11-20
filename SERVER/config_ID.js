

module.exports = {
    // Port for server
    port: 5000,
    // Config DATAbASE
    dbConfig: {
        user: 'postgres',
        password: 'root',
        host: 'localhost',
        port: 5432,
        database: 'newDB',
        dialect: 'postgres',
    },
    client: null
};