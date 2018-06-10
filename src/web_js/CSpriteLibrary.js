function CSpriteLibrary() {
  var m, c, e, g, a, d
  this.init = function(b, l, k) {
    e = c = 0
    g = b
    a = l
    d = k
    m = {}
  }
  this.addSprite = function(b, a) {
    m.hasOwnProperty(b) || ((m[b] = { szPath: a, oSprite: new Image() }), c++)
  }
  this.getSprite = function(b) {
    return m.hasOwnProperty(b) ? m[b].oSprite : null
  }
  this._onSpritesLoaded = function() {
    a.call(d)
  }
  this._onSpriteLoaded = function() {
    g.call(d)
    ++e == c && this._onSpritesLoaded()
  }
  this.loadSprites = function() {
    for (var b in m)
      (m[b].oSprite.oSpriteLibrary = this),
        (m[b].oSprite.onload = function() {
          this.oSpriteLibrary._onSpriteLoaded()
        }),
        (m[b].oSprite.src = m[b].szPath)
  }
  this.getNumSprites = function() {
    return c
  }
}
