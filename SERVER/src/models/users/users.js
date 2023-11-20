const { Sequelize, DataTypes } = require('sequelize');

/* call one file to control 'em all */
const id = require('../../../config_ID');
const config_ID = require('../../../config_ID');

/* call DB Config */
const dbConfig = id.dbConfig;

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    username: dbConfig.user,
    password: dbConfig.password,
    define: {
        freezeTableName: true,
    },
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3,20],
                msg: "Name must be between 3 and 20 chracters"
            },
            isUnique(value) {
                return User.findOne({ where: { name: value } })
                    .then((user) => {
                        if (user) {
                            throw new Error("Username is already in use");
                        }
                    });
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 255], 
                msg: "Password must be between 8 and 255 characters",
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 
                msg: "Password needs at least one lowercase letter, one uppercase letter, and one number",
            },
        },
    },
    password2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // 
            len: {
                args: [8, 255], 
                msg: "Password must be between 8 and 255 characters",
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 
                msg: "Password needs at least one lowercase letter, one uppercase letter, and one number",
            },
        },
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Email address is already in use",
        },
        validate: {
            isEmail: {
                args: true,
                msg: "Please enter a valid email address",
            },
            isUnique(value) {
                return User.findOne({ where: { mail: value } })
                    .then((user) => {
                        if (user) {
                            throw new Error("Email address is already in use");
                        }
                    });
            },
        },
    },
    role_id: {
        type: DataTypes.INTEGER,
    }, 
    },{
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'users'
    });

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
});

User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports =  { sequelize, User, Role};

