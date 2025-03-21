import { Note } from '~/server/models/Note.model'

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.params?.userId
    console.log(userId)
    if (!userId) {
      throw createError({ statusCode: 400, statusMessage: 'User ID is required' })
    }

    const notes = await Note.findAll({ where: { userId }, order: [['createdAt', 'DESC']] })
    return notes
  } catch (error) {
    if (error instanceof Error) {
        return { error: error.message }
      }
      return { error: 'Failed to fetch notes' }
  }
})

