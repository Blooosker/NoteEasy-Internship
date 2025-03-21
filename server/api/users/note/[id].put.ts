import { Note } from '~/server/models/Note.model'

export default defineEventHandler(async (event) => {
  try {
    const noteId = event.context.params?.id
    const body = await readBody(event)

    const note = await Note.findByPk(noteId)
    if (!note) {
      throw createError({ statusCode: 404, statusMessage: 'Note not found' })
    }

    await note.update(body)
    return note
  } catch (error) {
    if (error instanceof Error) {
        return { error: error.message }
      }
      return { error: 'Failed to create note' }
  }
})
