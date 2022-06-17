export class Store {
  constructor(rootReducer, initState = {}) {
    this.state = rootReducer({...initState}, {type: '__INIT__'})
    this.listeners = []
    this.rootReducer = rootReducer
  }
    
  subscribe(fn) {
    this.listeners.push(fn)
    return {
      unsubscribe () {
        this.listeners = this.listeners.filter(l => l !== fn)
      }
    }
  }

  dispatch(action) {
    this.rootReducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }

  getState() {
    return state
  }
  
}