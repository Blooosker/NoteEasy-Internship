import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/server/utils/db.instance'
import bcrypt from 'bcrypt'

export class User extends Model {
  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.getDataValue('password'))
  }

  toJSON() {
    var values = Object.assign({}, this.get())
    delete values.password
    return values
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      async set(value: string) {
        const salt = await bcrypt.genSaltSync(10, 'a')
        this.setDataValue('password', bcrypt.hashSync(value, salt))
      },
    },
  },
  { sequelize, modelName: 'User' }
)
