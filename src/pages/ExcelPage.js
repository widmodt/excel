import { Excel } from '../components/excel/Excel';
import { Formula } from '../components/formula/Formula';
import { Header } from '../components/header/Header';
import { Table } from '../components/table/Table';
import { Toolbar } from '../components/toolbar/Toolbar';
import { Store } from '../core/createStore';
import { storage, debounce } from '../core/utils';
import { initialState, normalizeInitialState } from '../store/initialState';
import { rootReducer } from '../store/rootReducer'
import { Page } from '../core/Page';

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(storageName(storageName(params)), initialState)
    const store = new Store(rootReducer, initialState)

    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 300) 

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })
    
    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    console.log(this.excel);
    this.excel.destroy()
  }
}