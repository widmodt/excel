import { capitalize } from "./utils";
export class DomListener {
  constructor($root, listeners = []) {
    // if (!$root) {
    //     throw new Error(`No $root provided for DomListener`)
    // }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`
        );
      }
      this[method] = this[method].bind(this) // for remove Listener
      this.$root.on(listener, this[method]); // same as addEventListener
    });
  }

  removeDOMListeners(name) {
    const method = getMethodName(name);
    this.$root.off(name, this[method]); // same as removeEventListener
  }
}

function getMethodName(eventname) {
  return `on` + capitalize(eventname);
}
