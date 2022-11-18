export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!Object.is(
            JSON.stringify(this.prevState[key]),JSON.stringify(state[key])
          )) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChanged(changes)
            }
          })
        }
      })
      this.prevState = this.store.getState()

      if (process.env.NODE_ENV === 'development') {
        window['redux'] = this.prevState
      }
    })
  }

  unsubscribeFromStore() {
    this.sub()
  }
}