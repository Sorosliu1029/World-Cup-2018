function CWinPanel(m) {
  var c, e, g, a, d, b, l, k, h, f, q
  this._init = function(n) {
    k = new createjs.Container()
    k.alpha = 0
    k.visible = !1
    var m = new createjs.Shape()
    m.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    m.alpha = 0.5
    k.addChild(m)
    c = createBitmap(n)
    c.x = CANVAS_WIDTH_HALF
    c.y = CANVAS_HEIGHT_HALF
    c.regX = 0.5 * n.width
    c.regY = 0.5 * n.height
    k.addChild(c)
    e = new createjs.Text('', '80px ' + FONT_GAME, TEXT_COLOR_STROKE)
    e.x = CANVAS_WIDTH / 2
    e.y = CANVAS_HEIGHT_HALF - 170
    e.textAlign = 'center'
    e.outline = 5
    k.addChild(e)
    g = new createjs.Text('', '80px ' + FONT_GAME, TEXT_COLOR)
    g.x = CANVAS_WIDTH / 2
    g.y = e.y
    g.textAlign = 'center'
    k.addChild(g)
    a = new createjs.Text('', '50px ' + FONT_GAME, TEXT_COLOR_STROKE)
    a.x = CANVAS_WIDTH / 2
    a.y = CANVAS_HEIGHT_HALF - 50
    a.textAlign = 'center'
    a.outline = 5
    k.addChild(a)
    d = new createjs.Text('', '50px ' + FONT_GAME, TEXT_COLOR)
    d.x = CANVAS_WIDTH / 2
    d.y = a.y
    d.textAlign = 'center'
    k.addChild(d)
    b = new createjs.Text('', '50px ' + FONT_GAME, TEXT_COLOR_STROKE)
    b.x = CANVAS_WIDTH / 2
    b.y = CANVAS_HEIGHT_HALF + 50
    b.textAlign = 'center'
    b.outline = 5
    k.addChild(b)
    l = new createjs.Text('', '50px ' + FONT_GAME, TEXT_COLOR)
    l.x = CANVAS_WIDTH / 2
    l.y = b.y
    l.textAlign = 'center'
    k.addChild(l)
    n = s_oSpriteLibrary.getSprite('but_restart')
    f = new CGfxButton(0.5 * CANVAS_WIDTH + 250, 0.5 * CANVAS_HEIGHT + 120, n, k)
    f.pulseAnimation()
    f.addEventListener(ON_MOUSE_DOWN, this._onRestart, this)
    n = s_oSpriteLibrary.getSprite('but_home')
    h = new CGfxButton(0.5 * CANVAS_WIDTH - 250, 0.5 * CANVAS_HEIGHT + 120, n, k)
    h.addEventListener(ON_MOUSE_DOWN, this._onExit, this)
    q = new createjs.Container()
    k.addChild(q)
    k.on('click', function() {})
    s_oStage.addChild(k)
  }
  this.unload = function() {
    k.removeAllEventListeners()
    s_oStage.removeChild(k)
    h && (h.unload(), (h = null))
    f && (f.unload(), (f = null))
  }
  this.show = function(c) {
    e.text = TEXT_GAMEOVER
    g.text = TEXT_GAMEOVER
    a.text = TEXT_SCORE + ': ' + c
    d.text = TEXT_SCORE + ': ' + c
    b.text = TEXT_BEST_SCORE + ': ' + s_iBestScore
    l.text = TEXT_BEST_SCORE + ': ' + s_iBestScore
    k.visible = !0
    createjs.Tween.get(k)
      .wait(MS_WAIT_SHOW_GAME_OVER_PANEL)
      .to({ alpha: 1 }, 1250, createjs.Ease.cubicOut)
      .call(function() {})
    $(s_oMain).trigger('save_score', c)
    $(s_oMain).trigger('share_event', c)
  }
  this._onContinue = function() {
    var a = this
    createjs.Tween.get(k, { override: !0 })
      .to({ alpha: 0 }, 750, createjs.Ease.cubicOut)
      .call(function() {
        a.unload()
      })
    _oButContinue.block(!0)
    h.block(!0)
    s_oGame.onContinue()
  }
  this._onRestart = function() {
    f.block(!0)
    this.unload()
    s_oGame.restartGame()
  }
  this._onExit = function() {
    this.unload()
    s_oGame.onExit()
  }
  this._init(m)
  return this
}
