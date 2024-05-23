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

const Product = sequelize.define('Product', {
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
                args: [3,50],
                msg: "Name product must be between 3 and 50 chracters"
            },
            isUnique(value) {
                return Product.findOne({ where: { name: value } })
                    .then((product) => {
                        if (product) {
                            throw new Error("Product's name is already in use");
                        }
                    });
            },
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3,2000],
            msg: "Name product must be between 3 and 2000 characters"
            }
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: "Price muyst be a decimal number"
            },
            min: {
                args: [0],
                msg: "Price must be positive number"
            }
        }
    },
    // image: {
    //     type: DataTypes.BLOB,
    //     allowNull: true,
    // }
    },{
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'products'
    });

    module.exports =  { sequelize, Product};