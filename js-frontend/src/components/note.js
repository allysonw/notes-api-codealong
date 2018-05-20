class Note {
  constructor(noteJSON) {
    this.id = noteJSON.id
    this.body = noteJSON.body
  }

  renderLi() {
    return `<li data-noteId=${this.id}>${this.body}</li>`
  }
}
