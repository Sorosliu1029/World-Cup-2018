function CMenu() {
  var m,
    c,
    e,
    a,
    d,
    k,
    h,
    q,
    p,
    u = null
  this._init = function() {
    k = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'))
    s_oStage.addChild(k)
    var w = s_oSpriteLibrary.getSprite('but_play')
    a = CANVAS_WIDTH / 2 + 110
    d = CANVAS_HEIGHT - 130
    h = new CGfxButton(a, d, w)
    h.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this)
    h.pulseAnimation()
    s_iBestScore = getItem(LOCALSTORAGE_STRING[LOCAL_BEST_SCORE])
    null === s_iBestScore && (s_iBestScore = 0)
    q = new createjs.Shape()
    q.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    s_oStage.addChild(q)
    createjs.Tween.get(q)
      .to({ alpha: 0 }, 1e3)
      .call(function() {
        q.visible = !1
      })
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
  }
  this.refreshButtonPos = function(a, d) {
    u && screenfull.enabled && p.setPosition(m + a, c + d)
  }
  this.unload = function() {
    h.unload()
    h = null
    u && screenfull.enabled && p.unload()
    s_oStage.removeAllChildren()
    s_oMenu = null
  }
  this._onButPlayRelease = function() {
    this.unload()
    s_oMain.gotoGame()
  }
  this._onAudioToggle = function() {
    s_bAudioActive = !s_bAudioActive
  }
  this.resetFullscreenBut = function() {
    u && screenfull.enabled && p.setActive(s_bFullscreen)
  }
  s_oMenu = this
  this._init()
}
