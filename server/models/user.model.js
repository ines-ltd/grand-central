const { DataTypes, Model } = require('sequelize')
const db = require('../db/db')
const bcrypt = require('bcryptjs')

class User extends Model { }

User.init({
  ein: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer',
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set (val) {
      const hash = bcrypt.hashSync(val, 10)
      this.setDataValue('password', hash)
    }
  },
  ouc: {
    type: DataTypes.STRING
  }
}, { sequelize: db })

module.exports = User
