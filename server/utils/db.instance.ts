import { Sequelize } from 'sequelize'

const config = useRuntimeConfig()

export const sequelize = new Sequelize(
  config.dbDatabase,
  config.dbUser,
  config.dbPassword,
  {
		// @ts-ignore
    dialect: config.dbDialect,
    host: config.dbHost,
    logging: true,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      // เวลาอ่านจาก Database
      timezone: '+07:00'
    },
    // เวลาเขียนลง Database
    timezone: '+07:00',
    storage: './database.sqlite',
  }
)

