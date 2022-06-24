class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === "string") {
      this.$el.textContent = text.trim()
      return this
    } 
    return this.$el.textContent.trim()
  }

  clear() {
    this.html("");
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  css(styles = {}) {
    if (Array.isArray(styles)) {
      let computedStyles = {}
      styles.forEach(key => {
        computedStyles[key] = this.$el.style[key]
      })
      return computedStyles
    }
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    })
    return this
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  focus() {
    this.$el.focus()
    return this
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }
  
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  id(parse) {
    if (parse) {
      const id = this.data.id.split(":")
      return [+id[0], +id[1]]
    } else {
      return this.data.id
    }
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (nameTag, classes = "") => {
  const el = document.createElement(nameTag);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
