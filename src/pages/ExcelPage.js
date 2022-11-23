import { Excel } from '../components/excel/Excel';
import { Formula } from '../components/formula/Formula';
import { Header } from '../components/header/Header';
import { Table } from '../components/table/Table';
import { Toolbar } from '../components/toolbar/Toolbar';
import { Store } from '../core/store/createStore';
import { storage, debounce } from '../core/utils';
import { initialState } from '../store/initialState';
import { rootReducer } from '../store/rootReducer'
import { Page } from '../core/Page';

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const param = this.param ? this.param : Date.now().toString()
    const storageId = storageName(param)
    const state = initialState(storageId)
    const opnDate = Date.now()
    const store = new Store(rootReducer, {...state, openedData: opnDate})

    const stateListener = debounce(state => {
      storage(storageId, state)
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
    this.excel.destroy()
  }
}