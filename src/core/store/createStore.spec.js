import { Store } from './createStore'

const  initialState = {
  count: 0
}

const reducer = (state, action) => {
  switch (action.type){
    case '__INIT__':
      return state
    case 'ADD':
      return {...state, count: state.count + 1}
    default:
      return state
  } 
}
console.log(typeof reducer);

describe('Store', () => {
  let store
  let handler

  beforeEach(() => {
    store = new Store(reducer, initialState)
    handler = jest.fn()
  })

  test('should return store object', () => {
    expect(store.state).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).toBeDefined()
  })

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should return state + 1', () => {
    store.dispatch({type:'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('should return not changed state count', () => {
    store.dispatch({type:'NOT_EXISTING_ACION'})
    expect(store.getState().count).toBe(0)
  })

  test('should call subscriber function', () => {
    store.subscribe(handler)
    store.dispatch({type:'ADD'})

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('should return call sub if unsubed', () => {
    const unsub = store.subscribe(handler)
    unsub()
    store.dispatch({type:'ADD'})

    expect(handler).not.toHaveBeenCalled()
  })
})