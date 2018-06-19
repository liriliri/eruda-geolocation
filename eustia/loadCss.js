function exports(src, container) {
  var link = document.createElement('link')

  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = src

  container = container || document.head
  container.appendChild(link)
}
