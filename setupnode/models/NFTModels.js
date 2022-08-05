const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('d5ji12bvim4l88', 'hhevbrrwvawqxx', 'b04b1515b59f8efb0f83a908fd337fd028f315aad2fab8c2a8acd23176ae75ec', {
    host: 'ec2-34-253-119-24.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true, 
          rejectUnauthorized: false
        }
      },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
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
    used: DataTypes.BOOLEAN,
    image:DataTypes.STRING
}, {
    timestamps: false,
    sequelize
});

class Image extends Model { }
Image.init({
    uri: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    used: DataTypes.BOOLEAN
}, {
    timestamps: false,
    sequelize
});

(async () => {
    await sequelize.sync({ alter: true });
})();

module.exports.Wallet = Wallet;
module.exports.Image = Image;