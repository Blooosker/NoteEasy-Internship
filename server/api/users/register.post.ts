import { User } from '~/server/models/User.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } : 
  {name: string, email : string, password : string} = body

  const [user, created] = await User.findOrCreate({
    where: {
      email: email,
    },
    defaults: {
      name: name,
      email: email,
      password: password,
    },
  })
  if (created) {
    await user.reload()
    return user
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email already used',
    })
  }
})