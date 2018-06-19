import { loadCss, loadJs } from './util'

module.exports = function(eruda) {
  let { evalCss } = eruda.util

  class Geolocation extends eruda.Tool {
    constructor() {
      super()
      this.name = 'geolocation'
      this._style = evalCss(require('./style.scss'))
    }
    init($el, container) {
      super.init($el, container)
      $el.html(require('./template.hbs')())

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
        position => {
          var coords = position.coords,
            longitude = coords.longitude,
            latitude = coords.latitude

          this.setView(latitude, longitude)
        },
        e => {
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
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        this._$el.get(0)
      )
      loadJs('https://unpkg.com/leaflet@1.3.1/dist/leaflet.js', isLoaded => {
        if (!isLoaded) return this.setInfo('Failed to init map')

        this.setInfo('Map successfully initialized')

        this._map = L.map(this._$el.find('#eruda-map').get(0)).setView(
          [39.9, 116.39],
          12
        )
        L.tileLayer(
          'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
          {
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken:
              'pk.eyJ1Ijoic3VydW56aSIsImEiOiJjamVqbnk4c2gxN3JzMnltb3ByMXdkbDB5In0.Y6rCE361t15ATgiDb-o3Rw'
          }
        ).addTo(this._map)

        this.resetView()
      })
    }
  }

  return new Geolocation()
}
