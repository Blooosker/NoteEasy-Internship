import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/server/utils/db.instance'
import { User } from './User.model' 

export class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE', 
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Note' }
)


User.hasMany(Note, { foreignKey: 'userId' }) 
Note.belongsTo(User, { foreignKey: 'userId' })
