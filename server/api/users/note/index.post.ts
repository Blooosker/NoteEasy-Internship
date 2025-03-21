import { Note } from "~/server/models/Note.model"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, topic, note, category } = body

    if (!userId || !topic  || !note || !category) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
    }

    const newNote = await Note.create({ userId, topic, note, category })
    return newNote
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'Failed to create note' }
  }
})
