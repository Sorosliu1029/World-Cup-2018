function CGoal(m, c, e, g) {
  var a
  this._init = function(b, c, e) {
    a = createBitmap(e)
    this.setPosition(b, c)
    a.cache(0, 0, e.width, e.height)
    d.addChild(a)
  }
  this.unload = function() {
    d.removeChild(a)
  }
  this.setPosition = function(b, c) {
    a.x = b
    a.y = c
  }
  this.getDepthPos = function() {
    return GOAL_SPRITE_SWAP_Y
  }
  this.getObject = function() {
    return a
  }
  var d = g
  this._init(m, c, e)
  return this
}
