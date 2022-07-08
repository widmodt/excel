export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }

  static get param() {
    return ActiveRoute.path.slice(6)
  }

  static navigate(path) {
    window.location.hash = path
  }
}

