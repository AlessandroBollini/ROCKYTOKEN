const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('NFTWallets', 'bollini', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

class Wallet extends Model { }
Wallet.init({
    address: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    publicKey: {
        type: DataTypes.STRING,
        unique: true
    },
    privateKey: DataTypes.STRING,
    seedPhrase: DataTypes.STRING,
    received: DataTypes.BOOLEAN,
    used:DataTypes.BOOLEAN
}, {
    timestamps: false,
    sequelize
});

(async () => {
    await sequelize.sync({ alter: true });
})();

module.exports.Wallet = Wallet;