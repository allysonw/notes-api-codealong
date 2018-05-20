// talks to backend API

class NotesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/notes'
  }

  getNotes() {
    return fetch(this.baseUrl).then(res => res.json())
  }

  createNote(value) {
    const note = { body: value }

    return fetch(this.baseUrl, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({note : note})
    }).then(res => res.json())
  }

  updateNote(value, id) {
    const note = { body: value }

    return fetch(`${this.baseUrl}/${id}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({note : note})
    }).then(res => res.json())
  }
}
