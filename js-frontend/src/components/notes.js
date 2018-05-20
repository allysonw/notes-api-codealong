class Notes {
  // meat of program goes here
  // Notes is container that holds all the notes
  constructor() {
    this.notes = [];
    this.adapter = new NotesAdapter();
    this.initBindingsAndEventEventListeners();
    this.fetchAndLoadNotes();
  }

  fetchAndLoadNotes() {
    this.adapter.getNotes()
    .then(notes => {
      notes.sort((a, b) => a.id - b.id).forEach(note => {
        let noteObject = new Note(note)
        this.notes.push(noteObject)
      })
    })
    .then(() => {
      this.render()
    })
  }

  initBindingsAndEventEventListeners() {
    this.notesContainer = document.getElementById('notes-container')
    this.body = document.querySelector('body')
    this.newNoteBody = document.getElementById('new-note-body')
    this.noteForm =  document.getElementById('new-note-form')
    this.noteForm.addEventListener('submit', this.createNote.bind(this))
    this.notesContainer.addEventListener('dblclick', this.handleNoteClick.bind(this))
    this.body.addEventListener('blur', this.updateNote.bind(this), true)
  }

  updateNote(e) {
    const li = e.target

    li.contentEditable = false
    li.classList.remove("editable")

    const newValue = li.innerHTML
    const id = li.dataset.noteid

    this.adapter.updateNote(newValue, id)
  }

  handleNoteClick(e) {
    this.toggleNote(e)
  }

  toggleNote(e) {
    const li = e.target
    li.contentEditable = true
    li.focus()
    li.classList.add("editable")
  }

  createNote(e) {
    e.preventDefault();
    const value = this.newNoteBody.value

    this.adapter.createNote(value).then(note => {
      this.notes.push(new Note(note))
      this.newNoteBody.value = ''
      this.render()
    })
  }

  render() {
    const notesArray = this.notes.map(note => note.renderLi()).join('')
    this.notesContainer.innerHTML = notesArray
   }

}
