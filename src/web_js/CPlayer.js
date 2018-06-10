function CPlayer(m, c, e) {
  var g,
    a = [],
    d,
    b = 0,
    l = 0
  this._init = function(b, c) {
    g = { x: b, y: c }
    d = new createjs.Container()
    d.x = g.x
    d.y = g.y
    e.addChild(d)
    for (var f = 0; f < NUM_SPRITE_PLAYER; f++)
      a.push(createBitmap(s_oSpriteLibrary.getSprite('player_' + f))),
        (a[f].visible = !1),
        d.addChild(a[f])
    f = s_oSpriteLibrary.getSprite('player_0')
    d.cache(0, 0, f.width, f.height)
    a[0].visible = !0
  }
  this.setPosition = function(a, b) {
    d.x = a
    d.y = b
  }
  this.getX = function() {
    return d.x
  }
  this.getY = function() {
    return d.y
  }
  this.getStartPos = function() {
    return g
  }
  this.setVisible = function(a) {
    d.visible = a
  }
  this.animFade = function(a) {
    var c = this
    createjs.Tween.get(d)
      .to({ alpha: a }, 250)
      .call(function() {
        0 === a && ((d.visible = !1), c.hideCharacter(NUM_SPRITE_PLAYER - 1), c.viewCharacter(b))
      })
  }
  this.viewCharacter = function(b) {
    a[b].visible = !0
  }
  this.hideCharacter = function(b) {
    a[b].visible = !1
  }
  this.getFrame = function() {
    return b
  }
  this.animPlayer = function() {
    l += s_iTimeElaps
    if (l > BUFFER_ANIM_PLAYER) {
      this.hideCharacter(b)
      if (b + 1 < NUM_SPRITE_PLAYER) this.viewCharacter(b + 1), b++
      else return this.viewCharacter(b), (l = b = 0), !1
      d.updateCache()
      l = 0
    }
    return !0
  }
  this._init(m, c)
  return this
}
