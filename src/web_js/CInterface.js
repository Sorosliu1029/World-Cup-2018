function CInterface() {
  var e,
    g,
    a,
    d,
    k,
    f,
    n = null,
    u,
    r,
    w,
    t,
    v = null
  this._init = function() {
    var n = s_oSpriteLibrary.getSprite('but_exit')
    e = CANVAS_WIDTH - n.height / 2 - 10
    g = n.height / 2 + 10
    k = new CGfxButton(e, g, n)
    k.addEventListener(ON_MOUSE_UP, this._onExit, this)
    u = new CScoreBoard(s_oStage)
    r = new CLaunchBoard(s_oStage)
    w = new CHelpText(s_oStage)
    w.fadeAnim(1, null)
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
  }
  this.refreshButtonPos = function(n, p) {
    k.setPosition(e - n, p + g)
    var w = u.getStartPosScore()
    u.setPosScore(w.x + n, w.y - p)
    w = r.getStartPos()
    r.setPos(w.x - n, w.y - p)
    v && screenfull.enabled && f.setPosition(a + n, d + p)
  }
  this.unloadHelpText = function() {
    null !== w && (w.fadeAnim(0, w.unload), (w = null))
  }
  this.unload = function() {
    k.unload()
    k = null
    v && screenfull.enabled && (f.unload(), (f = null))
    s_oInterface = null
  }
  this.createWinPanel = function(b) {
    n = new CWinPanel(s_oSpriteLibrary.getSprite('msg_box'))
    n.show(b)
  }
  this.refreshTextScoreBoard = function(b, a, d, c) {
    u.refreshTextScore(b)
    c && u.effectAddScore(d, a)
  }
  this.resetFullscreenBut = function() {
    v && screenfull.enabled && f.setActive(s_bFullscreen)
  }
  this.createAnimText = function(b, a, d, c, h) {
    var f = new createjs.Container(),
      k = new createjs.Text(b, a + 'px ' + SECONDARY_FONT, h)
    k.x = 0
    k.y = 0
    k.textAlign = 'center'
    k.outline = 4
    f.addChild(k)
    var n = new createjs.Text(k.text, a + 'px ' + SECONDARY_FONT, c)
    n.x = 0
    n.y = 0
    n.textAlign = 'center'
    f.addChild(n)
    f.x = CANVAS_WIDTH_HALF
    f.y = -k.getBounds().height
    d && s_oInterface.strobeText(n)
    s_oStage.addChild(f)
    createjs.Tween.get(f)
      .to({ y: CANVAS_HEIGHT_HALF }, 500, createjs.Ease.cubicOut)
      .call(function() {
        createjs.Tween.get(f)
          .wait(250)
          .to({ y: CANVAS_HEIGHT + k.getBounds().height }, 500, createjs.Ease.cubicIn)
          .call(function() {
            d && createjs.Tween.removeTweens(n)
            s_oStage.removeChild(f)
          })
      })
  }
  this.strobeText = function(b) {
    createjs.Tween.get(b)
      .wait(30)
      .call(function() {
        t < TEXT_EXCELLENT_COLOR.length - 1 ? t++ : (t = 0)
        b.color = TEXT_EXCELLENT_COLOR[t]
        s_oInterface.strobeText(b)
      })
  }
  this.refreshLaunchBoard = function(b, a) {
    r.refreshTextLaunch(b, a)
  }
  this._onExit = function() {
    new CAreYouSurePanel(s_oStage).show()
  }
  s_oInterface = this
  this._init()
  return this
}
