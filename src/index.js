const loadJs = require('licia/loadJs')

module.exports = function (eruda) {
  const { evalCss } = eruda.util

  class Geolocation extends eruda.Tool {
    constructor() {
      super()
      this.name = 'geolocation'
      this._style = evalCss(require('./style.scss'))
    }
    init($el, container) {
      super.init($el, container)
      $el.html(
        '<div id="eruda-map" class="eruda-map"></div><div class="eruda-info"></div>'
      )

      this._initMap()
      this._$info = this._$el.find('.eruda-info')
    }
    show() {
      super.show()

      this.resetView()
    }
    resetView() {
      if (!navigator.geolocation) return

      navigator.geolocation.getCurrentPosition(
        (position) => {
          var coords = position.coords,
            longitude = coords.longitude,
            latitude = coords.latitude

          this.setView(latitude, longitude)
        },
        (e) => {
          this.setInfo(e.message)
        }
      )
    }
    setView(latitude, longitude) {
      if (!this._map) return

      this._map.setView([latitude, longitude], 12)

      this.setInfo('latitude: ' + latitude + ' ' + 'longitude: ' + longitude)
    }
    setInfo(text) {
      this._$info.text(text)
    }
    hide() {
      super.hide()
    }
    destroy() {
      super.destroy()
      evalCss.remove(this._style)
    }
    _initMap() {
      loadCss(
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
        this._$el.get(0)
      )
      loadJs('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', (isLoaded) => {
        if (!isLoaded) return this.setInfo('Failed to init map')

        this.setInfo('Map successfully initialized')

        this._map = L.map(this._$el.find('#eruda-map').get(0), {
          center: [39.9, 116.39],
          zoom: 2,
        })
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
          this._map
        )

        this.resetView()
      })
    }
  }

  return new Geolocation()
}

function loadCss(src, container) {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = src

  container = container || document.head
  container.appendChild(link)
}
