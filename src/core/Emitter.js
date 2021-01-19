export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Notificate listeners if they exist
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  //Add new listener
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('andrey', data => console.log('Sub', data))
// emitter.emit('123123123', 42)
//
// setTimeout( () => {
//   emitter.emit('vladilen', 'After 2 seconds')
// }, 2000)
//
// setTimeout( () => {
//  unsub()
// }, 3000)
//
// setTimeout( () => {
//   emitter.emit('vladilen', 'After 4 seconds')
// }, 4000)
