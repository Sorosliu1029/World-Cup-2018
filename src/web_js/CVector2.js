function CVector2(m, c) {
  var e, g
  this._init = function(a, c) {
    e = a
    g = c
  }
  this.add = function(a, c) {
    e += a
    g += c
  }
  this.addV = function(a) {
    e += a.getX()
    g += a.getY()
  }
  this.scalarDivision = function(a) {
    e /= a
    g /= a
  }
  this.subtract = function(a) {
    e -= a.getX()
    g -= a.getY()
  }
  this.scalarProduct = function(a) {
    e *= a
    g *= a
  }
  this.invert = function() {
    e *= -1
    g *= -1
  }
  this.dotProduct = function(a) {
    return e * a.getX() + g * a.getY()
  }
  this.set = function(a, c) {
    e = a
    g = c
  }
  this.setV = function(a) {
    e = a.getX()
    g = a.getY()
  }
  this.length = function() {
    return Math.sqrt(e * e + g * g)
  }
  this.length2 = function() {
    return e * e + g * g
  }
  this.normalize = function() {
    var a = this.length()
    0 < a && ((e /= a), (g /= a))
  }
  this.angleBetweenVectors = function(a) {
    a = Math.acos(this.dotProduct(a) / (this.length() * a.length()))
    return !0 === isNaN(a) ? 0 : a
  }
  this.getNormalize = function(a) {
    this.length()
    a.set(e, g)
    a.normalize()
  }
  this.rot90CCW = function() {
    var a = e
    e = -g
    g = a
  }
  this.rot90CW = function() {
    var a = e
    e = g
    g = -a
  }
  this.getRotCCW = function(a) {
    a.set(e, g)
    a.rot90CCW()
  }
  this.getRotCW = function(a) {
    a.set(e, g)
    a.rot90CW()
  }
  this.ceil = function() {
    e = Math.ceil(e)
    g = Math.ceil(g)
  }
  this.round = function() {
    e = Math.round(e)
    g = Math.round(g)
  }
  this.toString = function() {
    return 'Vector2: ' + e + ', ' + g
  }
  this.print = function() {
    trace('Vector2: ' + e + ', ' + g)
  }
  this.getX = function() {
    return e
  }
  this.getY = function() {
    return g
  }
  this.rotate = function(a) {
    var c = e,
      b = g
    e = c * Math.cos(a) - b * Math.sin(a)
    g = c * Math.sin(a) + b * Math.cos(a)
  }
  this._init(m, c)
}
