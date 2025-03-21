import { User } from '~/server/models/User.model'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const { email, password } = body

  const user = await User.findOne({
    where: { email }
  })

  if (user === null) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  } 

  if (! user.checkPassword(password)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid password',
    })
  }

  return user

})

