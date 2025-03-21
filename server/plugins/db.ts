import { sequelize } from '~/server/utils/db.instance'
import '~/server/models/User.model'
import '~/server/models/Note.model'

export default defineNitroPlugin(async (nitro) => {
  try {
    // sequelize.sync({ force: true })
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
  } catch (error) {
    console.log(error)
  }
})