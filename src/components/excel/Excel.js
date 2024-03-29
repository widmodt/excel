import { $ } from "@core/dom"
import { Emitter } from "@core/Emitter";
import { StoreSubscriber } from "../../core/StoreSubscriber";
import { preventDefault } from "../../core/utils";

export class Excel {
  constructor(options) {
    this.store = options.store
    this.components = options.components || []
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div','excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const elem = $.create('div',Component.className);
      const component = new Component(elem, componentOptions)
      elem.html(component.toHTML())
      $root.append(elem)
      return component
    })
    return $root
  }

  init() {
    if (process.env.NODE_ENV == 'producion') {
    document.addEventListener('contextmenu', preventDefault)
    }
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => {
      component.init()
    });
  }
    
  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => 
      component.destroy())
    document.removeEventListener('contextmenu', preventDefault);
    }
}