

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
    url: 'https://localhost:4200',
    client: null
};