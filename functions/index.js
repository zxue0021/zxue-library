const { onRequest } = require('firebase-functions/v2/https')
const {
  onDocumentCreated
} = require('firebase-functions/v2/firestore')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp()

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin
        .firestore()
        .collection('books')

      const snapshot = await booksCollection.get()
      const count = snapshot.size

      res.status(200).json({ count })
    } catch (error) {
      console.error('Error counting books:', error)
      res.status(500).send('Error counting books')
    }
  })
})

exports.capitaliseBook = onDocumentCreated(
  'books/{bookId}',
  async (event) => {
    const snapshot = event.data

    if (!snapshot) {
      return
    }

    const data = snapshot.data()
    const updates = {}

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        updates[key] = value.toUpperCase()
      }
    }

    if (Object.keys(updates).length > 0) {
      await snapshot.ref.update(updates)
    }
  }
)