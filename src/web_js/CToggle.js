function CToggle(m, c, e, g, a) {
  var d, b, l, k, h
  this._init = function(a, c, n, p, e) {
    h = void 0 !== e ? e : s_oStage
    b = []
    l = []
    e = new createjs.SpriteSheet({
      images: [n],
      frames: {
        width: n.width / 2,
        height: n.height,
        regX: n.width / 2 / 2,
        regY: n.height / 2,
      },
      animations: { state_true: [0], state_false: [1] },
    })
    d = p
    k = createSprite(e, 'state_' + d, n.width / 2 / 2, n.height / 2, n.width / 2, n.height)
    k.x = a
    k.y = c
    k.stop()
    s_bMobile || (k.cursor = 'pointer')
    h.addChild(k)
    this._initListener()
  }
  this.unload = function() {
    k.off('mousedown', this.buttonDown)
    k.off('pressup', this.buttonRelease)
    h.removeChild(k)
  }
  this._initListener = function() {
    k.on('mousedown', this.buttonDown)
    k.on('pressup', this.buttonRelease)
  }
  this.addEventListener = function(a, d, c) {
    b[a] = d
    l[a] = c
  }
  this.setCursorType = function(b) {
    k.cursor = b
  }
  this.setActive = function(b) {
    d = b
    k.gotoAndStop('state_' + d)
  }
  this.buttonRelease = function() {
    k.scaleX = 1
    k.scaleY = 1
    d = !d
    k.gotoAndStop('state_' + d)
    b[ON_MOUSE_UP] && b[ON_MOUSE_UP].call(l[ON_MOUSE_UP], d)
  }
  this.buttonDown = function() {
    k.scaleX = 0.9
    k.scaleY = 0.9
    b[ON_MOUSE_DOWN] && b[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN])
  }
  this.setPosition = function(b, a) {
    k.x = b
    k.y = a
  }
  this._init(m, c, e, g, a)
}
