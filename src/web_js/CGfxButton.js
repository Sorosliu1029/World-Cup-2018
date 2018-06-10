function CGfxButton(m, c, e, g) {
  var a,
    d,
    b,
    l,
    k,
    h,
    f = !1
  this._init = function(c, f, n) {
    a = []
    d = []
    l = []
    b = createBitmap(n)
    b.x = c
    b.y = f
    h = k = 1
    b.regX = n.width / 2
    b.regY = n.height / 2
    s_bMobile || (b.cursor = 'pointer')
    q.addChild(b)
    this._initListener()
  }
  this.unload = function() {
    b.off('mousedown', this.buttonDown)
    b.off('pressup', this.buttonRelease)
    q.removeChild(b)
  }
  this.setVisible = function(a) {
    b.visible = a
  }
  this.setCursorType = function(a) {
    b.cursor = a
  }
  this._initListener = function() {
    b.on('mousedown', this.buttonDown)
    b.on('pressup', this.buttonRelease)
  }
  this.addEventListener = function(b, c, h) {
    a[b] = c
    d[b] = h
  }
  this.addEventListenerWithParams = function(b, c, h, f) {
    a[b] = c
    d[b] = h
    l[b] = f
  }
  this.buttonRelease = function() {
    f ||
      ((b.scaleX = 0 < k ? 1 : -1),
      (b.scaleY = 1),
      a[ON_MOUSE_UP] && a[ON_MOUSE_UP].call(d[ON_MOUSE_UP], l[ON_MOUSE_UP]))
  }
  this.buttonDown = function() {
    f ||
      ((b.scaleX = 0 < k ? 0.9 : -0.9),
      (b.scaleY = 0.9),
      a[ON_MOUSE_DOWN] && a[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN], l[ON_MOUSE_DOWN]))
  }
  this.rotation = function(a) {
    b.rotation = a
  }
  this.getButton = function() {
    return b
  }
  this.setPosition = function(a, d) {
    b.x = a
    b.y = d
  }
  this.setX = function(a) {
    b.x = a
  }
  this.setY = function(a) {
    b.y = a
  }
  this.getButtonImage = function() {
    return b
  }
  this.block = function(a) {
    f = a
    b.scaleX = k
    b.scaleY = h
  }
  this.setScaleX = function(a) {
    k = b.scaleX = a
  }
  this.getX = function() {
    return b.x
  }
  this.getY = function() {
    return b.y
  }
  this.pulseAnimation = function() {
    createjs.Tween.get(b)
      .to({ scaleX: 0.9 * k, scaleY: 0.9 * h }, 850, createjs.Ease.quadOut)
      .to({ scaleX: k, scaleY: h }, 650, createjs.Ease.quadIn)
      .call(function() {
        n.pulseAnimation()
      })
  }
  this.trebleAnimation = function() {
    createjs.Tween.get(b)
      .to({ rotation: 5 }, 75, createjs.Ease.quadOut)
      .to({ rotation: -5 }, 140, createjs.Ease.quadIn)
      .to({ rotation: 0 }, 75, createjs.Ease.quadIn)
      .wait(750)
      .call(function() {
        n.trebleAnimation()
      })
  }
  this.removeAllTweens = function() {
    createjs.Tween.removeTweens(b)
  }
  var q = void 0 !== g ? g : s_oStage
  this._init(m, c, e)
  var n = this
  return this
}
