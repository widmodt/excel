export class Store {
  constructor(rootReducer, initState = {}) {
    this.state = rootReducer({...initState}, {type: '__INIT__'})
    this.listeners = []
    this.rootReducer = rootReducer
    this.unsubscribe = this.unsubscribe.bind(this)
  }

  subscribe(fn) {
    this.listeners.push(fn)
    return this.unsubscribe(fn)
  }

  unsubscribe(fn) {
    this.listeners = this.listeners.filter(l => l !== fn)
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
  
}