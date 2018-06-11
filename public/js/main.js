function CTextButton(m, c, e, g, a, d, b) {
  var l, k, h
  this._init = function(b, a, d, c, e, m, g) {
    l = []
    k = []
    var f = createBitmap(d),
      q = Math.ceil(g / 20),
      n = new createjs.Text(c, 'bold ' + g + 'px ' + e, '#000000')
    n.textAlign = 'center'
    n.textBaseline = 'alphabetic'
    var p = n.getBounds()
    n.x = d.width / 2 + q
    n.y = Math.floor(d.height / 2) + p.height / 3 + q
    c = new createjs.Text(c, 'bold ' + g + 'px ' + e, m)
    c.textAlign = 'center'
    c.textBaseline = 'alphabetic'
    p = c.getBounds()
    c.x = d.width / 2
    c.y = Math.floor(d.height / 2) + p.height / 3
    h = new createjs.Container()
    h.x = b
    h.y = a
    h.regX = d.width / 2
    h.regY = d.height / 2
    h.addChild(f, n, c)
    s_bMobile || (h.cursor = 'pointer')
    s_oStage.addChild(h)
    this._initListener()
  }
  this.unload = function() {
    h.off('mousedown')
    h.off('pressup')
    s_oStage.removeChild(h)
  }
  this.setVisible = function(b) {
    h.visible = b
  }
  this._initListener = function() {
    oParent = this
    h.on('mousedown', this.buttonDown)
    h.on('pressup', this.buttonRelease)
  }
  this.addEventListener = function(b, a, d) {
    l[b] = a
    k[b] = d
  }
  this.buttonRelease = function() {
    h.scaleX = 1
    h.scaleY = 1
    l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(k[ON_MOUSE_UP])
  }
  this.buttonDown = function() {
    h.scaleX = 0.9
    h.scaleY = 0.9
    l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
  }
  this.setPosition = function(b, a) {
    h.x = b
    h.y = a
  }
  this.setX = function(b) {
    h.x = b
  }
  this.setY = function(b) {
    h.y = b
  }
  this.getButtonImage = function() {
    return h
  }
  this.getX = function() {
    return h.x
  }
  this.getY = function() {
    return h.y
  }
  this._init(m, c, e, g, a, d, b)
  return this
}
function CBall(m, c, e, g, a) {
  var d,
    b,
    l,
    k = null,
    h = FOV * BALL_RADIUS,
    f = 0,
    q = 0
  this._init = function(a, c, e) {
    l = new createjs.Container()
    p.addChild(l)
    var f = new createjs.SpriteSheet({
      images: [e],
      frames: {
        width: e.width / 7,
        height: e.height,
        regX: e.width / 2 / 7,
        regY: e.height / 2,
      },
    })
    d = createSprite(f, 0, e.width / 2 / 7, e.height / 2, e.width / 7, e.height / 2)
    d.stop()
    this.scale(h)
    e = s_oSpriteLibrary.getSprite('ball_shadow')
    b = createBitmap(e)
    b.x = a
    b.y = c
    b.regX = 0.5 * e.width
    b.regY = 0.5 * e.height
    this.scaleShadow(h)
    l.addChild(b, d)
  }
  this.rolls = function() {
    d.rotation = Math.degrees(Math.sin(-(0.15 * n.velocity.x)))
    var a = Math.abs(n.angularVelocity.x),
      b = this._goToPrevFrame
    0 > n.angularVelocity.x && (b = this._goToNextFrame)
    7 < a
      ? b()
      : 3 < a
        ? (f++, f > 2 / ROLL_BALL_RATE && (b(), (f = 0)))
        : 1 < a
          ? (f++, f > 3 / ROLL_BALL_RATE && (b(), (f = 0)))
          : a > MIN_BALL_VEL_ROTATION && (f++, f > 4 / ROLL_BALL_RATE && (b(), (f = 0)))
  }
  this._goToPrevFrame = function() {
    0 === q ? (q = 6) : q--
    d.gotoAndStop(q)
  }
  this._goToNextFrame = function() {
    7 === q ? (q = 1) : q++
    d.gotoAndStop(q)
  }
  this.unload = function() {
    d.removeAllEventListeners()
    p.removeChild(d)
  }
  this.setVisible = function(a) {
    l.visible = a
  }
  this.getStartScale = function() {
    return h
  }
  this.startPosShadowY = function(a) {
    k = a
  }
  this.getStartShadowYPos = function() {
    return k
  }
  this.fadeAnimation = function(a, b, c) {
    this.tweenFade(a, b, c)
  }
  this.tweenFade = function(a, b, c) {
    createjs.Tween.get(l, { override: !0 })
      .wait(c)
      .to({ alpha: a }, b)
      .call(function() {})
  }
  this.setPositionShadow = function(a, c) {
    b.x = a
    b.y = c
  }
  this.setPosition = function(a, b) {
    d.x = a
    d.y = b
  }
  this.getPhysics = function() {
    return n
  }
  this.setAngle = function(a) {
    d.rotation = a
  }
  this.getX = function() {
    return d.x
  }
  this.getY = function() {
    return d.y
  }
  this.getStartScale = function() {
    return h
  }
  this.scale = function(a) {
    d.scaleX = a
    d.scaleY = a
  }
  this.scaleShadow = function(a) {
    0.08 < a ? ((b.scaleX = a), (b.scaleY = a)) : ((b.scaleX = 0.08), (b.scaleY = 0.08))
  }
  this.setAlphaByHeight = function(a) {
    b.alpha = a
  }
  this.getScale = function() {
    return d.scaleX
  }
  this.getObject = function() {
    return l
  }
  this.getDepthPos = function() {
    return n.position.y
  }
  var n = g
  var p = a
  this._init(m, c, e)
  return this
}
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
function SmoothieChart(m) {
  m = m || {}
  m.grid = m.grid || {
    fillStyle: '#000000',
    strokeStyle: '#777777',
    lineWidth: 1,
    millisPerLine: 1e3,
    verticalSections: 2,
  }
  m.millisPerPixel = m.millisPerPixel || 20
  m.fps = m.fps || 50
  m.maxValueScale = m.maxValueScale || 1
  m.minValue = m.minValue
  m.maxValue = m.maxValue
  m.labels = m.labels || { fillStyle: '#ffffff' }
  m.interpolation = m.interpolation || 'bezier'
  m.scaleSmoothing = m.scaleSmoothing || 0.125
  m.maxDataSetLength = m.maxDataSetLength || 2
  m.timestampFormatter = m.timestampFormatter || null
  this.options = m
  this.seriesSet = []
  this.currentValueRange = 1
  this.currentVisMinValue = 0
}
SmoothieChart.prototype.addTimeSeries = function(m, c) {
  this.seriesSet.push({ timeSeries: m, options: c || {} })
}
SmoothieChart.prototype.removeTimeSeries = function(m) {
  this.seriesSet.splice(this.seriesSet.indexOf(m), 1)
}
SmoothieChart.prototype.streamTo = function(m, c) {
  var e = this
  this.render_on_tick = function() {
    e.render(m, e.seriesSet[0].timeSeries.lastTimeStamp)
  }
  this.start()
}
SmoothieChart.prototype.start = function() {
  this.timer || (this.timer = setInterval(this.render_on_tick, 1e3 / this.options.fps))
}
SmoothieChart.prototype.stop = function() {
  this.timer && (clearInterval(this.timer), (this.timer = void 0))
}
SmoothieChart.timeFormatter = function(m) {
  function c(c) {
    return (10 > c ? '0' : '') + c
  }
  return c(m.getHours()) + ':' + c(m.getMinutes()) + ':' + c(m.getSeconds())
}
SmoothieChart.prototype.render = function(m, c) {
  var e = m.getContext('2d'),
    g = this.options,
    a = m.clientWidth,
    d = m.clientHeight
  e.save()
  c -= c % g.millisPerPixel
  e.translate(0, 0)
  e.beginPath()
  e.rect(0, 0, a, d)
  e.clip()
  e.save()
  e.fillStyle = g.grid.fillStyle
  e.clearRect(0, 0, a, d)
  e.fillRect(0, 0, a, d)
  e.restore()
  e.save()
  e.lineWidth = g.grid.lineWidth || 1
  e.strokeStyle = g.grid.strokeStyle || '#ffffff'
  if (0 < g.grid.millisPerLine)
    for (
      var b = c - (c % g.grid.millisPerLine);
      b >= c - a * g.millisPerPixel;
      b -= g.grid.millisPerLine
    ) {
      e.beginPath()
      var l = Math.round(a - (c - b) / g.millisPerPixel)
      e.moveTo(l, 0)
      e.lineTo(l, d)
      e.stroke()
      if (g.timestampFormatter) {
        var k = g.timestampFormatter(new Date(b)),
          h = e.measureText(k).width / 2 + e.measureText(v).width + 4
        l < a - h &&
          ((e.fillStyle = g.labels.fillStyle), e.fillText(k, l - e.measureText(k).width / 2, d - 2))
      }
      e.closePath()
    }
  for (v = 1; v < g.grid.verticalSections; v++)
    (b = Math.round((v * d) / g.grid.verticalSections)),
      e.beginPath(),
      e.moveTo(0, b),
      e.lineTo(a, b),
      e.stroke(),
      e.closePath()
  e.beginPath()
  e.strokeRect(0, 0, a, d)
  e.closePath()
  e.restore()
  v = l = Number.NaN
  for (k = 0; k < this.seriesSet.length; k++) {
    var f = this.seriesSet[k].timeSeries
    isNaN(f.maxValue) || (l = isNaN(l) ? f.maxValue : Math.max(l, f.maxValue))
    isNaN(f.minValue) || (v = isNaN(v) ? f.minValue : Math.min(v, f.minValue))
  }
  if (!isNaN(l) || !isNaN(v)) {
    l = null != g.maxValue ? g.maxValue : l * g.maxValueScale
    null != g.minValue && (v = g.minValue)
    this.currentValueRange += g.scaleSmoothing * (l - v - this.currentValueRange)
    this.currentVisMinValue += g.scaleSmoothing * (v - this.currentVisMinValue)
    h = this.currentValueRange
    var q = this.currentVisMinValue
    for (k = 0; k < this.seriesSet.length; k++) {
      e.save()
      f = this.seriesSet[k].timeSeries
      f = f.data
      for (
        var n = this.seriesSet[k].options;
        f.length >= g.maxDataSetLength && f[1][0] < c - a * g.millisPerPixel;

      )
        f.splice(0, 1)
      e.lineWidth = n.lineWidth || 1
      e.fillStyle = n.fillStyle
      e.strokeStyle = n.strokeStyle || '#ffffff'
      e.beginPath()
      var p = 0,
        u = 0,
        r = 0
      for (b = 0; b < f.length; b++) {
        var w = Math.round(a - (c - f[b][0]) / g.millisPerPixel),
          t = f[b][1] - q
        t = Math.max(Math.min(d - (h ? Math.round((t / h) * d) : 0), d - 1), 1)
        if (0 == b) (p = w), e.moveTo(w, t)
        else
          switch (g.interpolation) {
            case 'line':
              e.lineTo(w, t)
              break
            default:
              e.bezierCurveTo(Math.round((u + w) / 2), r, Math.round(u + w) / 2, t, w, t)
          }
        u = w
        r = t
      }
      0 < f.length &&
        n.fillStyle &&
        (e.lineTo(a + n.lineWidth + 1, r),
        e.lineTo(a + n.lineWidth + 1, d + n.lineWidth + 1),
        e.lineTo(p, d + n.lineWidth),
        e.fill())
      e.stroke()
      e.closePath()
      e.restore()
    }
    if (!g.labels.disabled) {
      g.labelOffsetY || (g.labelOffsetY = 0)
      e.fillStyle = g.labels.fillStyle
      b = parseFloat(l).toFixed(2)
      var v = parseFloat(v).toFixed(2)
      e.fillText(b, a - e.measureText(b).width - 2, 10)
      e.fillText(v, a - e.measureText(v).width - 2, d - 2)
      for (b = 0; b < this.seriesSet.length; b++)
        (f = this.seriesSet[b].timeSeries),
          (a = f.label),
          (e.fillStyle = f.options.fillStyle || 'rgb(255,255,255)'),
          a && e.fillText(a, 2, 10 * (b + 1) + g.labelOffsetY)
    }
  }
  e.restore()
}
function CScoreBoard(m) {
  var c, e, g, a, d, b, l, k, h, f, q
  this._init = function() {
    c = { x: CANVAS_WIDTH_HALF - 660, y: CANVAS_HEIGHT - 64 }
    f = new createjs.Container()
    f.x = c.x
    f.y = c.y
    m.addChild(f)
    g = new createjs.Text(TEXT_SCORE, '50px ' + FONT_GAME, TEXT_COLOR)
    g.textAlign = 'left'
    f.addChild(g)
    a = new createjs.Text(TEXT_SCORE, '50px ' + FONT_GAME, TEXT_COLOR_STROKE)
    a.textAlign = 'left'
    a.outline = OUTLINE_WIDTH
    f.addChild(a)
    d = new createjs.Text(999999, '50px ' + FONT_GAME, TEXT_COLOR)
    d.textAlign = 'left'
    d.x = 150
    f.addChild(d)
    b = new createjs.Text(999999, '50px ' + FONT_GAME, TEXT_COLOR_STROKE)
    b.textAlign = 'left'
    b.x = d.x
    b.outline = OUTLINE_WIDTH
    f.addChild(b)
    q = new createjs.Container()
    q.x = 50
    l = new createjs.Text('+5555 ' + TEXT_MULTIPLIER + 1, '36px ' + FONT_GAME, TEXT_COLOR)
    l.textAlign = 'left'
    q.addChild(l)
    k = new createjs.Text('+5555 ' + TEXT_MULTIPLIER + 1, '36px ' + FONT_GAME, TEXT_COLOR_STROKE)
    k.textAlign = 'left'
    k.outline = OUTLINE_WIDTH
    q.addChild(k)
    q.y = e = -k.getBounds().height
    q.visible = !1
    f.addChild(q)
    h = new CRollingScore()
  }
  this.getStartPosScore = function() {
    return c
  }
  this.setPosScore = function(a, b) {
    f.x = a
    f.y = b
  }
  this.refreshTextScore = function(a) {
    h.rolling(d, b, a)
  }
  this.effectAddScore = function(a, b) {
    q.visible = !0
    l.text = '+' + a + ' ' + TEXT_MULTIPLIER + b
    k.text = l.text
    createjs.Tween.get(q)
      .to({ y: e - 50, alpha: 0 }, MS_EFFECT_ADD, createjs.Ease.cubicOut)
      .call(function() {
        q.visible = !1
        q.alpha = 1
        q.y = e
      })
  }
  this._init()
  return this
}
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
function CMain(m) {
  var c,
    e = 0,
    g = 0,
    a = STATE_LOADING,
    d,
    game
  this.initContainer = function() {
    var canvas = document.getElementById('canvas')
    s_oStage = new createjs.Stage(canvas)
    createjs.Touch.enable(s_oStage)
    s_oStage.preventSelection = !1
    s_bMobile = jQuery.browser.mobile
    !1 === s_bMobile
      ? (s_oStage.enableMouseOver(20),
        $('body').on('contextmenu', '#canvas', function(canvas) {
          return !1
        }),
        (FPS = FPS_DESKTOP),
        (FPS_TIME = 1 / FPS),
        (PHYSICS_STEP = 1 / (FPS * STEP_RATE)),
        (ROLL_BALL_RATE = 60 / FPS))
      : (BALL_VELOCITY_MULTIPLIER = 0.8)
    s_iPrevTime = new Date().getTime()
    createjs.Ticker.addEventListener('tick', this._update)
    createjs.Ticker.setFPS(FPS)
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0)
    s_oSpriteLibrary = new CSpriteLibrary()
    d = new CPreloader()
    c = !0
  }
  this._loadImages = function() {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this)
    s_oSpriteLibrary.addSprite('but_play', './sprites/but_play.png')
    s_oSpriteLibrary.addSprite('but_exit', './sprites/but_exit.png')
    s_oSpriteLibrary.addSprite('bg_menu', './sprites/bg_menu.jpg')
    s_oSpriteLibrary.addSprite('bg_game', './sprites/bg_game.jpg')
    s_oSpriteLibrary.addSprite('msg_box', './sprites/msg_box.png')
    s_oSpriteLibrary.addSprite('but_home', './sprites/but_home.png')
    s_oSpriteLibrary.addSprite('but_restart', './sprites/but_restart.png')
    s_oSpriteLibrary.addSprite('ball', './sprites/ball.png')
    s_oSpriteLibrary.addSprite('bg_game', './sprites/bg_game.jpg')
    s_oSpriteLibrary.addSprite('but_yes', './sprites/but_yes.png')
    s_oSpriteLibrary.addSprite('but_no', './sprites/but_no.png')
    s_oSpriteLibrary.addSprite('ball_shadow', './sprites/ball_shadow.png')
    s_oSpriteLibrary.addSprite('start_ball', './sprites/start_ball.png')
    s_oSpriteLibrary.addSprite('hand_touch', './sprites/hand_touch.png')
    s_oSpriteLibrary.addSprite('cursor', './sprites/cursor.png')
    s_oSpriteLibrary.addSprite('shot_left', './sprites/shot_left.png')
    s_oSpriteLibrary.addSprite('goal', './sprites/goal.png')
    for (var b = 0; b < NUM_SPRITE_PLAYER; b++)
      s_oSpriteLibrary.addSprite('player_' + b, './sprites/player/player_' + b + '.png')
    for (b = 0; b < NUM_SPRITE_GOALKEEPER[IDLE]; b++)
      s_oSpriteLibrary.addSprite(
        SPRITE_NAME_GOALKEEPER[IDLE] + b,
        './sprites/goalkeeper_idle/gk_idle_' + b + '.png',
      )
    for (b = 0; b < NUM_SPRITE_GOALKEEPER[RIGHT]; b++)
      s_oSpriteLibrary.addSprite(
        SPRITE_NAME_GOALKEEPER[RIGHT] + b,
        './sprites/goalkeeper_save_right/gk_save_right_' + b + '.png',
      )
    for (b = 0; b < NUM_SPRITE_GOALKEEPER[LEFT]; b++)
      s_oSpriteLibrary.addSprite(
        SPRITE_NAME_GOALKEEPER[LEFT] + b,
        './sprites/goalkeeper_save_left/gk_save_left_' + b + '.png',
      )
    for (b = 0; b < NUM_SPRITE_GOALKEEPER[CENTER_DOWN]; b++)
      s_oSpriteLibrary.addSprite(
        SPRITE_NAME_GOALKEEPER[CENTER_DOWN] + b,
        './sprites/goalkeeper_save_center_down/gk_save_center_down_' + b + '.png',
      )
    for (b = 0; b < NUM_SPRITE_GOALKEEPER[CENTER_UP]; b++)
      s_oSpriteLibrary.addSprite(
        SPRITE_NAME_GOALKEEPER[CENTER_UP] + b,
        './sprites/goalkeeper_save_center_up/gk_save_center_up_' + b + '.png',
      )
    for (b = 0; b < NUM_SPRITE_GOALKEEPER[LEFT_DOWN]; b++)
      s_oSpriteLibrary.addSprite(
        SPRITE_NAME_GOALKEEPER[LEFT_DOWN] + b,
        './sprites/goalkeeper_save_down_left/gk_save_down_left_' + b + '.png',
      )
    for (b = 0; b < NUM_SPRITE_GOALKEEPER[RIGHT_DOWN]; b++)
      s_oSpriteLibrary.addSprite(
        SPRITE_NAME_GOALKEEPER[RIGHT_DOWN] + b,
        './sprites/goalkeeper_save_down_right/gk_save_down_right_' + b + '.png',
      )
    g += s_oSpriteLibrary.getNumSprites()
    s_oSpriteLibrary.loadSprites()
  }
  this._onImagesLoaded = function() {
    e++
    d.refreshLoader(Math.floor((e / g) * 100))
    e === g && this._onRemovePreloader()
  }
  this._onAllImagesLoaded = function() {}
  this.preloaderReady = function() {
    this._loadImages()
    c = !0
  }
  this._onRemovePreloader = function() {
    d.unload()
    this.gotoMenu()
  }
  this.gotoMenu = function() {
    new CMenu()
    a = STATE_MENU
  }
  this.gotoGame = function() {
    game = new CGame(l)
    a = STATE_GAME
  }
  this.stopUpdate = function() {
    c = !1
    createjs.Ticker.paused = !0
    $('#block_game').css('display', 'block')
  }
  this.startUpdate = function() {
    s_iPrevTime = new Date().getTime()
    c = !0
    createjs.Ticker.paused = !1
    $('#block_game').css('display', 'none')
  }
  this._update = function(d) {
    if (!1 !== c) {
      var h = new Date().getTime()
      s_iTimeElaps = h - s_iPrevTime
      s_iCntTime += s_iTimeElaps
      s_iCntFps++
      s_iPrevTime = h
      1e3 <= s_iCntTime && ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0))
      a === STATE_GAME && game.update()
      s_oStage.update(d)
    }
  }
  s_oMain = this
  var l = m
  ENABLE_CHECK_ORIENTATION = m.check_orientation
  ENABLE_FULLSCREEN = m.fullscreen
  this.initContainer()
}
Detector = {
  canvas: !!window.CanvasRenderingContext2D,
  webgl: (function() {
    try {
      return (
        !!window.WebGLRenderingContext &&
        !!document.createElement('canvas').getContext('experimental-webgl')
      )
    } catch (m) {
      return !1
    }
  })(),
  workers: !!window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,
  getWebGLErrorMessage: function() {
    var m = document.createElement('div')
    m.id = 'webgl-error-message'
    m.style.fontFamily = 'monospace'
    m.style.fontSize = '13px'
    m.style.fontWeight = 'normal'
    m.style.textAlign = 'center'
    m.style.background = '#fff'
    m.style.color = '#000'
    m.style.padding = '1.5em'
    m.style.width = '400px'
    m.style.margin = '5em auto 0'
    this.webgl ||
      (m.innerHTML = window.WebGLRenderingContext
        ? 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
        : 'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.')
    return m
  },
  addGetWebGLMessage: function(m) {
    m = m || {}
    var c = void 0 !== m.parent ? m.parent : document.body
    m = void 0 !== m.id ? m.id : 'oldie'
    var e = Detector.getWebGLErrorMessage()
    e.id = m
    c.appendChild(e)
  },
}
var dat = dat || {}
dat.gui = dat.gui || {}
dat.utils = dat.utils || {}
dat.controllers = dat.controllers || {}
dat.dom = dat.dom || {}
dat.color = dat.color || {}
dat.utils.css = (function() {
  return {
    load: function(m, c) {
      c = c || document
      var e = c.createElement('link')
      e.type = 'text/css'
      e.rel = 'stylesheet'
      e.href = m
      c.getElementsByTagName('head')[0].appendChild(e)
    },
    inject: function(m, c) {
      c = c || document
      var e = document.createElement('style')
      e.type = 'text/css'
      e.innerHTML = m
      c.getElementsByTagName('head')[0].appendChild(e)
    },
  }
})()
dat.utils.common = (function() {
  var m = Array.prototype.forEach,
    c = Array.prototype.slice
  return {
    BREAK: {},
    extend: function(e) {
      this.each(
        c.call(arguments, 1),
        function(c) {
          for (var a in c) this.isUndefined(c[a]) || (e[a] = c[a])
        },
        this,
      )
      return e
    },
    defaults: function(e) {
      this.each(
        c.call(arguments, 1),
        function(c) {
          for (var a in c) this.isUndefined(e[a]) && (e[a] = c[a])
        },
        this,
      )
      return e
    },
    compose: function() {
      var e = c.call(arguments)
      return function() {
        for (var g = c.call(arguments), a = e.length - 1; 0 <= a; a--) g = [e[a].apply(this, g)]
        return g[0]
      }
    },
    each: function(c, g, a) {
      if (m && c.forEach === m) c.forEach(g, a)
      else if (c.length === c.length + 0)
        for (var d = 0, b = c.length; d < b && !(d in c && g.call(a, c[d], d) === this.BREAK); d++);
      else for (d in c) if (g.call(a, c[d], d) === this.BREAK) break
    },
    defer: function(c) {
      setTimeout(c, 0)
    },
    toArray: function(e) {
      return e.toArray ? e.toArray() : c.call(e)
    },
    isUndefined: function(c) {
      return void 0 === c
    },
    isNull: function(c) {
      return null === c
    },
    isNaN: function(c) {
      return c !== c
    },
    isArray:
      Array.isArray ||
      function(c) {
        return c.constructor === Array
      },
    isObject: function(c) {
      return c === Object(c)
    },
    isNumber: function(c) {
      return c === c + 0
    },
    isString: function(c) {
      return c === c + ''
    },
    isBoolean: function(c) {
      return !1 === c || !0 === c
    },
    isFunction: function(c) {
      return '[object Function]' === Object.prototype.toString.call(c)
    },
  }
})()
dat.controllers.Controller = (function(m) {
  var c = function(c, g) {
    this.initialValue = c[g]
    this.domElement = document.createElement('div')
    this.object = c
    this.property = g
    this.__onFinishChange = this.__onChange = void 0
  }
  m.extend(c.prototype, {
    onChange: function(c) {
      this.__onChange = c
      return this
    },
    onFinishChange: function(c) {
      this.__onFinishChange = c
      return this
    },
    setValue: function(c) {
      this.object[this.property] = c
      this.__onChange && this.__onChange.call(this, c)
      this.updateDisplay()
      return this
    },
    getValue: function() {
      return this.object[this.property]
    },
    updateDisplay: function() {
      return this
    },
    isModified: function() {
      return this.initialValue !== this.getValue()
    },
  })
  return c
})(dat.utils.common)
dat.dom.dom = (function(m) {
  function c(a) {
    if ('0' === a || m.isUndefined(a)) return 0
    a = a.match(g)
    return m.isNull(a) ? 0 : parseFloat(a[1])
  }
  var e = {}
  m.each(
    {
      HTMLEvents: ['change'],
      MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
      KeyboardEvents: ['keydown'],
    },
    function(a, b) {
      m.each(a, function(a) {
        e[a] = b
      })
    },
  )
  var g = /(\d+(\.\d+)?)px/,
    a = {
      makeSelectable: function(a, b) {
        void 0 !== a &&
          void 0 !== a.style &&
          ((a.onselectstart = b
            ? function() {
                return !1
              }
            : function() {}),
          (a.style.MozUserSelect = b ? 'auto' : 'none'),
          (a.style.KhtmlUserSelect = b ? 'auto' : 'none'),
          (a.unselectable = b ? 'on' : 'off'))
      },
      makeFullscreen: function(a, b, c) {
        m.isUndefined(b) && (b = !0)
        m.isUndefined(c) && (c = !0)
        a.style.position = 'absolute'
        b && ((a.style.left = 0), (a.style.right = 0))
        c && ((a.style.top = 0), (a.style.bottom = 0))
      },
      fakeEvent: function(a, b, c, g) {
        c = c || {}
        var d = e[b]
        if (!d) throw Error('Event type ' + b + ' not supported.')
        var f = document.createEvent(d)
        switch (d) {
          case 'MouseEvents':
            f.initMouseEvent(
              b,
              c.bubbles || !1,
              c.cancelable || !0,
              window,
              c.clickCount || 1,
              0,
              0,
              c.x || c.clientX || 0,
              c.y || c.clientY || 0,
              !1,
              !1,
              !1,
              !1,
              0,
              null,
            )
            break
          case 'KeyboardEvents':
            d = f.initKeyboardEvent || f.initKeyEvent
            m.defaults(c, {
              cancelable: !0,
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              metaKey: !1,
              keyCode: void 0,
              charCode: void 0,
            })
            d(
              b,
              c.bubbles || !1,
              c.cancelable,
              window,
              c.ctrlKey,
              c.altKey,
              c.shiftKey,
              c.metaKey,
              c.keyCode,
              c.charCode,
            )
            break
          default:
            f.initEvent(b, c.bubbles || !1, c.cancelable || !0)
        }
        m.defaults(f, g)
        a.dispatchEvent(f)
      },
      bind: function(c, b, e, g) {
        c.addEventListener
          ? c.addEventListener(b, e, g || !1)
          : c.attachEvent && c.attachEvent('on' + b, e)
        return a
      },
      unbind: function(c, b, e, g) {
        c.removeEventListener
          ? c.removeEventListener(b, e, g || !1)
          : c.detachEvent && c.detachEvent('on' + b, e)
        return a
      },
      addClass: function(c, b) {
        if (void 0 === c.className) c.className = b
        else if (c.className !== b) {
          var d = c.className.split(/ +/)
          ;-1 == d.indexOf(b) &&
            (d.push(b),
            (c.className = d
              .join(' ')
              .replace(/^\s+/, '')
              .replace(/\s+$/, '')))
        }
        return a
      },
      removeClass: function(c, b) {
        if (b) {
          if (void 0 !== c.className)
            if (c.className === b) c.removeAttribute('class')
            else {
              var d = c.className.split(/ +/),
                e = d.indexOf(b)
              ;-1 != e && (d.splice(e, 1), (c.className = d.join(' ')))
            }
        } else c.className = void 0
        return a
      },
      hasClass: function(a, b) {
        return new RegExp('(?:^|\\s+)' + b + '(?:\\s+|$)').test(a.className) || !1
      },
      getWidth: function(a) {
        a = getComputedStyle(a)
        return (
          c(a['border-left-width']) +
          c(a['border-right-width']) +
          c(a['padding-left']) +
          c(a['padding-right']) +
          c(a.width)
        )
      },
      getHeight: function(a) {
        a = getComputedStyle(a)
        return (
          c(a['border-top-width']) +
          c(a['border-bottom-width']) +
          c(a['padding-top']) +
          c(a['padding-bottom']) +
          c(a.height)
        )
      },
      getOffset: function(a) {
        var b = { left: 0, top: 0 }
        if (a.offsetParent) {
          do (b.left += a.offsetLeft), (b.top += a.offsetTop)
          while ((a = a.offsetParent))
        }
        return b
      },
      isActive: function(a) {
        return a === document.activeElement && (a.type || a.href)
      },
    }
  return a
})(dat.utils.common)
dat.controllers.OptionController = (function(m, c, e) {
  var g = function(a, d, b) {
    g.superclass.call(this, a, d)
    var l = this
    this.__select = document.createElement('select')
    if (e.isArray(b)) {
      var k = {}
      e.each(b, function(a) {
        k[a] = a
      })
      b = k
    }
    e.each(b, function(a, b) {
      var c = document.createElement('option')
      c.innerHTML = b
      c.setAttribute('value', a)
      l.__select.appendChild(c)
    })
    this.updateDisplay()
    c.bind(this.__select, 'change', function() {
      l.setValue(this.options[this.selectedIndex].value)
    })
    this.domElement.appendChild(this.__select)
  }
  g.superclass = m
  e.extend(g.prototype, m.prototype, {
    setValue: function(a) {
      a = g.superclass.prototype.setValue.call(this, a)
      this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
      return a
    },
    updateDisplay: function() {
      this.__select.value = this.getValue()
      return g.superclass.prototype.updateDisplay.call(this)
    },
  })
  return g
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common)
dat.controllers.NumberController = (function(m, c) {
  var e = function(g, a, d) {
    e.superclass.call(this, g, a)
    d = d || {}
    this.__min = d.min
    this.__max = d.max
    this.__step = d.step
    c.isUndefined(this.__step)
      ? (this.__impliedStep =
          0 == this.initialValue
            ? 1
            : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10)
      : (this.__impliedStep = this.__step)
    g = this.__impliedStep
    g = g.toString()
    g = -1 < g.indexOf('.') ? g.length - g.indexOf('.') - 1 : 0
    this.__precision = g
  }
  e.superclass = m
  c.extend(e.prototype, m.prototype, {
    setValue: function(c) {
      void 0 !== this.__min && c < this.__min
        ? (c = this.__min)
        : void 0 !== this.__max && c > this.__max && (c = this.__max)
      void 0 !== this.__step &&
        0 != c % this.__step &&
        (c = Math.round(c / this.__step) * this.__step)
      return e.superclass.prototype.setValue.call(this, c)
    },
    min: function(c) {
      this.__min = c
      return this
    },
    max: function(c) {
      this.__max = c
      return this
    },
    step: function(c) {
      this.__step = c
      return this
    },
  })
  return e
})(dat.controllers.Controller, dat.utils.common)
dat.controllers.NumberControllerBox = (function(m, c, e) {
  var g = function(a, d, b) {
    function l() {
      var a = parseFloat(f.__input.value)
      e.isNaN(a) || f.setValue(a)
    }
    function k(a) {
      var b = m - a.clientY
      f.setValue(f.getValue() + b * f.__impliedStep)
      m = a.clientY
    }
    function h() {
      c.unbind(window, 'mousemove', k)
      c.unbind(window, 'mouseup', h)
    }
    this.__truncationSuspended = !1
    g.superclass.call(this, a, d, b)
    var f = this,
      m
    this.__input = document.createElement('input')
    this.__input.setAttribute('type', 'text')
    c.bind(this.__input, 'change', l)
    c.bind(this.__input, 'blur', function() {
      l()
      f.__onFinishChange && f.__onFinishChange.call(f, f.getValue())
    })
    c.bind(this.__input, 'mousedown', function(a) {
      c.bind(window, 'mousemove', k)
      c.bind(window, 'mouseup', h)
      m = a.clientY
    })
    c.bind(this.__input, 'keydown', function(a) {
      13 === a.keyCode &&
        ((f.__truncationSuspended = !0), this.blur(), (f.__truncationSuspended = !1))
    })
    this.updateDisplay()
    this.domElement.appendChild(this.__input)
  }
  g.superclass = m
  e.extend(g.prototype, m.prototype, {
    updateDisplay: function() {
      var a = this.__input
      if (this.__truncationSuspended) var c = this.getValue()
      else {
        c = this.getValue()
        var b = Math.pow(10, this.__precision)
        c = Math.round(c * b) / b
      }
      a.value = c
      return g.superclass.prototype.updateDisplay.call(this)
    },
  })
  return g
})(dat.controllers.NumberController, dat.dom.dom, dat.utils.common)
dat.controllers.NumberControllerSlider = (function(m, c, e, g, a) {
  function d(a, b, c, d, e) {
    return d + ((a - b) / (c - b)) * (e - d)
  }
  var b = function(a, e, g, f, m) {
    function h(a) {
      a.preventDefault()
      var b = c.getOffset(l.__background),
        e = c.getWidth(l.__background)
      l.setValue(d(a.clientX, b.left, b.left + e, l.__min, l.__max))
      return !1
    }
    function k() {
      c.unbind(window, 'mousemove', h)
      c.unbind(window, 'mouseup', k)
      l.__onFinishChange && l.__onFinishChange.call(l, l.getValue())
    }
    b.superclass.call(this, a, e, { min: g, max: f, step: m })
    var l = this
    this.__background = document.createElement('div')
    this.__foreground = document.createElement('div')
    c.bind(this.__background, 'mousedown', function(a) {
      c.bind(window, 'mousemove', h)
      c.bind(window, 'mouseup', k)
      h(a)
    })
    c.addClass(this.__background, 'slider')
    c.addClass(this.__foreground, 'slider-fg')
    this.updateDisplay()
    this.__background.appendChild(this.__foreground)
    this.domElement.appendChild(this.__background)
  }
  b.superclass = m
  b.useDefaultStyles = function() {
    e.inject(a)
  }
  g.extend(b.prototype, m.prototype, {
    updateDisplay: function() {
      var a = (this.getValue() - this.__min) / (this.__max - this.__min)
      this.__foreground.style.width = 100 * a + '%'
      return b.superclass.prototype.updateDisplay.call(this)
    },
  })
  return b
})(
  dat.controllers.NumberController,
  dat.dom.dom,
  dat.utils.css,
  dat.utils.common,
  ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}",
)
dat.controllers.FunctionController = (function(m, c, e) {
  var g = function(a, d, b) {
    g.superclass.call(this, a, d)
    var e = this
    this.__button = document.createElement('div')
    this.__button.innerHTML = void 0 === b ? 'Fire' : b
    c.bind(this.__button, 'click', function(a) {
      a.preventDefault()
      e.fire()
      return !1
    })
    c.addClass(this.__button, 'button')
    this.domElement.appendChild(this.__button)
  }
  g.superclass = m
  e.extend(g.prototype, m.prototype, {
    fire: function() {
      this.__onChange && this.__onChange.call(this)
      this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
      this.getValue().call(this.object)
    },
  })
  return g
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common)
dat.controllers.BooleanController = (function(m, c, e) {
  var g = function(a, d) {
    g.superclass.call(this, a, d)
    var b = this
    this.__prev = this.getValue()
    this.__checkbox = document.createElement('input')
    this.__checkbox.setAttribute('type', 'checkbox')
    c.bind(
      this.__checkbox,
      'change',
      function() {
        b.setValue(!b.__prev)
      },
      !1,
    )
    this.domElement.appendChild(this.__checkbox)
    this.updateDisplay()
  }
  g.superclass = m
  e.extend(g.prototype, m.prototype, {
    setValue: function(a) {
      a = g.superclass.prototype.setValue.call(this, a)
      this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
      this.__prev = this.getValue()
      return a
    },
    updateDisplay: function() {
      !0 === this.getValue()
        ? (this.__checkbox.setAttribute('checked', 'checked'), (this.__checkbox.checked = !0))
        : (this.__checkbox.checked = !1)
      return g.superclass.prototype.updateDisplay.call(this)
    },
  })
  return g
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common)
dat.color.toString = (function(m) {
  return function(c) {
    if (1 == c.a || m.isUndefined(c.a)) {
      for (c = c.hex.toString(16); 6 > c.length; ) c = '0' + c
      return '#' + c
    }
    return (
      'rgba(' + Math.round(c.r) + ',' + Math.round(c.g) + ',' + Math.round(c.b) + ',' + c.a + ')'
    )
  }
})(dat.utils.common)
dat.color.interpret = (function(m, c) {
  var e,
    g,
    a = [
      {
        litmus: c.isString,
        conversions: {
          THREE_CHAR_HEX: {
            read: function(a) {
              a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i)
              return null === a
                ? !1
                : {
                    space: 'HEX',
                    hex: parseInt(
                      '0x' +
                        a[1].toString() +
                        a[1].toString() +
                        a[2].toString() +
                        a[2].toString() +
                        a[3].toString() +
                        a[3].toString(),
                    ),
                  }
            },
            write: m,
          },
          SIX_CHAR_HEX: {
            read: function(a) {
              a = a.match(/^#([A-F0-9]{6})$/i)
              return null === a ? !1 : { space: 'HEX', hex: parseInt('0x' + a[1].toString()) }
            },
            write: m,
          },
          CSS_RGB: {
            read: function(a) {
              a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/)
              return null === a
                ? !1
                : {
                    space: 'RGB',
                    r: parseFloat(a[1]),
                    g: parseFloat(a[2]),
                    b: parseFloat(a[3]),
                  }
            },
            write: m,
          },
          CSS_RGBA: {
            read: function(a) {
              a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/)
              return null === a
                ? !1
                : {
                    space: 'RGB',
                    r: parseFloat(a[1]),
                    g: parseFloat(a[2]),
                    b: parseFloat(a[3]),
                    a: parseFloat(a[4]),
                  }
            },
            write: m,
          },
        },
      },
      {
        litmus: c.isNumber,
        conversions: {
          HEX: {
            read: function(a) {
              return { space: 'HEX', hex: a, conversionName: 'HEX' }
            },
            write: function(a) {
              return a.hex
            },
          },
        },
      },
      {
        litmus: c.isArray,
        conversions: {
          RGB_ARRAY: {
            read: function(a) {
              return 3 != a.length ? !1 : { space: 'RGB', r: a[0], g: a[1], b: a[2] }
            },
            write: function(a) {
              return [a.r, a.g, a.b]
            },
          },
          RGBA_ARRAY: {
            read: function(a) {
              return 4 != a.length ? !1 : { space: 'RGB', r: a[0], g: a[1], b: a[2], a: a[3] }
            },
            write: function(a) {
              return [a.r, a.g, a.b, a.a]
            },
          },
        },
      },
      {
        litmus: c.isObject,
        conversions: {
          RGBA_OBJ: {
            read: function(a) {
              return c.isNumber(a.r) && c.isNumber(a.g) && c.isNumber(a.b) && c.isNumber(a.a)
                ? { space: 'RGB', r: a.r, g: a.g, b: a.b, a: a.a }
                : !1
            },
            write: function(a) {
              return { r: a.r, g: a.g, b: a.b, a: a.a }
            },
          },
          RGB_OBJ: {
            read: function(a) {
              return c.isNumber(a.r) && c.isNumber(a.g) && c.isNumber(a.b)
                ? { space: 'RGB', r: a.r, g: a.g, b: a.b }
                : !1
            },
            write: function(a) {
              return { r: a.r, g: a.g, b: a.b }
            },
          },
          HSVA_OBJ: {
            read: function(a) {
              return c.isNumber(a.h) && c.isNumber(a.s) && c.isNumber(a.v) && c.isNumber(a.a)
                ? { space: 'HSV', h: a.h, s: a.s, v: a.v, a: a.a }
                : !1
            },
            write: function(a) {
              return { h: a.h, s: a.s, v: a.v, a: a.a }
            },
          },
          HSV_OBJ: {
            read: function(a) {
              return c.isNumber(a.h) && c.isNumber(a.s) && c.isNumber(a.v)
                ? { space: 'HSV', h: a.h, s: a.s, v: a.v }
                : !1
            },
            write: function(a) {
              return { h: a.h, s: a.s, v: a.v }
            },
          },
        },
      },
    ]
  return function() {
    g = !1
    var d = 1 < arguments.length ? c.toArray(arguments) : arguments[0]
    c.each(a, function(a) {
      if (a.litmus(d))
        return (
          c.each(a.conversions, function(a, b) {
            e = a.read(d)
            if (!1 === g && !1 !== e)
              return (g = e), (e.conversionName = b), (e.conversion = a), c.BREAK
          }),
          c.BREAK
        )
    })
    return g
  }
})(dat.color.toString, dat.utils.common)
dat.GUI = dat.gui.GUI = (function(m, c, e, g, a, d, b, l, k, h, f, q, n, p, u) {
  function r(b, c, d, e) {
    if (void 0 === c[d]) throw Error('Object ' + c + ' has no property "' + d + '"')
    e.color ? (c = new f(c, d)) : ((c = [c, d].concat(e.factoryArgs)), (c = g.apply(b, c)))
    e.before instanceof a && (e.before = e.before.__li)
    v(b, c)
    p.addClass(c.domElement, 'c')
    d = document.createElement('span')
    p.addClass(d, 'property-name')
    d.innerHTML = c.property
    var h = document.createElement('div')
    h.appendChild(d)
    h.appendChild(c.domElement)
    e = w(b, h, e.before)
    p.addClass(e, F.CLASS_CONTROLLER_ROW)
    p.addClass(e, typeof c.getValue())
    t(b, e, c)
    b.__controllers.push(c)
    return c
  }
  function w(a, b, c) {
    var d = document.createElement('li')
    b && d.appendChild(b)
    c ? a.__ul.insertBefore(d, params.before) : a.__ul.appendChild(d)
    a.onResize()
    return d
  }
  function t(a, c, e) {
    e.__li = c
    e.__gui = a
    u.extend(e, {
      options: function(b) {
        if (1 < arguments.length)
          return (
            e.remove(),
            r(a, e.object, e.property, {
              before: e.__li.nextElementSibling,
              factoryArgs: [u.toArray(arguments)],
            })
          )
        if (u.isArray(b) || u.isObject(b))
          return (
            e.remove(),
            r(a, e.object, e.property, {
              before: e.__li.nextElementSibling,
              factoryArgs: [b],
            })
          )
      },
      name: function(a) {
        e.__li.firstElementChild.firstElementChild.innerHTML = a
        return e
      },
      listen: function() {
        e.__gui.listen(e)
        return e
      },
      remove: function() {
        e.__gui.remove(e)
        return e
      },
    })
    if (e instanceof k) {
      var g = new l(e.object, e.property, {
        min: e.__min,
        max: e.__max,
        step: e.__step,
      })
      u.each(['updateDisplay', 'onChange', 'onFinishChange'], function(a) {
        var b = e[a],
          c = g[a]
        e[a] = g[a] = function() {
          var a = Array.prototype.slice.call(arguments)
          b.apply(e, a)
          return c.apply(g, a)
        }
      })
      p.addClass(c, 'has-slider')
      e.domElement.insertBefore(g.domElement, e.domElement.firstElementChild)
    } else if (e instanceof l) {
      var h = function(b) {
        return u.isNumber(e.__min) && u.isNumber(e.__max)
          ? (e.remove(),
            r(a, e.object, e.property, {
              before: e.__li.nextElementSibling,
              factoryArgs: [e.__min, e.__max, e.__step],
            }))
          : b
      }
      e.min = u.compose(
        h,
        e.min,
      )
      e.max = u.compose(
        h,
        e.max,
      )
    } else
      e instanceof d
        ? (p.bind(c, 'click', function() {
            p.fakeEvent(e.__checkbox, 'click')
          }),
          p.bind(e.__checkbox, 'click', function(a) {
            a.stopPropagation()
          }))
        : e instanceof b
          ? (p.bind(c, 'click', function() {
              p.fakeEvent(e.__button, 'click')
            }),
            p.bind(c, 'mouseover', function() {
              p.addClass(e.__button, 'hover')
            }),
            p.bind(c, 'mouseout', function() {
              p.removeClass(e.__button, 'hover')
            }))
          : e instanceof f &&
            (p.addClass(c, 'color'),
            (e.updateDisplay = u.compose(
              function(a) {
                c.style.borderLeftColor = e.__color.toString()
                return a
              },
              e.updateDisplay,
            )),
            e.updateDisplay())
    e.setValue = u.compose(
      function(b) {
        a.getRoot().__preset_select && e.isModified() && G(a.getRoot(), !0)
        return b
      },
      e.setValue,
    )
  }
  function v(a, b) {
    var c = a.getRoot(),
      d = c.__rememberedObjects.indexOf(b.object)
    if (-1 != d) {
      var e = c.__rememberedObjectIndecesToControllers[d]
      void 0 === e && ((e = {}), (c.__rememberedObjectIndecesToControllers[d] = e))
      e[b.property] = b
      if (c.load && c.load.remembered) {
        c = c.load.remembered
        if (c[a.preset]) c = c[a.preset]
        else if (c.Default) c = c.Default
        else return
        c[d] &&
          void 0 !== c[d][b.property] &&
          ((d = c[d][b.property]), (b.initialValue = d), b.setValue(d))
      }
    }
  }
  function x(a) {
    var b = (a.__save_row = document.createElement('li'))
    p.addClass(a.domElement, 'has-save')
    a.__ul.insertBefore(b, a.__ul.firstChild)
    p.addClass(b, 'save-row')
    var c = document.createElement('span')
    c.innerHTML = '&nbsp;'
    p.addClass(c, 'button gears')
    var d = document.createElement('span')
    d.innerHTML = 'Save'
    p.addClass(d, 'button')
    p.addClass(d, 'save')
    var e = document.createElement('span')
    e.innerHTML = 'New'
    p.addClass(e, 'button')
    p.addClass(e, 'save-as')
    var f = document.createElement('span')
    f.innerHTML = 'Revert'
    p.addClass(f, 'button')
    p.addClass(f, 'revert')
    var g = (a.__preset_select = document.createElement('select'))
    a.load && a.load.remembered
      ? u.each(a.load.remembered, function(b, c) {
          D(a, c, c == a.preset)
        })
      : D(a, 'Default', !1)
    p.bind(g, 'change', function() {
      for (var b = 0; b < a.__preset_select.length; b++)
        a.__preset_select[b].innerHTML = a.__preset_select[b].value
      a.preset = this.value
    })
    b.appendChild(g)
    b.appendChild(c)
    b.appendChild(d)
    b.appendChild(e)
    b.appendChild(f)
    if (J) {
      var h = function() {
        k.style.display = a.useLocalStorage ? 'block' : 'none'
      }
      b = document.getElementById('dg-save-locally')
      var k = document.getElementById('dg-local-explain')
      b.style.display = 'block'
      b = document.getElementById('dg-local-storage')
      'true' === localStorage.getItem(document.location.href + '.isLocal') &&
        b.setAttribute('checked', 'checked')
      h()
      p.bind(b, 'change', function() {
        a.useLocalStorage = !a.useLocalStorage
        h()
      })
    }
    var l = document.getElementById('dg-new-constructor')
    p.bind(l, 'keydown', function(a) {
      !a.metaKey || (67 !== a.which && 67 != a.keyCode) || O.hide()
    })
    p.bind(c, 'click', function() {
      l.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2)
      O.show()
      l.focus()
      l.select()
    })
    p.bind(d, 'click', function() {
      a.save()
    })
    p.bind(e, 'click', function() {
      var b = prompt('Enter a new preset name.')
      b && a.saveAs(b)
    })
    p.bind(f, 'click', function() {
      a.revert()
    })
  }
  function z(a) {
    function b(b) {
      b.preventDefault()
      e = b.clientX
      p.addClass(a.__closeButton, F.CLASS_DRAG)
      p.bind(window, 'mousemove', c)
      p.bind(window, 'mouseup', d)
      return !1
    }
    function c(b) {
      b.preventDefault()
      a.width += e - b.clientX
      a.onResize()
      e = b.clientX
      return !1
    }
    function d() {
      p.removeClass(a.__closeButton, F.CLASS_DRAG)
      p.unbind(window, 'mousemove', c)
      p.unbind(window, 'mouseup', d)
    }
    a.__resize_handle = document.createElement('div')
    u.extend(a.__resize_handle.style, {
      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute',
    })
    var e
    p.bind(a.__resize_handle, 'mousedown', b)
    p.bind(a.__closeButton, 'mousedown', b)
    a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild)
  }
  function C(a, b) {
    a.domElement.style.width = b + 'px'
    a.__save_row && a.autoPlace && (a.__save_row.style.width = b + 'px')
    a.__closeButton && (a.__closeButton.style.width = b + 'px')
  }
  function A(a, b) {
    var c = {}
    u.each(a.__rememberedObjects, function(d, e) {
      var f = {}
      u.each(a.__rememberedObjectIndecesToControllers[e], function(a, c) {
        f[c] = b ? a.initialValue : a.getValue()
      })
      c[e] = f
    })
    return c
  }
  function D(a, b, c) {
    var d = document.createElement('option')
    d.innerHTML = b
    d.value = b
    a.__preset_select.appendChild(d)
    c && (a.__preset_select.selectedIndex = a.__preset_select.length - 1)
  }
  function G(a, b) {
    var c = a.__preset_select[a.__preset_select.selectedIndex]
    c.innerHTML = b ? c.value + '*' : c.value
  }
  function B(a) {
    0 != a.length &&
      q(function() {
        B(a)
      })
    u.each(a, function(a) {
      a.updateDisplay()
    })
  }
  m.inject(e)
  try {
    var J = 'localStorage' in window && null !== window.localStorage
  } catch (y) {
    J = !1
  }
  var O,
    M = !0,
    K,
    H = !1,
    L = [],
    F = function(a) {
      function b() {
        localStorage.setItem(document.location.href + '.gui', JSON.stringify(d.getSaveObject()))
      }
      function c() {
        var a = d.getRoot()
        a.width += 1
        u.defer(function() {
          --a.width
        })
      }
      var d = this
      this.domElement = document.createElement('div')
      this.__ul = document.createElement('ul')
      this.domElement.appendChild(this.__ul)
      p.addClass(this.domElement, 'dg')
      this.__folders = {}
      this.__controllers = []
      this.__rememberedObjects = []
      this.__rememberedObjectIndecesToControllers = []
      this.__listening = []
      a = a || {}
      a = u.defaults(a, { autoPlace: !0, width: F.DEFAULT_WIDTH })
      a = u.defaults(a, { resizable: a.autoPlace, hideable: a.autoPlace })
      u.isUndefined(a.load)
        ? (a.load = { preset: 'Default' })
        : a.preset && (a.load.preset = a.preset)
      u.isUndefined(a.parent) && a.hideable && L.push(this)
      a.resizable = u.isUndefined(a.parent) && a.resizable
      a.autoPlace && u.isUndefined(a.scrollable) && (a.scrollable = !0)
      var e = J && 'true' === localStorage.getItem(document.location.href + '.isLocal')
      Object.defineProperties(this, {
        parent: {
          get: function() {
            return a.parent
          },
        },
        scrollable: {
          get: function() {
            return a.scrollable
          },
        },
        autoPlace: {
          get: function() {
            return a.autoPlace
          },
        },
        preset: {
          get: function() {
            return d.parent ? d.getRoot().preset : a.load.preset
          },
          set: function(b) {
            d.parent ? (d.getRoot().preset = b) : (a.load.preset = b)
            for (b = 0; b < this.__preset_select.length; b++)
              this.__preset_select[b].value == this.preset &&
                (this.__preset_select.selectedIndex = b)
            d.revert()
          },
        },
        width: {
          get: function() {
            return a.width
          },
          set: function(b) {
            a.width = b
            C(d, b)
          },
        },
        name: {
          get: function() {
            return a.name
          },
          set: function(b) {
            a.name = b
            g && (g.innerHTML = a.name)
          },
        },
        closed: {
          get: function() {
            return a.closed
          },
          set: function(b) {
            a.closed = b
            a.closed ? p.addClass(d.__ul, F.CLASS_CLOSED) : p.removeClass(d.__ul, F.CLASS_CLOSED)
            this.onResize()
            d.__closeButton && (d.__closeButton.innerHTML = b ? F.TEXT_OPEN : F.TEXT_CLOSED)
          },
        },
        load: {
          get: function() {
            return a.load
          },
        },
        useLocalStorage: {
          get: function() {
            return e
          },
          set: function(a) {
            J &&
              ((e = a) ? p.bind(window, 'unload', b) : p.unbind(window, 'unload', b),
              localStorage.setItem(document.location.href + '.isLocal', a))
          },
        },
      })
      if (u.isUndefined(a.parent)) {
        a.closed = !1
        p.addClass(this.domElement, F.CLASS_MAIN)
        p.makeSelectable(this.domElement, !1)
        if (J && e) {
          d.useLocalStorage = !0
          var f = localStorage.getItem(document.location.href + '.gui')
          f && (a.load = JSON.parse(f))
        }
        this.__closeButton = document.createElement('div')
        this.__closeButton.innerHTML = F.TEXT_CLOSED
        p.addClass(this.__closeButton, F.CLASS_CLOSE_BUTTON)
        this.domElement.appendChild(this.__closeButton)
        p.bind(this.__closeButton, 'click', function() {
          d.closed = !d.closed
        })
      } else {
        void 0 === a.closed && (a.closed = !0)
        var g = document.createTextNode(a.name)
        p.addClass(g, 'controller-name')
        f = w(d, g)
        p.addClass(this.__ul, F.CLASS_CLOSED)
        p.addClass(f, 'title')
        p.bind(f, 'click', function(a) {
          a.preventDefault()
          d.closed = !d.closed
          return !1
        })
        a.closed || (this.closed = !1)
      }
      a.autoPlace &&
        (u.isUndefined(a.parent) &&
          (M &&
            ((K = document.createElement('div')),
            p.addClass(K, 'dg'),
            p.addClass(K, F.CLASS_AUTO_PLACE_CONTAINER),
            document.body.appendChild(K),
            (M = !1)),
          K.appendChild(this.domElement),
          p.addClass(this.domElement, F.CLASS_AUTO_PLACE)),
        this.parent || C(d, a.width))
      p.bind(window, 'resize', function() {
        d.onResize()
      })
      p.bind(this.__ul, 'webkitTransitionEnd', function() {
        d.onResize()
      })
      p.bind(this.__ul, 'transitionend', function() {
        d.onResize()
      })
      p.bind(this.__ul, 'oTransitionEnd', function() {
        d.onResize()
      })
      this.onResize()
      a.resizable && z(this)
      d.getRoot()
      a.parent || c()
    }
  F.toggleHide = function() {
    H = !H
    u.each(L, function(a) {
      a.domElement.style.zIndex = H ? -999 : 999
      a.domElement.style.opacity = H ? 0 : 1
    })
  }
  F.CLASS_AUTO_PLACE = 'a'
  F.CLASS_AUTO_PLACE_CONTAINER = 'ac'
  F.CLASS_MAIN = 'main'
  F.CLASS_CONTROLLER_ROW = 'cr'
  F.CLASS_TOO_TALL = 'taller-than-window'
  F.CLASS_CLOSED = 'closed'
  F.CLASS_CLOSE_BUTTON = 'close-button'
  F.CLASS_DRAG = 'drag'
  F.DEFAULT_WIDTH = 245
  F.TEXT_CLOSED = 'Close Controls'
  F.TEXT_OPEN = 'Open Controls'
  p.bind(
    window,
    'keydown',
    function(a) {
      'text' === document.activeElement.type ||
        (72 !== a.which && 72 != a.keyCode) ||
        F.toggleHide()
    },
    !1,
  )
  u.extend(F.prototype, {
    add: function(a, b) {
      return r(this, a, b, {
        factoryArgs: Array.prototype.slice.call(arguments, 2),
      })
    },
    addColor: function(a, b) {
      return r(this, a, b, { color: !0 })
    },
    remove: function(a) {
      this.__ul.removeChild(a.__li)
      this.__controllers.slice(this.__controllers.indexOf(a), 1)
      var b = this
      u.defer(function() {
        b.onResize()
      })
    },
    destroy: function() {
      this.autoPlace && K.removeChild(this.domElement)
    },
    addFolder: function(a) {
      if (void 0 !== this.__folders[a])
        throw Error('You already have a folder in this GUI by the name "' + a + '"')
      var b = { name: a, parent: this }
      b.autoPlace = this.autoPlace
      this.load &&
        this.load.folders &&
        this.load.folders[a] &&
        ((b.closed = this.load.folders[a].closed), (b.load = this.load.folders[a]))
      b = new F(b)
      this.__folders[a] = b
      a = w(this, b.domElement)
      p.addClass(a, 'folder')
      return b
    },
    open: function() {
      this.closed = !1
    },
    close: function() {
      this.closed = !0
    },
    onResize: function() {
      var a = this.getRoot()
      if (a.scrollable) {
        var b = p.getOffset(a.__ul).top,
          c = 0
        u.each(a.__ul.childNodes, function(b) {
          ;(a.autoPlace && b === a.__save_row) || (c += p.getHeight(b))
        })
        window.innerHeight - b - 20 < c
          ? (p.addClass(a.domElement, F.CLASS_TOO_TALL),
            (a.__ul.style.height = window.innerHeight - b - 20 + 'px'))
          : (p.removeClass(a.domElement, F.CLASS_TOO_TALL), (a.__ul.style.height = 'auto'))
      }
      a.__resize_handle &&
        u.defer(function() {
          a.__resize_handle.style.height = a.__ul.offsetHeight + 'px'
        })
      a.__closeButton && (a.__closeButton.style.width = a.width + 'px')
    },
    remember: function() {
      u.isUndefined(O) && ((O = new n()), (O.domElement.innerHTML = c))
      if (this.parent) throw Error('You can only call remember on a top level GUI.')
      var a = this
      u.each(Array.prototype.slice.call(arguments), function(b) {
        0 == a.__rememberedObjects.length && x(a)
        ;-1 == a.__rememberedObjects.indexOf(b) && a.__rememberedObjects.push(b)
      })
      this.autoPlace && C(this, this.width)
    },
    getRoot: function() {
      for (var a = this; a.parent; ) a = a.parent
      return a
    },
    getSaveObject: function() {
      var a = this.load
      a.closed = this.closed
      0 < this.__rememberedObjects.length &&
        ((a.preset = this.preset),
        a.remembered || (a.remembered = {}),
        (a.remembered[this.preset] = A(this)))
      a.folders = {}
      u.each(this.__folders, function(b, c) {
        a.folders[c] = b.getSaveObject()
      })
      return a
    },
    save: function() {
      this.load.remembered || (this.load.remembered = {})
      this.load.remembered[this.preset] = A(this)
      G(this, !1)
    },
    saveAs: function(a) {
      this.load.remembered ||
        ((this.load.remembered = {}), (this.load.remembered.Default = A(this, !0)))
      this.load.remembered[a] = A(this)
      this.preset = a
      D(this, a, !0)
    },
    revert: function(a) {
      u.each(
        this.__controllers,
        function(b) {
          this.getRoot().load.remembered ? v(a || this.getRoot(), b) : b.setValue(b.initialValue)
        },
        this,
      )
      u.each(this.__folders, function(a) {
        a.revert(a)
      })
      a || G(this.getRoot(), !1)
    },
    listen: function(a) {
      var b = 0 == this.__listening.length
      this.__listening.push(a)
      b && B(this.__listening)
    },
  })
  return F
})(
  dat.utils.css,
  '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
  ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
  (dat.controllers.factory = (function(m, c, e, g, a, d, b) {
    return function(l, k, h, f) {
      var q = l[k]
      if (b.isArray(h) || b.isObject(h)) return new m(l, k, h)
      if (b.isNumber(q))
        return b.isNumber(h) && b.isNumber(f) ? new e(l, k, h, f) : new c(l, k, { min: h, max: f })
      if (b.isString(q)) return new g(l, k)
      if (b.isFunction(q)) return new a(l, k, '')
      if (b.isBoolean(q)) return new d(l, k)
    }
  })(
    dat.controllers.OptionController,
    dat.controllers.NumberControllerBox,
    dat.controllers.NumberControllerSlider,
    (dat.controllers.StringController = (function(m, c, e) {
      var g = function(a, d) {
        function b() {
          e.setValue(e.__input.value)
        }
        g.superclass.call(this, a, d)
        var e = this
        this.__input = document.createElement('input')
        this.__input.setAttribute('type', 'text')
        c.bind(this.__input, 'keyup', b)
        c.bind(this.__input, 'change', b)
        c.bind(this.__input, 'blur', function() {
          e.__onFinishChange && e.__onFinishChange.call(e, e.getValue())
        })
        c.bind(this.__input, 'keydown', function(a) {
          13 === a.keyCode && this.blur()
        })
        this.updateDisplay()
        this.domElement.appendChild(this.__input)
      }
      g.superclass = m
      e.extend(g.prototype, m.prototype, {
        updateDisplay: function() {
          c.isActive(this.__input) || (this.__input.value = this.getValue())
          return g.superclass.prototype.updateDisplay.call(this)
        },
      })
      return g
    })(dat.controllers.Controller, dat.dom.dom, dat.utils.common)),
    dat.controllers.FunctionController,
    dat.controllers.BooleanController,
    dat.utils.common,
  )),
  dat.controllers.Controller,
  dat.controllers.BooleanController,
  dat.controllers.FunctionController,
  dat.controllers.NumberControllerBox,
  dat.controllers.NumberControllerSlider,
  dat.controllers.OptionController,
  (dat.controllers.ColorController = (function(m, c, e, g, a) {
    function d(b, c, d, e) {
      b.style.background = ''
      a.each(k, function(a) {
        b.style.cssText +=
          'background: ' + a + 'linear-gradient(' + c + ', ' + d + ' 0%, ' + e + ' 100%); '
      })
    }
    function b(a) {
      a.style.background = ''
      a.style.cssText +=
        'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
      a.style.cssText +=
        'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
      a.style.cssText +=
        'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
      a.style.cssText +=
        'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
      a.style.cssText +=
        'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    }
    var l = function(h, f) {
      function k(a) {
        r(a)
        c.bind(window, 'mousemove', r)
        c.bind(window, 'mouseup', n)
      }
      function n() {
        c.unbind(window, 'mousemove', r)
        c.unbind(window, 'mouseup', n)
      }
      function m() {
        var a = g(this.value)
        !1 !== a
          ? ((t.__color.__state = a), t.setValue(t.__color.toOriginal()))
          : (this.value = t.__color.toString())
      }
      function u() {
        c.unbind(window, 'mousemove', w)
        c.unbind(window, 'mouseup', u)
      }
      function r(a) {
        a.preventDefault()
        var b = c.getWidth(t.__saturation_field),
          d = c.getOffset(t.__saturation_field),
          e = (a.clientX - d.left + document.body.scrollLeft) / b
        a = 1 - (a.clientY - d.top + document.body.scrollTop) / b
        1 < a ? (a = 1) : 0 > a && (a = 0)
        1 < e ? (e = 1) : 0 > e && (e = 0)
        t.__color.v = a
        t.__color.s = e
        t.setValue(t.__color.toOriginal())
        return !1
      }
      function w(a) {
        a.preventDefault()
        var b = c.getHeight(t.__hue_field),
          d = c.getOffset(t.__hue_field)
        a = 1 - (a.clientY - d.top + document.body.scrollTop) / b
        1 < a ? (a = 1) : 0 > a && (a = 0)
        t.__color.h = 360 * a
        t.setValue(t.__color.toOriginal())
        return !1
      }
      l.superclass.call(this, h, f)
      this.__color = new e(this.getValue())
      this.__temp = new e(0)
      var t = this
      this.domElement = document.createElement('div')
      c.makeSelectable(this.domElement, !1)
      this.__selector = document.createElement('div')
      this.__selector.className = 'selector'
      this.__saturation_field = document.createElement('div')
      this.__saturation_field.className = 'saturation-field'
      this.__field_knob = document.createElement('div')
      this.__field_knob.className = 'field-knob'
      this.__field_knob_border = '2px solid '
      this.__hue_knob = document.createElement('div')
      this.__hue_knob.className = 'hue-knob'
      this.__hue_field = document.createElement('div')
      this.__hue_field.className = 'hue-field'
      this.__input = document.createElement('input')
      this.__input.type = 'text'
      this.__input_textShadow = '0 1px 1px '
      c.bind(this.__input, 'keydown', function(a) {
        13 === a.keyCode && m.call(this)
      })
      c.bind(this.__input, 'blur', m)
      c.bind(this.__selector, 'mousedown', function(a) {
        c.addClass(this, 'drag').bind(window, 'mouseup', function(a) {
          c.removeClass(t.__selector, 'drag')
        })
      })
      var v = document.createElement('div')
      a.extend(this.__selector.style, {
        width: '122px',
        height: '102px',
        padding: '3px',
        backgroundColor: '#222',
        boxShadow: '0px 1px 3px rgba(0,0,0,0.3)',
      })
      a.extend(this.__field_knob.style, {
        position: 'absolute',
        width: '12px',
        height: '12px',
        border: this.__field_knob_border + (0.5 > this.__color.v ? '#fff' : '#000'),
        boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
        borderRadius: '12px',
        zIndex: 1,
      })
      a.extend(this.__hue_knob.style, {
        position: 'absolute',
        width: '15px',
        height: '2px',
        borderRight: '4px solid #fff',
        zIndex: 1,
      })
      a.extend(this.__saturation_field.style, {
        width: '100px',
        height: '100px',
        border: '1px solid #555',
        marginRight: '3px',
        display: 'inline-block',
        cursor: 'pointer',
      })
      a.extend(v.style, {
        width: '100%',
        height: '100%',
        background: 'none',
      })
      d(v, 'top', 'rgba(0,0,0,0)', '#000')
      a.extend(this.__hue_field.style, {
        width: '15px',
        height: '100px',
        display: 'inline-block',
        border: '1px solid #555',
        cursor: 'ns-resize',
      })
      b(this.__hue_field)
      a.extend(this.__input.style, {
        outline: 'none',
        textAlign: 'center',
        color: '#fff',
        border: 0,
        fontWeight: 'bold',
        textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)',
      })
      c.bind(this.__saturation_field, 'mousedown', k)
      c.bind(this.__field_knob, 'mousedown', k)
      c.bind(this.__hue_field, 'mousedown', function(a) {
        w(a)
        c.bind(window, 'mousemove', w)
        c.bind(window, 'mouseup', u)
      })
      this.__saturation_field.appendChild(v)
      this.__selector.appendChild(this.__field_knob)
      this.__selector.appendChild(this.__saturation_field)
      this.__selector.appendChild(this.__hue_field)
      this.__hue_field.appendChild(this.__hue_knob)
      this.domElement.appendChild(this.__input)
      this.domElement.appendChild(this.__selector)
      this.updateDisplay()
    }
    l.superclass = m
    a.extend(l.prototype, m.prototype, {
      updateDisplay: function() {
        var b = g(this.getValue())
        if (!1 !== b) {
          var c = !1
          a.each(
            e.COMPONENTS,
            function(d) {
              if (
                !a.isUndefined(b[d]) &&
                !a.isUndefined(this.__color.__state[d]) &&
                b[d] !== this.__color.__state[d]
              )
                return (c = !0), {}
            },
            this,
          )
          c && a.extend(this.__color.__state, b)
        }
        a.extend(this.__temp.__state, this.__color.__state)
        this.__temp.a = 1
        var k = 0.5 > this.__color.v || 0.5 < this.__color.s ? 255 : 0,
          l = 255 - k
        a.extend(this.__field_knob.style, {
          marginLeft: 100 * this.__color.s - 7 + 'px',
          marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
          backgroundColor: this.__temp.toString(),
          border: this.__field_knob_border + 'rgb(' + k + ',' + k + ',' + k + ')',
        })
        this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + 'px'
        this.__temp.s = 1
        this.__temp.v = 1
        d(this.__saturation_field, 'left', '#fff', this.__temp.toString())
        a.extend(this.__input.style, {
          backgroundColor: (this.__input.value = this.__color.toString()),
          color: 'rgb(' + k + ',' + k + ',' + k + ')',
          textShadow: this.__input_textShadow + 'rgba(' + l + ',' + l + ',' + l + ',.7)',
        })
      },
    })
    var k = ['-moz-', '-o-', '-webkit-', '-ms-', '']
    return l
  })(
    dat.controllers.Controller,
    dat.dom.dom,
    (dat.color.Color = (function(m, c, e, g) {
      function a(a, c, d) {
        Object.defineProperty(a, c, {
          get: function() {
            if ('RGB' === this.__state.space) return this.__state[c]
            b(this, c, d)
            return this.__state[c]
          },
          set: function(a) {
            'RGB' !== this.__state.space && (b(this, c, d), (this.__state.space = 'RGB'))
            this.__state[c] = a
          },
        })
      }
      function d(a, b) {
        Object.defineProperty(a, b, {
          get: function() {
            if ('HSV' === this.__state.space) return this.__state[b]
            l(this)
            return this.__state[b]
          },
          set: function(a) {
            'HSV' !== this.__state.space && (l(this), (this.__state.space = 'HSV'))
            this.__state[b] = a
          },
        })
      }
      function b(a, b, d) {
        if ('HEX' === a.__state.space) a.__state[b] = c.component_from_hex(a.__state.hex, d)
        else if ('HSV' === a.__state.space)
          g.extend(a.__state, c.hsv_to_rgb(a.__state.h, a.__state.s, a.__state.v))
        else throw 'Corrupted color state'
      }
      function l(a) {
        var b = c.rgb_to_hsv(a.r, a.g, a.b)
        g.extend(a.__state, { s: b.s, v: b.v })
        g.isNaN(b.h) ? g.isUndefined(a.__state.h) && (a.__state.h = 0) : (a.__state.h = b.h)
      }
      var k = function() {
        this.__state = m.apply(this, arguments)
        if (!1 === this.__state) throw 'Failed to interpret color arguments'
        this.__state.a = this.__state.a || 1
      }
      k.COMPONENTS = 'r g b h s v hex a'.split(' ')
      g.extend(k.prototype, {
        toString: function() {
          return e(this)
        },
        toOriginal: function() {
          return this.__state.conversion.write(this)
        },
      })
      a(k.prototype, 'r', 2)
      a(k.prototype, 'g', 1)
      a(k.prototype, 'b', 0)
      d(k.prototype, 'h')
      d(k.prototype, 's')
      d(k.prototype, 'v')
      Object.defineProperty(k.prototype, 'a', {
        get: function() {
          return this.__state.a
        },
        set: function(a) {
          this.__state.a = a
        },
      })
      Object.defineProperty(k.prototype, 'hex', {
        get: function() {
          this.__state.hex = c.rgb_to_hex(this.r, this.g, this.b)
          return this.__state.hex
        },
        set: function(a) {
          this.__state.space = 'HEX'
          this.__state.hex = a
        },
      })
      return k
    })(
      dat.color.interpret,
      (dat.color.math = (function() {
        var m
        return {
          hsv_to_rgb: function(c, e, g) {
            var a = c / 60 - Math.floor(c / 60),
              d = g * (1 - e),
              b = g * (1 - a * e)
            e = g * (1 - (1 - a) * e)
            c = [[g, e, d], [b, g, d], [d, g, e], [d, b, g], [e, d, g], [g, d, b]][
              Math.floor(c / 60) % 6
            ]
            return { r: 255 * c[0], g: 255 * c[1], b: 255 * c[2] }
          },
          rgb_to_hsv: function(c, e, g) {
            var a = Math.max(c, e, g),
              d = a - Math.min(c, e, g)
            if (0 == a) return { h: NaN, s: 0, v: 0 }
            c = (c == a ? (e - g) / d : e == a ? 2 + (g - c) / d : 4 + (c - e) / d) / 6
            0 > c && (c += 1)
            return { h: 360 * c, s: d / a, v: a / 255 }
          },
          rgb_to_hex: function(c, e, g) {
            c = this.hex_with_component(0, 2, c)
            c = this.hex_with_component(c, 1, e)
            return (c = this.hex_with_component(c, 0, g))
          },
          component_from_hex: function(c, e) {
            return (c >> (8 * e)) & 255
          },
          hex_with_component: function(c, e, g) {
            return (g << (m = 8 * e)) | (c & ~(255 << m))
          },
        }
      })()),
      dat.color.toString,
      dat.utils.common,
    )),
    dat.color.interpret,
    dat.utils.common,
  )),
  (dat.utils.requestAnimationFrame = (function() {
    return (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(m, c) {
        window.setTimeout(m, 1e3 / 60)
      }
    )
  })()),
  (dat.dom.CenteredDiv = (function(m, c) {
    var e = function() {
      this.backgroundElement = document.createElement('div')
      c.extend(this.backgroundElement.style, {
        backgroundColor: 'rgba(0,0,0,0.8)',
        top: 0,
        left: 0,
        display: 'none',
        zIndex: '1000',
        opacity: 0,
        WebkitTransition: 'opacity 0.2s linear',
      })
      m.makeFullscreen(this.backgroundElement)
      this.backgroundElement.style.position = 'fixed'
      this.domElement = document.createElement('div')
      c.extend(this.domElement.style, {
        position: 'fixed',
        display: 'none',
        zIndex: '1001',
        opacity: 0,
        WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      })
      document.body.appendChild(this.backgroundElement)
      document.body.appendChild(this.domElement)
      var e = this
      m.bind(this.backgroundElement, 'click', function() {
        e.hide()
      })
    }
    e.prototype.show = function() {
      var e = this
      this.backgroundElement.style.display = 'block'
      this.domElement.style.display = 'block'
      this.domElement.style.opacity = 0
      this.domElement.style.webkitTransform = 'scale(1.1)'
      this.layout()
      c.defer(function() {
        e.backgroundElement.style.opacity = 1
        e.domElement.style.opacity = 1
        e.domElement.style.webkitTransform = 'scale(1)'
      })
    }
    e.prototype.hide = function() {
      var c = this,
        a = function() {
          c.domElement.style.display = 'none'
          c.backgroundElement.style.display = 'none'
          m.unbind(c.domElement, 'webkitTransitionEnd', a)
          m.unbind(c.domElement, 'transitionend', a)
          m.unbind(c.domElement, 'oTransitionEnd', a)
        }
      m.bind(this.domElement, 'webkitTransitionEnd', a)
      m.bind(this.domElement, 'transitionend', a)
      m.bind(this.domElement, 'oTransitionEnd', a)
      this.backgroundElement.style.opacity = 0
      this.domElement.style.opacity = 0
      this.domElement.style.webkitTransform = 'scale(1.1)'
    }
    e.prototype.layout = function() {
      this.domElement.style.left = window.innerWidth / 2 - m.getWidth(this.domElement) / 2 + 'px'
      this.domElement.style.top = window.innerHeight / 2 - m.getHeight(this.domElement) / 2 + 'px'
    }
    return e
  })(dat.dom.dom, dat.utils.common)),
  dat.dom.dom,
  dat.utils.common,
)
function CAreYouSurePanel(m) {
  var c, e, g, a, d, b
  this._init = function() {
    d = new createjs.Container()
    d.alpha = 0
    l.addChild(d)
    b = new createjs.Shape()
    b.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    b.alpha = 0.5
    b.on('click', function() {})
    d.addChild(b)
    var k = s_oSpriteLibrary.getSprite('msg_box')
    c = createBitmap(k)
    c.x = CANVAS_WIDTH_HALF
    c.y = CANVAS_HEIGHT_HALF
    c.regX = 0.5 * k.width
    c.regY = 0.5 * k.height
    d.addChild(c)
    e = new createjs.Text(TEXT_ARE_SURE, '70px ' + FONT_GAME, '#ffffff')
    e.x = CANVAS_WIDTH / 2
    e.y = CANVAS_HEIGHT_HALF - 50
    e.textAlign = 'center'
    e.textBaseline = 'middle'
    d.addChild(e)
    g = new CGfxButton(
      CANVAS_WIDTH / 2 + 250,
      0.5 * CANVAS_HEIGHT + 120,
      s_oSpriteLibrary.getSprite('but_yes'),
      d,
    )
    g.addEventListener(ON_MOUSE_UP, this._onButYes, this)
    a = new CGfxButton(
      CANVAS_WIDTH / 2 - 250,
      0.5 * CANVAS_HEIGHT + 120,
      s_oSpriteLibrary.getSprite('but_no'),
      d,
    )
    a.addEventListener(ON_MOUSE_UP, this._onButNo, this)
  }
  this.show = function() {
    createjs.Tween.get(d)
      .to({ alpha: 1 }, 150, createjs.Ease.quartOut)
      .call(function() {
        s_oGame.pause(!0)
      })
  }
  this.unload = function() {
    createjs.Tween.get(d)
      .to({ alpha: 0 }, 150, createjs.Ease.quartOut)
      .call(function() {
        l.removeChild(d, b)
      })
  }
  this._onButYes = function() {
    createjs.Ticker.paused = !1
    this.unload()
    s_oGame.onExit()
    b.removeAllEventListeners()
  }
  this._onButNo = function() {
    s_oGame.pause(!1)
    this.unload()
    d.visible = !1
    b.removeAllEventListeners()
  }
  var l = m
  this._init()
}
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
function CLaunchBoard(m) {
  var c, e, g, a, d, b
  this._init = function() {
    c = { x: CANVAS_WIDTH_HALF + 660, y: CANVAS_HEIGHT - 60 }
    d = new createjs.Container()
    d.x = c.x
    d.y = c.y
    m.addChild(d)
    e = new createjs.Text('99' + TEXT_OF + NUM_OF_PENALTY, '50px ' + FONT_GAME, TEXT_COLOR)
    e.textAlign = 'right'
    e.y = -4
    d.addChild(e)
    d.y = c.y
    m.addChild(d)
    g = new createjs.Text('99' + TEXT_OF + NUM_OF_PENALTY, '50px ' + FONT_GAME, TEXT_COLOR_STROKE)
    g.textAlign = 'right'
    g.y = e.y
    g.outline = OUTLINE_WIDTH
    d.addChild(g)
    var l = s_oSpriteLibrary.getSprite('shot_left')
    a = createBitmap(l)
    a.x = 1.4 * -e.getBounds().width
    a.regX = 0.5 * l.width
    a.regY = 10
    d.addChild(a)
    b = d.getBounds()
    this.updateCache()
  }
  this.updateCache = function() {
    d.cache(-b.width, -b.height, 2 * b.width, 2 * b.height)
  }
  this.getStartPos = function() {
    return c
  }
  this.setPos = function(a, b) {
    d.x = a
    d.y = b
  }
  this.refreshTextLaunch = function(b, c) {
    e.text = b + TEXT_OF + c
    g.text = e.text
    a.x = 1.4 * -e.getBounds().width
    this.updateCache()
  }
  this._init()
  return this
}
;(function() {
  var m =
      'undefined' !== typeof window && 'undefined' !== typeof window.document
        ? window.document
        : {},
    c = 'undefined' !== typeof module && module.exports,
    e = 'undefined' !== typeof Element && 'ALLOW_KEYBOARD_INPUT' in Element,
    g = (function() {
      for (
        var b,
          a = [
            'requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror'.split(
              ' ',
            ),
            'webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror'.split(
              ' ',
            ),
            'webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror'.split(
              ' ',
            ),
            'mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror'.split(
              ' ',
            ),
            'msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError'.split(
              ' ',
            ),
          ],
          d = 0,
          c = a.length,
          f = {};
        d < c;
        d++
      )
        if ((b = a[d]) && b[1] in m) {
          for (d = 0; d < b.length; d++) f[a[0][d]] = b[d]
          return f
        }
      return !1
    })(),
    a = { change: g.fullscreenchange, error: g.fullscreenerror },
    d = {
      request: function(b) {
        var a = g.requestFullscreen
        b = b || m.documentElement
        if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) b[a]()
        else b[a](e && Element.ALLOW_KEYBOARD_INPUT)
      },
      exit: function() {
        m[g.exitFullscreen]()
      },
      toggle: function(b) {
        this.isFullscreen ? this.exit() : this.request(b)
      },
      onchange: function(b) {
        this.on('change', b)
      },
      onerror: function(b) {
        this.on('error', b)
      },
      on: function(b, d) {
        var c = a[b]
        c && m.addEventListener(c, d, !1)
      },
      off: function(b, d) {
        var c = a[b]
        c && m.removeEventListener(c, d, !1)
      },
      raw: g,
    }
  g
    ? (Object.defineProperties(d, {
        isFullscreen: {
          get: function() {
            return !!m[g.fullscreenElement]
          },
        },
        element: {
          enumerable: !0,
          get: function() {
            return m[g.fullscreenElement]
          },
        },
        enabled: {
          enumerable: !0,
          get: function() {
            return !!m[g.fullscreenEnabled]
          },
        },
      }),
      c ? (module.exports = d) : (window.screenfull = d))
    : c
      ? (module.exports = !1)
      : (window.screenfull = !1)
})()
var s_iOffsetX = 0,
  s_iOffsetY = 0,
  s_fInverseScaling = 0
;(function(m) {
  ;(jQuery.browser = jQuery.browser || {}).mobile =
    /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(
      m,
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(
      m.substr(0, 4),
    )
})(navigator.userAgent || navigator.vendor || window.opera)
$(window).resize(function() {
  sizeHandler()
})
function trace(m) {
  console.log(m)
}
function isIOS() {
  for (
    var m = 'iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod'.split(';');
    m.length;

  )
    if (navigator.platform === m.pop()) return (s_bIsIphone = !0)
  return (s_bIsIphone = !1)
}
function getSize(m) {
  var c = m.toLowerCase(),
    e = window.document,
    g = e.documentElement
  if (void 0 === window['inner' + m]) m = g['client' + m]
  else if (window['inner' + m] != g['client' + m]) {
    var a = e.createElement('body')
    a.id = 'vpw-test-b'
    a.style.cssText = 'overflow:scroll'
    var d = e.createElement('div')
    d.id = 'vpw-test-d'
    d.style.cssText = 'position:absolute;top:-1000px'
    d.innerHTML =
      '<style>@media(' +
      c +
      ':' +
      g['client' + m] +
      'px){body#vpw-test-b div#vpw-test-d{' +
      c +
      ':7px!important}}</style>'
    a.appendChild(d)
    g.insertBefore(a, e.head)
    m = 7 == d['offset' + m] ? g['client' + m] : window['inner' + m]
    g.removeChild(a)
  } else m = window['inner' + m]
  return m
}
function getIOSWindowHeight() {
  return (document.documentElement.clientWidth / window.innerWidth) * window.innerHeight
}
function getHeightOfIOSToolbars() {
  var m = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight()
  return 1 < m ? m : 0
}
function sizeHandler() {
  window.scrollTo(0, 1)
  if ($('#canvas')) {
    var m = navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
      ? getIOSWindowHeight()
      : getSize('Height')
    var c = getSize('Width')
    s_iScaleFactor = Math.min(m / CANVAS_HEIGHT, c / CANVAS_WIDTH)
    var e = CANVAS_WIDTH * s_iScaleFactor,
      g = CANVAS_HEIGHT * s_iScaleFactor
    if (g < m) {
      var a = m - g
      g += a
      e += (CANVAS_WIDTH / CANVAS_HEIGHT) * a
    } else e < c && ((a = c - e), (e += a), (g += (CANVAS_HEIGHT / CANVAS_WIDTH) * a))
    a = m / 2 - g / 2
    var d = c / 2 - e / 2,
      b = CANVAS_WIDTH / e
    if (d * b < -EDGEBOARD_X || a * b < -EDGEBOARD_Y)
      (s_iScaleFactor = Math.min(
        m / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        c / (CANVAS_WIDTH - 2 * EDGEBOARD_X),
      )),
        (e = CANVAS_WIDTH * s_iScaleFactor),
        (g = CANVAS_HEIGHT * s_iScaleFactor),
        (a = (m - g) / 2),
        (d = (c - e) / 2),
        (b = CANVAS_WIDTH / e)
    s_fInverseScaling = b
    s_iOffsetX = -1 * d * b
    s_iOffsetY = -1 * a * b
    0 <= a && (s_iOffsetY = 0)
    0 <= d && (s_iOffsetX = 0)
    null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    $('#canvas').css('width', e + 'px')
    $('#canvas').css('height', g + 'px')
    0 > a
      ? ($('#canvas').css('top', a + 'px'), (s_iCanvasOffsetHeight = a))
      : ($('#canvas').css('top', '0px'), (s_iCanvasOffsetHeight = 0))
    $('#canvas').css('left', d + 'px')
    $('#prediction').css('top', g + 'px')
    resizeCanvas3D()
    s_iCanvasResizeWidth = e
    s_iCanvasResizeHeight = g
    s_iCanvasOffsetWidth = d
  }
}
function createBitmap(m, c, e) {
  var g = new createjs.Bitmap(m),
    a = new createjs.Shape()
  c && e
    ? a.graphics.beginFill('#fff').drawRect(-c / 2, -e / 2, c, e)
    : a.graphics.beginFill('#ff0').drawRect(0, 0, m.width, m.height)
  g.hitArea = a
  return g
}
function createSprite(m, c, e, g, a, d) {
  m = null !== c ? new createjs.Sprite(m, c) : new createjs.Sprite(m)
  c = new createjs.Shape()
  c.graphics.beginFill('#000000').drawRect(-e, -g, a, d)
  m.hitArea = c
  return m
}
function randomFloatBetween(m, c, e) {
  'undefined' === typeof e && (e = 2)
  return parseFloat(Math.min(m + Math.random() * (c - m), c).toFixed(e))
}
function shuffle(m) {
  for (var c = m.length, e, g; 0 !== c; )
    (g = Math.floor(Math.random() * c)), --c, (e = m[c]), (m[c] = m[g]), (m[g] = e)
  return m
}
function formatTime(m) {
  m /= 1e3
  var c = Math.floor(m / 60)
  m = parseFloat(m - 60 * c).toFixed(1)
  var e = ''
  e = 10 > c ? e + ('0' + c + ':') : e + (c + ':')
  return 10 > m ? e + ('0' + m) : e + m
}
function degreesToRadians(m) {
  return (m * Math.PI) / 180
}
function checkRectCollision(m, c) {
  var e = getBounds(m, 0.9)
  var g = getBounds(c, 0.98)
  return calculateIntersection(e, g)
}
function calculateIntersection(m, c) {
  var e, g, a, d
  var b = m.x + (e = m.width / 2)
  var l = m.y + (g = m.height / 2)
  var k = c.x + (a = c.width / 2)
  var h = c.y + (d = c.height / 2)
  b = Math.abs(b - k) - (e + a)
  l = Math.abs(l - h) - (g + d)
  return 0 > b && 0 > l
    ? ((b = Math.min(Math.min(m.width, c.width), -b)),
      (l = Math.min(Math.min(m.height, c.height), -l)),
      {
        x: Math.max(m.x, c.x),
        y: Math.max(m.y, c.y),
        width: b,
        height: l,
        rect1: m,
        rect2: c,
      })
    : null
}
function getBounds(m, c) {
  var e = { x: Infinity, y: Infinity, width: 0, height: 0 }
  if (m instanceof createjs.Container) {
    e.x2 = -Infinity
    e.y2 = -Infinity
    var g = m.children,
      a = g.length,
      d
    for (d = 0; d < a; d++) {
      var b = getBounds(g[d], 1)
      b.x < e.x && (e.x = b.x)
      b.y < e.y && (e.y = b.y)
      b.x + b.width > e.x2 && (e.x2 = b.x + b.width)
      b.y + b.height > e.y2 && (e.y2 = b.y + b.height)
    }
    Infinity == e.x && (e.x = 0)
    Infinity == e.y && (e.y = 0)
    Infinity == e.x2 && (e.x2 = 0)
    Infinity == e.y2 && (e.y2 = 0)
    e.width = e.x2 - e.x
    e.height = e.y2 - e.y
    delete e.x2
    delete e.y2
  } else {
    if (m instanceof createjs.Bitmap) {
      a = m.sourceRect || m.image
      d = a.width * c
      var l = a.height * c
    } else if (m instanceof createjs.Sprite)
      if (
        m.spriteSheet._frames &&
        m.spriteSheet._frames[m.currentFrame] &&
        m.spriteSheet._frames[m.currentFrame].image
      ) {
        a = m.spriteSheet.getFrame(m.currentFrame)
        d = a.rect.width
        l = a.rect.height
        g = a.regX
        var k = a.regY
      } else (e.x = m.x || 0), (e.y = m.y || 0)
    else (e.x = m.x || 0), (e.y = m.y || 0)
    g = g || 0
    d = d || 0
    k = k || 0
    l = l || 0
    e.regX = g
    e.regY = k
    a = m.localToGlobal(0 - g, 0 - k)
    b = m.localToGlobal(d - g, l - k)
    d = m.localToGlobal(d - g, 0 - k)
    g = m.localToGlobal(0 - g, l - k)
    e.x = Math.min(Math.min(Math.min(a.x, b.x), d.x), g.x)
    e.y = Math.min(Math.min(Math.min(a.y, b.y), d.y), g.y)
    e.width = Math.max(Math.max(Math.max(a.x, b.x), d.x), g.x) - e.x
    e.height = Math.max(Math.max(Math.max(a.y, b.y), d.y), g.y) - e.y
  }
  return e
}
function NoClickDelay(m) {
  this.element = m
  window.Touch && this.element.addEventListener('touchstart', this, !1)
}
NoClickDelay.prototype = {
  handleEvent: function(m) {
    switch (m.type) {
      case 'touchstart':
        this.onTouchStart(m)
        break
      case 'touchmove':
        this.onTouchMove(m)
        break
      case 'touchend':
        this.onTouchEnd(m)
    }
  },
  onTouchStart: function(m) {
    m.preventDefault()
    this.moved = !1
    this.element.addEventListener('touchmove', this, !1)
    this.element.addEventListener('touchend', this, !1)
  },
  onTouchMove: function(m) {
    this.moved = !0
  },
  onTouchEnd: function(m) {
    this.element.removeEventListener('touchmove', this, !1)
    this.element.removeEventListener('touchend', this, !1)
    if (!this.moved) {
      m = document.elementFromPoint(m.changedTouches[0].clientX, m.changedTouches[0].clientY)
      3 == m.nodeType && (m = m.parentNode)
      var c = document.createEvent('MouseEvents')
      c.initEvent('click', !0, !0)
      m.dispatchEvent(c)
    }
  },
}
;(function() {
  function m(e) {
    var m = {
      focus: 'visible',
      focusin: 'visible',
      pageshow: 'visible',
      blur: 'hidden',
      focusout: 'hidden',
      pagehide: 'hidden',
    }
    e = e || window.event
    e.type in m
      ? (document.body.className = m[e.type])
      : ((document.body.className = this[c] ? 'hidden' : 'visible'),
        'hidden' === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
  }
  var c = 'hidden'
  c in document
    ? document.addEventListener('visibilitychange', m)
    : (c = 'mozHidden') in document
      ? document.addEventListener('mozvisibilitychange', m)
      : (c = 'webkitHidden') in document
        ? document.addEventListener('webkitvisibilitychange', m)
        : (c = 'msHidden') in document
          ? document.addEventListener('msvisibilitychange', m)
          : 'onfocusin' in document
            ? (document.onfocusin = document.onfocusout = m)
            : (window.onpageshow = window.onpagehide = window.onfocus = window.onblur = m)
})()
function rotateVector2D(m, c) {
  return {
    x: c.x * Math.cos(m) + c.y * Math.sin(m),
    y: c.x * -Math.sin(m) + c.y * Math.cos(m),
  }
}
function normalize(m, c) {
  0 < c && ((m.x /= c), (m.y /= c))
  return m
}
function length(m) {
  return Math.sqrt(m.x * m.x + m.y * m.y)
}
function findNearestIntersectingObject(m, c, e, g) {
  var a = CANVAS_RESIZE_WIDTH + 2 * OFFSET_WIDTH,
    d = CANVAS_RESIZE_HEIGHT + 2 * OFFSET_HEIGHT,
    b = new THREE.Raycaster(),
    l = new THREE.Vector3()
  l.x = (m / a) * 2 - 1
  l.y = 2 * -(c / d) + 1
  l.z = 0.5
  b.setFromCamera(l, e)
  m = b.intersectObjects(g, !0)
  c = !1
  0 < m.length && (c = m[0])
  return c
}
function distance(m, c, e, g) {
  m -= e
  c -= g
  return Math.sqrt(m * m + c * c)
}
function distance2(m, c, e, g) {
  m -= e
  c -= g
  return m * m + c * c
}
function resizeCanvas3D() {
  $('canvas').each(function() {
    '#canvas' != $(this).attr('id') &&
      ($(this).css('width', $('#canvas').css('width')),
      $(this).css('height', $('#canvas').css('height')),
      $(this).css('position', $('#canvas').css('position')),
      $(this).css('left', $('#canvas').css('left')),
      $(this).css('top', $('#canvas').css('top')))
  })
}
function createOrthoGraphicCamera() {
  var m = new THREE.PerspectiveCamera(FOV, CANVAS_WIDTH / CANVAS_HEIGHT, NEAR, FAR)
  m.rotation.x = (Math.PI / 180) * 88.6
  m.rotation.y = (Math.PI / 180) * 0.03
  m.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z)
  m.updateProjectionMatrix()
  m.updateMatrixWorld()
  return m
}
function rotateVector2D(m, c) {
  return {
    x: c.x * Math.cos(m) + c.y * Math.sin(m),
    y: c.x * -Math.sin(m) + c.y * Math.cos(m),
    z: 0,
  }
}
Math.radians = function(m) {
  return (m * Math.PI) / 180
}
Math.degrees = function(m) {
  return (180 * m) / Math.PI
}
function distanceV3(m, c, e, g, a, d) {
  m -= g
  c -= a
  e -= d
  return Math.sqrt(m * m + c * c + e * e)
}
function distanceV2(m, c) {
  var e = m.x - c.x,
    g = m.y - c.y
  return Math.sqrt(e * e + g * g)
}
function saveItem(m, c) {
  localStorage.setItem(m, c)
}
function getItem(m) {
  return localStorage.getItem(m)
}
function clearAllItem() {
  localStorage.clear()
}
// CSpriteLibrary.js
// settings.js
// CPreloader.js
// CMain.js
var s_bMobile,
  s_bAudioActive = !0,
  s_bFullscreen = !1,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_oPhysicsController,
  s_iCanvasResizeHeight,
  s_iCanvasResizeWidth,
  s_iCanvasOffsetHeight,
  s_iCanvasOffsetWidth,
  s_iAdsLevel = 1,
  s_iBestScore = 0,
  s_oDrawLayer,
  s_oStage,
  s_oMain,
  s_oSpriteLibrary,
  s_oSoundTrack = null,
  s_aSounds
// CTextButton.js
// CToggle.js
// CGfxButton.js
// CMenu.js
var s_oMenu = null
// CGame.js
var s_oGame
// CInterface.js
var s_oInterface = null
!(function(m) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = m()
  else {
    var c
    'undefined' != typeof window
      ? (c = window)
      : 'undefined' != typeof global
        ? (c = global)
        : 'undefined' != typeof self && (c = self)
    c.CANNON = m()
  }
})(function() {
  return (function a(c, e, g) {
    function d(k, h) {
      if (!e[k]) {
        if (!c[k]) {
          var f = 'function' == typeof require && require
          if (!h && f) return f(k, !0)
          if (b) return b(k, !0)
          throw Error("Cannot find module '" + k + "'")
        }
        f = e[k] = { exports: {} }
        c[k][0].call(
          f.exports,
          function(b) {
            var a = c[k][1][b]
            return d(a ? a : b)
          },
          f,
          f.exports,
          a,
          c,
          e,
          g,
        )
      }
      return e[k].exports
    }
    for (var b = 'function' == typeof require && require, l = 0; l < g.length; l++) d(g[l])
    return d
  })(
    {
      1: [
        function(c, e, g) {
          e.exports = {
            name: 'cannon',
            version: '0.6.2',
            description: 'A lightweight 3D physics engine written in JavaScript.',
            homepage: 'https://github.com/schteppe/cannon.js',
            author: 'Stefan Hedman <schteppe@gmail.com> (http://steffe.se)',
            keywords: ['cannon.js', 'cannon', 'physics', 'engine', '3d'],
            main: './build/cannon.js',
            engines: { node: '*' },
            repository: {
              type: 'git',
              url: 'https://github.com/schteppe/cannon.js.git',
            },
            bugs: { url: 'https://github.com/schteppe/cannon.js/issues' },
            licenses: [{ type: 'MIT' }],
            devDependencies: {
              jshint: 'latest',
              'uglify-js': 'latest',
              nodeunit: '^0.9.0',
              grunt: '~0.4.0',
              'grunt-contrib-jshint': '~0.1.1',
              'grunt-contrib-nodeunit': '^0.4.1',
              'grunt-contrib-concat': '~0.1.3',
              'grunt-contrib-uglify': '^0.5.1',
              'grunt-browserify': '^2.1.4',
              'grunt-contrib-yuidoc': '^0.5.2',
              browserify: '*',
            },
            dependencies: {},
          }
        },
        {},
      ],
      2: [
        function(c, e, g) {
          e.exports = {
            version: c('../package.json').version,
            AABB: c('./collision/AABB'),
            ArrayCollisionMatrix: c('./collision/ArrayCollisionMatrix'),
            Body: c('./objects/Body'),
            Box: c('./shapes/Box'),
            Broadphase: c('./collision/Broadphase'),
            Constraint: c('./constraints/Constraint'),
            ContactEquation: c('./equations/ContactEquation'),
            Narrowphase: c('./world/Narrowphase'),
            ConeTwistConstraint: c('./constraints/ConeTwistConstraint'),
            ContactMaterial: c('./material/ContactMaterial'),
            ConvexPolyhedron: c('./shapes/ConvexPolyhedron'),
            Cylinder: c('./shapes/Cylinder'),
            DistanceConstraint: c('./constraints/DistanceConstraint'),
            Equation: c('./equations/Equation'),
            EventTarget: c('./utils/EventTarget'),
            FrictionEquation: c('./equations/FrictionEquation'),
            GSSolver: c('./solver/GSSolver'),
            GridBroadphase: c('./collision/GridBroadphase'),
            Heightfield: c('./shapes/Heightfield'),
            HingeConstraint: c('./constraints/HingeConstraint'),
            LockConstraint: c('./constraints/LockConstraint'),
            Mat3: c('./math/Mat3'),
            Material: c('./material/Material'),
            NaiveBroadphase: c('./collision/NaiveBroadphase'),
            ObjectCollisionMatrix: c('./collision/ObjectCollisionMatrix'),
            Pool: c('./utils/Pool'),
            Particle: c('./shapes/Particle'),
            Plane: c('./shapes/Plane'),
            PointToPointConstraint: c('./constraints/PointToPointConstraint'),
            Quaternion: c('./math/Quaternion'),
            Ray: c('./collision/Ray'),
            RaycastVehicle: c('./objects/RaycastVehicle'),
            RaycastResult: c('./collision/RaycastResult'),
            RigidVehicle: c('./objects/RigidVehicle'),
            RotationalEquation: c('./equations/RotationalEquation'),
            RotationalMotorEquation: c('./equations/RotationalMotorEquation'),
            SAPBroadphase: c('./collision/SAPBroadphase'),
            SPHSystem: c('./objects/SPHSystem'),
            Shape: c('./shapes/Shape'),
            Solver: c('./solver/Solver'),
            Sphere: c('./shapes/Sphere'),
            SplitSolver: c('./solver/SplitSolver'),
            Spring: c('./objects/Spring'),
            Trimesh: c('./shapes/Trimesh'),
            Vec3: c('./math/Vec3'),
            Vec3Pool: c('./utils/Vec3Pool'),
            World: c('./world/World'),
          }
        },
        {
          '../package.json': 1,
          './collision/AABB': 3,
          './collision/ArrayCollisionMatrix': 4,
          './collision/Broadphase': 5,
          './collision/GridBroadphase': 6,
          './collision/NaiveBroadphase': 7,
          './collision/ObjectCollisionMatrix': 8,
          './collision/Ray': 9,
          './collision/RaycastResult': 10,
          './collision/SAPBroadphase': 11,
          './constraints/ConeTwistConstraint': 12,
          './constraints/Constraint': 13,
          './constraints/DistanceConstraint': 14,
          './constraints/HingeConstraint': 15,
          './constraints/LockConstraint': 16,
          './constraints/PointToPointConstraint': 17,
          './equations/ContactEquation': 19,
          './equations/Equation': 20,
          './equations/FrictionEquation': 21,
          './equations/RotationalEquation': 22,
          './equations/RotationalMotorEquation': 23,
          './material/ContactMaterial': 24,
          './material/Material': 25,
          './math/Mat3': 27,
          './math/Quaternion': 28,
          './math/Vec3': 30,
          './objects/Body': 31,
          './objects/RaycastVehicle': 32,
          './objects/RigidVehicle': 33,
          './objects/SPHSystem': 34,
          './objects/Spring': 35,
          './shapes/Box': 37,
          './shapes/ConvexPolyhedron': 38,
          './shapes/Cylinder': 39,
          './shapes/Heightfield': 40,
          './shapes/Particle': 41,
          './shapes/Plane': 42,
          './shapes/Shape': 43,
          './shapes/Sphere': 44,
          './shapes/Trimesh': 45,
          './solver/GSSolver': 46,
          './solver/Solver': 47,
          './solver/SplitSolver': 48,
          './utils/EventTarget': 49,
          './utils/Pool': 51,
          './utils/Vec3Pool': 54,
          './world/Narrowphase': 55,
          './world/World': 56,
        },
      ],
      3: [
        function(c, e, g) {
          function a(b) {
            b = b || {}
            this.lowerBound = new d()
            b.lowerBound && this.lowerBound.copy(b.lowerBound)
            this.upperBound = new d()
            b.upperBound && this.upperBound.copy(b.upperBound)
          }
          var d = c('../math/Vec3')
          c('../utils/Utils')
          e.exports = a
          var b = new d()
          a.prototype.setFromPoints = function(a, d, c, l) {
            var h = this.lowerBound,
              f = this.upperBound
            h.copy(a[0])
            c && c.vmult(h, h)
            f.copy(h)
            for (var k = 1; k < a.length; k++) {
              var e = a[k]
              c && (c.vmult(e, b), (e = b))
              e.x > f.x && (f.x = e.x)
              e.x < h.x && (h.x = e.x)
              e.y > f.y && (f.y = e.y)
              e.y < h.y && (h.y = e.y)
              e.z > f.z && (f.z = e.z)
              e.z < h.z && (h.z = e.z)
            }
            d && (d.vadd(h, h), d.vadd(f, f))
            l && ((h.x -= l), (h.y -= l), (h.z -= l), (f.x += l), (f.y += l), (f.z += l))
            return this
          }
          a.prototype.copy = function(b) {
            this.lowerBound.copy(b.lowerBound)
            this.upperBound.copy(b.upperBound)
            return this
          }
          a.prototype.clone = function() {
            return new a().copy(this)
          }
          a.prototype.extend = function(b) {
            var a = b.lowerBound.x
            this.lowerBound.x > a && (this.lowerBound.x = a)
            a = b.upperBound.x
            this.upperBound.x < a && (this.upperBound.x = a)
            a = b.lowerBound.y
            this.lowerBound.y > a && (this.lowerBound.y = a)
            a = b.upperBound.y
            this.upperBound.y < a && (this.upperBound.y = a)
            a = b.lowerBound.z
            this.lowerBound.z > a && (this.lowerBound.z = a)
            a = b.upperBound.z
            this.upperBound.z < a && (this.upperBound.z = a)
          }
          a.prototype.overlaps = function(b) {
            var a = this.lowerBound,
              d = this.upperBound,
              c = b.lowerBound
            b = b.upperBound
            return (
              ((c.x <= d.x && d.x <= b.x) || (a.x <= b.x && b.x <= d.x)) &&
              ((c.y <= d.y && d.y <= b.y) || (a.y <= b.y && b.y <= d.y)) &&
              ((c.z <= d.z && d.z <= b.z) || (a.z <= b.z && b.z <= d.z))
            )
          }
          a.prototype.contains = function(b) {
            var a = this.lowerBound,
              d = this.upperBound,
              c = b.lowerBound
            b = b.upperBound
            return a.x <= c.x && d.x >= b.x && a.y <= c.y && d.y >= b.y && a.z <= c.z && d.z >= b.z
          }
          a.prototype.getCorners = function(b, a, d, c, l, e, g, r) {
            var h = this.lowerBound,
              f = this.upperBound
            b.copy(h)
            a.set(f.x, h.y, h.z)
            d.set(f.x, f.y, h.z)
            c.set(h.x, f.y, f.z)
            l.set(f.x, h.y, h.z)
            e.set(h.x, f.y, h.z)
            g.set(h.x, h.y, f.z)
            r.copy(f)
          }
          var l = [new d(), new d(), new d(), new d(), new d(), new d(), new d(), new d()]
          a.prototype.toLocalFrame = function(b, a) {
            this.getCorners(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7])
            for (var d = 0; 8 !== d; d++) {
              var c = l[d]
              b.pointToLocal(c, c)
            }
            return a.setFromPoints(l)
          }
          a.prototype.toWorldFrame = function(b, a) {
            this.getCorners(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7])
            for (var d = 0; 8 !== d; d++) {
              var c = l[d]
              b.pointToWorld(c, c)
            }
            return a.setFromPoints(l)
          }
        },
        { '../math/Vec3': 30, '../utils/Utils': 53 },
      ],
      4: [
        function(c, e, g) {
          function a() {
            this.matrix = []
          }
          e.exports = a
          a.prototype.get = function(a, b) {
            a = a.index
            b = b.index
            if (b > a) {
              var d = b
              b = a
              a = d
            }
            return this.matrix[((a * (a + 1)) >> 1) + b - 1]
          }
          a.prototype.set = function(a, b, c) {
            a = a.index
            b = b.index
            if (b > a) {
              var d = b
              b = a
              a = d
            }
            this.matrix[((a * (a + 1)) >> 1) + b - 1] = c ? 1 : 0
          }
          a.prototype.reset = function() {
            for (var a = 0, b = this.matrix.length; a !== b; a++) this.matrix[a] = 0
          }
          a.prototype.setNumObjects = function(a) {
            this.matrix.length = (a * (a - 1)) >> 1
          }
        },
        {},
      ],
      5: [
        function(c, e, g) {
          function a() {
            this.world = null
            this.useBoundingBoxes = !1
            this.dirty = !0
          }
          var d = c('../objects/Body')
          g = c('../math/Vec3')
          var b = c('../math/Quaternion')
          c('../shapes/Shape')
          c('../shapes/Plane')
          e.exports = a
          a.prototype.collisionPairs = function(b, a, d) {
            throw Error('collisionPairs not implemented for this BroadPhase class!')
          }
          var l = d.STATIC | d.KINEMATIC
          a.prototype.needBroadphaseCollision = function(b, a) {
            return 0 !== (b.collisionFilterGroup & a.collisionFilterMask) &&
              0 !== (a.collisionFilterGroup & b.collisionFilterMask) &&
              ((0 === (b.type & l) && b.sleepState !== d.SLEEPING) ||
                (0 === (a.type & l) && a.sleepState !== d.SLEEPING))
              ? !0
              : !1
          }
          a.prototype.intersectionTest = function(b, a, d, c) {
            this.useBoundingBoxes
              ? this.doBoundingBoxBroadphase(b, a, d, c)
              : this.doBoundingSphereBroadphase(b, a, d, c)
          }
          var k = new g()
          new g()
          new b()
          new g()
          a.prototype.doBoundingSphereBroadphase = function(b, a, d, c) {
            a.position.vsub(b.position, k)
            var h = Math.pow(b.boundingRadius + a.boundingRadius, 2)
            k.norm2() < h && (d.push(b), c.push(a))
          }
          a.prototype.doBoundingBoxBroadphase = function(b, a, d, c) {
            b.aabbNeedsUpdate && b.computeAABB()
            a.aabbNeedsUpdate && a.computeAABB()
            b.aabb.overlaps(a.aabb) && (d.push(b), c.push(a))
          }
          var h = { keys: [] },
            f = [],
            q = []
          a.prototype.makePairsUnique = function(b, a) {
            for (var d = b.length, c = 0; c !== d; c++) (f[c] = b[c]), (q[c] = a[c])
            b.length = 0
            for (c = a.length = 0; c !== d; c++) {
              var l = f[c].id,
                n = q[c].id
              l = l < n ? l + ',' + n : n + ',' + l
              h[l] = c
              h.keys.push(l)
            }
            for (c = 0; c !== h.keys.length; c++)
              (l = h.keys.pop()), (d = h[l]), b.push(f[d]), a.push(q[d]), delete h[l]
          }
          a.prototype.setWorld = function(b) {}
          var n = new g()
          a.boundingSphereCheck = function(b, a) {
            b.position.vsub(a.position, n)
            return (
              Math.pow(b.shape.boundingSphereRadius + a.shape.boundingSphereRadius, 2) > n.norm2()
            )
          }
          a.prototype.aabbQuery = function(b, a, d) {
            console.warn('.aabbQuery is not implemented in this Broadphase subclass.')
            return []
          }
        },
        {
          '../math/Quaternion': 28,
          '../math/Vec3': 30,
          '../objects/Body': 31,
          '../shapes/Plane': 42,
          '../shapes/Shape': 43,
        },
      ],
      6: [
        function(c, e, g) {
          function a(a, c, l, n, e) {
            d.apply(this)
            this.nx = l || 10
            this.ny = n || 10
            this.nz = e || 10
            this.aabbMin = a || new b(100, 100, 100)
            this.aabbMax = c || new b(-100, -100, -100)
            a = this.nx * this.ny * this.nz
            if (0 >= a) throw "GridBroadphase: Each dimension's n must be >0"
            this.bins = []
            this.binLengths = []
            this.bins.length = a
            this.binLengths.length = a
            for (c = 0; c < a; c++) (this.bins[c] = []), (this.binLengths[c] = 0)
          }
          e.exports = a
          var d = c('./Broadphase'),
            b = c('../math/Vec3'),
            l = c('../shapes/Shape')
          a.prototype = new d()
          a.prototype.constructor = a
          var k = new b()
          new b()
          a.prototype.collisionPairs = function(b, a, d) {
            function c(b, a, d, c, h, f, l) {
              b = ((b - G) * O) | 0
              a = ((a - B) * M) | 0
              d = ((d - J) * K) | 0
              c = P((c - G) * O)
              h = P((h - B) * M)
              f = P((f - J) * K)
              0 > b ? (b = 0) : b >= q && (b = q - 1)
              0 > a ? (a = 0) : a >= g && (a = g - 1)
              0 > d ? (d = 0) : d >= v && (d = v - 1)
              0 > c ? (c = 0) : c >= q && (c = q - 1)
              0 > h ? (h = 0) : h >= g && (h = g - 1)
              0 > f ? (f = 0) : f >= v && (f = v - 1)
              b *= x
              a *= z
              d *= 1
              c *= x
              h *= z
              for (f *= 1; b <= c; b += x)
                for (var e = a; e <= h; e += z)
                  for (var n = d; n <= f; n += 1) {
                    var k = b + e + n
                    N[k][I[k]++] = l
                  }
            }
            var h = b.numObjects()
            b = b.bodies
            var f = this.aabbMax,
              e = this.aabbMin,
              q = this.nx,
              g = this.ny,
              v = this.nz,
              x = g * v,
              z = v,
              C = f.x,
              A = f.y,
              D = f.z,
              G = e.x,
              B = e.y,
              J = e.z,
              O = q / (C - G),
              M = g / (A - B),
              K = v / (D - J)
            C = (C - G) / q
            var H = (A - B) / g
            D = (D - J) / v
            var L = 0.5 * Math.sqrt(C * C + H * H + D * D)
            A = l.types
            var F = A.SPHERE,
              y = A.PLANE,
              N = this.bins,
              I = this.binLengths
            A = this.bins.length
            for (e = 0; e !== A; e++) I[e] = 0
            var P = Math.ceil
            e = Math.min
            f = Math.max
            for (e = 0; e !== h; e++) {
              f = b[e]
              var E = f.shape
              switch (E.type) {
                case F:
                  var T = f.position.x,
                    Q = f.position.y,
                    Y = f.position.z
                  E = E.radius
                  c(T - E, Q - E, Y - E, T + E, Q + E, Y + E, f)
                  break
                case y:
                  E.worldNormalNeedsUpdate && E.computeWorldNormal(f.quaternion)
                  Y = E.worldNormal
                  E = B + 0.5 * H - f.position.y
                  var W = J + 0.5 * D - f.position.z,
                    R = k
                  R.set(G + 0.5 * C - f.position.x, E, W)
                  for (var U = (T = 0); T !== q; T++, U += x, R.y = E, R.x += C)
                    for (var V = (Q = 0); Q !== g; Q++, V += z, R.z = W, R.y += H)
                      for (var Z = 0, S = 0; Z !== v; Z++, S += 1, R.z += D)
                        if (R.dot(Y) < L) {
                          var aa = U + V + S
                          N[aa][I[aa]++] = f
                        }
                  break
                default:
                  f.aabbNeedsUpdate && f.computeAABB(),
                    c(
                      f.aabb.lowerBound.x,
                      f.aabb.lowerBound.y,
                      f.aabb.lowerBound.z,
                      f.aabb.upperBound.x,
                      f.aabb.upperBound.y,
                      f.aabb.upperBound.z,
                      f,
                    )
              }
            }
            for (e = 0; e !== A; e++)
              if (((h = I[e]), 1 < h))
                for (b = N[e], T = 0; T !== h; T++)
                  for (f = b[T], Q = 0; Q !== T; Q++)
                    (C = b[Q]),
                      this.needBroadphaseCollision(f, C) && this.intersectionTest(f, C, a, d)
            this.makePairsUnique(a, d)
          }
        },
        { '../math/Vec3': 30, '../shapes/Shape': 43, './Broadphase': 5 },
      ],
      7: [
        function(c, e, g) {
          function a() {
            d.apply(this)
          }
          e.exports = a
          var d = c('./Broadphase')
          c = c('./AABB')
          a.prototype = new d()
          a.prototype.constructor = a
          a.prototype.collisionPairs = function(b, a, d) {
            b = b.bodies
            var c = b.length,
              f,
              l
            for (f = 0; f !== c; f++)
              for (l = 0; l !== f; l++) {
                var e = b[f]
                var k = b[l]
                this.needBroadphaseCollision(e, k) && this.intersectionTest(e, k, a, d)
              }
          }
          new c()
          a.prototype.aabbQuery = function(b, a, d) {
            d = d || []
            for (var c = 0; c < b.bodies.length; c++) {
              var f = b.bodies[c]
              f.aabbNeedsUpdate && f.computeAABB()
              f.aabb.overlaps(a) && d.push(f)
            }
            return d
          }
        },
        { './AABB': 3, './Broadphase': 5 },
      ],
      8: [
        function(c, e, g) {
          function a() {
            this.matrix = {}
          }
          e.exports = a
          a.prototype.get = function(a, b) {
            a = a.id
            b = b.id
            if (b > a) {
              var d = b
              b = a
              a = d
            }
            return a + '-' + b in this.matrix
          }
          a.prototype.set = function(a, b, c) {
            a = a.id
            b = b.id
            if (b > a) {
              var d = b
              b = a
              a = d
            }
            c ? (this.matrix[a + '-' + b] = !0) : delete this.matrix[a + '-' + b]
          }
          a.prototype.reset = function() {
            this.matrix = {}
          }
          a.prototype.setNumObjects = function(a) {}
        },
        {},
      ],
      9: [
        function(c, e, g) {
          function a(d, c) {
            this.from = d ? d.clone() : new b()
            this.to = c ? c.clone() : new b()
            this._direction = new b()
            this.precision = 1e-4
            this.checkCollisionResponse = !0
            this.skipBackfaces = !1
            this.collisionFilterGroup = this.collisionFilterMask = -1
            this.mode = a.ANY
            this.result = new k()
            this.hasHit = !1
            this.callback = function(b) {}
          }
          function d(b, a, d, c) {
            c.vsub(a, F)
            d.vsub(a, q)
            b.vsub(a, n)
            b = F.dot(F)
            a = F.dot(q)
            d = F.dot(n)
            c = q.dot(q)
            var h = q.dot(n),
              f,
              l
            return 0 <= (f = c * d - a * h) && 0 <= (l = b * h - a * d) && f + l < b * c - a * a
          }
          e.exports = a
          var b = c('../math/Vec3')
          e = c('../math/Quaternion')
          var l = c('../math/Transform')
          c('../shapes/ConvexPolyhedron')
          c('../shapes/Box')
          var k = c('../collision/RaycastResult')
          g = c('../shapes/Shape')
          c = c('../collision/AABB')
          a.prototype.constructor = a
          a.CLOSEST = 1
          a.ANY = 2
          a.ALL = 4
          var h = new c(),
            f = []
          a.prototype.intersectWorld = function(b, d) {
            this.mode = d.mode || a.ANY
            this.result = d.result || new k()
            this.skipBackfaces = !!d.skipBackfaces
            this.collisionFilterMask =
              'undefined' !== typeof d.collisionFilterMask ? d.collisionFilterMask : -1
            this.collisionFilterGroup =
              'undefined' !== typeof d.collisionFilterGroup ? d.collisionFilterGroup : -1
            d.from && this.from.copy(d.from)
            d.to && this.to.copy(d.to)
            this.callback = d.callback || function() {}
            this.hasHit = !1
            this.result.reset()
            this._updateDirection()
            this.getAABB(h)
            f.length = 0
            b.broadphase.aabbQuery(b, h, f)
            this.intersectBodies(f)
            return this.hasHit
          }
          var q = new b(),
            n = new b()
          a.pointInTriangle = d
          var p = new b(),
            u = new e()
          a.prototype.intersectBody = function(b, a) {
            a && ((this.result = a), this._updateDirection())
            var d = this.checkCollisionResponse
            if (
              (!d || b.collisionResponse) &&
              0 !== (this.collisionFilterGroup & b.collisionFilterMask) &&
              0 !== (b.collisionFilterGroup & this.collisionFilterMask)
            )
              for (var c = 0, h = b.shapes.length; c < h; c++) {
                var f = b.shapes[c]
                if (!d || f.collisionResponse)
                  if (
                    (b.quaternion.mult(b.shapeOrientations[c], u),
                    b.quaternion.vmult(b.shapeOffsets[c], p),
                    p.vadd(b.position, p),
                    this.intersectShape(f, u, p, b),
                    this.result._shouldStop)
                  )
                    break
              }
          }
          a.prototype.intersectBodies = function(b, a) {
            a && ((this.result = a), this._updateDirection())
            for (var d = 0, c = b.length; !this.result._shouldStop && d < c; d++)
              this.intersectBody(b[d])
          }
          a.prototype._updateDirection = function() {
            this.to.vsub(this.from, this._direction)
            this._direction.normalize()
          }
          a.prototype.intersectShape = function(b, a, d, c) {
            var h = this.from,
              f = this._direction
            d.vsub(h, F)
            var l = F.dot(f)
            f.mult(l, y)
            y.vadd(h, y)
            d.distanceTo(y) > b.boundingSphereRadius ||
              ((h = this[b.type]) && h.call(this, b, a, d, c))
          }
          new b()
          new b()
          var r = new b(),
            w = new b(),
            t = new b(),
            v = new b()
          new b()
          new k()
          a.prototype.intersectBox = function(b, a, d, c) {
            return this.intersectConvex(b.convexPolyhedronRepresentation, a, d, c)
          }
          a.prototype[g.types.BOX] = a.prototype.intersectBox
          a.prototype.intersectPlane = function(a, d, c, h) {
            var f = this.from,
              l = this.to,
              e = this._direction,
              n = new b(0, 0, 1)
            d.vmult(n, n)
            var k = new b()
            f.vsub(c, k)
            d = k.dot(n)
            l.vsub(c, k)
            k = k.dot(n)
            if (
              !(0 < d * k || f.distanceTo(l) < d || ((k = n.dot(e)), Math.abs(k) < this.precision))
            ) {
              var q = new b()
              l = new b()
              d = new b()
              f.vsub(c, q)
              c = -n.dot(q) / k
              e.scale(c, l)
              f.vadd(l, d)
              this.reportIntersection(n, d, a, h, -1)
            }
          }
          a.prototype[g.types.PLANE] = a.prototype.intersectPlane
          a.prototype.getAABB = function(b) {
            var a = this.to,
              d = this.from
            b.lowerBound.x = Math.min(a.x, d.x)
            b.lowerBound.y = Math.min(a.y, d.y)
            b.lowerBound.z = Math.min(a.z, d.z)
            b.upperBound.x = Math.max(a.x, d.x)
            b.upperBound.y = Math.max(a.y, d.y)
            b.upperBound.z = Math.max(a.z, d.z)
          }
          var x = { faceList: [0] }
          a.prototype.intersectHeightfield = function(d, c, h, f) {
            var e = new b(),
              n = new a(this.from, this.to)
            l.pointToLocalFrame(h, c, n.from, n.from)
            l.pointToLocalFrame(h, c, n.to, n.to)
            var k = [],
              q = null,
              p = null,
              g = null,
              r = null,
              u = d.getIndexOfPosition(n.from.x, n.from.y, k, !1)
            u && ((q = k[0]), (p = k[1]), (g = k[0]), (r = k[1]))
            if ((u = d.getIndexOfPosition(n.to.x, n.to.y, k, !1))) {
              if (null === q || k[0] < q) q = k[0]
              if (null === g || k[0] > g) g = k[0]
              if (null === p || k[1] < p) p = k[1]
              if (null === r || k[1] > r) r = k[1]
            }
            if (null !== q)
              for (d.getRectMinMax(q, p, g, r, []), n = q; n <= g; n++)
                for (k = p; k <= r; k++) {
                  if (this.result._shouldStop) return
                  d.getConvexTrianglePillar(n, k, !1)
                  l.pointToWorldFrame(h, c, d.pillarOffset, e)
                  this.intersectConvex(d.pillarConvex, c, e, f, x)
                  if (this.result._shouldStop) return
                  d.getConvexTrianglePillar(n, k, !0)
                  l.pointToWorldFrame(h, c, d.pillarOffset, e)
                  this.intersectConvex(d.pillarConvex, c, e, f, x)
                }
          }
          a.prototype[g.types.HEIGHTFIELD] = a.prototype.intersectHeightfield
          var z = new b(),
            C = new b()
          a.prototype.intersectSphere = function(b, a, d, c) {
            a = this.from
            var h = this.to,
              f = Math.pow(h.x - a.x, 2) + Math.pow(h.y - a.y, 2) + Math.pow(h.z - a.z, 2),
              l =
                2 *
                ((h.x - a.x) * (a.x - d.x) + (h.y - a.y) * (a.y - d.y) + (h.z - a.z) * (a.z - d.z)),
              e =
                Math.pow(l, 2) -
                4 *
                  f *
                  (Math.pow(a.x - d.x, 2) +
                    Math.pow(a.y - d.y, 2) +
                    Math.pow(a.z - d.z, 2) -
                    Math.pow(b.radius, 2))
            if (!(0 > e))
              if (0 === e)
                a.lerp(h, e, z),
                  z.vsub(d, C),
                  C.normalize(),
                  this.reportIntersection(C, z, b, c, -1)
              else {
                var n = (-l - Math.sqrt(e)) / (2 * f)
                f = (-l + Math.sqrt(e)) / (2 * f)
                0 <= n &&
                  1 >= n &&
                  (a.lerp(h, n, z),
                  z.vsub(d, C),
                  C.normalize(),
                  this.reportIntersection(C, z, b, c, -1))
                !this.result._shouldStop &&
                  0 <= f &&
                  1 >= f &&
                  (a.lerp(h, f, z),
                  z.vsub(d, C),
                  C.normalize(),
                  this.reportIntersection(C, z, b, c, -1))
              }
          }
          a.prototype[g.types.SPHERE] = a.prototype.intersectSphere
          var A = new b()
          new b()
          new b()
          var D = new b()
          a.prototype.intersectConvex = function(b, a, c, h, f) {
            f = (f && f.faceList) || null
            for (
              var l = b.faces,
                e = b.vertices,
                n = b.faceNormals,
                k = this._direction,
                q = this.from,
                p = q.distanceTo(this.to),
                g = f ? f.length : l.length,
                u = this.result,
                y = 0;
              !u._shouldStop && y < g;
              y++
            ) {
              var I = f ? f[y] : y,
                P = l[I],
                E = n[I],
                N = a,
                B = c
              D.copy(e[P[0]])
              N.vmult(D, D)
              D.vadd(B, D)
              D.vsub(q, D)
              N.vmult(E, A)
              E = k.dot(A)
              if (!(Math.abs(E) < this.precision || ((E = A.dot(D) / E), 0 > E)))
                for (
                  k.mult(E, r), r.vadd(q, r), w.copy(e[P[0]]), N.vmult(w, w), B.vadd(w, w), E = 1;
                  !u._shouldStop && E < P.length - 1;
                  E++
                ) {
                  t.copy(e[P[E]])
                  v.copy(e[P[E + 1]])
                  N.vmult(t, t)
                  N.vmult(v, v)
                  B.vadd(t, t)
                  B.vadd(v, v)
                  var J = r.distanceTo(q)
                  ;(!d(r, w, t, v) && !d(r, t, w, v)) ||
                    J > p ||
                    this.reportIntersection(A, r, b, h, I)
                }
            }
          }
          a.prototype[g.types.CONVEXPOLYHEDRON] = a.prototype.intersectConvex
          var G = new b(),
            B = new b(),
            J = new b(),
            O = new b(),
            M = new b(),
            K = new b()
          new c()
          var H = [],
            L = new l()
          a.prototype.intersectTrimesh = function(b, a, c, h, f) {
            f = b.indices
            var e = this.from,
              n = this.to,
              k = this._direction
            L.position.copy(c)
            L.quaternion.copy(a)
            l.vectorToLocalFrame(c, a, k, B)
            l.pointToLocalFrame(c, a, e, J)
            l.pointToLocalFrame(c, a, n, O)
            e = J.distanceSquared(O)
            b.tree.rayQuery(this, L, H)
            n = 0
            for (k = H.length; !this.result._shouldStop && n !== k; n++) {
              var q = H[n]
              b.getNormal(q, G)
              b.getVertex(f[3 * q], w)
              w.vsub(J, D)
              var p = B.dot(G)
              p = G.dot(D) / p
              0 > p ||
                (B.scale(p, r),
                r.vadd(J, r),
                b.getVertex(f[3 * q + 1], t),
                b.getVertex(f[3 * q + 2], v),
                (p = r.distanceSquared(J)),
                (!d(r, t, w, v) && !d(r, w, t, v)) ||
                  p > e ||
                  (l.vectorToWorldFrame(a, G, M),
                  l.pointToWorldFrame(c, a, r, K),
                  this.reportIntersection(M, K, b, h, q)))
            }
            H.length = 0
          }
          a.prototype[g.types.TRIMESH] = a.prototype.intersectTrimesh
          a.prototype.reportIntersection = function(b, d, c, h, f) {
            var e = this.from,
              l = this.to,
              n = e.distanceTo(d),
              k = this.result
            if (!(this.skipBackfaces && 0 < b.dot(this._direction)))
              switch (((k.hitFaceIndex = 'undefined' !== typeof f ? f : -1), this.mode)) {
                case a.ALL:
                  this.hasHit = !0
                  k.set(e, l, b, d, c, h, n)
                  k.hasHit = !0
                  this.callback(k)
                  break
                case a.CLOSEST:
                  if (n < k.distance || !k.hasHit)
                    (this.hasHit = !0), (k.hasHit = !0), k.set(e, l, b, d, c, h, n)
                  break
                case a.ANY:
                  ;(this.hasHit = !0),
                    (k.hasHit = !0),
                    k.set(e, l, b, d, c, h, n),
                    (k._shouldStop = !0)
              }
          }
          var F = new b(),
            y = new b()
        },
        {
          '../collision/AABB': 3,
          '../collision/RaycastResult': 10,
          '../math/Quaternion': 28,
          '../math/Transform': 29,
          '../math/Vec3': 30,
          '../shapes/Box': 37,
          '../shapes/ConvexPolyhedron': 38,
          '../shapes/Shape': 43,
        },
      ],
      10: [
        function(c, e, g) {
          function a() {
            this.rayFromWorld = new d()
            this.rayToWorld = new d()
            this.hitNormalWorld = new d()
            this.hitPointWorld = new d()
            this.hasHit = !1
            this.body = this.shape = null
            this.distance = this.hitFaceIndex = -1
            this._shouldStop = !1
          }
          var d = c('../math/Vec3')
          e.exports = a
          a.prototype.reset = function() {
            this.rayFromWorld.setZero()
            this.rayToWorld.setZero()
            this.hitNormalWorld.setZero()
            this.hitPointWorld.setZero()
            this.hasHit = !1
            this.body = this.shape = null
            this.distance = this.hitFaceIndex = -1
            this._shouldStop = !1
          }
          a.prototype.abort = function() {
            this._shouldStop = !0
          }
          a.prototype.set = function(b, a, d, c, f, e, n) {
            this.rayFromWorld.copy(b)
            this.rayToWorld.copy(a)
            this.hitNormalWorld.copy(d)
            this.hitPointWorld.copy(c)
            this.shape = f
            this.body = e
            this.distance = n
          }
        },
        { '../math/Vec3': 30 },
      ],
      11: [
        function(c, e, g) {
          function a(b) {
            d.apply(this)
            this.axisList = []
            this.world = null
            this.axisIndex = 0
            var a = this.axisList
            this._addBodyHandler = function(b) {
              a.push(b.body)
            }
            this._removeBodyHandler = function(b) {
              b = a.indexOf(b.body)
              ;-1 !== b && a.splice(b, 1)
            }
            b && this.setWorld(b)
          }
          c('../shapes/Shape')
          var d = c('../collision/Broadphase')
          e.exports = a
          a.prototype = new d()
          a.prototype.setWorld = function(b) {
            for (var a = (this.axisList.length = 0); a < b.bodies.length; a++)
              this.axisList.push(b.bodies[a])
            b.removeEventListener('addBody', this._addBodyHandler)
            b.removeEventListener('removeBody', this._removeBodyHandler)
            b.addEventListener('addBody', this._addBodyHandler)
            b.addEventListener('removeBody', this._removeBodyHandler)
            this.world = b
            this.dirty = !0
          }
          a.insertionSortX = function(b) {
            for (var a = 1, d = b.length; a < d; a++) {
              for (
                var c = b[a], f = a - 1;
                0 <= f && !(b[f].aabb.lowerBound.x <= c.aabb.lowerBound.x);
                f--
              )
                b[f + 1] = b[f]
              b[f + 1] = c
            }
            return b
          }
          a.insertionSortY = function(b) {
            for (var a = 1, d = b.length; a < d; a++) {
              for (
                var c = b[a], f = a - 1;
                0 <= f && !(b[f].aabb.lowerBound.y <= c.aabb.lowerBound.y);
                f--
              )
                b[f + 1] = b[f]
              b[f + 1] = c
            }
            return b
          }
          a.insertionSortZ = function(b) {
            for (var a = 1, d = b.length; a < d; a++) {
              for (
                var c = b[a], f = a - 1;
                0 <= f && !(b[f].aabb.lowerBound.z <= c.aabb.lowerBound.z);
                f--
              )
                b[f + 1] = b[f]
              b[f + 1] = c
            }
            return b
          }
          a.prototype.collisionPairs = function(b, d, c) {
            b = this.axisList
            var h = b.length,
              f = this.axisIndex,
              e,
              n
            this.dirty && (this.sortList(), (this.dirty = !1))
            for (e = 0; e !== h; e++) {
              var l = b[e]
              for (n = e + 1; n < h; n++) {
                var k = b[n]
                if (this.needBroadphaseCollision(l, k)) {
                  if (!a.checkBounds(l, k, f)) break
                  this.intersectionTest(l, k, d, c)
                }
              }
            }
          }
          a.prototype.sortList = function() {
            for (var b = this.axisList, d = this.axisIndex, c = b.length, h = 0; h !== c; h++) {
              var f = b[h]
              f.aabbNeedsUpdate && f.computeAABB()
            }
            0 === d
              ? a.insertionSortX(b)
              : 1 === d
                ? a.insertionSortY(b)
                : 2 === d && a.insertionSortZ(b)
          }
          a.checkBounds = function(b, a, d) {
            if (0 === d) {
              var c = b.position.x
              var f = a.position.x
            } else
              1 === d
                ? ((c = b.position.y), (f = a.position.y))
                : 2 === d && ((c = b.position.z), (f = a.position.z))
            return f - a.boundingRadius < c + b.boundingRadius
          }
          a.prototype.autoDetectAxis = function() {
            for (
              var b = 0,
                a = 0,
                d = 0,
                c = 0,
                f = 0,
                e = 0,
                n = this.axisList,
                p = n.length,
                g = 1 / p,
                r = 0;
              r !== p;
              r++
            ) {
              var w = n[r],
                t = w.position.x
              b += t
              a += t * t
              t = w.position.y
              d += t
              c += t * t
              w = w.position.z
              f += w
              e += w * w
            }
            b = a - b * b * g
            d = c - d * d * g
            f = e - f * f * g
            this.axisIndex = b > d ? (b > f ? 0 : 2) : d > f ? 1 : 2
          }
          a.prototype.aabbQuery = function(b, a, d) {
            d = d || []
            this.dirty && (this.sortList(), (this.dirty = !1))
            b = this.axisList
            for (var c = 0; c < b.length; c++) {
              var f = b[c]
              f.aabbNeedsUpdate && f.computeAABB()
              f.aabb.overlaps(a) && d.push(f)
            }
            return d
          }
        },
        { '../collision/Broadphase': 5, '../shapes/Shape': 43 },
      ],
      12: [
        function(c, e, g) {
          function a(a, c, e) {
            e = e || {}
            var h = 'undefined' !== typeof e.maxForce ? e.maxForce : 1e6,
              f = e.pivotA ? e.pivotA.clone() : new k(),
              q = e.pivotB ? e.pivotB.clone() : new k()
            this.axisA = e.axisA ? e.axisA.clone() : new k()
            this.axisB = e.axisB ? e.axisB.clone() : new k()
            d.call(this, a, f, c, q, h)
            this.collideConnected = !!e.collideConnected
            this.angle = 'undefined' !== typeof e.angle ? e.angle : 0
            f = this.coneEquation = new b(a, c, e)
            a = this.twistEquation = new l(a, c, e)
            this.twistAngle = 'undefined' !== typeof e.twistAngle ? e.twistAngle : 0
            f.maxForce = 0
            f.minForce = -h
            a.maxForce = 0
            a.minForce = -h
            this.equations.push(f, a)
          }
          e.exports = a
          c('./Constraint')
          var d = c('./PointToPointConstraint'),
            b = c('../equations/ConeEquation'),
            l = c('../equations/RotationalEquation')
          c('../equations/ContactEquation')
          var k = c('../math/Vec3')
          a.prototype = new d()
          a.constructor = a
          new k()
          new k()
          a.prototype.update = function() {
            var b = this.bodyA,
              a = this.bodyB,
              c = this.coneEquation,
              e = this.twistEquation
            d.prototype.update.call(this)
            b.vectorToWorldFrame(this.axisA, c.axisA)
            a.vectorToWorldFrame(this.axisB, c.axisB)
            this.axisA.tangents(e.axisA, e.axisA)
            b.vectorToWorldFrame(e.axisA, e.axisA)
            this.axisB.tangents(e.axisB, e.axisB)
            a.vectorToWorldFrame(e.axisB, e.axisB)
            c.angle = this.angle
            e.maxAngle = this.twistAngle
          }
        },
        {
          '../equations/ConeEquation': 18,
          '../equations/ContactEquation': 19,
          '../equations/RotationalEquation': 22,
          '../math/Vec3': 30,
          './Constraint': 13,
          './PointToPointConstraint': 17,
        },
      ],
      13: [
        function(c, e, g) {
          function a(b, c, e) {
            e = d.defaults(e, { collideConnected: !0, wakeUpBodies: !0 })
            this.equations = []
            this.bodyA = b
            this.bodyB = c
            this.id = a.idCounter++
            this.collideConnected = e.collideConnected
            e.wakeUpBodies && (b && b.wakeUp(), c && c.wakeUp())
          }
          e.exports = a
          var d = c('../utils/Utils')
          a.prototype.update = function() {
            throw Error('method update() not implmemented in this Constraint subclass!')
          }
          a.prototype.enable = function() {
            for (var b = this.equations, a = 0; a < b.length; a++) b[a].enabled = !0
          }
          a.prototype.disable = function() {
            for (var b = this.equations, a = 0; a < b.length; a++) b[a].enabled = !1
          }
          a.idCounter = 0
        },
        { '../utils/Utils': 53 },
      ],
      14: [
        function(c, e, g) {
          function a(a, c, h, f) {
            d.call(this, a, c)
            'undefined' === typeof h && (h = a.position.distanceTo(c.position))
            'undefined' === typeof f && (f = 1e6)
            this.distance = h
            a = this.distanceEquation = new b(a, c)
            this.equations.push(a)
            a.minForce = -f
            a.maxForce = f
          }
          e.exports = a
          var d = c('./Constraint'),
            b = c('../equations/ContactEquation')
          a.prototype = new d()
          a.prototype.update = function() {
            var b = this.distanceEquation,
              a = 0.5 * this.distance,
              d = b.ni
            this.bodyB.position.vsub(this.bodyA.position, d)
            d.normalize()
            d.mult(a, b.ri)
            d.mult(-a, b.rj)
          }
        },
        { '../equations/ContactEquation': 19, './Constraint': 13 },
      ],
      15: [
        function(c, e, g) {
          function a(a, c, f) {
            f = f || {}
            var e = 'undefined' !== typeof f.maxForce ? f.maxForce : 1e6,
              h = f.pivotA ? f.pivotA.clone() : new k(),
              n = f.pivotB ? f.pivotB.clone() : new k()
            d.call(this, a, h, c, n, e)
            ;(this.axisA = f.axisA ? f.axisA.clone() : new k(1, 0, 0)).normalize()
            ;(this.axisB = f.axisB ? f.axisB.clone() : new k(1, 0, 0)).normalize()
            h = this.rotationalEquation1 = new b(a, c, f)
            f = this.rotationalEquation2 = new b(a, c, f)
            a = this.motorEquation = new l(a, c, e)
            a.enabled = !1
            this.equations.push(h, f, a)
          }
          e.exports = a
          c('./Constraint')
          var d = c('./PointToPointConstraint'),
            b = c('../equations/RotationalEquation'),
            l = c('../equations/RotationalMotorEquation')
          c('../equations/ContactEquation')
          var k = c('../math/Vec3')
          a.prototype = new d()
          a.constructor = a
          a.prototype.enableMotor = function() {
            this.motorEquation.enabled = !0
          }
          a.prototype.disableMotor = function() {
            this.motorEquation.enabled = !1
          }
          a.prototype.setMotorSpeed = function(b) {
            this.motorEquation.targetVelocity = b
          }
          a.prototype.setMotorMaxForce = function(b) {
            this.motorEquation.maxForce = b
            this.motorEquation.minForce = -b
          }
          var h = new k(),
            f = new k()
          a.prototype.update = function() {
            var b = this.bodyA,
              a = this.bodyB,
              c = this.motorEquation,
              e = this.rotationalEquation1,
              l = this.rotationalEquation2,
              k = this.axisA,
              g = this.axisB
            d.prototype.update.call(this)
            b.quaternion.vmult(k, h)
            a.quaternion.vmult(g, f)
            h.tangents(e.axisA, l.axisA)
            e.axisB.copy(f)
            l.axisB.copy(f)
            this.motorEquation.enabled &&
              (b.quaternion.vmult(this.axisA, c.axisA), a.quaternion.vmult(this.axisB, c.axisB))
          }
        },
        {
          '../equations/ContactEquation': 19,
          '../equations/RotationalEquation': 22,
          '../equations/RotationalMotorEquation': 23,
          '../math/Vec3': 30,
          './Constraint': 13,
          './PointToPointConstraint': 17,
        },
      ],
      16: [
        function(c, e, g) {
          function a(a, c, f) {
            f = f || {}
            var e = 'undefined' !== typeof f.maxForce ? f.maxForce : 1e6,
              h = new l(),
              k = new l(),
              g = new l()
            a.position.vadd(c.position, g)
            g.scale(0.5, g)
            c.pointToLocalFrame(g, k)
            a.pointToLocalFrame(g, h)
            d.call(this, a, h, c, k, e)
            e = this.rotationalEquation1 = new b(a, c, f)
            h = this.rotationalEquation2 = new b(a, c, f)
            a = this.rotationalEquation3 = new b(a, c, f)
            this.equations.push(e, h, a)
          }
          e.exports = a
          c('./Constraint')
          var d = c('./PointToPointConstraint'),
            b = c('../equations/RotationalEquation')
          c('../equations/RotationalMotorEquation')
          c('../equations/ContactEquation')
          var l = c('../math/Vec3')
          a.prototype = new d()
          a.constructor = a
          new l()
          new l()
          a.prototype.update = function() {
            var b = this.bodyA,
              a = this.bodyB,
              c = this.rotationalEquation1,
              e = this.rotationalEquation2,
              n = this.rotationalEquation3
            d.prototype.update.call(this)
            b.vectorToWorldFrame(l.UNIT_X, c.axisA)
            a.vectorToWorldFrame(l.UNIT_Y, c.axisB)
            b.vectorToWorldFrame(l.UNIT_Y, e.axisA)
            a.vectorToWorldFrame(l.UNIT_Z, e.axisB)
            b.vectorToWorldFrame(l.UNIT_Z, n.axisA)
            a.vectorToWorldFrame(l.UNIT_X, n.axisB)
          }
        },
        {
          '../equations/ContactEquation': 19,
          '../equations/RotationalEquation': 22,
          '../equations/RotationalMotorEquation': 23,
          '../math/Vec3': 30,
          './Constraint': 13,
          './PointToPointConstraint': 17,
        },
      ],
      17: [
        function(c, e, g) {
          function a(a, c, f, e, n) {
            d.call(this, a, f)
            n = 'undefined' !== typeof n ? n : 1e6
            this.pivotA = c ? c.clone() : new l()
            this.pivotB = e ? e.clone() : new l()
            c = this.equationX = new b(a, f)
            e = this.equationY = new b(a, f)
            a = this.equationZ = new b(a, f)
            this.equations.push(c, e, a)
            c.minForce = e.minForce = a.minForce = -n
            c.maxForce = e.maxForce = a.maxForce = n
            c.ni.set(1, 0, 0)
            e.ni.set(0, 1, 0)
            a.ni.set(0, 0, 1)
          }
          e.exports = a
          var d = c('./Constraint'),
            b = c('../equations/ContactEquation'),
            l = c('../math/Vec3')
          a.prototype = new d()
          a.prototype.update = function() {
            var b = this.bodyB,
              a = this.equationX,
              d = this.equationY,
              c = this.equationZ
            this.bodyA.quaternion.vmult(this.pivotA, a.ri)
            b.quaternion.vmult(this.pivotB, a.rj)
            d.ri.copy(a.ri)
            d.rj.copy(a.rj)
            c.ri.copy(a.ri)
            c.rj.copy(a.rj)
          }
        },
        {
          '../equations/ContactEquation': 19,
          '../math/Vec3': 30,
          './Constraint': 13,
        },
      ],
      18: [
        function(c, e, g) {
          function a(a, c, e) {
            e = e || {}
            var f = 'undefined' !== typeof e.maxForce ? e.maxForce : 1e6
            b.call(this, a, c, -f, f)
            this.axisA = e.axisA ? e.axisA.clone() : new d(1, 0, 0)
            this.axisB = e.axisB ? e.axisB.clone() : new d(0, 1, 0)
            this.angle = 'undefined' !== typeof e.angle ? e.angle : 0
          }
          e.exports = a
          var d = c('../math/Vec3')
          c('../math/Mat3')
          var b = c('./Equation')
          a.prototype = new b()
          a.prototype.constructor = a
          var l = new d(),
            k = new d()
          a.prototype.computeB = function(b) {
            var a = this.a,
              d = this.b,
              c = this.axisA,
              e = this.axisB,
              h = this.jacobianElementA,
              g = this.jacobianElementB
            c.cross(e, l)
            e.cross(c, k)
            h.rotational.copy(k)
            g.rotational.copy(l)
            c = Math.cos(this.angle) - c.dot(e)
            e = this.computeGW()
            h = this.computeGiMf()
            return -c * a - e * d - b * h
          }
        },
        { '../math/Mat3': 27, '../math/Vec3': 30, './Equation': 20 },
      ],
      19: [
        function(c, e, g) {
          function a(a, c, e) {
            d.call(this, a, c, 0, 'undefined' !== typeof e ? e : 1e6)
            this.restitution = 0
            this.ri = new b()
            this.rj = new b()
            this.ni = new b()
          }
          e.exports = a
          var d = c('./Equation'),
            b = c('../math/Vec3')
          c('../math/Mat3')
          a.prototype = new d()
          a.prototype.constructor = a
          var l = new b(),
            k = new b(),
            h = new b()
          a.prototype.computeB = function(b) {
            var a = this.a,
              c = this.b,
              d = this.bi,
              e = this.bj,
              f = this.ri,
              n = this.rj,
              q = d.velocity,
              p = d.angularVelocity,
              g = e.velocity,
              r = e.angularVelocity,
              u = this.jacobianElementA,
              O = this.jacobianElementB,
              M = this.ni
            f.cross(M, l)
            n.cross(M, k)
            M.negate(u.spatial)
            l.negate(u.rotational)
            O.spatial.copy(M)
            O.rotational.copy(k)
            h.copy(e.position)
            h.vadd(n, h)
            h.vsub(d.position, h)
            h.vsub(f, h)
            d = M.dot(h)
            e = this.restitution + 1
            q = e * g.dot(M) - e * q.dot(M) + r.dot(k) - p.dot(l)
            p = this.computeGiMf()
            return -d * a - q * c - b * p
          }
          var f = new b(),
            q = new b(),
            n = new b(),
            p = new b(),
            u = new b()
          a.prototype.getImpactVelocityAlongNormal = function() {
            this.bi.position.vadd(this.ri, n)
            this.bj.position.vadd(this.rj, p)
            this.bi.getVelocityAtWorldPoint(n, f)
            this.bj.getVelocityAtWorldPoint(p, q)
            f.vsub(q, u)
            return this.ni.dot(u)
          }
        },
        { '../math/Mat3': 27, '../math/Vec3': 30, './Equation': 20 },
      ],
      20: [
        function(c, e, g) {
          function a(b, c, e, f) {
            this.id = a.id++
            this.minForce = 'undefined' === typeof e ? -1e6 : e
            this.maxForce = 'undefined' === typeof f ? 1e6 : f
            this.bi = b
            this.bj = c
            this.eps = this.b = this.a = 0
            this.jacobianElementA = new d()
            this.jacobianElementB = new d()
            this.enabled = !0
            this.setSpookParams(1e7, 4, 1 / 60)
          }
          e.exports = a
          var d = c('../math/JacobianElement')
          c = c('../math/Vec3')
          a.prototype.constructor = a
          a.id = 0
          a.prototype.setSpookParams = function(b, a, c) {
            this.a = 4 / (c * (1 + 4 * a))
            this.b = (4 * a) / (1 + 4 * a)
            this.eps = 4 / (c * c * b * (1 + 4 * a))
          }
          a.prototype.computeB = function(b, a, c) {
            var d = this.computeGW(),
              e = this.computeGq(),
              f = this.computeGiMf()
            return -e * b - d * a - f * c
          }
          a.prototype.computeGq = function() {
            var b = this.jacobianElementB,
              a = this.bj.position
            return this.jacobianElementA.spatial.dot(this.bi.position) + b.spatial.dot(a)
          }
          var b = new c()
          a.prototype.computeGW = function() {
            var a = this.jacobianElementB,
              c = this.bi,
              d = this.bj,
              e = d.velocity
            d = d.angularVelocity || b
            return (
              this.jacobianElementA.multiplyVectors(c.velocity, c.angularVelocity || b) +
              a.multiplyVectors(e, d)
            )
          }
          a.prototype.computeGWlambda = function() {
            var a = this.jacobianElementB,
              c = this.bi,
              d = this.bj,
              e = d.vlambda
            d = d.wlambda || b
            return (
              this.jacobianElementA.multiplyVectors(c.vlambda, c.wlambda || b) +
              a.multiplyVectors(e, d)
            )
          }
          var l = new c(),
            k = new c(),
            h = new c(),
            f = new c()
          a.prototype.computeGiMf = function() {
            var a = this.jacobianElementA,
              b = this.jacobianElementB,
              c = this.bi,
              d = this.bj,
              e = c.force,
              n = c.torque,
              q = d.force,
              g = d.torque,
              C = c.invMassSolve,
              A = d.invMassSolve
            c.invInertiaWorldSolve ? c.invInertiaWorldSolve.vmult(n, h) : h.set(0, 0, 0)
            d.invInertiaWorldSolve ? d.invInertiaWorldSolve.vmult(g, f) : f.set(0, 0, 0)
            e.mult(C, l)
            q.mult(A, k)
            return a.multiplyVectors(l, h) + b.multiplyVectors(k, f)
          }
          var q = new c()
          a.prototype.computeGiMGt = function() {
            var a = this.jacobianElementA,
              b = this.jacobianElementB,
              c = this.bi,
              d = this.bj,
              e = c.invInertiaWorldSolve,
              f = d.invInertiaWorldSolve
            c = c.invMassSolve + d.invMassSolve
            e && (e.vmult(a.rotational, q), (c += q.dot(a.rotational)))
            f && (f.vmult(b.rotational, q), (c += q.dot(b.rotational)))
            return c
          }
          var n = new c()
          new c()
          new c()
          new c()
          new c()
          new c()
          a.prototype.addToWlambda = function(a) {
            var b = this.jacobianElementA,
              c = this.jacobianElementB,
              d = this.bi,
              e = this.bj
            b.spatial.mult(d.invMassSolve * a, n)
            d.vlambda.vadd(n, d.vlambda)
            c.spatial.mult(e.invMassSolve * a, n)
            e.vlambda.vadd(n, e.vlambda)
            d.invInertiaWorldSolve &&
              (d.invInertiaWorldSolve.vmult(b.rotational, n),
              n.mult(a, n),
              d.wlambda.vadd(n, d.wlambda))
            e.invInertiaWorldSolve &&
              (e.invInertiaWorldSolve.vmult(c.rotational, n),
              n.mult(a, n),
              e.wlambda.vadd(n, e.wlambda))
          }
          a.prototype.computeC = function() {
            return this.computeGiMGt() + this.eps
          }
        },
        { '../math/JacobianElement': 26, '../math/Vec3': 30 },
      ],
      21: [
        function(c, e, g) {
          function a(a, c, e) {
            d.call(this, a, c, -e, e)
            this.ri = new b()
            this.rj = new b()
            this.t = new b()
          }
          e.exports = a
          var d = c('./Equation'),
            b = c('../math/Vec3')
          c('../math/Mat3')
          a.prototype = new d()
          a.prototype.constructor = a
          var l = new b(),
            k = new b()
          a.prototype.computeB = function(a) {
            var b = this.b,
              c = this.rj,
              d = this.t
            this.ri.cross(d, l)
            c.cross(d, k)
            c = this.jacobianElementA
            var e = this.jacobianElementB
            d.negate(c.spatial)
            l.negate(c.rotational)
            e.spatial.copy(d)
            e.rotational.copy(k)
            d = this.computeGW()
            c = this.computeGiMf()
            return -d * b - a * c
          }
        },
        { '../math/Mat3': 27, '../math/Vec3': 30, './Equation': 20 },
      ],
      22: [
        function(c, e, g) {
          function a(a, c, e) {
            e = e || {}
            var f = 'undefined' !== typeof e.maxForce ? e.maxForce : 1e6
            b.call(this, a, c, -f, f)
            this.axisA = e.axisA ? e.axisA.clone() : new d(1, 0, 0)
            this.axisB = e.axisB ? e.axisB.clone() : new d(0, 1, 0)
            this.maxAngle = Math.PI / 2
          }
          e.exports = a
          var d = c('../math/Vec3')
          c('../math/Mat3')
          var b = c('./Equation')
          a.prototype = new b()
          a.prototype.constructor = a
          var l = new d(),
            k = new d()
          a.prototype.computeB = function(a) {
            var b = this.a,
              c = this.b,
              d = this.axisA,
              e = this.axisB,
              h = this.jacobianElementA,
              g = this.jacobianElementB
            d.cross(e, l)
            e.cross(d, k)
            h.rotational.copy(k)
            g.rotational.copy(l)
            d = Math.cos(this.maxAngle) - d.dot(e)
            e = this.computeGW()
            h = this.computeGiMf()
            return -d * b - e * c - a * h
          }
        },
        { '../math/Mat3': 27, '../math/Vec3': 30, './Equation': 20 },
      ],
      23: [
        function(c, e, g) {
          function a(a, c, e) {
            e = 'undefined' !== typeof e ? e : 1e6
            b.call(this, a, c, -e, e)
            this.axisA = new d()
            this.axisB = new d()
            this.targetVelocity = 0
          }
          e.exports = a
          var d = c('../math/Vec3')
          c('../math/Mat3')
          var b = c('./Equation')
          a.prototype = new b()
          a.prototype.constructor = a
          a.prototype.computeB = function(a) {
            var b = this.b,
              c = this.axisB,
              d = this.jacobianElementB
            this.jacobianElementA.rotational.copy(this.axisA)
            c.negate(d.rotational)
            c = this.computeGW() - this.targetVelocity
            d = this.computeGiMf()
            return -c * b - a * d
          }
        },
        { '../math/Mat3': 27, '../math/Vec3': 30, './Equation': 20 },
      ],
      24: [
        function(c, e, g) {
          function a(b, c, e) {
            e = d.defaults(e, {
              friction: 0.3,
              restitution: 0.3,
              contactEquationStiffness: 1e7,
              contactEquationRelaxation: 3,
              frictionEquationStiffness: 1e7,
              frictionEquationRelaxation: 3,
            })
            this.id = a.idCounter++
            this.materials = [b, c]
            this.friction = e.friction
            this.restitution = e.restitution
            this.contactEquationStiffness = e.contactEquationStiffness
            this.contactEquationRelaxation = e.contactEquationRelaxation
            this.frictionEquationStiffness = e.frictionEquationStiffness
            this.frictionEquationRelaxation = e.frictionEquationRelaxation
          }
          var d = c('../utils/Utils')
          e.exports = a
          a.idCounter = 0
        },
        { '../utils/Utils': 53 },
      ],
      25: [
        function(c, e, g) {
          function a(c) {
            var b = ''
            c = c || {}
            'string' === typeof c ? ((b = c), (c = {})) : 'object' === typeof c && (b = '')
            this.name = b
            this.id = a.idCounter++
            this.friction = 'undefined' !== typeof c.friction ? c.friction : -1
            this.restitution = 'undefined' !== typeof c.restitution ? c.restitution : -1
          }
          e.exports = a
          a.idCounter = 0
        },
        {},
      ],
      26: [
        function(c, e, g) {
          function a() {
            this.spatial = new d()
            this.rotational = new d()
          }
          e.exports = a
          var d = c('./Vec3')
          a.prototype.multiplyElement = function(a) {
            return a.spatial.dot(this.spatial) + a.rotational.dot(this.rotational)
          }
          a.prototype.multiplyVectors = function(a, c) {
            return a.dot(this.spatial) + c.dot(this.rotational)
          }
        },
        { './Vec3': 30 },
      ],
      27: [
        function(c, e, g) {
          function a(a) {
            this.elements = a ? a : [0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
          e.exports = a
          var d = c('./Vec3')
          a.prototype.identity = function() {
            var a = this.elements
            a[0] = 1
            a[1] = 0
            a[2] = 0
            a[3] = 0
            a[4] = 1
            a[5] = 0
            a[6] = 0
            a[7] = 0
            a[8] = 1
          }
          a.prototype.setZero = function() {
            var a = this.elements
            a[0] = 0
            a[1] = 0
            a[2] = 0
            a[3] = 0
            a[4] = 0
            a[5] = 0
            a[6] = 0
            a[7] = 0
            a[8] = 0
          }
          a.prototype.setTrace = function(a) {
            var b = this.elements
            b[0] = a.x
            b[4] = a.y
            b[8] = a.z
          }
          a.prototype.getTrace = function(a) {
            a = a || new d()
            var b = this.elements
            a.x = b[0]
            a.y = b[4]
            a.z = b[8]
          }
          a.prototype.vmult = function(a, c) {
            c = c || new d()
            var b = this.elements,
              e = a.x,
              f = a.y,
              l = a.z
            c.x = b[0] * e + b[1] * f + b[2] * l
            c.y = b[3] * e + b[4] * f + b[5] * l
            c.z = b[6] * e + b[7] * f + b[8] * l
            return c
          }
          a.prototype.smult = function(a) {
            for (var b = 0; b < this.elements.length; b++) this.elements[b] *= a
          }
          a.prototype.mmult = function(b, c) {
            for (var d = c || new a(), e = 0; 3 > e; e++)
              for (var f = 0; 3 > f; f++) {
                for (var l = 0, n = 0; 3 > n; n++)
                  l += b.elements[e + 3 * n] * this.elements[n + 3 * f]
                d.elements[e + 3 * f] = l
              }
            return d
          }
          a.prototype.scale = function(b, c) {
            c = c || new a()
            for (var d = this.elements, e = c.elements, f = 0; 3 !== f; f++)
              (e[3 * f] = b.x * d[3 * f]),
                (e[3 * f + 1] = b.y * d[3 * f + 1]),
                (e[3 * f + 2] = b.z * d[3 * f + 2])
            return c
          }
          a.prototype.solve = function(a, c) {
            c = c || new d()
            for (var b = [], e = 0; 12 > e; e++) b.push(0)
            var f
            for (e = 0; 3 > e; e++) for (f = 0; 3 > f; f++) b[e + 4 * f] = this.elements[e + 3 * f]
            b[3] = a.x
            b[7] = a.y
            b[11] = a.z
            var l = 3,
              n = l
            do {
              e = n - l
              if (0 === b[e + 4 * e])
                for (f = e + 1; f < n; f++)
                  if (0 !== b[e + 4 * f]) {
                    var g = 4
                    do {
                      var u = 4 - g
                      b[u + 4 * e] += b[u + 4 * f]
                    } while (--g)
                    break
                  }
              if (0 !== b[e + 4 * e])
                for (f = e + 1; f < n; f++) {
                  var r = b[e + 4 * f] / b[e + 4 * e]
                  g = 4
                  do (u = 4 - g), (b[u + 4 * f] = u <= e ? 0 : b[u + 4 * f] - b[u + 4 * e] * r)
                  while (--g)
                }
            } while (--l)
            c.z = b[11] / b[10]
            c.y = (b[7] - b[6] * c.z) / b[5]
            c.x = (b[3] - b[2] * c.z - b[1] * c.y) / b[0]
            if (
              isNaN(c.x) ||
              isNaN(c.y) ||
              isNaN(c.z) ||
              Infinity === c.x ||
              Infinity === c.y ||
              Infinity === c.z
            )
              throw 'Could not solve equation! Got x=[' +
                c.toString() +
                '], b=[' +
                a.toString() +
                '], A=[' +
                this.toString() +
                ']'
            return c
          }
          a.prototype.e = function(a, c, d) {
            if (void 0 === d) return this.elements[c + 3 * a]
            this.elements[c + 3 * a] = d
          }
          a.prototype.copy = function(a) {
            for (var b = 0; b < a.elements.length; b++) this.elements[b] = a.elements[b]
            return this
          }
          a.prototype.toString = function() {
            for (var a = '', c = 0; 9 > c; c++) a += this.elements[c] + ','
            return a
          }
          a.prototype.reverse = function(b) {
            b = b || new a()
            for (var c = [], d = 0; 18 > d; d++) c.push(0)
            var e
            for (d = 0; 3 > d; d++) for (e = 0; 3 > e; e++) c[d + 6 * e] = this.elements[d + 3 * e]
            c[3] = 1
            c[9] = 0
            c[15] = 0
            c[4] = 0
            c[10] = 1
            c[16] = 0
            c[5] = 0
            c[11] = 0
            c[17] = 1
            var f = 3,
              g = f
            do {
              d = g - f
              if (0 === c[d + 6 * d])
                for (e = d + 1; e < g; e++)
                  if (0 !== c[d + 6 * e]) {
                    var n = 6
                    do {
                      var p = 6 - n
                      c[p + 6 * d] += c[p + 6 * e]
                    } while (--n)
                    break
                  }
              if (0 !== c[d + 6 * d])
                for (e = d + 1; e < g; e++) {
                  var u = c[d + 6 * e] / c[d + 6 * d]
                  n = 6
                  do (p = 6 - n), (c[p + 6 * e] = p <= d ? 0 : c[p + 6 * e] - c[p + 6 * d] * u)
                  while (--n)
                }
            } while (--f)
            d = 2
            do {
              e = d - 1
              do {
                u = c[d + 6 * e] / c[d + 6 * d]
                n = 6
                do (p = 6 - n), (c[p + 6 * e] -= c[p + 6 * d] * u)
                while (--n)
              } while (e--)
            } while (--d)
            d = 2
            do {
              u = 1 / c[d + 6 * d]
              n = 6
              do (p = 6 - n), (c[p + 6 * d] *= u)
              while (--n)
            } while (d--)
            d = 2
            do {
              e = 2
              do {
                p = c[3 + e + 6 * d]
                if (isNaN(p) || Infinity === p)
                  throw 'Could not reverse! A=[' + this.toString() + ']'
                b.e(d, e, p)
              } while (e--)
            } while (d--)
            return b
          }
          a.prototype.setRotationFromQuaternion = function(a) {
            var b = a.x,
              c = a.y,
              d = a.z,
              e = a.w,
              g = b + b,
              n = c + c,
              p = d + d
            a = b * g
            var u = b * n
            b *= p
            var r = c * n
            c *= p
            d *= p
            g *= e
            n *= e
            e *= p
            p = this.elements
            p[0] = 1 - (r + d)
            p[1] = u - e
            p[2] = b + n
            p[3] = u + e
            p[4] = 1 - (a + d)
            p[5] = c - g
            p[6] = b - n
            p[7] = c + g
            p[8] = 1 - (a + r)
            return this
          }
          a.prototype.transpose = function(b) {
            b = b || new a()
            for (var c = b.elements, d = this.elements, e = 0; 3 !== e; e++)
              for (var f = 0; 3 !== f; f++) c[3 * e + f] = d[3 * f + e]
            return b
          }
        },
        { './Vec3': 30 },
      ],
      28: [
        function(c, e, g) {
          function a(a, b, c, d) {
            this.x = void 0 !== a ? a : 0
            this.y = void 0 !== b ? b : 0
            this.z = void 0 !== c ? c : 0
            this.w = void 0 !== d ? d : 1
          }
          e.exports = a
          var d = c('./Vec3')
          a.prototype.set = function(a, b, c, d) {
            this.x = a
            this.y = b
            this.z = c
            this.w = d
          }
          a.prototype.toString = function() {
            return this.x + ',' + this.y + ',' + this.z + ',' + this.w
          }
          a.prototype.toArray = function() {
            return [this.x, this.y, this.z, this.w]
          }
          a.prototype.setFromAxisAngle = function(a, b) {
            var c = Math.sin(0.5 * b)
            this.x = a.x * c
            this.y = a.y * c
            this.z = a.z * c
            this.w = Math.cos(0.5 * b)
          }
          a.prototype.toAxisAngle = function(a) {
            a = a || new d()
            this.normalize()
            var b = 2 * Math.acos(this.w),
              c = Math.sqrt(1 - this.w * this.w)
            0.001 > c
              ? ((a.x = this.x), (a.y = this.y), (a.z = this.z))
              : ((a.x = this.x / c), (a.y = this.y / c), (a.z = this.z / c))
            return [a, b]
          }
          var b = new d(),
            l = new d()
          a.prototype.setFromVectors = function(a, c) {
            if (a.isAntiparallelTo(c)) a.tangents(b, l), this.setFromAxisAngle(b, Math.PI)
            else {
              var d = a.cross(c)
              this.x = d.x
              this.y = d.y
              this.z = d.z
              this.w = Math.sqrt(Math.pow(a.norm(), 2) * Math.pow(c.norm(), 2)) + a.dot(c)
              this.normalize()
            }
          }
          var k = new d(),
            h = new d(),
            f = new d()
          a.prototype.mult = function(b, c) {
            c = c || new a()
            var d = this.w
            k.set(this.x, this.y, this.z)
            h.set(b.x, b.y, b.z)
            c.w = d * b.w - k.dot(h)
            k.cross(h, f)
            c.x = d * h.x + b.w * k.x + f.x
            c.y = d * h.y + b.w * k.y + f.y
            c.z = d * h.z + b.w * k.z + f.z
            return c
          }
          a.prototype.inverse = function(b) {
            var c = this.x,
              d = this.y,
              e = this.z,
              f = this.w
            b = b || new a()
            this.conjugate(b)
            c = 1 / (c * c + d * d + e * e + f * f)
            b.x *= c
            b.y *= c
            b.z *= c
            b.w *= c
            return b
          }
          a.prototype.conjugate = function(b) {
            b = b || new a()
            b.x = -this.x
            b.y = -this.y
            b.z = -this.z
            b.w = this.w
            return b
          }
          a.prototype.normalize = function() {
            var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
            0 === a
              ? (this.w = this.z = this.y = this.x = 0)
              : ((a = 1 / a), (this.x *= a), (this.y *= a), (this.z *= a), (this.w *= a))
          }
          a.prototype.normalizeFast = function() {
            var a =
              (3 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2
            0 === a
              ? (this.w = this.z = this.y = this.x = 0)
              : ((this.x *= a), (this.y *= a), (this.z *= a), (this.w *= a))
          }
          a.prototype.vmult = function(a, b) {
            b = b || new d()
            var c = a.x,
              e = a.y,
              f = a.z,
              h = this.x,
              n = this.y,
              g = this.z,
              l = this.w,
              k = l * c + n * f - g * e,
              q = l * e + g * c - h * f,
              A = l * f + h * e - n * c
            c = -h * c - n * e - g * f
            b.x = k * l + c * -h + q * -g - A * -n
            b.y = q * l + c * -n + A * -h - k * -g
            b.z = A * l + c * -g + k * -n - q * -h
            return b
          }
          a.prototype.copy = function(a) {
            this.x = a.x
            this.y = a.y
            this.z = a.z
            this.w = a.w
            return this
          }
          a.prototype.toEuler = function(a, b) {
            b = b || 'YZX'
            var c = this.x,
              d = this.y,
              e = this.z,
              f = this.w
            switch (b) {
              case 'YZX':
                var h = c * d + e * f
                if (0.499 < h) {
                  var n = 2 * Math.atan2(c, f)
                  var g = Math.PI / 2
                  var l = 0
                }
                ;-0.499 > h && ((n = -2 * Math.atan2(c, f)), (g = -Math.PI / 2), (l = 0))
                isNaN(n) &&
                  ((l = e * e),
                  (n = Math.atan2(2 * d * f - 2 * c * e, 1 - 2 * d * d - 2 * l)),
                  (g = Math.asin(2 * h)),
                  (l = Math.atan2(2 * c * f - 2 * d * e, 1 - 2 * c * c - 2 * l)))
                break
              default:
                throw Error('Euler order ' + b + ' not supported yet.')
            }
            a.y = n
            a.z = g
            a.x = l
          }
          a.prototype.setFromEuler = function(a, b, c, d) {
            d = d || 'XYZ'
            var e = Math.cos(a / 2),
              f = Math.cos(b / 2),
              h = Math.cos(c / 2)
            a = Math.sin(a / 2)
            b = Math.sin(b / 2)
            c = Math.sin(c / 2)
            'XYZ' === d
              ? ((this.x = a * f * h + e * b * c),
                (this.y = e * b * h - a * f * c),
                (this.z = e * f * c + a * b * h),
                (this.w = e * f * h - a * b * c))
              : 'YXZ' === d
                ? ((this.x = a * f * h + e * b * c),
                  (this.y = e * b * h - a * f * c),
                  (this.z = e * f * c - a * b * h),
                  (this.w = e * f * h + a * b * c))
                : 'ZXY' === d
                  ? ((this.x = a * f * h - e * b * c),
                    (this.y = e * b * h + a * f * c),
                    (this.z = e * f * c + a * b * h),
                    (this.w = e * f * h - a * b * c))
                  : 'ZYX' === d
                    ? ((this.x = a * f * h - e * b * c),
                      (this.y = e * b * h + a * f * c),
                      (this.z = e * f * c - a * b * h),
                      (this.w = e * f * h + a * b * c))
                    : 'YZX' === d
                      ? ((this.x = a * f * h + e * b * c),
                        (this.y = e * b * h + a * f * c),
                        (this.z = e * f * c - a * b * h),
                        (this.w = e * f * h - a * b * c))
                      : 'XZY' === d &&
                        ((this.x = a * f * h - e * b * c),
                        (this.y = e * b * h - a * f * c),
                        (this.z = e * f * c + a * b * h),
                        (this.w = e * f * h + a * b * c))
            return this
          }
          a.prototype.clone = function() {
            return new a(this.x, this.y, this.z, this.w)
          }
        },
        { './Vec3': 30 },
      ],
      29: [
        function(c, e, g) {
          function a(a) {
            a = a || {}
            this.position = new d()
            a.position && this.position.copy(a.position)
            this.quaternion = new b()
            a.quaternion && this.quaternion.copy(a.quaternion)
          }
          var d = c('./Vec3'),
            b = c('./Quaternion')
          e.exports = a
          var l = new b()
          a.pointToLocalFrame = function(a, b, c, e) {
            e = e || new d()
            c.vsub(a, e)
            b.conjugate(l)
            l.vmult(e, e)
            return e
          }
          a.prototype.pointToLocal = function(b, c) {
            return a.pointToLocalFrame(this.position, this.quaternion, b, c)
          }
          a.pointToWorldFrame = function(a, b, c, e) {
            e = e || new d()
            b.vmult(c, e)
            e.vadd(a, e)
            return e
          }
          a.prototype.pointToWorld = function(b, c) {
            return a.pointToWorldFrame(this.position, this.quaternion, b, c)
          }
          a.prototype.vectorToWorldFrame = function(a, b) {
            b = b || new d()
            this.quaternion.vmult(a, b)
            return b
          }
          a.vectorToWorldFrame = function(a, b, c) {
            a.vmult(b, c)
            return c
          }
          a.vectorToLocalFrame = function(a, b, c, e) {
            e = e || new d()
            b.w *= -1
            b.vmult(c, e)
            b.w *= -1
            return e
          }
        },
        { './Quaternion': 28, './Vec3': 30 },
      ],
      30: [
        function(c, e, g) {
          function a(a, b, c) {
            this.x = a || 0
            this.y = b || 0
            this.z = c || 0
          }
          e.exports = a
          var d = c('./Mat3')
          a.ZERO = new a(0, 0, 0)
          a.UNIT_X = new a(1, 0, 0)
          a.UNIT_Y = new a(0, 1, 0)
          a.UNIT_Z = new a(0, 0, 1)
          a.prototype.cross = function(b, c) {
            var d = b.x,
              e = b.y,
              f = b.z,
              h = this.x,
              g = this.y,
              l = this.z
            c = c || new a()
            c.x = g * f - l * e
            c.y = l * d - h * f
            c.z = h * e - g * d
            return c
          }
          a.prototype.set = function(a, b, c) {
            this.x = a
            this.y = b
            this.z = c
            return this
          }
          a.prototype.setZero = function() {
            this.x = this.y = this.z = 0
          }
          a.prototype.vadd = function(b, c) {
            if (c) (c.x = b.x + this.x), (c.y = b.y + this.y), (c.z = b.z + this.z)
            else return new a(this.x + b.x, this.y + b.y, this.z + b.z)
          }
          a.prototype.vsub = function(b, c) {
            if (c) (c.x = this.x - b.x), (c.y = this.y - b.y), (c.z = this.z - b.z)
            else return new a(this.x - b.x, this.y - b.y, this.z - b.z)
          }
          a.prototype.crossmat = function() {
            return new d([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0])
          }
          a.prototype.normalize = function() {
            var a = this.x,
              b = this.y,
              c = this.z
            a = Math.sqrt(a * a + b * b + c * c)
            0 < a
              ? ((b = 1 / a), (this.x *= b), (this.y *= b), (this.z *= b))
              : (this.z = this.y = this.x = 0)
            return a
          }
          a.prototype.unit = function(b) {
            b = b || new a()
            var c = this.x,
              d = this.y,
              e = this.z,
              h = Math.sqrt(c * c + d * d + e * e)
            0 < h
              ? ((h = 1 / h), (b.x = c * h), (b.y = d * h), (b.z = e * h))
              : ((b.x = 1), (b.y = 0), (b.z = 0))
            return b
          }
          a.prototype.norm = function() {
            var a = this.x,
              b = this.y,
              c = this.z
            return Math.sqrt(a * a + b * b + c * c)
          }
          a.prototype.length = a.prototype.norm
          a.prototype.norm2 = function() {
            return this.dot(this)
          }
          a.prototype.lengthSquared = a.prototype.norm2
          a.prototype.distanceTo = function(a) {
            var b = this.x,
              c = this.y,
              d = this.z,
              e = a.x,
              h = a.y
            a = a.z
            return Math.sqrt((e - b) * (e - b) + (h - c) * (h - c) + (a - d) * (a - d))
          }
          a.prototype.distanceSquared = function(a) {
            var b = this.x,
              c = this.y,
              d = this.z,
              e = a.x,
              h = a.y
            a = a.z
            return (e - b) * (e - b) + (h - c) * (h - c) + (a - d) * (a - d)
          }
          a.prototype.mult = function(b, c) {
            c = c || new a()
            var d = this.y,
              e = this.z
            c.x = b * this.x
            c.y = b * d
            c.z = b * e
            return c
          }
          a.prototype.scale = a.prototype.mult
          a.prototype.dot = function(a) {
            return this.x * a.x + this.y * a.y + this.z * a.z
          }
          a.prototype.isZero = function() {
            return 0 === this.x && 0 === this.y && 0 === this.z
          }
          a.prototype.negate = function(b) {
            b = b || new a()
            b.x = -this.x
            b.y = -this.y
            b.z = -this.z
            return b
          }
          var b = new a(),
            l = new a()
          a.prototype.tangents = function(a, c) {
            var d = this.norm()
            0 < d
              ? ((d = 1 / d),
                b.set(this.x * d, this.y * d, this.z * d),
                0.9 > Math.abs(b.x) ? l.set(1, 0, 0) : l.set(0, 1, 0),
                b.cross(l, a),
                b.cross(a, c))
              : (a.set(1, 0, 0), c.set(0, 1, 0))
          }
          a.prototype.toString = function() {
            return this.x + ',' + this.y + ',' + this.z
          }
          a.prototype.toArray = function() {
            return [this.x, this.y, this.z]
          }
          a.prototype.copy = function(a) {
            this.x = a.x
            this.y = a.y
            this.z = a.z
            return this
          }
          a.prototype.lerp = function(a, b, c) {
            var d = this.x,
              e = this.y,
              f = this.z
            c.x = d + (a.x - d) * b
            c.y = e + (a.y - e) * b
            c.z = f + (a.z - f) * b
          }
          a.prototype.almostEquals = function(a, b) {
            void 0 === b && (b = 1e-6)
            return Math.abs(this.x - a.x) > b ||
              Math.abs(this.y - a.y) > b ||
              Math.abs(this.z - a.z) > b
              ? !1
              : !0
          }
          a.prototype.almostZero = function(a) {
            void 0 === a && (a = 1e-6)
            return Math.abs(this.x) > a || Math.abs(this.y) > a || Math.abs(this.z) > a ? !1 : !0
          }
          var k = new a()
          a.prototype.isAntiparallelTo = function(a, b) {
            this.negate(k)
            return k.almostEquals(a, b)
          }
          a.prototype.clone = function() {
            return new a(this.x, this.y, this.z)
          }
        },
        { './Mat3': 27 },
      ],
      31: [
        function(c, e, g) {
          function a(c) {
            c = c || {}
            d.apply(this)
            this.id = a.idCounter++
            this.postStep = this.preStep = this.world = null
            this.vlambda = new b()
            this.collisionFilterGroup =
              'number' === typeof c.collisionFilterGroup ? c.collisionFilterGroup : 1
            this.collisionFilterMask =
              'number' === typeof c.collisionFilterMask ? c.collisionFilterMask : 1
            this.collisionResponse = !0
            this.position = new b()
            c.position && this.position.copy(c.position)
            this.previousPosition = new b()
            this.initPosition = new b()
            this.velocity = new b()
            c.velocity && this.velocity.copy(c.velocity)
            this.initVelocity = new b()
            this.force = new b()
            var e = 'number' === typeof c.mass ? c.mass : 0
            this.mass = e
            this.invMass = 0 < e ? 1 / e : 0
            this.material = c.material || null
            this.linearDamping = 'number' === typeof c.linearDamping ? c.linearDamping : 0.01
            this.type = 0 >= e ? a.STATIC : a.DYNAMIC
            typeof c.type === typeof a.STATIC && (this.type = c.type)
            this.allowSleep = 'undefined' !== typeof c.allowSleep ? c.allowSleep : !0
            this.sleepState = 0
            this.sleepSpeedLimit =
              'undefined' !== typeof c.sleepSpeedLimit ? c.sleepSpeedLimit : 0.1
            this.sleepTimeLimit = 'undefined' !== typeof c.sleepTimeLimit ? c.sleepTimeLimit : 1
            this.timeLastSleepy = 0
            this._wakeUpAfterNarrowphase = !1
            this.torque = new b()
            this.quaternion = new k()
            c.quaternion && this.quaternion.copy(c.quaternion)
            this.initQuaternion = new k()
            this.angularVelocity = new b()
            c.angularVelocity && this.angularVelocity.copy(c.angularVelocity)
            this.initAngularVelocity = new b()
            this.interpolatedPosition = new b()
            this.interpolatedQuaternion = new k()
            this.shapes = []
            this.shapeOffsets = []
            this.shapeOrientations = []
            this.inertia = new b()
            this.invInertia = new b()
            this.invInertiaWorld = new l()
            this.invMassSolve = 0
            this.invInertiaSolve = new b()
            this.invInertiaWorldSolve = new l()
            this.fixedRotation = 'undefined' !== typeof c.fixedRotation ? c.fixedRotation : !1
            this.angularDamping = 'undefined' !== typeof c.angularDamping ? c.angularDamping : 0.01
            this.userData = 'undefined' !== typeof c.userData ? c.userData : null
            this.aabb = new h()
            this.aabbNeedsUpdate = !0
            this.wlambda = new b()
            c.shape && this.addShape(c.shape)
            this.updateMassProperties()
          }
          e.exports = a
          var d = c('../utils/EventTarget')
          c('../shapes/Shape')
          var b = c('../math/Vec3'),
            l = c('../math/Mat3'),
            k = c('../math/Quaternion')
          c('../material/Material')
          var h = c('../collision/AABB'),
            f = c('../shapes/Box')
          a.prototype = new d()
          a.prototype.constructor = a
          a.DYNAMIC = 1
          a.STATIC = 2
          a.KINEMATIC = 4
          a.AWAKE = 0
          a.SLEEPY = 1
          a.SLEEPING = 2
          a.idCounter = 0
          a.prototype.wakeUp = function() {
            var b = this.sleepState
            this.sleepState = 0
            b === a.SLEEPING && this.dispatchEvent({ type: 'wakeup' })
          }
          a.prototype.sleep = function() {
            this.sleepState = a.SLEEPING
            this.velocity.set(0, 0, 0)
            this.angularVelocity.set(0, 0, 0)
          }
          a.sleepyEvent = { type: 'sleepy' }
          a.sleepEvent = { type: 'sleep' }
          a.prototype.sleepTick = function(b) {
            if (this.allowSleep) {
              var c = this.sleepState,
                d = this.velocity.norm2() + this.angularVelocity.norm2(),
                e = Math.pow(this.sleepSpeedLimit, 2)
              c === a.AWAKE && d < e
                ? ((this.sleepState = a.SLEEPY),
                  (this.timeLastSleepy = b),
                  this.dispatchEvent(a.sleepyEvent))
                : c === a.SLEEPY && d > e
                  ? this.wakeUp()
                  : c === a.SLEEPY &&
                    b - this.timeLastSleepy > this.sleepTimeLimit &&
                    (this.sleep(), this.dispatchEvent(a.sleepEvent))
            }
          }
          a.prototype.updateSolveMassProperties = function() {
            this.sleepState === a.SLEEPING || this.type === a.KINEMATIC
              ? ((this.invMassSolve = 0),
                this.invInertiaSolve.setZero(),
                this.invInertiaWorldSolve.setZero())
              : ((this.invMassSolve = this.invMass),
                this.invInertiaSolve.copy(this.invInertia),
                this.invInertiaWorldSolve.copy(this.invInertiaWorld))
          }
          a.prototype.pointToLocalFrame = function(a, c) {
            c = c || new b()
            a.vsub(this.position, c)
            this.quaternion.conjugate().vmult(c, c)
            return c
          }
          a.prototype.vectorToLocalFrame = function(a, c) {
            c = c || new b()
            this.quaternion.conjugate().vmult(a, c)
            return c
          }
          a.prototype.pointToWorldFrame = function(a, c) {
            c = c || new b()
            this.quaternion.vmult(a, c)
            c.vadd(this.position, c)
            return c
          }
          a.prototype.vectorToWorldFrame = function(a, c) {
            c = c || new b()
            this.quaternion.vmult(a, c)
            return c
          }
          var q = new b(),
            n = new k()
          a.prototype.addShape = function(a, c, d) {
            var e = new b(),
              f = new k()
            c && e.copy(c)
            d && f.copy(d)
            this.shapes.push(a)
            this.shapeOffsets.push(e)
            this.shapeOrientations.push(f)
            this.updateMassProperties()
            this.updateBoundingRadius()
            this.aabbNeedsUpdate = !0
            return this
          }
          a.prototype.updateBoundingRadius = function() {
            for (
              var a = this.shapes, b = this.shapeOffsets, c = a.length, d = 0, e = 0;
              e !== c;
              e++
            ) {
              var f = a[e]
              f.updateBoundingSphereRadius()
              var h = b[e].norm()
              f = f.boundingSphereRadius
              h + f > d && (d = h + f)
            }
            this.boundingRadius = d
          }
          var p = new h()
          a.prototype.computeAABB = function() {
            for (
              var a = this.shapes,
                b = this.shapeOffsets,
                c = this.shapeOrientations,
                d = a.length,
                e = this.quaternion,
                f = this.aabb,
                h = 0;
              h !== d;
              h++
            ) {
              var g = a[h]
              c[h].mult(e, n)
              n.vmult(b[h], q)
              q.vadd(this.position, q)
              g.calculateWorldAABB(q, n, p.lowerBound, p.upperBound)
              0 === h ? f.copy(p) : f.extend(p)
            }
            this.aabbNeedsUpdate = !1
          }
          var u = new l(),
            r = new l()
          new l()
          a.prototype.updateInertiaWorld = function(a) {
            var b = this.invInertia
            if (b.x !== b.y || b.y !== b.z || a)
              u.setRotationFromQuaternion(this.quaternion),
                u.transpose(r),
                u.scale(b, u),
                u.mmult(r, this.invInertiaWorld)
          }
          var w = new b(),
            t = new b()
          a.prototype.applyForce = function(b, c) {
            this.type === a.DYNAMIC &&
              (c.vsub(this.position, w),
              w.cross(b, t),
              this.force.vadd(b, this.force),
              this.torque.vadd(t, this.torque))
          }
          var v = new b(),
            x = new b()
          a.prototype.applyLocalForce = function(b, c) {
            this.type === a.DYNAMIC &&
              (this.vectorToWorldFrame(b, v), this.pointToWorldFrame(c, x), this.applyForce(v, x))
          }
          var z = new b(),
            C = new b(),
            A = new b()
          a.prototype.applyImpulse = function(b, c) {
            this.type === a.DYNAMIC &&
              (c.vsub(this.position, z),
              C.copy(b),
              C.mult(this.invMass, C),
              this.velocity.vadd(C, this.velocity),
              z.cross(b, A),
              this.invInertiaWorld.vmult(A, A),
              this.angularVelocity.vadd(A, this.angularVelocity))
          }
          var D = new b(),
            G = new b()
          a.prototype.applyLocalImpulse = function(b, c) {
            this.type === a.DYNAMIC &&
              (this.vectorToWorldFrame(b, D), this.pointToWorldFrame(c, G), this.applyImpulse(D, G))
          }
          var B = new b()
          a.prototype.updateMassProperties = function() {
            this.invMass = 0 < this.mass ? 1 / this.mass : 0
            var a = this.inertia,
              b = this.fixedRotation
            this.computeAABB()
            B.set(
              (this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2,
              (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2,
              (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2,
            )
            f.calculateInertia(B, this.mass, a)
            this.invInertia.set(
              0 < a.x && !b ? 1 / a.x : 0,
              0 < a.y && !b ? 1 / a.y : 0,
              0 < a.z && !b ? 1 / a.z : 0,
            )
            this.updateInertiaWorld(!0)
          }
          a.prototype.getVelocityAtWorldPoint = function(a, c) {
            var d = new b()
            a.vsub(this.position, d)
            this.angularVelocity.cross(d, c)
            this.velocity.vadd(c, c)
            return c
          }
        },
        {
          '../collision/AABB': 3,
          '../material/Material': 25,
          '../math/Mat3': 27,
          '../math/Quaternion': 28,
          '../math/Vec3': 30,
          '../shapes/Box': 37,
          '../shapes/Shape': 43,
          '../utils/EventTarget': 49,
        },
      ],
      32: [
        function(c, e, g) {
          function a(a) {
            this.chassisBody = a.chassisBody
            this.wheelInfos = []
            this.sliding = !1
            this.world = null
            this.indexRightAxis = 'undefined' !== typeof a.indexRightAxis ? a.indexRightAxis : 1
            this.indexForwardAxis =
              'undefined' !== typeof a.indexForwardAxis ? a.indexForwardAxis : 0
            this.indexUpAxis = 'undefined' !== typeof a.indexUpAxis ? a.indexUpAxis : 2
          }
          function d(a, b, c) {
            var d = C,
              e = A,
              f = D,
              h = G
            b.vsub(a.position, d)
            d.cross(c, e)
            a.invInertiaWorld.vmult(e, h)
            h.cross(d, f)
            return a.invMass + c.dot(f)
          }
          c('./Body')
          var b = c('../math/Vec3'),
            l = c('../math/Quaternion')
          c('../collision/RaycastResult')
          g = c('../collision/Ray')
          var k = c('../objects/WheelInfo')
          e.exports = a
          new b()
          new b()
          new b()
          var h = new b(),
            f = new b(),
            q = new b()
          new g()
          a.prototype.addWheel = function(a) {
            a = a || {}
            a = new k(a)
            var b = this.wheelInfos.length
            this.wheelInfos.push(a)
            return b
          }
          a.prototype.setSteeringValue = function(a, b) {
            this.wheelInfos[b].steering = a
          }
          new b()
          a.prototype.applyEngineForce = function(a, b) {
            this.wheelInfos[b].engineForce = a
          }
          a.prototype.setBrake = function(a, b) {
            this.wheelInfos[b].brake = a
          }
          a.prototype.addToWorld = function(a) {
            a.add(this.chassisBody)
            var b = this
            this.preStepCallback = function() {
              b.updateVehicle(a.dt)
            }
            a.addEventListener('preStep', this.preStepCallback)
            this.world = a
          }
          a.prototype.getVehicleAxisWorld = function(a, b) {
            b.set(0 === a ? 1 : 0, 1 === a ? 1 : 0, 2 === a ? 1 : 0)
            this.chassisBody.vectorToWorldFrame(b, b)
          }
          a.prototype.updateVehicle = function(a) {
            for (var c = this.wheelInfos, d = c.length, e = this.chassisBody, f = 0; f < d; f++)
              this.updateWheelTransform(f)
            this.currentVehicleSpeedKmHour = 3.6 * e.velocity.norm()
            f = new b()
            this.getVehicleAxisWorld(this.indexForwardAxis, f)
            0 > f.dot(e.velocity) && (this.currentVehicleSpeedKmHour *= -1)
            for (f = 0; f < d; f++) this.castRay(c[f])
            this.updateSuspension(a)
            var h = new b(),
              g = new b()
            for (f = 0; f < d; f++) {
              var n = c[f],
                l = n.suspensionForce
              l > n.maxSuspensionForce && (l = n.maxSuspensionForce)
              n.raycastResult.hitNormalWorld.scale(l * a, h)
              n.raycastResult.hitPointWorld.vsub(e.position, g)
              e.applyImpulse(h, n.raycastResult.hitPointWorld)
            }
            this.updateFriction(a)
            h = new b()
            g = new b()
            l = new b()
            for (f = 0; f < d; f++) {
              n = c[f]
              e.getVelocityAtWorldPoint(n.chassisConnectionPointWorld, l)
              var k = 1
              switch (this.indexUpAxis) {
                case 1:
                  k = -1
              }
              if (n.isInContact) {
                this.getVehicleAxisWorld(this.indexForwardAxis, g)
                var p = g.dot(n.raycastResult.hitNormalWorld)
                n.raycastResult.hitNormalWorld.scale(p, h)
                g.vsub(h, g)
                p = g.dot(l)
                n.deltaRotation = (k * p * a) / n.radius
              }
              ;(!n.sliding && n.isInContact) ||
                0 === n.engineForce ||
                !n.useCustomSlidingRotationalSpeed ||
                (n.deltaRotation =
                  (0 < n.engineForce ? 1 : -1) * n.customSlidingRotationalSpeed * a)
              Math.abs(n.brake) > Math.abs(n.engineForce) && (n.deltaRotation = 0)
              n.rotation += n.deltaRotation
              n.deltaRotation *= 0.99
            }
          }
          a.prototype.updateSuspension = function(a) {
            a = this.chassisBody.mass
            for (var b = this.wheelInfos, c = b.length, d = 0; d < c; d++) {
              var e = b[d]
              if (e.isInContact) {
                var f =
                  e.suspensionStiffness *
                  (e.suspensionRestLength - e.suspensionLength) *
                  e.clippedInvContactDotSuspension
                var n = e.suspensionRelativeVelocity
                f -= (0 > n ? e.dampingCompression : e.dampingRelaxation) * n
                e.suspensionForce = f * a
                0 > e.suspensionForce && (e.suspensionForce = 0)
              } else e.suspensionForce = 0
            }
          }
          a.prototype.removeFromWorld = function(a) {
            a.remove(this.chassisBody)
            a.removeEventListener('preStep', this.preStepCallback)
            this.world = null
          }
          var n = new b(),
            p = new b()
          a.prototype.castRay = function(a) {
            this.updateWheelTransformWorld(a)
            var c = this.chassisBody,
              d = -1
            a.directionWorld.scale(a.suspensionRestLength + a.radius, n)
            var e = a.chassisConnectionPointWorld
            e.vadd(n, p)
            var f = a.raycastResult
            f.reset()
            var h = c.collisionResponse
            c.collisionResponse = !1
            this.world.rayTest(e, p, f)
            c.collisionResponse = h
            e = f.body
            a.raycastResult.groundObject = 0
            e
              ? ((d = f.distance),
                (a.raycastResult.hitNormalWorld = f.hitNormalWorld),
                (a.isInContact = !0),
                (a.suspensionLength = f.distance - a.radius),
                (f = a.suspensionRestLength - a.maxSuspensionTravel),
                (e = a.suspensionRestLength + a.maxSuspensionTravel),
                a.suspensionLength < f && (a.suspensionLength = f),
                a.suspensionLength > e && ((a.suspensionLength = e), a.raycastResult.reset()),
                (f = a.raycastResult.hitNormalWorld.dot(a.directionWorld)),
                (e = new b()),
                c.getVelocityAtWorldPoint(a.raycastResult.hitPointWorld, e),
                (c = a.raycastResult.hitNormalWorld.dot(e)),
                -0.1 <= f
                  ? ((a.suspensionRelativeVelocity = 0), (a.clippedInvContactDotSuspension = 10))
                  : ((f = -1 / f),
                    (a.suspensionRelativeVelocity = c * f),
                    (a.clippedInvContactDotSuspension = f)))
              : ((a.suspensionLength = a.suspensionRestLength + 0 * a.maxSuspensionTravel),
                (a.suspensionRelativeVelocity = 0),
                a.directionWorld.scale(-1, a.raycastResult.hitNormalWorld),
                (a.clippedInvContactDotSuspension = 1))
            return d
          }
          a.prototype.updateWheelTransformWorld = function(a) {
            a.isInContact = !1
            var b = this.chassisBody
            b.pointToWorldFrame(a.chassisConnectionPointLocal, a.chassisConnectionPointWorld)
            b.vectorToWorldFrame(a.directionLocal, a.directionWorld)
            b.vectorToWorldFrame(a.axleLocal, a.axleWorld)
          }
          a.prototype.updateWheelTransform = function(a) {
            a = this.wheelInfos[a]
            this.updateWheelTransformWorld(a)
            a.directionLocal.scale(-1, h)
            f.copy(a.axleLocal)
            h.cross(f, q)
            q.normalize()
            f.normalize()
            var b = a.steering,
              c = new l()
            c.setFromAxisAngle(h, b)
            b = new l()
            b.setFromAxisAngle(f, a.rotation)
            var d = a.worldTransform.quaternion
            this.chassisBody.quaternion.mult(c, d)
            d.mult(b, d)
            d.normalize()
            c = a.worldTransform.position
            c.copy(a.directionWorld)
            c.scale(a.suspensionLength, c)
            c.vadd(a.chassisConnectionPointWorld, c)
          }
          var u = [new b(1, 0, 0), new b(0, 1, 0), new b(0, 0, 1)]
          a.prototype.getWheelTransformWorld = function(a) {
            return this.wheelInfos[a].worldTransform
          }
          var r = new b(),
            w = [],
            t = []
          a.prototype.updateFriction = function(a) {
            for (
              var c = this.wheelInfos, e = c.length, f = this.chassisBody, n = 0, h = 0;
              h < e;
              h++
            ) {
              var g = c[h],
                l = g.raycastResult.body
              l && n++
              g.sideImpulse = 0
              g.forwardImpulse = 0
              t[h] || (t[h] = new b())
              w[h] || (w[h] = new b())
            }
            for (h = 0; h < e; h++)
              if (((g = c[h]), (l = g.raycastResult.body))) {
                var k = w[h]
                this.getWheelTransformWorld(h).vectorToWorldFrame(u[this.indexRightAxis], k)
                n = g.raycastResult.hitNormalWorld
                var p = k.dot(n)
                n.scale(p, r)
                k.vsub(r, k)
                k.normalize()
                n.cross(k, t[h])
                t[h].normalize()
                n = g
                p = f
                var q = g.raycastResult.hitPointWorld,
                  D = g.raycastResult.hitPointWorld
                if (1.1 < k.norm2()) l = 0
                else {
                  var G = B,
                    C = J,
                    A = O
                  p.getVelocityAtWorldPoint(q, G)
                  l.getVelocityAtWorldPoint(D, C)
                  G.vsub(C, A)
                  l = -0.2 * k.dot(A) * (1 / (p.invMass + l.invMass))
                }
                n.sideImpulse = l
                g.sideImpulse *= 1
              }
            this.sliding = !1
            for (h = 0; h < e; h++) {
              g = c[h]
              l = g.raycastResult.body
              p = 0
              g.slipInfo = 1
              if (l) {
                n = g.brake ? g.brake : 0
                G = f
                q = l
                D = g.raycastResult.hitPointWorld
                k = t[h]
                p = n
                C = D
                A = v
                var U = x,
                  V = z
                G.getVelocityAtWorldPoint(C, A)
                q.getVelocityAtWorldPoint(C, U)
                A.vsub(U, V)
                C = k.dot(V)
                G = d(G, D, k)
                q = d(q, D, k)
                q = (1 / (G + q)) * -C
                p < q && (q = p)
                q < -p && (q = -p)
                p = q
                p += g.engineForce * a
                n /= p
                g.slipInfo *= n
              }
              g.forwardImpulse = 0
              g.skidInfo = 1
              l &&
                ((g.skidInfo = 1),
                (l = g.suspensionForce * a * g.frictionSlip),
                (n = l * l),
                (g.forwardImpulse = p),
                (p = 0.5 * g.forwardImpulse),
                (q = 1 * g.sideImpulse),
                (p = p * p + q * q),
                (g.sliding = !1),
                p > n &&
                  ((this.sliding = !0),
                  (g.sliding = !0),
                  (n = l / Math.sqrt(p)),
                  (g.skidInfo *= n)))
            }
            if (this.sliding)
              for (h = 0; h < e; h++)
                (g = c[h]),
                  0 !== g.sideImpulse &&
                    1 > g.skidInfo &&
                    ((g.forwardImpulse *= g.skidInfo), (g.sideImpulse *= g.skidInfo))
            for (h = 0; h < e; h++)
              (g = c[h]),
                (a = new b()),
                a.copy(g.raycastResult.hitPointWorld),
                0 !== g.forwardImpulse &&
                  ((l = new b()), t[h].scale(g.forwardImpulse, l), f.applyImpulse(l, a)),
                0 !== g.sideImpulse &&
                  ((l = g.raycastResult.body),
                  (n = new b()),
                  n.copy(g.raycastResult.hitPointWorld),
                  (p = new b()),
                  w[h].scale(g.sideImpulse, p),
                  f.pointToLocalFrame(a, a),
                  (a['xyz'[this.indexUpAxis]] *= g.rollInfluence),
                  f.pointToWorldFrame(a, a),
                  f.applyImpulse(p, a),
                  p.scale(-1, p),
                  l.applyImpulse(p, n))
          }
          var v = new b(),
            x = new b(),
            z = new b(),
            C = new b(),
            A = new b(),
            D = new b(),
            G = new b(),
            B = new b(),
            J = new b(),
            O = new b()
        },
        {
          '../collision/Ray': 9,
          '../collision/RaycastResult': 10,
          '../math/Quaternion': 28,
          '../math/Vec3': 30,
          '../objects/WheelInfo': 36,
          './Body': 31,
        },
      ],
      33: [
        function(c, e, g) {
          function a(a) {
            this.wheelBodies = []
            this.coordinateSystem =
              'undefined' === typeof a.coordinateSystem
                ? new k(1, 2, 3)
                : a.coordinateSystem.clone()
            this.chassisBody = a.chassisBody
            this.chassisBody || ((a = new l(new k(5, 2, 0.5))), (this.chassisBody = new d(1, a)))
            this.constraints = []
            this.wheelAxes = []
            this.wheelForces = []
          }
          var d = c('./Body'),
            b = c('../shapes/Sphere'),
            l = c('../shapes/Box'),
            k = c('../math/Vec3'),
            h = c('../constraints/HingeConstraint')
          e.exports = a
          a.prototype.addWheel = function(a) {
            a = a || {}
            var c = a.body
            c || (c = new d(1, new b(1.2)))
            this.wheelBodies.push(c)
            this.wheelForces.push(0)
            new k()
            var e = 'undefined' !== typeof a.position ? a.position.clone() : new k(),
              f = new k()
            this.chassisBody.pointToWorldFrame(e, f)
            c.position.set(f.x, f.y, f.z)
            a = 'undefined' !== typeof a.axis ? a.axis.clone() : new k(0, 1, 0)
            this.wheelAxes.push(a)
            c = new h(this.chassisBody, c, {
              pivotA: e,
              axisA: a,
              pivotB: k.ZERO,
              axisB: a,
              collideConnected: !1,
            })
            this.constraints.push(c)
            return this.wheelBodies.length - 1
          }
          a.prototype.setSteeringValue = function(a, b) {
            var c = this.wheelAxes[b],
              d = Math.cos(a),
              e = Math.sin(a),
              f = c.x
            c = c.y
            this.constraints[b].axisA.set(d * f - e * c, e * f + d * c, 0)
          }
          a.prototype.setMotorSpeed = function(a, b) {
            var c = this.constraints[b]
            c.enableMotor()
            c.motorTargetVelocity = a
          }
          a.prototype.disableMotor = function(a) {
            this.constraints[a].disableMotor()
          }
          var f = new k()
          a.prototype.setWheelForce = function(a, b) {
            this.wheelForces[b] = a
          }
          a.prototype.applyWheelForce = function(a, b) {
            var c = this.wheelBodies[b],
              d = c.torque
            this.wheelAxes[b].scale(a, f)
            c.vectorToWorldFrame(f, f)
            d.vadd(f, d)
          }
          a.prototype.addToWorld = function(a) {
            for (
              var b = this.constraints, c = this.wheelBodies.concat([this.chassisBody]), d = 0;
              d < c.length;
              d++
            )
              a.add(c[d])
            for (d = 0; d < b.length; d++) a.addConstraint(b[d])
            a.addEventListener('preStep', this._update.bind(this))
          }
          a.prototype._update = function() {
            for (var a = this.wheelForces, b = 0; b < a.length; b++) this.applyWheelForce(a[b], b)
          }
          a.prototype.removeFromWorld = function(a) {
            for (
              var b = this.constraints, c = this.wheelBodies.concat([this.chassisBody]), d = 0;
              d < c.length;
              d++
            )
              a.remove(c[d])
            for (d = 0; d < b.length; d++) a.removeConstraint(b[d])
          }
          var q = new k()
          a.prototype.getWheelSpeed = function(a) {
            var b = this.wheelBodies[a].angularVelocity
            this.chassisBody.vectorToWorldFrame(this.wheelAxes[a], q)
            return b.dot(q)
          }
        },
        {
          '../constraints/HingeConstraint': 15,
          '../math/Vec3': 30,
          '../shapes/Box': 37,
          '../shapes/Sphere': 44,
          './Body': 31,
        },
      ],
      34: [
        function(c, e, g) {
          function a() {
            this.particles = []
            this.speedOfSound = this.smoothingRadius = this.density = 1
            this.viscosity = 0.01
            this.eps = 1e-6
            this.pressures = []
            this.densities = []
            this.neighbors = []
          }
          e.exports = a
          c('../shapes/Shape')
          e = c('../math/Vec3')
          c('../math/Quaternion')
          c('../shapes/Particle')
          c('../objects/Body')
          c('../material/Material')
          a.prototype.add = function(a) {
            this.particles.push(a)
            this.neighbors.length < this.particles.length && this.neighbors.push([])
          }
          a.prototype.remove = function(a) {
            a = this.particles.indexOf(a)
            ;-1 !== a &&
              (this.particles.splice(a, 1),
              this.neighbors.length > this.particles.length && this.neighbors.pop())
          }
          var d = new e()
          a.prototype.getNeighbors = function(a, b) {
            for (
              var c = this.particles.length,
                e = a.id,
                f = this.smoothingRadius * this.smoothingRadius,
                g = 0;
              g !== c;
              g++
            ) {
              var h = this.particles[g]
              h.position.vsub(a.position, d)
              e !== h.id && d.norm2() < f && b.push(h)
            }
          }
          var b = new e(),
            l = new e(),
            k = new e(),
            h = new e(),
            f = new e(),
            q = new e()
          a.prototype.update = function() {
            for (
              var a = this.particles.length, c = this.speedOfSound, d = this.eps, e = 0;
              e !== a;
              e++
            ) {
              var g = this.particles[e],
                t = this.neighbors[e]
              t.length = 0
              this.getNeighbors(g, t)
              t.push(this.particles[e])
              for (var v = t.length, x = 0, z = 0; z !== v; z++) {
                g.position.vsub(t[z].position, b)
                var C = b.norm()
                C = this.w(C)
                x += t[z].mass * C
              }
              this.densities[e] = x
              this.pressures[e] = c * c * (this.densities[e] - this.density)
            }
            for (e = 0; e !== a; e++) {
              c = this.particles[e]
              l.set(0, 0, 0)
              k.set(0, 0, 0)
              t = this.neighbors[e]
              v = t.length
              for (z = 0; z !== v; z++)
                (x = t[z]),
                  c.position.vsub(x.position, f),
                  (C = f.norm()),
                  (g =
                    -x.mass *
                    (this.pressures[e] / (this.densities[e] * this.densities[e] + d) +
                      this.pressures[z] / (this.densities[z] * this.densities[z] + d))),
                  this.gradw(f, h),
                  h.mult(g, h),
                  l.vadd(h, l),
                  x.velocity.vsub(c.velocity, q),
                  q.mult(
                    (1 / (1e-4 + this.densities[e] * this.densities[z])) * this.viscosity * x.mass,
                    q,
                  ),
                  (g = this.nablaw(C)),
                  q.mult(g, q),
                  k.vadd(q, k)
              k.mult(c.mass, k)
              l.mult(c.mass, l)
              c.force.vadd(k, c.force)
              c.force.vadd(l, c.force)
            }
          }
          a.prototype.w = function(a) {
            var b = this.smoothingRadius
            return (315 / (64 * Math.PI * Math.pow(b, 9))) * Math.pow(b * b - a * a, 3)
          }
          a.prototype.gradw = function(a, b) {
            var c = a.norm(),
              d = this.smoothingRadius
            a.mult((945 / (32 * Math.PI * Math.pow(d, 9))) * Math.pow(d * d - c * c, 2), b)
          }
          a.prototype.nablaw = function(a) {
            var b = this.smoothingRadius
            return (
              (945 / (32 * Math.PI * Math.pow(b, 9))) * (b * b - a * a) * (7 * a * a - 3 * b * b)
            )
          }
        },
        {
          '../material/Material': 25,
          '../math/Quaternion': 28,
          '../math/Vec3': 30,
          '../objects/Body': 31,
          '../shapes/Particle': 41,
          '../shapes/Shape': 43,
        },
      ],
      35: [
        function(c, e, g) {
          function a(a, b, c) {
            c = c || {}
            this.restLength = 'number' === typeof c.restLength ? c.restLength : 1
            this.stiffness = c.stiffness || 100
            this.damping = c.damping || 1
            this.bodyA = a
            this.bodyB = b
            this.localAnchorA = new d()
            this.localAnchorB = new d()
            c.localAnchorA && this.localAnchorA.copy(c.localAnchorA)
            c.localAnchorB && this.localAnchorB.copy(c.localAnchorB)
            c.worldAnchorA && this.setWorldAnchorA(c.worldAnchorA)
            c.worldAnchorB && this.setWorldAnchorB(c.worldAnchorB)
          }
          var d = c('../math/Vec3')
          e.exports = a
          a.prototype.setWorldAnchorA = function(a) {
            this.bodyA.pointToLocalFrame(a, this.localAnchorA)
          }
          a.prototype.setWorldAnchorB = function(a) {
            this.bodyB.pointToLocalFrame(a, this.localAnchorB)
          }
          a.prototype.getWorldAnchorA = function(a) {
            this.bodyA.pointToWorldFrame(this.localAnchorA, a)
          }
          a.prototype.getWorldAnchorB = function(a) {
            this.bodyB.pointToWorldFrame(this.localAnchorB, a)
          }
          var b = new d(),
            l = new d(),
            k = new d(),
            h = new d(),
            f = new d(),
            q = new d(),
            n = new d(),
            p = new d(),
            u = new d(),
            r = new d(),
            w = new d()
          a.prototype.applyForce = function() {
            var a = this.stiffness,
              c = this.damping,
              d = this.restLength,
              e = this.bodyA,
              g = this.bodyB
            this.getWorldAnchorA(f)
            this.getWorldAnchorB(q)
            f.vsub(e.position, n)
            q.vsub(g.position, p)
            q.vsub(f, b)
            var A = b.norm()
            l.copy(b)
            l.normalize()
            g.velocity.vsub(e.velocity, k)
            g.angularVelocity.cross(p, w)
            k.vadd(w, k)
            e.angularVelocity.cross(n, w)
            k.vsub(w, k)
            l.mult(-a * (A - d) - c * k.dot(l), h)
            e.force.vsub(h, e.force)
            g.force.vadd(h, g.force)
            n.cross(h, u)
            p.cross(h, r)
            e.torque.vsub(u, e.torque)
            g.torque.vadd(r, g.torque)
          }
        },
        { '../math/Vec3': 30 },
      ],
      36: [
        function(c, e, g) {
          function a(a) {
            a = k.defaults(a, {
              chassisConnectionPointLocal: new d(),
              chassisConnectionPointWorld: new d(),
              directionLocal: new d(),
              directionWorld: new d(),
              axleLocal: new d(),
              axleWorld: new d(),
              suspensionRestLength: 1,
              suspensionMaxLength: 2,
              radius: 1,
              suspensionStiffness: 100,
              dampingCompression: 10,
              dampingRelaxation: 10,
              frictionSlip: 1e4,
              steering: 0,
              rotation: 0,
              deltaRotation: 0,
              rollInfluence: 0.01,
              maxSuspensionForce: Number.MAX_VALUE,
              isFrontWheel: !0,
              clippedInvContactDotSuspension: 1,
              suspensionRelativeVelocity: 0,
              suspensionForce: 0,
              skidInfo: 0,
              suspensionLength: 0,
              maxSuspensionTravel: 1,
              useCustomSlidingRotationalSpeed: !1,
              customSlidingRotationalSpeed: -0.1,
            })
            this.maxSuspensionTravel = a.maxSuspensionTravel
            this.customSlidingRotationalSpeed = a.customSlidingRotationalSpeed
            this.useCustomSlidingRotationalSpeed = a.useCustomSlidingRotationalSpeed
            this.sliding = !1
            this.chassisConnectionPointLocal = a.chassisConnectionPointLocal.clone()
            this.chassisConnectionPointWorld = a.chassisConnectionPointWorld.clone()
            this.directionLocal = a.directionLocal.clone()
            this.directionWorld = a.directionWorld.clone()
            this.axleLocal = a.axleLocal.clone()
            this.axleWorld = a.axleWorld.clone()
            this.suspensionRestLength = a.suspensionRestLength
            this.suspensionMaxLength = a.suspensionMaxLength
            this.radius = a.radius
            this.suspensionStiffness = a.suspensionStiffness
            this.dampingCompression = a.dampingCompression
            this.dampingRelaxation = a.dampingRelaxation
            this.frictionSlip = a.frictionSlip
            this.deltaRotation = this.rotation = this.steering = 0
            this.rollInfluence = a.rollInfluence
            this.maxSuspensionForce = a.maxSuspensionForce
            this.brake = this.engineForce = 0
            this.isFrontWheel = a.isFrontWheel
            this.clippedInvContactDotSuspension = 1
            this.forwardImpulse = this.sideImpulse = this.suspensionLength = this.skidInfo = this.suspensionForce = this.suspensionRelativeVelocity = 0
            this.raycastResult = new l()
            this.worldTransform = new b()
            this.isInContact = !1
          }
          var d = c('../math/Vec3'),
            b = c('../math/Transform'),
            l = c('../collision/RaycastResult'),
            k = c('../utils/Utils')
          e.exports = a
          var h = new d(),
            f = new d()
          h = new d()
          a.prototype.updateWheel = function(a) {
            var b = this.raycastResult
            if (this.isInContact) {
              var c = b.hitNormalWorld.dot(b.directionWorld)
              b.hitPointWorld.vsub(a.position, f)
              a.getVelocityAtWorldPoint(f, h)
              a = b.hitNormalWorld.dot(h)
              ;-0.1 <= c
                ? ((this.suspensionRelativeVelocity = 0),
                  (this.clippedInvContactDotSuspension = 10))
                : ((c = -1 / c),
                  (this.suspensionRelativeVelocity = a * c),
                  (this.clippedInvContactDotSuspension = c))
            } else
              (b.suspensionLength = this.suspensionRestLength),
                (this.suspensionRelativeVelocity = 0),
                b.directionWorld.scale(-1, b.hitNormalWorld),
                (this.clippedInvContactDotSuspension = 1)
          }
        },
        {
          '../collision/RaycastResult': 10,
          '../math/Transform': 29,
          '../math/Vec3': 30,
          '../utils/Utils': 53,
        },
      ],
      37: [
        function(c, e, g) {
          function a(a) {
            d.call(this)
            this.type = d.types.BOX
            this.halfExtents = a
            this.convexPolyhedronRepresentation = null
            this.updateConvexPolyhedronRepresentation()
            this.updateBoundingSphereRadius()
          }
          e.exports = a
          var d = c('./Shape'),
            b = c('../math/Vec3'),
            l = c('./ConvexPolyhedron')
          a.prototype = new d()
          a.prototype.constructor = a
          a.prototype.updateConvexPolyhedronRepresentation = function() {
            var a = this.halfExtents.x,
              c = this.halfExtents.y,
              d = this.halfExtents.z
            a = [
              new b(-a, -c, -d),
              new b(a, -c, -d),
              new b(a, c, -d),
              new b(-a, c, -d),
              new b(-a, -c, d),
              new b(a, -c, d),
              new b(a, c, d),
              new b(-a, c, d),
            ]
            new b(0, 0, 1)
            new b(0, 1, 0)
            new b(1, 0, 0)
            this.convexPolyhedronRepresentation = a = new l(a, [
              [3, 2, 1, 0],
              [4, 5, 6, 7],
              [5, 4, 0, 1],
              [2, 3, 7, 6],
              [0, 4, 7, 3],
              [1, 2, 6, 5],
            ])
            a.material = this.material
          }
          a.prototype.calculateLocalInertia = function(c, d) {
            d = d || new b()
            a.calculateInertia(this.halfExtents, c, d)
            return d
          }
          a.calculateInertia = function(a, b, c) {
            c.x = (1 / 12) * b * (4 * a.y * a.y + 4 * a.z * a.z)
            c.y = (1 / 12) * b * (4 * a.x * a.x + 4 * a.z * a.z)
            c.z = (1 / 12) * b * (4 * a.y * a.y + 4 * a.x * a.x)
          }
          a.prototype.getSideNormals = function(a, b) {
            var c = this.halfExtents
            a[0].set(c.x, 0, 0)
            a[1].set(0, c.y, 0)
            a[2].set(0, 0, c.z)
            a[3].set(-c.x, 0, 0)
            a[4].set(0, -c.y, 0)
            a[5].set(0, 0, -c.z)
            if (void 0 !== b) for (c = 0; c !== a.length; c++) b.vmult(a[c], a[c])
            return a
          }
          a.prototype.volume = function() {
            return 8 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z
          }
          a.prototype.updateBoundingSphereRadius = function() {
            this.boundingSphereRadius = this.halfExtents.norm()
          }
          var k = new b()
          new b()
          a.prototype.forEachWorldCorner = function(a, b, c) {
            var d = this.halfExtents
            d = [
              [d.x, d.y, d.z],
              [-d.x, d.y, d.z],
              [-d.x, -d.y, d.z],
              [-d.x, -d.y, -d.z],
              [d.x, -d.y, -d.z],
              [d.x, d.y, -d.z],
              [-d.x, d.y, -d.z],
              [d.x, -d.y, d.z],
            ]
            for (var e = 0; e < d.length; e++)
              k.set(d[e][0], d[e][1], d[e][2]), b.vmult(k, k), a.vadd(k, k), c(k.x, k.y, k.z)
          }
          var h = [new b(), new b(), new b(), new b(), new b(), new b(), new b(), new b()]
          a.prototype.calculateWorldAABB = function(a, b, c, d) {
            var e = this.halfExtents
            h[0].set(e.x, e.y, e.z)
            h[1].set(-e.x, e.y, e.z)
            h[2].set(-e.x, -e.y, e.z)
            h[3].set(-e.x, -e.y, -e.z)
            h[4].set(e.x, -e.y, -e.z)
            h[5].set(e.x, e.y, -e.z)
            h[6].set(-e.x, e.y, -e.z)
            h[7].set(e.x, -e.y, e.z)
            var f = h[0]
            b.vmult(f, f)
            a.vadd(f, f)
            d.copy(f)
            c.copy(f)
            for (e = 1; 8 > e; e++) {
              f = h[e]
              b.vmult(f, f)
              a.vadd(f, f)
              var g = f.x,
                l = f.y
              f = f.z
              g > d.x && (d.x = g)
              l > d.y && (d.y = l)
              f > d.z && (d.z = f)
              g < c.x && (c.x = g)
              l < c.y && (c.y = l)
              f < c.z && (c.z = f)
            }
          }
        },
        { '../math/Vec3': 30, './ConvexPolyhedron': 38, './Shape': 43 },
      ],
      38: [
        function(c, e, g) {
          function a(a, b, c) {
            d.call(this)
            this.type = d.types.CONVEXPOLYHEDRON
            this.vertices = a || []
            this.worldVertices = []
            this.worldVerticesNeedsUpdate = !0
            this.faces = b || []
            this.faceNormals = []
            this.computeNormals()
            this.worldFaceNormalsNeedsUpdate = !0
            this.worldFaceNormals = []
            this.uniqueEdges = []
            this.uniqueAxes = c ? c.slice() : null
            this.computeEdges()
            this.updateBoundingSphereRadius()
          }
          e.exports = a
          var d = c('./Shape'),
            b = c('../math/Vec3')
          c('../math/Quaternion')
          var l = c('../math/Transform')
          a.prototype = new d()
          a.prototype.constructor = a
          var k = new b()
          a.prototype.computeEdges = function() {
            for (
              var a = this.faces, b = this.vertices, c = this.uniqueEdges, d = (c.length = 0);
              d !== a.length;
              d++
            )
              for (var e = a[d], f = e.length, g = 0; g !== f; g++) {
                b[e[g]].vsub(b[e[(g + 1) % f]], k)
                k.normalize()
                for (var h = !1, l = 0; l !== c.length; l++)
                  if (c[l].almostEquals(k) || c[l].almostEquals(k)) {
                    h = !0
                    break
                  }
                h || c.push(k.clone())
              }
          }
          a.prototype.computeNormals = function() {
            this.faceNormals.length = this.faces.length
            for (var a = 0; a < this.faces.length; a++) {
              for (var c = 0; c < this.faces[a].length; c++)
                if (!this.vertices[this.faces[a][c]])
                  throw Error('Vertex ' + this.faces[a][c] + ' not found!')
              c = this.faceNormals[a] || new b()
              this.getFaceNormal(a, c)
              c.negate(c)
              this.faceNormals[a] = c
              if (0 > c.dot(this.vertices[this.faces[a][0]]))
                for (
                  console.error(
                    '.faceNormals[' +
                      a +
                      '] = Vec3(' +
                      c.toString() +
                      ') looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.',
                  ),
                    c = 0;
                  c < this.faces[a].length;
                  c++
                )
                  console.warn(
                    '.vertices[' +
                      this.faces[a][c] +
                      '] = Vec3(' +
                      this.vertices[this.faces[a][c]].toString() +
                      ')',
                  )
            }
          }
          var h = new b(),
            f = new b()
          a.computeNormal = function(a, b, c, d) {
            b.vsub(a, f)
            c.vsub(b, h)
            h.cross(f, d)
            d.isZero() || d.normalize()
          }
          a.prototype.getFaceNormal = function(b, c) {
            var d = this.faces[b]
            return a.computeNormal(this.vertices[d[0]], this.vertices[d[1]], this.vertices[d[2]], c)
          }
          var q = new b()
          a.prototype.clipAgainstHull = function(a, c, d, e, f, g, h, l, n) {
            for (var k = -1, p = -Number.MAX_VALUE, r = 0; r < d.faces.length; r++) {
              q.copy(d.faceNormals[r])
              f.vmult(q, q)
              var y = q.dot(g)
              y > p && ((p = y), (k = r))
            }
            p = []
            r = d.faces[k]
            y = r.length
            for (var u = 0; u < y; u++) {
              var w = d.vertices[r[u]],
                t = new b()
              t.copy(w)
              f.vmult(t, t)
              e.vadd(t, t)
              p.push(t)
            }
            0 <= k && this.clipFaceAgainstHull(g, a, c, p, h, l, n)
          }
          var n = new b(),
            p = new b(),
            u = new b(),
            r = new b(),
            w = new b(),
            t = new b()
          a.prototype.findSeparatingAxis = function(a, b, c, d, e, f, g, h) {
            var l = Number.MAX_VALUE,
              k = 0
            if (this.uniqueAxes)
              for (y = 0; y !== this.uniqueAxes.length; y++) {
                c.vmult(this.uniqueAxes[y], n)
                B = this.testSepAxis(n, a, b, c, d, e)
                if (!1 === B) return !1
                B < l && ((l = B), f.copy(n))
              }
            else
              for (var q = g ? g.length : this.faces.length, y = 0; y < q; y++) {
                B = g ? g[y] : y
                n.copy(this.faceNormals[B])
                c.vmult(n, n)
                var B = this.testSepAxis(n, a, b, c, d, e)
                if (!1 === B) return !1
                B < l && ((l = B), f.copy(n))
              }
            if (a.uniqueAxes)
              for (y = 0; y !== a.uniqueAxes.length; y++) {
                e.vmult(a.uniqueAxes[y], p)
                k++
                B = this.testSepAxis(p, a, b, c, d, e)
                if (!1 === B) return !1
                B < l && ((l = B), f.copy(p))
              }
            else
              for (g = h ? h.length : a.faces.length, y = 0; y < g; y++) {
                B = h ? h[y] : y
                p.copy(a.faceNormals[B])
                e.vmult(p, p)
                k++
                B = this.testSepAxis(p, a, b, c, d, e)
                if (!1 === B) return !1
                B < l && ((l = B), f.copy(p))
              }
            for (h = 0; h !== this.uniqueEdges.length; h++)
              for (c.vmult(this.uniqueEdges[h], r), k = 0; k !== a.uniqueEdges.length; k++)
                if ((e.vmult(a.uniqueEdges[k], w), r.cross(w, t), !t.almostZero())) {
                  t.normalize()
                  y = this.testSepAxis(t, a, b, c, d, e)
                  if (!1 === y) return !1
                  y < l && ((l = y), f.copy(t))
                }
            d.vsub(b, u)
            0 < u.dot(f) && f.negate(f)
            return !0
          }
          var v = [],
            x = []
          a.prototype.testSepAxis = function(b, c, d, e, f, g) {
            a.project(this, b, d, e, v)
            a.project(c, b, f, g, x)
            d = v[0]
            b = v[1]
            c = x[0]
            e = x[1]
            if (d < e || c < b) return !1
            d -= e
            b = c - b
            return d < b ? d : b
          }
          var z = new b(),
            C = new b()
          a.prototype.calculateLocalInertia = function(a, b) {
            this.computeLocalAABB(z, C)
            var c = C.x - z.x,
              d = C.y - z.y,
              e = C.z - z.z
            b.x = (1 / 12) * a * (4 * d * d + 4 * e * e)
            b.y = (1 / 12) * a * (4 * c * c + 4 * e * e)
            b.z = (1 / 12) * a * (4 * d * d + 4 * c * c)
          }
          a.prototype.getPlaneConstantOfFace = function(a) {
            return -this.faceNormals[a].dot(this.vertices[this.faces[a][0]])
          }
          var A = new b(),
            D = new b(),
            G = new b(),
            B = new b(),
            J = new b(),
            O = new b(),
            M = new b(),
            K = new b()
          a.prototype.clipFaceAgainstHull = function(a, b, c, d, e, f, g) {
            for (var h = [], l = -1, k = Number.MAX_VALUE, n = 0; n < this.faces.length; n++) {
              A.copy(this.faceNormals[n])
              c.vmult(A, A)
              var p = A.dot(a)
              p < k && ((k = p), (l = n))
            }
            if (!(0 > l)) {
              a = this.faces[l]
              a.connectedFaces = []
              for (k = 0; k < this.faces.length; k++)
                for (n = 0; n < this.faces[k].length; n++)
                  -1 !== a.indexOf(this.faces[k][n]) &&
                    k !== l &&
                    -1 === a.connectedFaces.indexOf(k) &&
                    a.connectedFaces.push(k)
              k = a.length
              for (n = 0; n < k; n++) {
                p = this.vertices[a[n]]
                p.vsub(this.vertices[a[(n + 1) % k]], D)
                G.copy(D)
                c.vmult(G, G)
                b.vadd(G, G)
                B.copy(this.faceNormals[l])
                c.vmult(B, B)
                b.vadd(B, B)
                G.cross(B, J)
                J.negate(J)
                O.copy(p)
                c.vmult(O, O)
                b.vadd(O, O)
                O.dot(J)
                p = a.connectedFaces[n]
                M.copy(this.faceNormals[p])
                p = this.getPlaneConstantOfFace(p)
                K.copy(M)
                c.vmult(K, K)
                p -= K.dot(b)
                for (this.clipFaceAgainstPlane(d, h, K, p); d.length; ) d.shift()
                for (; h.length; ) d.push(h.shift())
              }
              M.copy(this.faceNormals[l])
              p = this.getPlaneConstantOfFace(l)
              K.copy(M)
              c.vmult(K, K)
              p -= K.dot(b)
              for (k = 0; k < d.length; k++)
                (b = K.dot(d[k]) + p),
                  b <= e &&
                    (console.log('clamped: depth=' + b + ' to minDist=' + (e + '')), (b = e)),
                  b <= f &&
                    ((c = d[k]),
                    0 >= b &&
                      g.push({
                        point: c,
                        normal: K,
                        depth: b,
                      }))
            }
          }
          a.prototype.clipFaceAgainstPlane = function(a, c, d, e) {
            var f = a.length
            if (2 > f) return c
            var g = a[a.length - 1]
            var h = d.dot(g) + e
            for (var l = 0; l < f; l++) {
              var k = a[l]
              var n = d.dot(k) + e
              if (0 > h) {
                if (0 > n) {
                  var p = new b()
                  p.copy(k)
                } else (p = new b()), g.lerp(k, h / (h - n), p)
                c.push(p)
              } else 0 > n && ((p = new b()), g.lerp(k, h / (h - n), p), c.push(p), c.push(k))
              g = k
              h = n
            }
            return c
          }
          a.prototype.computeWorldVertices = function(a, c) {
            for (var d = this.vertices.length; this.worldVertices.length < d; )
              this.worldVertices.push(new b())
            for (var e = this.vertices, f = this.worldVertices, g = 0; g !== d; g++)
              c.vmult(e[g], f[g]), a.vadd(f[g], f[g])
            this.worldVerticesNeedsUpdate = !1
          }
          new b()
          a.prototype.computeLocalAABB = function(a, b) {
            var c = this.vertices.length,
              d = this.vertices
            a.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE)
            b.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE)
            for (var e = 0; e < c; e++) {
              var f = d[e]
              f.x < a.x ? (a.x = f.x) : f.x > b.x && (b.x = f.x)
              f.y < a.y ? (a.y = f.y) : f.y > b.y && (b.y = f.y)
              f.z < a.z ? (a.z = f.z) : f.z > b.z && (b.z = f.z)
            }
          }
          a.prototype.computeWorldFaceNormals = function(a) {
            for (var c = this.faceNormals.length; this.worldFaceNormals.length < c; )
              this.worldFaceNormals.push(new b())
            for (var d = this.faceNormals, e = this.worldFaceNormals, f = 0; f !== c; f++)
              a.vmult(d[f], e[f])
            this.worldFaceNormalsNeedsUpdate = !1
          }
          a.prototype.updateBoundingSphereRadius = function() {
            for (var a = 0, b = this.vertices, c = 0, d = b.length; c !== d; c++) {
              var e = b[c].norm2()
              e > a && (a = e)
            }
            this.boundingSphereRadius = Math.sqrt(a)
          }
          var H = new b()
          a.prototype.calculateWorldAABB = function(a, b, c, d) {
            for (
              var e = this.vertices.length, f = this.vertices, g, h, l, k, n, p, q = 0;
              q < e;
              q++
            ) {
              H.copy(f[q])
              b.vmult(H, H)
              a.vadd(H, H)
              var y = H
              if (y.x < g || void 0 === g) g = y.x
              else if (y.x > k || void 0 === k) k = y.x
              if (y.y < h || void 0 === h) h = y.y
              else if (y.y > n || void 0 === n) n = y.y
              if (y.z < l || void 0 === l) l = y.z
              else if (y.z > p || void 0 === p) p = y.z
            }
            c.set(g, h, l)
            d.set(k, n, p)
          }
          a.prototype.volume = function() {
            return (4 * Math.PI * this.boundingSphereRadius) / 3
          }
          a.prototype.getAveragePointLocal = function(a) {
            a = a || new b()
            for (var c = this.vertices.length, d = this.vertices, e = 0; e < c; e++) a.vadd(d[e], a)
            a.mult(1 / c, a)
            return a
          }
          a.prototype.transformAllPoints = function(a, b) {
            var c = this.vertices.length,
              d = this.vertices
            if (b) {
              for (var e = 0; e < c; e++) {
                var f = d[e]
                b.vmult(f, f)
              }
              for (e = 0; e < this.faceNormals.length; e++) (f = this.faceNormals[e]), b.vmult(f, f)
            }
            if (a) for (e = 0; e < c; e++) (f = d[e]), f.vadd(a, f)
          }
          var L = new b(),
            F = new b(),
            y = new b()
          a.prototype.pointIsInside = function(a) {
            var b = this.vertices,
              c = this.faces,
              d = this.faceNormals,
              e = this.faces.length
            this.getAveragePointLocal(L)
            for (var f = 0; f < e; f++) {
              var g = d[f]
              var h = b[c[f][0]],
                l = F
              a.vsub(h, l)
              l = g.dot(l)
              var k = y
              L.vsub(h, k)
              g = g.dot(k)
              if ((0 > l && 0 < g) || (0 < l && 0 > g)) return !1
            }
            return -1
          }
          new b()
          var N = new b(),
            I = new b()
          a.project = function(a, b, c, d, e) {
            var f = a.vertices.length
            a = a.vertices
            I.setZero()
            l.vectorToLocalFrame(c, d, b, N)
            l.pointToLocalFrame(c, d, I, I)
            d = I.dot(N)
            c = b = a[0].dot(N)
            for (var g = 1; g < f; g++) {
              var h = a[g].dot(N)
              h > b && (b = h)
              h < c && (c = h)
            }
            c -= d
            b -= d
            c > b && ((f = c), (c = b), (b = f))
            e[0] = b
            e[1] = c
          }
        },
        {
          '../math/Quaternion': 28,
          '../math/Transform': 29,
          '../math/Vec3': 30,
          './Shape': 43,
        },
      ],
      39: [
        function(c, e, g) {
          function a(a, c, e, g) {
            var f = [],
              h = [],
              k = [],
              q = [],
              w = [],
              t = Math.cos,
              v = Math.sin
            f.push(new b(c * t(0), c * v(0), 0.5 * -e))
            q.push(0)
            f.push(new b(a * t(0), a * v(0), 0.5 * e))
            w.push(1)
            for (var x = 0; x < g; x++) {
              var z = ((2 * Math.PI) / g) * (x + 1),
                C = ((2 * Math.PI) / g) * (x + 0.5)
              x < g - 1
                ? (f.push(new b(c * t(z), c * v(z), 0.5 * -e)),
                  q.push(2 * x + 2),
                  f.push(new b(a * t(z), a * v(z), 0.5 * e)),
                  w.push(2 * x + 3),
                  k.push([2 * x + 2, 2 * x + 3, 2 * x + 1, 2 * x]))
                : k.push([0, 1, 2 * x + 1, 2 * x])
              ;(1 === g % 2 || x < g / 2) && h.push(new b(t(C), v(C), 0))
            }
            k.push(w)
            h.push(new b(0, 0, 1))
            a = []
            for (x = 0; x < q.length; x++) a.push(q[q.length - x - 1])
            k.push(a)
            this.type = d.types.CONVEXPOLYHEDRON
            l.call(this, f, k, h)
          }
          e.exports = a
          var d = c('./Shape'),
            b = c('../math/Vec3')
          c('../math/Quaternion')
          var l = c('./ConvexPolyhedron')
          a.prototype = new l()
        },
        {
          '../math/Quaternion': 28,
          '../math/Vec3': 30,
          './ConvexPolyhedron': 38,
          './Shape': 43,
        },
      ],
      40: [
        function(c, e, g) {
          function a(a, c) {
            c = k.defaults(c, {
              maxValue: null,
              minValue: null,
              elementSize: 1,
            })
            this.data = a
            this.maxValue = c.maxValue
            this.minValue = c.minValue
            this.elementSize = c.elementSize
            null === c.minValue && this.updateMinValue()
            null === c.maxValue && this.updateMaxValue()
            this.cacheEnabled = !0
            d.call(this)
            this.pillarConvex = new b()
            this.pillarOffset = new l()
            this.type = d.types.HEIGHTFIELD
            this.updateBoundingSphereRadius()
            this._cachedPillars = {}
          }
          var d = c('./Shape'),
            b = c('./ConvexPolyhedron'),
            l = c('../math/Vec3'),
            k = c('../utils/Utils')
          e.exports = a
          a.prototype = new d()
          a.prototype.update = function() {
            this._cachedPillars = {}
          }
          a.prototype.updateMinValue = function() {
            for (var a = this.data, b = a[0][0], c = 0; c !== a.length; c++)
              for (var d = 0; d !== a[c].length; d++) {
                var e = a[c][d]
                e < b && (b = e)
              }
            this.minValue = b
          }
          a.prototype.updateMaxValue = function() {
            for (var a = this.data, b = a[0][0], c = 0; c !== a.length; c++)
              for (var d = 0; d !== a[c].length; d++) {
                var e = a[c][d]
                e > b && (b = e)
              }
            this.maxValue = b
          }
          a.prototype.setHeightValueAtIndex = function(a, b, c) {
            this.data[a][b] = c
            this.clearCachedConvexTrianglePillar(a, b, !1)
            0 < a &&
              (this.clearCachedConvexTrianglePillar(a - 1, b, !0),
              this.clearCachedConvexTrianglePillar(a - 1, b, !1))
            0 < b &&
              (this.clearCachedConvexTrianglePillar(a, b - 1, !0),
              this.clearCachedConvexTrianglePillar(a, b - 1, !1))
            0 < b && 0 < a && this.clearCachedConvexTrianglePillar(a - 1, b - 1, !0)
          }
          a.prototype.getRectMinMax = function(a, b, c, d, e) {
            e = e || []
            for (var f = this.data, g = this.minValue; a <= c; a++)
              for (var h = b; h <= d; h++) {
                var l = f[a][h]
                l > g && (g = l)
              }
            e[0] = this.minValue
            e[1] = g
          }
          a.prototype.getIndexOfPosition = function(a, b, c, d) {
            var e = this.elementSize,
              f = this.data
            a = Math.floor(a / e)
            b = Math.floor(b / e)
            c[0] = a
            c[1] = b
            d &&
              (0 > a && (a = 0),
              0 > b && (b = 0),
              a >= f.length - 1 && (a = f.length - 1),
              b >= f[0].length - 1 && (b = f[0].length - 1))
            return 0 > a || 0 > b || a >= f.length - 1 || b >= f[0].length - 1 ? !1 : !0
          }
          a.prototype.getHeightAt = function(a, b, c) {
            var d = []
            this.getIndexOfPosition(a, b, d, c)
            a = []
            this.getRectMinMax(d[0], d[1] + 1, d[0], d[1] + 1, a)
            return (a[0] + a[1]) / 2
          }
          a.prototype.getCacheConvexTrianglePillarKey = function(a, b, c) {
            return a + '_' + b + '_' + (c ? 1 : 0)
          }
          a.prototype.getCachedConvexTrianglePillar = function(a, b, c) {
            return this._cachedPillars[this.getCacheConvexTrianglePillarKey(a, b, c)]
          }
          a.prototype.setCachedConvexTrianglePillar = function(a, b, c, d, e) {
            this._cachedPillars[this.getCacheConvexTrianglePillarKey(a, b, c)] = {
              convex: d,
              offset: e,
            }
          }
          a.prototype.clearCachedConvexTrianglePillar = function(a, b, c) {
            delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(a, b, c)]
          }
          a.prototype.getConvexTrianglePillar = function(a, c, d) {
            var e = this.pillarConvex,
              f = this.pillarOffset
            if (this.cacheEnabled) {
              var g = this.getCachedConvexTrianglePillar(a, c, d)
              if (g) {
                this.pillarConvex = g.convex
                this.pillarOffset = g.offset
                return
              }
              e = new b()
              f = new l()
              this.pillarConvex = e
              this.pillarOffset = f
            }
            g = this.data
            var h = this.elementSize,
              k = e.faces
            e.vertices.length = 6
            for (var q = 0; 6 > q; q++) e.vertices[q] || (e.vertices[q] = new l())
            k.length = 5
            for (q = 0; 5 > q; q++) k[q] || (k[q] = [])
            q = e.vertices
            var v =
              (Math.min(g[a][c], g[a + 1][c], g[a][c + 1], g[a + 1][c + 1]) - this.minValue) / 2 +
              this.minValue
            d
              ? (f.set((a + 0.75) * h, (c + 0.75) * h, v),
                q[0].set(0.25 * h, 0.25 * h, g[a + 1][c + 1] - v),
                q[1].set(-0.75 * h, 0.25 * h, g[a][c + 1] - v),
                q[2].set(0.25 * h, -0.75 * h, g[a + 1][c] - v),
                q[3].set(0.25 * h, 0.25 * h, -v - 1),
                q[4].set(-0.75 * h, 0.25 * h, -v - 1),
                q[5].set(0.25 * h, -0.75 * h, -v - 1),
                (k[0][0] = 0),
                (k[0][1] = 1),
                (k[0][2] = 2),
                (k[1][0] = 5),
                (k[1][1] = 4),
                (k[1][2] = 3),
                (k[2][0] = 2),
                (k[2][1] = 5),
                (k[2][2] = 3),
                (k[2][3] = 0),
                (k[3][0] = 3),
                (k[3][1] = 4),
                (k[3][2] = 1),
                (k[3][3] = 0),
                (k[4][0] = 1),
                (k[4][1] = 4),
                (k[4][2] = 5),
                (k[4][3] = 2))
              : (f.set((a + 0.25) * h, (c + 0.25) * h, v),
                q[0].set(-0.25 * h, -0.25 * h, g[a][c] - v),
                q[1].set(0.75 * h, -0.25 * h, g[a + 1][c] - v),
                q[2].set(-0.25 * h, 0.75 * h, g[a][c + 1] - v),
                q[3].set(-0.25 * h, -0.25 * h, -v - 1),
                q[4].set(0.75 * h, -0.25 * h, -v - 1),
                q[5].set(-0.25 * h, 0.75 * h, -v - 1),
                (k[0][0] = 0),
                (k[0][1] = 1),
                (k[0][2] = 2),
                (k[1][0] = 5),
                (k[1][1] = 4),
                (k[1][2] = 3),
                (k[2][0] = 0),
                (k[2][1] = 2),
                (k[2][2] = 5),
                (k[2][3] = 3),
                (k[3][0] = 1),
                (k[3][1] = 0),
                (k[3][2] = 3),
                (k[3][3] = 4),
                (k[4][0] = 4),
                (k[4][1] = 5),
                (k[4][2] = 2),
                (k[4][3] = 1))
            e.computeNormals()
            e.computeEdges()
            e.updateBoundingSphereRadius()
            this.setCachedConvexTrianglePillar(a, c, d, e, f)
          }
          a.prototype.calculateLocalInertia = function(a, b) {
            b = b || new l()
            b.set(0, 0, 0)
            return b
          }
          a.prototype.volume = function() {
            return Number.MAX_VALUE
          }
          a.prototype.calculateWorldAABB = function(a, b, c, d) {
            c.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE)
            d.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE)
          }
          a.prototype.updateBoundingSphereRadius = function() {
            var a = this.data,
              b = this.elementSize
            this.boundingSphereRadius = new l(
              a.length * b,
              a[0].length * b,
              Math.max(Math.abs(this.maxValue), Math.abs(this.minValue)),
            ).norm()
          }
        },
        {
          '../math/Vec3': 30,
          '../utils/Utils': 53,
          './ConvexPolyhedron': 38,
          './Shape': 43,
        },
      ],
      41: [
        function(c, e, g) {
          function a() {
            d.call(this)
            this.type = d.types.PARTICLE
          }
          e.exports = a
          var d = c('./Shape'),
            b = c('../math/Vec3')
          a.prototype = new d()
          a.prototype.constructor = a
          a.prototype.calculateLocalInertia = function(a, c) {
            c = c || new b()
            c.set(0, 0, 0)
            return c
          }
          a.prototype.volume = function() {
            return 0
          }
          a.prototype.updateBoundingSphereRadius = function() {
            this.boundingSphereRadius = 0
          }
          a.prototype.calculateWorldAABB = function(a, b, c, d) {
            c.copy(a)
            d.copy(a)
          }
        },
        { '../math/Vec3': 30, './Shape': 43 },
      ],
      42: [
        function(c, e, g) {
          function a() {
            d.call(this)
            this.type = d.types.PLANE
            this.worldNormal = new b()
            this.worldNormalNeedsUpdate = !0
            this.boundingSphereRadius = Number.MAX_VALUE
          }
          e.exports = a
          var d = c('./Shape'),
            b = c('../math/Vec3')
          a.prototype = new d()
          a.prototype.constructor = a
          a.prototype.computeWorldNormal = function(a) {
            var b = this.worldNormal
            b.set(0, 0, 1)
            a.vmult(b, b)
            this.worldNormalNeedsUpdate = !1
          }
          a.prototype.calculateLocalInertia = function(a, c) {
            return (c = c || new b())
          }
          a.prototype.volume = function() {
            return Number.MAX_VALUE
          }
          var l = new b()
          a.prototype.calculateWorldAABB = function(a, b, c, d) {
            l.set(0, 0, 1)
            b.vmult(l, l)
            b = Number.MAX_VALUE
            c.set(-b, -b, -b)
            d.set(b, b, b)
            1 === l.x && (d.x = a.x)
            1 === l.y && (d.y = a.y)
            1 === l.z && (d.z = a.z)
            ;-1 === l.x && (c.x = a.x)
            ;-1 === l.y && (c.y = a.y)
            ;-1 === l.z && (c.z = a.z)
          }
          a.prototype.updateBoundingSphereRadius = function() {
            this.boundingSphereRadius = Number.MAX_VALUE
          }
        },
        { '../math/Vec3': 30, './Shape': 43 },
      ],
      43: [
        function(c, e, g) {
          function a() {
            this.id = a.idCounter++
            this.boundingSphereRadius = this.type = 0
            this.collisionResponse = !0
            this.material = null
          }
          e.exports = a
          a = c('./Shape')
          c('../math/Vec3')
          c('../math/Quaternion')
          c('../material/Material')
          a.prototype.constructor = a
          a.prototype.updateBoundingSphereRadius = function() {
            throw 'computeBoundingSphereRadius() not implemented for shape type ' + this.type
          }
          a.prototype.volume = function() {
            throw 'volume() not implemented for shape type ' + this.type
          }
          a.prototype.calculateLocalInertia = function(a, b) {
            throw 'calculateLocalInertia() not implemented for shape type ' + this.type
          }
          a.idCounter = 0
          a.types = {
            SPHERE: 1,
            PLANE: 2,
            BOX: 4,
            COMPOUND: 8,
            CONVEXPOLYHEDRON: 16,
            HEIGHTFIELD: 32,
            PARTICLE: 64,
            CYLINDER: 128,
            TRIMESH: 256,
          }
        },
        {
          '../material/Material': 25,
          '../math/Quaternion': 28,
          '../math/Vec3': 30,
          './Shape': 43,
        },
      ],
      44: [
        function(c, e, g) {
          function a(a) {
            d.call(this)
            this.radius = void 0 !== a ? Number(a) : 1
            this.type = d.types.SPHERE
            if (0 > this.radius) throw Error('The sphere radius cannot be negative.')
            this.updateBoundingSphereRadius()
          }
          e.exports = a
          var d = c('./Shape'),
            b = c('../math/Vec3')
          a.prototype = new d()
          a.prototype.constructor = a
          a.prototype.calculateLocalInertia = function(a, c) {
            c = c || new b()
            var d = (2 * a * this.radius * this.radius) / 5
            c.x = d
            c.y = d
            c.z = d
            return c
          }
          a.prototype.volume = function() {
            return (4 * Math.PI * this.radius) / 3
          }
          a.prototype.updateBoundingSphereRadius = function() {
            this.boundingSphereRadius = this.radius
          }
          a.prototype.calculateWorldAABB = function(a, b, c, d) {
            b = this.radius
            for (var e = ['x', 'y', 'z'], f = 0; f < e.length; f++) {
              var g = e[f]
              c[g] = a[g] - b
              d[g] = a[g] + b
            }
          }
        },
        { '../math/Vec3': 30, './Shape': 43 },
      ],
      45: [
        function(c, e, g) {
          function a(a, c) {
            d.call(this)
            this.type = d.types.TRIMESH
            this.vertices = new Float32Array(a)
            this.indices = new Int16Array(c)
            this.normals = new Float32Array(c.length)
            this.aabb = new k()
            this.edges = null
            this.scale = new b(1, 1, 1)
            this.tree = new h()
            this.updateEdges()
            this.updateNormals()
            this.updateAABB()
            this.updateBoundingSphereRadius()
            this.updateTree()
          }
          e.exports = a
          var d = c('./Shape'),
            b = c('../math/Vec3')
          c('../math/Quaternion')
          var l = c('../math/Transform'),
            k = c('../collision/AABB'),
            h = c('../utils/Octree')
          a.prototype = new d()
          a.prototype.constructor = a
          var f = new b()
          a.prototype.updateTree = function() {
            var a = this.tree
            a.reset()
            a.aabb.copy(this.aabb)
            var c = this.scale
            a.aabb.lowerBound.x *= 1 / c.x
            a.aabb.lowerBound.y *= 1 / c.y
            a.aabb.lowerBound.z *= 1 / c.z
            a.aabb.upperBound.x *= 1 / c.x
            a.aabb.upperBound.y *= 1 / c.y
            a.aabb.upperBound.z *= 1 / c.z
            c = new k()
            for (
              var d = new b(), e = new b(), f = new b(), g = [d, e, f], l = 0;
              l < this.indices.length / 3;
              l++
            ) {
              var h = 3 * l
              this._getUnscaledVertex(this.indices[h], d)
              this._getUnscaledVertex(this.indices[h + 1], e)
              this._getUnscaledVertex(this.indices[h + 2], f)
              c.setFromPoints(g)
              a.insert(c, l)
            }
            a.removeEmptyNodes()
          }
          var q = new k()
          a.prototype.getTrianglesInAABB = function(a, b) {
            q.copy(a)
            var c = this.scale,
              d = c.x,
              e = c.y
            c = c.z
            var f = q.lowerBound,
              g = q.upperBound
            f.x /= d
            f.y /= e
            f.z /= c
            g.x /= d
            g.y /= e
            g.z /= c
            return this.tree.aabbQuery(q, b)
          }
          a.prototype.setScale = function(a) {
            var b = (a.x === a.y) === a.z
            ;((this.scale.x === this.scale.y) === this.scale.z && b) || this.updateNormals()
            this.scale.copy(a)
            this.updateAABB()
            this.updateBoundingSphereRadius()
          }
          a.prototype.updateNormals = function() {
            for (var b = this.normals, c = 0; c < this.indices.length / 3; c++) {
              var d = 3 * c,
                e = this.indices[d + 1],
                g = this.indices[d + 2]
              this.getVertex(this.indices[d], w)
              this.getVertex(e, t)
              this.getVertex(g, v)
              a.computeNormal(t, w, v, f)
              b[d] = f.x
              b[d + 1] = f.y
              b[d + 2] = f.z
            }
          }
          a.prototype.updateEdges = function() {
            for (
              var a = {},
                b = function(b, c) {
                  a[e < f ? e + '_' + f : f + '_' + e] = !0
                },
                c = 0;
              c < this.indices.length / 3;
              c++
            ) {
              var d = 3 * c,
                e = this.indices[d],
                f = this.indices[d + 1]
              d = this.indices[d + 2]
              b(e, f)
              b(f, d)
              b(d, e)
            }
            b = Object.keys(a)
            this.edges = new Int16Array(2 * b.length)
            for (c = 0; c < b.length; c++)
              (d = b[c].split('_')),
                (this.edges[2 * c] = parseInt(d[0], 10)),
                (this.edges[2 * c + 1] = parseInt(d[1], 10))
          }
          a.prototype.getEdgeVertex = function(a, b, c) {
            this.getVertex(this.edges[2 * a + (b ? 1 : 0)], c)
          }
          var n = new b(),
            p = new b()
          a.prototype.getEdgeVector = function(a, b) {
            this.getEdgeVertex(a, 0, n)
            this.getEdgeVertex(a, 1, p)
            p.vsub(n, b)
          }
          var u = new b(),
            r = new b()
          a.computeNormal = function(a, b, c, d) {
            b.vsub(a, r)
            c.vsub(b, u)
            u.cross(r, d)
            d.isZero() || d.normalize()
          }
          var w = new b(),
            t = new b(),
            v = new b()
          a.prototype.getVertex = function(a, b) {
            var c = this.scale
            this._getUnscaledVertex(a, b)
            b.x *= c.x
            b.y *= c.y
            b.z *= c.z
            return b
          }
          a.prototype._getUnscaledVertex = function(a, b) {
            var c = 3 * a,
              d = this.vertices
            return b.set(d[c], d[c + 1], d[c + 2])
          }
          a.prototype.getWorldVertex = function(a, b, c, d) {
            this.getVertex(a, d)
            l.pointToWorldFrame(b, c, d, d)
            return d
          }
          a.prototype.getTriangleVertices = function(a, b, c, d) {
            a *= 3
            this.getVertex(this.indices[a], b)
            this.getVertex(this.indices[a + 1], c)
            this.getVertex(this.indices[a + 2], d)
          }
          a.prototype.getNormal = function(a, b) {
            var c = 3 * a
            return b.set(this.normals[c], this.normals[c + 1], this.normals[c + 2])
          }
          var x = new k()
          a.prototype.calculateLocalInertia = function(a, b) {
            this.computeLocalAABB(x)
            var c = x.upperBound.x - x.lowerBound.x,
              d = x.upperBound.y - x.lowerBound.y,
              e = x.upperBound.z - x.lowerBound.z
            return b.set(
              (1 / 12) * a * (4 * d * d + 4 * e * e),
              (1 / 12) * a * (4 * c * c + 4 * e * e),
              (1 / 12) * a * (4 * d * d + 4 * c * c),
            )
          }
          var z = new b()
          a.prototype.computeLocalAABB = function(a) {
            var b = a.lowerBound
            a = a.upperBound
            var c = this.vertices.length
            this.getVertex(0, z)
            b.copy(z)
            a.copy(z)
            for (var d = 0; d !== c; d++)
              this.getVertex(d, z),
                z.x < b.x ? (b.x = z.x) : z.x > a.x && (a.x = z.x),
                z.y < b.y ? (b.y = z.y) : z.y > a.y && (a.y = z.y),
                z.z < b.z ? (b.z = z.z) : z.z > a.z && (a.z = z.z)
          }
          a.prototype.updateAABB = function() {
            this.computeLocalAABB(this.aabb)
          }
          a.prototype.updateBoundingSphereRadius = function() {
            var a = 0,
              c = this.vertices,
              d = new b(),
              e = 0
            for (c = c.length / 3; e !== c; e++) {
              this.getVertex(e, d)
              var f = d.norm2()
              f > a && (a = f)
            }
            this.boundingSphereRadius = Math.sqrt(a)
          }
          new b()
          var C = new l(),
            A = new k()
          a.prototype.calculateWorldAABB = function(a, b, c, d) {
            C.position = a
            C.quaternion = b
            this.aabb.toWorldFrame(C, A)
            c.copy(A.lowerBound)
            d.copy(A.upperBound)
          }
          a.prototype.volume = function() {
            return (4 * Math.PI * this.boundingSphereRadius) / 3
          }
          a.createTorus = function(b, c, d, e, f) {
            b = b || 1
            c = c || 0.5
            d = d || 8
            e = e || 6
            f = f || 2 * Math.PI
            for (var g = [], l = [], h = 0; h <= d; h++)
              for (var k = 0; k <= e; k++) {
                var n = (k / e) * f,
                  p = (h / d) * Math.PI * 2
                g.push(
                  (b + c * Math.cos(p)) * Math.cos(n),
                  (b + c * Math.cos(p)) * Math.sin(n),
                  c * Math.sin(p),
                )
              }
            for (h = 1; h <= d; h++)
              for (k = 1; k <= e; k++)
                (b = (e + 1) * (h - 1) + k - 1),
                  (c = (e + 1) * (h - 1) + k),
                  (f = (e + 1) * h + k),
                  l.push((e + 1) * h + k - 1, b, f),
                  l.push(b, c, f)
            return new a(g, l)
          }
        },
        {
          '../collision/AABB': 3,
          '../math/Quaternion': 28,
          '../math/Transform': 29,
          '../math/Vec3': 30,
          '../utils/Octree': 50,
          './Shape': 43,
        },
      ],
      46: [
        function(c, e, g) {
          function a() {
            d.call(this)
            this.iterations = 10
            this.tolerance = 1e-7
          }
          e.exports = a
          c('../math/Vec3')
          c('../math/Quaternion')
          var d = c('./Solver')
          a.prototype = new d()
          var b = [],
            l = [],
            k = []
          a.prototype.solve = function(a, c) {
            var d = 0,
              e = this.iterations,
              f = this.tolerance * this.tolerance,
              g = this.equations,
              h = g.length,
              w = c.bodies,
              t = w.length,
              v
            if (0 !== h) for (v = 0; v !== t; v++) w[v].updateSolveMassProperties()
            l.length = h
            k.length = h
            b.length = h
            for (v = 0; v !== h; v++) {
              var x = g[v]
              b[v] = 0
              k[v] = x.computeB(a)
              l[v] = 1 / x.computeC()
            }
            if (0 !== h) {
              for (v = 0; v !== t; v++)
                (x = w[v]), (d = x.wlambda), x.vlambda.set(0, 0, 0), d && d.set(0, 0, 0)
              for (d = 0; d !== e; d++) {
                for (var z = (v = 0); z !== h; z++) {
                  x = g[z]
                  var C = k[z]
                  var A = l[z]
                  var D = b[z]
                  var G = x.computeGWlambda()
                  C = A * (C - G - x.eps * D)
                  D + C < x.minForce
                    ? (C = x.minForce - D)
                    : D + C > x.maxForce && (C = x.maxForce - D)
                  b[z] += C
                  v += 0 < C ? C : -C
                  x.addToWlambda(C)
                }
                if (v * v < f) break
              }
              for (v = 0; v !== t; v++)
                (x = w[v]),
                  (e = x.velocity),
                  (f = x.angularVelocity),
                  e.vadd(x.vlambda, e),
                  f && f.vadd(x.wlambda, f)
            }
            return d
          }
        },
        { '../math/Quaternion': 28, '../math/Vec3': 30, './Solver': 47 },
      ],
      47: [
        function(c, e, g) {
          function a() {
            this.equations = []
          }
          e.exports = a
          a.prototype.solve = function(a, b) {
            return 0
          }
          a.prototype.addEquation = function(a) {
            a.enabled && this.equations.push(a)
          }
          a.prototype.removeEquation = function(a) {
            var b = this.equations
            a = b.indexOf(a)
            ;-1 !== a && b.splice(a, 1)
          }
          a.prototype.removeAllEquations = function() {
            this.equations.length = 0
          }
        },
        {},
      ],
      48: [
        function(c, e, g) {
          function a(a, b, c) {
            k.call(this)
            this.iterations = b
            this.tolerance = c
            this.subsolver = a
            this.nodes = []
            for (this.nodePool = []; 128 > this.nodePool.length; )
              this.nodePool.push(this.createNode())
          }
          function d(a) {
            for (var b = a.length, c = 0; c !== b; c++) {
              var d = a[c]
              if (!(d.visited || d.body.type & n)) return d
            }
            return !1
          }
          function b(a, b, c) {
            b.push(a.body)
            b = a.eqs.length
            for (var d = 0; d !== b; d++) {
              var e = a.eqs[d]
              ;-1 === c.indexOf(e) && c.push(e)
            }
          }
          function l(a, b) {
            return b.id - a.id
          }
          e.exports = a
          c('../math/Vec3')
          c('../math/Quaternion')
          var k = c('./Solver')
          c = c('../objects/Body')
          a.prototype = new k()
          var h = [],
            f = [],
            q = { bodies: [] },
            n = c.STATIC,
            p = []
          a.prototype.createNode = function() {
            return { body: null, children: [], eqs: [], visited: !1 }
          }
          a.prototype.solve = function(a, c) {
            for (
              var e = this.nodePool,
                g = c.bodies,
                k = this.equations,
                n = k.length,
                r = g.length,
                u = this.subsolver;
              e.length < r;

            )
              e.push(this.createNode())
            h.length = r
            for (var A = 0; A < r; A++) h[A] = e[A]
            for (A = 0; A !== r; A++)
              (e = h[A]),
                (e.body = g[A]),
                (e.children.length = 0),
                (e.eqs.length = 0),
                (e.visited = !1)
            for (r = 0; r !== n; r++) {
              e = k[r]
              A = g.indexOf(e.bi)
              var D = g.indexOf(e.bj)
              A = h[A]
              D = h[D]
              A.children.push(D)
              A.eqs.push(e)
              D.children.push(A)
              D.eqs.push(e)
            }
            g = 0
            k = f
            u.tolerance = this.tolerance
            for (u.iterations = this.iterations; (A = d(h)); ) {
              k.length = 0
              q.bodies.length = 0
              e = A
              A = b
              n = q.bodies
              r = k
              p.push(e)
              e.visited = !0
              for (A(e, n, r); p.length; )
                for (e = p.pop(); (D = d(e.children)); ) (D.visited = !0), A(D, n, r), p.push(D)
              n = k.length
              k = k.sort(l)
              for (A = 0; A !== n; A++) u.addEquation(k[A])
              u.solve(a, q)
              u.removeAllEquations()
              g++
            }
            return g
          }
        },
        {
          '../math/Quaternion': 28,
          '../math/Vec3': 30,
          '../objects/Body': 31,
          './Solver': 47,
        },
      ],
      49: [
        function(c, e, g) {
          c = function() {}
          e.exports = c
          c.prototype = {
            constructor: c,
            addEventListener: function(a, c) {
              void 0 === this._listeners && (this._listeners = {})
              var b = this._listeners
              void 0 === b[a] && (b[a] = [])
              ;-1 === b[a].indexOf(c) && b[a].push(c)
              return this
            },
            hasEventListener: function(a, c) {
              if (void 0 === this._listeners) return !1
              var b = this._listeners
              return void 0 !== b[a] && -1 !== b[a].indexOf(c) ? !0 : !1
            },
            removeEventListener: function(a, c) {
              if (void 0 === this._listeners) return this
              var b = this._listeners
              if (void 0 === b[a]) return this
              var d = b[a].indexOf(c)
              ;-1 !== d && b[a].splice(d, 1)
              return this
            },
            dispatchEvent: function(a) {
              if (void 0 === this._listeners) return this
              var c = this._listeners[a.type]
              if (void 0 !== c) {
                a.target = this
                for (var b = 0, e = c.length; b < e; b++) c[b].call(this, a)
              }
              return this
            },
          }
        },
        {},
      ],
      50: [
        function(c, e, g) {
          function a(a) {
            a = a || {}
            this.root = a.root || null
            this.aabb = a.aabb ? a.aabb.clone() : new b()
            this.data = []
            this.children = []
          }
          function d(b, c) {
            c = c || {}
            c.root = null
            c.aabb = b
            a.call(this, c)
            this.maxDepth = 'undefined' !== typeof c.maxDepth ? c.maxDepth : 8
          }
          var b = c('../collision/AABB'),
            l = c('../math/Vec3')
          e.exports = d
          d.prototype = new a()
          a.prototype.reset = function(a, b) {
            this.children.length = this.data.length = 0
          }
          a.prototype.insert = function(a, b, c) {
            var d = this.data
            c = c || 0
            if (!this.aabb.contains(a)) return !1
            var e = this.children
            if (c < (this.maxDepth || this.root.maxDepth)) {
              var f = !1
              e.length || (this.subdivide(), (f = !0))
              for (var g = 0; 8 !== g; g++) if (e[g].insert(a, b, c + 1)) return !0
              f && (e.length = 0)
            }
            d.push(b)
            return !0
          }
          var k = new l()
          a.prototype.subdivide = function() {
            var c = this.aabb,
              d = c.lowerBound,
              e = c.upperBound
            c = this.children
            c.push(
              new a({ aabb: new b({ lowerBound: new l(0, 0, 0) }) }),
              new a({ aabb: new b({ lowerBound: new l(1, 0, 0) }) }),
              new a({ aabb: new b({ lowerBound: new l(1, 1, 0) }) }),
              new a({ aabb: new b({ lowerBound: new l(1, 1, 1) }) }),
              new a({ aabb: new b({ lowerBound: new l(0, 1, 1) }) }),
              new a({ aabb: new b({ lowerBound: new l(0, 0, 1) }) }),
              new a({ aabb: new b({ lowerBound: new l(1, 0, 1) }) }),
              new a({ aabb: new b({ lowerBound: new l(0, 1, 0) }) }),
            )
            e.vsub(d, k)
            k.scale(0.5, k)
            e = this.root || this
            for (var g = 0; 8 !== g; g++) {
              var h = c[g]
              h.root = e
              var r = h.aabb.lowerBound
              r.x *= k.x
              r.y *= k.y
              r.z *= k.z
              r.vadd(d, r)
              r.vadd(k, h.aabb.upperBound)
            }
          }
          a.prototype.aabbQuery = function(a, b) {
            for (var c = [this]; c.length; ) {
              var d = c.pop()
              d.aabb.overlaps(a) && Array.prototype.push.apply(b, d.data)
              Array.prototype.push.apply(c, d.children)
            }
            return b
          }
          var h = new b()
          a.prototype.rayQuery = function(a, b, c) {
            a.getAABB(h)
            h.toLocalFrame(b, h)
            this.aabbQuery(h, c)
            return c
          }
          a.prototype.removeEmptyNodes = function() {
            for (var a = [this]; a.length; ) {
              for (var b = a.pop(), c = b.children.length - 1; 0 <= c; c--)
                b.children[c].data.length || b.children.splice(c, 1)
              Array.prototype.push.apply(a, b.children)
            }
          }
        },
        { '../collision/AABB': 3, '../math/Vec3': 30 },
      ],
      51: [
        function(c, e, g) {
          function a() {
            this.objects = []
            this.type = Object
          }
          e.exports = a
          a.prototype.release = function() {
            for (var a = arguments.length, b = 0; b !== a; b++) this.objects.push(arguments[b])
          }
          a.prototype.get = function() {
            return 0 === this.objects.length ? this.constructObject() : this.objects.pop()
          }
          a.prototype.constructObject = function() {
            throw Error('constructObject() not implemented in this Pool subclass yet!')
          }
        },
        {},
      ],
      52: [
        function(c, e, g) {
          function a() {
            this.data = { keys: [] }
          }
          e.exports = a
          a.prototype.get = function(a, b) {
            if (a > b) {
              var c = b
              b = a
              a = c
            }
            return this.data[a + '-' + b]
          }
          a.prototype.set = function(a, b, c) {
            if (a > b) {
              var d = b
              b = a
              a = d
            }
            d = a + '-' + b
            this.get(a, b) || this.data.keys.push(d)
            this.data[d] = c
          }
          a.prototype.reset = function() {
            for (var a = this.data, b = a.keys; 0 < b.length; ) {
              var c = b.pop()
              delete a[c]
            }
          }
        },
        {},
      ],
      53: [
        function(c, e, g) {
          function a() {}
          e.exports = a
          a.defaults = function(a, b) {
            a = a || {}
            for (var c in b) c in a || (a[c] = b[c])
            return a
          }
        },
        {},
      ],
      54: [
        function(c, e, g) {
          function a() {
            b.call(this)
            this.type = d
          }
          e.exports = a
          var d = c('../math/Vec3'),
            b = c('./Pool')
          a.prototype = new b()
          a.prototype.constructObject = function() {
            return new d()
          }
        },
        { '../math/Vec3': 30, './Pool': 51 },
      ],
      55: [
        function(c, e, g) {
          function a(a) {
            this.contactPointPool = []
            this.frictionEquationPool = []
            this.result = []
            this.frictionResult = []
            this.v3pool = new h()
            this.world = a
            this.currentContactMaterial = null
            this.enableFrictionReduction = !1
          }
          e.exports = a
          e = c('../collision/AABB')
          g = c('../shapes/Shape')
          var d = c('../collision/Ray'),
            b = c('../math/Vec3'),
            l = c('../math/Transform')
          c('../shapes/ConvexPolyhedron')
          var k = c('../math/Quaternion')
          c('../solver/Solver')
          var h = c('../utils/Vec3Pool'),
            f = c('../equations/ContactEquation'),
            q = c('../equations/FrictionEquation')
          a.prototype.createContactEquation = function(a, b, c, d, e, g) {
            if (this.contactPointPool.length) {
              var h = this.contactPointPool.pop()
              h.bi = a
              h.bj = b
            } else h = new f(a, b)
            h.enabled =
              a.collisionResponse &&
              b.collisionResponse &&
              c.collisionResponse &&
              d.collisionResponse
            var l = this.currentContactMaterial
            h.restitution = l.restitution
            h.setSpookParams(l.contactEquationStiffness, l.contactEquationRelaxation, this.world.dt)
            a = c.material || a.material
            b = d.material || b.material
            a &&
              b &&
              0 <= a.restitution &&
              0 <= b.restitution &&
              (h.restitution = a.restitution * b.restitution)
            h.si = e || c
            h.sj = g || d
            return h
          }
          a.prototype.createFrictionEquationsFromContact = function(a, b) {
            var c = a.bi,
              d = a.bj,
              e = this.world,
              f = this.currentContactMaterial,
              g = f.friction,
              h = a.si.material || c.material,
              l = a.sj.material || d.material
            h && l && 0 <= h.friction && 0 <= l.friction && (g = h.friction * l.friction)
            if (0 < g) {
              g *= e.gravity.length()
              h = c.invMass + d.invMass
              0 < h && (h = 1 / h)
              var k = this.frictionEquationPool
              l = k.length ? k.pop() : new q(c, d, g * h)
              k = k.length ? k.pop() : new q(c, d, g * h)
              l.bi = k.bi = c
              l.bj = k.bj = d
              l.minForce = k.minForce = -g * h
              l.maxForce = k.maxForce = g * h
              l.ri.copy(a.ri)
              l.rj.copy(a.rj)
              k.ri.copy(a.ri)
              k.rj.copy(a.rj)
              a.ni.tangents(l.t, k.t)
              l.setSpookParams(f.frictionEquationStiffness, f.frictionEquationRelaxation, e.dt)
              k.setSpookParams(f.frictionEquationStiffness, f.frictionEquationRelaxation, e.dt)
              l.enabled = k.enabled = a.enabled
              b.push(l, k)
              return !0
            }
            return !1
          }
          var n = new b(),
            p = new b(),
            u = new b()
          a.prototype.createFrictionFromAverage = function(a) {
            var b = this.result[this.result.length - 1]
            if (this.createFrictionEquationsFromContact(b, this.frictionResult) && 1 !== a) {
              var c = this.frictionResult[this.frictionResult.length - 2],
                d = this.frictionResult[this.frictionResult.length - 1]
              n.setZero()
              p.setZero()
              u.setZero()
              for (var e = b.bi, f = 0; f !== a; f++)
                (b = this.result[this.result.length - 1 - f]),
                  b.bodyA !== e
                    ? (n.vadd(b.ni, n), p.vadd(b.ri, p), u.vadd(b.rj, u))
                    : (n.vsub(b.ni, n), p.vadd(b.rj, p), u.vadd(b.ri, u))
              a = 1 / a
              p.scale(a, c.ri)
              u.scale(a, c.rj)
              d.ri.copy(c.ri)
              d.rj.copy(c.rj)
              n.normalize()
              n.tangents(c.t, d.t)
            }
          }
          var r = new b(),
            w = new b(),
            t = new k(),
            v = new k()
          a.prototype.getContacts = function(a, b, c, d, e, f, g) {
            this.contactPointPool = e
            this.frictionEquationPool = g
            this.result = d
            this.frictionResult = f
            d = 0
            for (e = a.length; d !== e; d++) {
              f = a[d]
              g = b[d]
              var h = null
              f.material && g.material && (h = c.getContactMaterial(f.material, g.material) || null)
              for (var l = 0; l < f.shapes.length; l++) {
                f.quaternion.mult(f.shapeOrientations[l], t)
                f.quaternion.vmult(f.shapeOffsets[l], r)
                r.vadd(f.position, r)
                for (var k = f.shapes[l], n = 0; n < g.shapes.length; n++) {
                  g.quaternion.mult(g.shapeOrientations[n], v)
                  g.quaternion.vmult(g.shapeOffsets[n], w)
                  w.vadd(g.position, w)
                  var p = g.shapes[n]
                  if (!(r.distanceTo(w) > k.boundingSphereRadius + p.boundingSphereRadius)) {
                    var y = null
                    k.material &&
                      p.material &&
                      (y = c.getContactMaterial(k.material, p.material) || null)
                    this.currentContactMaterial = y || h || c.defaultContactMaterial
                    ;(y = this[k.type | p.type]) &&
                      (k.type < p.type
                        ? y.call(this, k, p, r, w, t, v, f, g, k, p)
                        : y.call(this, p, k, w, r, v, t, g, f, k, p))
                  }
                }
              }
            }
          }
          a.prototype[g.types.BOX | g.types.BOX] = a.prototype.boxBox = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            a.convexPolyhedronRepresentation.material = a.material
            b.convexPolyhedronRepresentation.material = b.material
            a.convexPolyhedronRepresentation.collisionResponse = a.collisionResponse
            b.convexPolyhedronRepresentation.collisionResponse = b.collisionResponse
            this.convexConvex(
              a.convexPolyhedronRepresentation,
              b.convexPolyhedronRepresentation,
              c,
              d,
              e,
              f,
              g,
              h,
              a,
              b,
            )
          }
          a.prototype[g.types.BOX | g.types.CONVEXPOLYHEDRON] = a.prototype.boxConvex = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            a.convexPolyhedronRepresentation.material = a.material
            a.convexPolyhedronRepresentation.collisionResponse = a.collisionResponse
            this.convexConvex(a.convexPolyhedronRepresentation, b, c, d, e, f, g, h, a, b)
          }
          a.prototype[g.types.BOX | g.types.PARTICLE] = a.prototype.boxParticle = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            a.convexPolyhedronRepresentation.material = a.material
            a.convexPolyhedronRepresentation.collisionResponse = a.collisionResponse
            this.convexParticle(a.convexPolyhedronRepresentation, b, c, d, e, f, g, h, a, b)
          }
          a.prototype[g.types.SPHERE] = a.prototype.sphereSphere = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            e = this.createContactEquation(g, h, a, b)
            d.vsub(c, e.ni)
            e.ni.normalize()
            e.ri.copy(e.ni)
            e.rj.copy(e.ni)
            e.ri.mult(a.radius, e.ri)
            e.rj.mult(-b.radius, e.rj)
            e.ri.vadd(c, e.ri)
            e.ri.vsub(g.position, e.ri)
            e.rj.vadd(d, e.rj)
            e.rj.vsub(h.position, e.rj)
            this.result.push(e)
            this.createFrictionEquationsFromContact(e, this.frictionResult)
          }
          var x = new b(),
            z = new b(),
            C = new b()
          a.prototype[g.types.PLANE | g.types.TRIMESH] = a.prototype.planeTrimesh = function(
            a,
            c,
            d,
            e,
            f,
            g,
            h,
            k,
          ) {
            var n = new b()
            x.set(0, 0, 1)
            f.vmult(x, x)
            for (f = 0; f < c.vertices.length / 3; f++) {
              c.getVertex(f, n)
              var p = new b()
              p.copy(n)
              l.pointToWorldFrame(e, g, p, n)
              p = z
              n.vsub(d, p)
              if (0 >= x.dot(p)) {
                var y = this.createContactEquation(h, k, a, c)
                y.ni.copy(x)
                var q = C
                x.scale(p.dot(x), q)
                n.vsub(q, q)
                y.ri.copy(q)
                y.ri.vsub(h.position, y.ri)
                y.rj.copy(n)
                y.rj.vsub(k.position, y.rj)
                this.result.push(y)
                this.createFrictionEquationsFromContact(y, this.frictionResult)
              }
            }
          }
          var A = new b(),
            D = new b()
          new b()
          var G = new b(),
            B = new b(),
            J = new b(),
            O = new b(),
            M = new b(),
            K = new b(),
            H = new b(),
            L = new b(),
            F = new b(),
            y = new b(),
            N = new b(),
            I = new e(),
            P = []
          a.prototype[g.types.SPHERE | g.types.TRIMESH] = a.prototype.sphereTrimesh = function(
            a,
            b,
            c,
            e,
            f,
            g,
            h,
            k,
          ) {
            l.pointToLocalFrame(e, g, c, H)
            f = a.radius
            I.lowerBound.set(H.x - f, H.y - f, H.z - f)
            I.upperBound.set(H.x + f, H.y + f, H.z + f)
            b.getTrianglesInAABB(I, P)
            var n = a.radius * a.radius
            for (f = 0; f < P.length; f++)
              for (var p = 0; 3 > p; p++)
                if ((b.getVertex(b.indices[3 * P[f] + p], G), G.vsub(H, D), D.norm2() <= n)) {
                  B.copy(G)
                  l.pointToWorldFrame(e, g, B, G)
                  G.vsub(c, D)
                  var q = this.createContactEquation(h, k, a, b)
                  q.ni.copy(D)
                  q.ni.normalize()
                  q.ri.copy(q.ni)
                  q.ri.scale(a.radius, q.ri)
                  q.ri.vadd(c, q.ri)
                  q.ri.vsub(h.position, q.ri)
                  q.rj.copy(G)
                  q.rj.vsub(k.position, q.rj)
                  this.result.push(q)
                  this.createFrictionEquationsFromContact(q, this.frictionResult)
                }
            for (f = 0; f < P.length; f++)
              for (p = 0; 3 > p; p++)
                b.getVertex(b.indices[3 * P[f] + p], J),
                  b.getVertex(b.indices[3 * P[f] + ((p + 1) % 3)], O),
                  O.vsub(J, M),
                  H.vsub(O, L),
                  (c = L.dot(M)),
                  H.vsub(J, L),
                  (q = L.dot(M)),
                  0 < q &&
                    0 > c &&
                    (H.vsub(J, L),
                    K.copy(M),
                    K.normalize(),
                    (q = L.dot(K)),
                    K.scale(q, L),
                    L.vadd(J, L),
                    (c = L.distanceTo(H)),
                    c < a.radius &&
                      ((q = this.createContactEquation(h, k, a, b)),
                      L.vsub(H, q.ni),
                      q.ni.normalize(),
                      q.ni.scale(a.radius, q.ri),
                      l.pointToWorldFrame(e, g, L, L),
                      L.vsub(k.position, q.rj),
                      l.vectorToWorldFrame(g, q.ni, q.ni),
                      l.vectorToWorldFrame(g, q.ri, q.ri),
                      this.result.push(q),
                      this.createFrictionEquationsFromContact(q, this.frictionResult)))
            f = 0
            for (p = P.length; f !== p; f++)
              b.getTriangleVertices(P[f], F, y, N),
                b.getNormal(P[f], A),
                H.vsub(F, L),
                (c = L.dot(A)),
                A.scale(c, L),
                H.vsub(L, L),
                (c = L.distanceTo(H)),
                d.pointInTriangle(L, F, y, N) &&
                  c < a.radius &&
                  ((q = this.createContactEquation(h, k, a, b)),
                  L.vsub(H, q.ni),
                  q.ni.normalize(),
                  q.ni.scale(a.radius, q.ri),
                  l.pointToWorldFrame(e, g, L, L),
                  L.vsub(k.position, q.rj),
                  l.vectorToWorldFrame(g, q.ni, q.ni),
                  l.vectorToWorldFrame(g, q.ri, q.ri),
                  this.result.push(q),
                  this.createFrictionEquationsFromContact(q, this.frictionResult))
            P.length = 0
          }
          var E = new b(),
            T = new b()
          a.prototype[g.types.SPHERE | g.types.PLANE] = a.prototype.spherePlane = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            b = this.createContactEquation(g, h, a, b)
            b.ni.set(0, 0, 1)
            f.vmult(b.ni, b.ni)
            b.ni.negate(b.ni)
            b.ni.normalize()
            b.ni.mult(a.radius, b.ri)
            c.vsub(d, E)
            b.ni.mult(b.ni.dot(E), T)
            E.vsub(T, b.rj)
            ;-E.dot(b.ni) <= a.radius &&
              ((a = b.ri),
              (f = b.rj),
              a.vadd(c, a),
              a.vsub(g.position, a),
              f.vadd(d, f),
              f.vsub(h.position, f),
              this.result.push(b),
              this.createFrictionEquationsFromContact(b, this.frictionResult))
          }
          var Q = new b(),
            Y = new b(),
            W = new b(),
            R = new b(),
            U = new b(),
            V = new b(),
            Z = new b(),
            S = [new b(), new b(), new b(), new b(), new b(), new b()],
            aa = new b(),
            X = new b(),
            ha = new b(),
            na = new b()
          a.prototype[g.types.SPHERE | g.types.BOX] = a.prototype.sphereBox = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            e = this.v3pool
            c.vsub(d, R)
            b.getSideNormals(S, f)
            f = a.radius
            for (
              var l = !1, k = null, n = 0, p = 0, q = 0, y = null, r = 0, u = S.length;
              r !== u && !1 === l;
              r++
            ) {
              var I = U
              I.copy(S[r])
              var v = I.norm()
              I.normalize()
              var t = R.dot(I)
              if (t < v + f && 0 < t) {
                var B = V,
                  w = Z
                B.copy(S[(r + 1) % 3])
                w.copy(S[(r + 2) % 3])
                var x = B.norm(),
                  N = w.norm()
                B.normalize()
                w.normalize()
                var H = R.dot(B),
                  z = R.dot(w)
                H < x &&
                  H > -x &&
                  z < N &&
                  z > -N &&
                  ((t = Math.abs(t - v - f)), null === y || t < y) &&
                  ((y = t), (p = H), (q = z), (k = v), X.copy(I), ha.copy(B), na.copy(w), n++)
              }
            }
            n &&
              ((l = !0),
              (n = this.createContactEquation(g, h, a, b)),
              X.mult(-f, n.ri),
              n.ni.copy(X),
              n.ni.negate(n.ni),
              X.mult(k, X),
              ha.mult(p, ha),
              X.vadd(ha, X),
              na.mult(q, na),
              X.vadd(na, n.rj),
              n.ri.vadd(c, n.ri),
              n.ri.vsub(g.position, n.ri),
              n.rj.vadd(d, n.rj),
              n.rj.vsub(h.position, n.rj),
              this.result.push(n),
              this.createFrictionEquationsFromContact(n, this.frictionResult))
            t = e.get()
            for (k = 0; 2 !== k && !l; k++)
              for (p = 0; 2 !== p && !l; p++)
                for (q = 0; 2 !== q && !l; q++)
                  t.set(0, 0, 0),
                    k ? t.vadd(S[0], t) : t.vsub(S[0], t),
                    p ? t.vadd(S[1], t) : t.vsub(S[1], t),
                    q ? t.vadd(S[2], t) : t.vsub(S[2], t),
                    d.vadd(t, aa),
                    aa.vsub(c, aa),
                    aa.norm2() < f * f &&
                      ((l = !0),
                      (n = this.createContactEquation(g, h, a, b)),
                      n.ri.copy(aa),
                      n.ri.normalize(),
                      n.ni.copy(n.ri),
                      n.ri.mult(f, n.ri),
                      n.rj.copy(t),
                      n.ri.vadd(c, n.ri),
                      n.ri.vsub(g.position, n.ri),
                      n.rj.vadd(d, n.rj),
                      n.rj.vsub(h.position, n.rj),
                      this.result.push(n),
                      this.createFrictionEquationsFromContact(n, this.frictionResult))
            e.release(t)
            y = e.get()
            r = e.get()
            n = e.get()
            u = e.get()
            t = e.get()
            I = S.length
            for (k = 0; k !== I && !l; k++)
              for (p = 0; p !== I && !l; p++)
                if (k % 3 !== p % 3) {
                  S[p].cross(S[k], y)
                  y.normalize()
                  S[k].vadd(S[p], r)
                  n.copy(c)
                  n.vsub(r, n)
                  n.vsub(d, n)
                  v = n.dot(y)
                  y.mult(v, u)
                  for (q = 0; q === k % 3 || q === p % 3; ) q++
                  t.copy(c)
                  t.vsub(u, t)
                  t.vsub(r, t)
                  t.vsub(d, t)
                  v = Math.abs(v)
                  B = t.norm()
                  v < S[q].norm() &&
                    B < f &&
                    ((l = !0),
                    (q = this.createContactEquation(g, h, a, b)),
                    r.vadd(u, q.rj),
                    q.rj.copy(q.rj),
                    t.negate(q.ni),
                    q.ni.normalize(),
                    q.ri.copy(q.rj),
                    q.ri.vadd(d, q.ri),
                    q.ri.vsub(c, q.ri),
                    q.ri.normalize(),
                    q.ri.mult(f, q.ri),
                    q.ri.vadd(c, q.ri),
                    q.ri.vsub(g.position, q.ri),
                    q.rj.vadd(d, q.rj),
                    q.rj.vsub(h.position, q.rj),
                    this.result.push(q),
                    this.createFrictionEquationsFromContact(q, this.frictionResult))
                }
            e.release(y, r, n, u, t)
          }
          var xa = new b(),
            ya = new b(),
            za = new b(),
            Aa = new b(),
            Ba = new b(),
            Ca = new b(),
            Da = new b(),
            Ea = new b(),
            Fa = new b(),
            Ga = new b()
          a.prototype[
            g.types.SPHERE | g.types.CONVEXPOLYHEDRON
          ] = a.prototype.sphereConvex = function(a, b, c, d, e, f, g, h) {
            e = this.v3pool
            c.vsub(d, xa)
            for (
              var l = b.faceNormals, k = b.faces, n = b.vertices, p = a.radius, q = 0;
              q !== n.length;
              q++
            ) {
              var y = Ba
              f.vmult(n[q], y)
              d.vadd(y, y)
              var r = Aa
              y.vsub(c, r)
              if (r.norm2() < p * p) {
                a = this.createContactEquation(g, h, a, b)
                a.ri.copy(r)
                a.ri.normalize()
                a.ni.copy(a.ri)
                a.ri.mult(p, a.ri)
                y.vsub(d, a.rj)
                a.ri.vadd(c, a.ri)
                a.ri.vsub(g.position, a.ri)
                a.rj.vadd(d, a.rj)
                a.rj.vsub(h.position, a.rj)
                this.result.push(a)
                this.createFrictionEquationsFromContact(a, this.frictionResult)
                return
              }
            }
            q = 0
            for (y = k.length; q !== y; q++) {
              r = k[q]
              var u = Ca
              f.vmult(l[q], u)
              var t = Da
              f.vmult(n[r[0]], t)
              t.vadd(d, t)
              var I = Ea
              u.mult(-p, I)
              c.vadd(I, I)
              var v = Fa
              I.vsub(t, v)
              I = v.dot(u)
              v = Ga
              c.vsub(t, v)
              if (0 > I && 0 < v.dot(u)) {
                t = []
                v = 0
                for (var B = r.length; v !== B; v++) {
                  var w = e.get()
                  f.vmult(n[r[v]], w)
                  d.vadd(w, w)
                  t.push(w)
                }
                a: {
                  v = t
                  B = u
                  w = c
                  for (var x = null, N = v.length, H = 0; H !== N; H++) {
                    var z = v[H],
                      F = Q
                    v[(H + 1) % N].vsub(z, F)
                    var P = Y
                    F.cross(B, P)
                    F = W
                    w.vsub(z, F)
                    z = P.dot(F)
                    if (null === x || (0 < z && !0 === x) || (0 >= z && !1 === x))
                      null === x && (x = 0 < z)
                    else {
                      v = !1
                      break a
                    }
                  }
                  v = !0
                }
                if (v) {
                  a = this.createContactEquation(g, h, a, b)
                  u.mult(-p, a.ri)
                  u.negate(a.ni)
                  b = e.get()
                  u.mult(-I, b)
                  f = e.get()
                  u.mult(-p, f)
                  c.vsub(d, a.rj)
                  a.rj.vadd(f, a.rj)
                  a.rj.vadd(b, a.rj)
                  a.rj.vadd(d, a.rj)
                  a.rj.vsub(h.position, a.rj)
                  a.ri.vadd(c, a.ri)
                  a.ri.vsub(g.position, a.ri)
                  e.release(b)
                  e.release(f)
                  this.result.push(a)
                  this.createFrictionEquationsFromContact(a, this.frictionResult)
                  v = 0
                  for (r = t.length; v !== r; v++) e.release(t[v])
                  break
                } else
                  for (v = 0; v !== r.length; v++) {
                    u = e.get()
                    I = e.get()
                    f.vmult(n[r[(v + 1) % r.length]], u)
                    f.vmult(n[r[(v + 2) % r.length]], I)
                    d.vadd(u, u)
                    d.vadd(I, I)
                    N = ya
                    I.vsub(u, N)
                    x = za
                    N.unit(x)
                    B = e.get()
                    w = e.get()
                    c.vsub(u, w)
                    H = w.dot(x)
                    x.mult(H, B)
                    B.vadd(u, B)
                    x = e.get()
                    B.vsub(c, x)
                    if (0 < H && H * H < N.norm2() && x.norm2() < p * p) {
                      a = this.createContactEquation(g, h, a, b)
                      B.vsub(d, a.rj)
                      B.vsub(c, a.ni)
                      a.ni.normalize()
                      a.ni.mult(p, a.ri)
                      a.rj.vadd(d, a.rj)
                      a.rj.vsub(h.position, a.rj)
                      a.ri.vadd(c, a.ri)
                      a.ri.vsub(g.position, a.ri)
                      this.result.push(a)
                      this.createFrictionEquationsFromContact(a, this.frictionResult)
                      v = 0
                      for (r = t.length; v !== r; v++) e.release(t[v])
                      e.release(u)
                      e.release(I)
                      e.release(B)
                      e.release(x)
                      e.release(w)
                      return
                    }
                    e.release(u)
                    e.release(I)
                    e.release(B)
                    e.release(x)
                    e.release(w)
                  }
                v = 0
                for (r = t.length; v !== r; v++) e.release(t[v])
              }
            }
          }
          new b()
          new b()
          a.prototype[g.types.PLANE | g.types.BOX] = a.prototype.planeBox = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            b.convexPolyhedronRepresentation.material = b.material
            b.convexPolyhedronRepresentation.collisionResponse = b.collisionResponse
            this.planeConvex(a, b.convexPolyhedronRepresentation, c, d, e, f, g, h)
          }
          var ba = new b(),
            ca = new b(),
            qa = new b(),
            Ha = new b()
          a.prototype[
            g.types.PLANE | g.types.CONVEXPOLYHEDRON
          ] = a.prototype.planeConvex = function(a, b, c, d, e, f, g, h) {
            ca.set(0, 0, 1)
            e.vmult(ca, ca)
            for (var l = (e = 0); l !== b.vertices.length; l++)
              if (
                (ba.copy(b.vertices[l]),
                f.vmult(ba, ba),
                d.vadd(ba, ba),
                ba.vsub(c, qa),
                0 >= ca.dot(qa))
              ) {
                var k = this.createContactEquation(g, h, a, b),
                  n = Ha
                ca.mult(ca.dot(qa), n)
                ba.vsub(n, n)
                n.vsub(c, k.ri)
                k.ni.copy(ca)
                ba.vsub(d, k.rj)
                k.ri.vadd(c, k.ri)
                k.ri.vsub(g.position, k.ri)
                k.rj.vadd(d, k.rj)
                k.rj.vsub(h.position, k.rj)
                this.result.push(k)
                e++
                this.enableFrictionReduction ||
                  this.createFrictionEquationsFromContact(k, this.frictionResult)
              }
            this.enableFrictionReduction && e && this.createFrictionFromAverage(e)
          }
          var ra = new b(),
            oa = new b()
          a.prototype[g.types.CONVEXPOLYHEDRON] = a.prototype.convexConvex = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            l,
            k,
            n,
            p,
          ) {
            if (
              !(c.distanceTo(d) > a.boundingSphereRadius + b.boundingSphereRadius) &&
              a.findSeparatingAxis(b, c, e, d, f, ra, n, p)
            ) {
              n = []
              a.clipAgainstHull(c, e, b, d, f, ra, -100, 100, n)
              for (f = e = 0; f !== n.length; f++) {
                p = this.createContactEquation(g, h, a, b, l, k)
                var q = p.ri,
                  y = p.rj
                ra.negate(p.ni)
                n[f].normal.negate(oa)
                oa.mult(n[f].depth, oa)
                n[f].point.vadd(oa, q)
                y.copy(n[f].point)
                q.vsub(c, q)
                y.vsub(d, y)
                q.vadd(c, q)
                q.vsub(g.position, q)
                y.vadd(d, y)
                y.vsub(h.position, y)
                this.result.push(p)
                e++
                this.enableFrictionReduction ||
                  this.createFrictionEquationsFromContact(p, this.frictionResult)
              }
              this.enableFrictionReduction && e && this.createFrictionFromAverage(e)
            }
          }
          var da = new b(),
            ta = new b(),
            pa = new b()
          a.prototype[g.types.PLANE | g.types.PARTICLE] = a.prototype.planeParticle = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            da.set(0, 0, 1)
            g.quaternion.vmult(da, da)
            d.vsub(g.position, ta)
            0 >= da.dot(ta) &&
              ((a = this.createContactEquation(h, g, b, a)),
              a.ni.copy(da),
              a.ni.negate(a.ni),
              a.ri.set(0, 0, 0),
              da.mult(da.dot(d), pa),
              d.vsub(pa, pa),
              a.rj.copy(pa),
              this.result.push(a),
              this.createFrictionEquationsFromContact(a, this.frictionResult))
          }
          var ia = new b()
          a.prototype[g.types.PARTICLE | g.types.SPHERE] = a.prototype.sphereParticle = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            ia.set(0, 0, 1)
            d.vsub(c, ia)
            ia.norm2() <= a.radius * a.radius &&
              ((b = this.createContactEquation(h, g, b, a)),
              ia.normalize(),
              b.rj.copy(ia),
              b.rj.mult(a.radius, b.rj),
              b.ni.copy(ia),
              b.ni.negate(b.ni),
              b.ri.set(0, 0, 0),
              this.result.push(b),
              this.createFrictionEquationsFromContact(b, this.frictionResult))
          }
          var ua = new k(),
            ja = new b()
          new b()
          var sa = new b(),
            va = new b(),
            ka = new b()
          a.prototype[
            g.types.PARTICLE | g.types.CONVEXPOLYHEDRON
          ] = a.prototype.convexParticle = function(a, b, c, d, e, f, g, h) {
            var l = -1
            f = null
            var k = 0
            ja.copy(d)
            ja.vsub(c, ja)
            e.conjugate(ua)
            ua.vmult(ja, ja)
            if (a.pointIsInside(ja)) {
              a.worldVerticesNeedsUpdate && a.computeWorldVertices(c, e)
              a.worldFaceNormalsNeedsUpdate && a.computeWorldFaceNormals(e)
              e = 0
              for (var n = a.faces.length; e !== n; e++) {
                var p = a.worldFaceNormals[e]
                d.vsub(a.worldVertices[a.faces[e][0]], va)
                var q = -p.dot(va)
                if (null === f || Math.abs(q) < Math.abs(f)) (f = q), (l = e), sa.copy(p), k++
              }
              ;-1 !== l
                ? ((a = this.createContactEquation(h, g, b, a)),
                  sa.mult(f, ka),
                  ka.vadd(d, ka),
                  ka.vsub(c, ka),
                  a.rj.copy(ka),
                  sa.negate(a.ni),
                  a.ri.set(0, 0, 0),
                  (b = a.ri),
                  (f = a.rj),
                  b.vadd(d, b),
                  b.vsub(h.position, b),
                  f.vadd(c, f),
                  f.vsub(g.position, f),
                  this.result.push(a),
                  this.createFrictionEquationsFromContact(a, this.frictionResult))
                : console.warn('Point found inside convex, but did not find penetrating face!')
            }
          }
          a.prototype[g.types.BOX | g.types.HEIGHTFIELD] = a.prototype.boxHeightfield = function(
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
          ) {
            a.convexPolyhedronRepresentation.material = a.material
            a.convexPolyhedronRepresentation.collisionResponse = a.collisionResponse
            this.convexHeightfield(a.convexPolyhedronRepresentation, b, c, d, e, f, g, h)
          }
          var ea = new b(),
            la = new b(),
            wa = [0]
          a.prototype[
            g.types.CONVEXPOLYHEDRON | g.types.HEIGHTFIELD
          ] = a.prototype.convexHeightfield = function(a, b, c, d, e, f, g, h) {
            var k = b.data,
              n = b.elementSize,
              p = a.boundingSphereRadius
            l.pointToLocalFrame(d, f, c, ea)
            var q = Math.floor((ea.x - p) / n) - 1,
              y = Math.ceil((ea.x + p) / n) + 1,
              r = Math.floor((ea.y - p) / n) - 1
            n = Math.ceil((ea.y + p) / n) + 1
            if (!(0 > y || 0 > n || q > k.length || r > k[0].length)) {
              0 > q && (q = 0)
              0 > y && (y = 0)
              0 > r && (r = 0)
              0 > n && (n = 0)
              q >= k.length && (q = k.length - 1)
              y >= k.length && (y = k.length - 1)
              n >= k[0].length && (n = k[0].length - 1)
              r >= k[0].length && (r = k[0].length - 1)
              k = []
              b.getRectMinMax(q, r, y, n, k)
              var u = k[0]
              if (!(ea.z - p > k[1] || ea.z + p < u))
                for (p = q; p < y; p++)
                  for (q = r; q < n; q++)
                    b.getConvexTrianglePillar(p, q, !1),
                      l.pointToWorldFrame(d, f, b.pillarOffset, la),
                      c.distanceTo(la) <
                        b.pillarConvex.boundingSphereRadius + a.boundingSphereRadius &&
                        this.convexConvex(
                          a,
                          b.pillarConvex,
                          c,
                          la,
                          e,
                          f,
                          g,
                          h,
                          null,
                          null,
                          wa,
                          null,
                        ),
                      b.getConvexTrianglePillar(p, q, !0),
                      l.pointToWorldFrame(d, f, b.pillarOffset, la),
                      c.distanceTo(la) <
                        b.pillarConvex.boundingSphereRadius + a.boundingSphereRadius &&
                        this.convexConvex(
                          a,
                          b.pillarConvex,
                          c,
                          la,
                          e,
                          f,
                          g,
                          h,
                          null,
                          null,
                          wa,
                          null,
                        )
            }
          }
          var fa = new b(),
            ma = new b()
          a.prototype[
            g.types.SPHERE | g.types.HEIGHTFIELD
          ] = a.prototype.sphereHeightfield = function(a, b, c, d, e, f, g, h) {
            var k = b.data,
              n = a.radius,
              p = b.elementSize
            l.pointToLocalFrame(d, f, c, fa)
            var q = Math.floor((fa.x - n) / p) - 1,
              y = Math.ceil((fa.x + n) / p) + 1,
              r = Math.floor((fa.y - n) / p) - 1
            p = Math.ceil((fa.y + n) / p) + 1
            if (!(0 > y || 0 > p || q > k.length || p > k[0].length)) {
              0 > q && (q = 0)
              0 > y && (y = 0)
              0 > r && (r = 0)
              0 > p && (p = 0)
              q >= k.length && (q = k.length - 1)
              y >= k.length && (y = k.length - 1)
              p >= k[0].length && (p = k[0].length - 1)
              r >= k[0].length && (r = k[0].length - 1)
              k = []
              b.getRectMinMax(q, r, y, p, k)
              var u = k[0]
              if (!(fa.z - n > k[1] || fa.z + n < u))
                for (n = this.result; q < y; q++)
                  for (k = r; k < p; k++)
                    if (
                      ((u = n.length),
                      b.getConvexTrianglePillar(q, k, !1),
                      l.pointToWorldFrame(d, f, b.pillarOffset, ma),
                      c.distanceTo(ma) <
                        b.pillarConvex.boundingSphereRadius + a.boundingSphereRadius &&
                        this.sphereConvex(a, b.pillarConvex, c, ma, e, f, g, h),
                      b.getConvexTrianglePillar(q, k, !0),
                      l.pointToWorldFrame(d, f, b.pillarOffset, ma),
                      c.distanceTo(ma) <
                        b.pillarConvex.boundingSphereRadius + a.boundingSphereRadius &&
                        this.sphereConvex(a, b.pillarConvex, c, ma, e, f, g, h),
                      2 < n.length - u)
                    )
                      return
            }
          }
        },
        {
          '../collision/AABB': 3,
          '../collision/Ray': 9,
          '../equations/ContactEquation': 19,
          '../equations/FrictionEquation': 21,
          '../math/Quaternion': 28,
          '../math/Transform': 29,
          '../math/Vec3': 30,
          '../shapes/ConvexPolyhedron': 38,
          '../shapes/Shape': 43,
          '../solver/Solver': 47,
          '../utils/Vec3Pool': 54,
        },
      ],
      56: [
        function(c, e, g) {
          function a() {
            k.apply(this)
            this.dt = -1
            this.allowSleep = !1
            this.contacts = []
            this.frictionEquations = []
            this.quatNormalizeSkip = 0
            this.quatNormalizeFast = !1
            this.stepnumber = this.time = 0
            this.default_dt = 1 / 60
            this.nextId = 0
            this.gravity = new d()
            this.broadphase = new w()
            this.bodies = []
            this.solver = new b()
            this.constraints = []
            this.narrowphase = new l(this)
            this.collisionMatrix = new h()
            this.collisionMatrixPrevious = new h()
            this.materials = []
            this.contactmaterials = []
            this.contactMaterialTable = new p()
            this.defaultMaterial = new f('default')
            this.defaultContactMaterial = new q(this.defaultMaterial, this.defaultMaterial, {
              friction: 0.3,
              restitution: 0,
            })
            this.doProfiling = !1
            this.profile = {
              solve: 0,
              makeContactConstraints: 0,
              broadphase: 0,
              integrate: 0,
              narrowphase: 0,
            }
            this.subsystems = []
            this.addBodyEvent = { type: 'addBody', body: null }
            this.removeBodyEvent = {
              type: 'removeBody',
              body: null,
            }
          }
          e.exports = a
          c('../shapes/Shape')
          var d = c('../math/Vec3')
          e = c('../math/Quaternion')
          var b = c('../solver/GSSolver')
          c('../utils/Vec3Pool')
          c('../equations/ContactEquation')
          c('../equations/FrictionEquation')
          var l = c('./Narrowphase'),
            k = c('../utils/EventTarget'),
            h = c('../collision/ArrayCollisionMatrix'),
            f = c('../material/Material'),
            q = c('../material/ContactMaterial'),
            n = c('../objects/Body'),
            p = c('../utils/TupleDictionary'),
            u = c('../collision/RaycastResult')
          g = c('../collision/AABB')
          var r = c('../collision/Ray'),
            w = c('../collision/NaiveBroadphase')
          a.prototype = new k()
          new g()
          var t = new r()
          a.prototype.getContactMaterial = function(a, b) {
            return this.contactMaterialTable.get(a.id, b.id)
          }
          a.prototype.numObjects = function() {
            return this.bodies.length
          }
          a.prototype.collisionMatrixTick = function() {
            var a = this.collisionMatrixPrevious
            this.collisionMatrixPrevious = this.collisionMatrix
            this.collisionMatrix = a
            this.collisionMatrix.reset()
          }
          a.prototype.add = a.prototype.addBody = function(a) {
            ;-1 === this.bodies.indexOf(a) &&
              ((a.index = this.bodies.length),
              this.bodies.push(a),
              (a.world = this),
              a.initPosition.copy(a.position),
              a.initVelocity.copy(a.velocity),
              (a.timeLastSleepy = this.time),
              a instanceof n &&
                (a.initAngularVelocity.copy(a.angularVelocity),
                a.initQuaternion.copy(a.quaternion)),
              this.collisionMatrix.setNumObjects(this.bodies.length),
              (this.addBodyEvent.body = a),
              this.dispatchEvent(this.addBodyEvent))
          }
          a.prototype.addConstraint = function(a) {
            this.constraints.push(a)
          }
          a.prototype.removeConstraint = function(a) {
            a = this.constraints.indexOf(a)
            ;-1 !== a && this.constraints.splice(a, 1)
          }
          a.prototype.rayTest = function(a, b, c) {
            c instanceof u
              ? this.raycastClosest(a, b, { skipBackfaces: !0 }, c)
              : this.raycastAll(a, b, { skipBackfaces: !0 }, c)
          }
          a.prototype.raycastAll = function(a, b, c, d) {
            c.mode = r.ALL
            c.from = a
            c.to = b
            c.callback = d
            return t.intersectWorld(this, c)
          }
          a.prototype.raycastAny = function(a, b, c, d) {
            c.mode = r.ANY
            c.from = a
            c.to = b
            c.result = d
            return t.intersectWorld(this, c)
          }
          a.prototype.raycastClosest = function(a, b, c, d) {
            c.mode = r.CLOSEST
            c.from = a
            c.to = b
            c.result = d
            return t.intersectWorld(this, c)
          }
          a.prototype.remove = function(a) {
            a.world = null
            var b = this.bodies.length - 1,
              c = this.bodies,
              d = c.indexOf(a)
            if (-1 !== d) {
              c.splice(d, 1)
              for (d = 0; d !== c.length; d++) c[d].index = d
              this.collisionMatrix.setNumObjects(b)
              this.removeBodyEvent.body = a
              this.dispatchEvent(this.removeBodyEvent)
            }
          }
          a.prototype.removeBody = a.prototype.remove
          a.prototype.addMaterial = function(a) {
            this.materials.push(a)
          }
          a.prototype.addContactMaterial = function(a) {
            this.contactmaterials.push(a)
            this.contactMaterialTable.set(a.materials[0].id, a.materials[1].id, a)
          }
          'undefined' === typeof performance && (performance = {})
          if (!performance.now) {
            var v = Date.now()
            performance.timing &&
              performance.timing.navigationStart &&
              (v = performance.timing.navigationStart)
            performance.now = function() {
              return Date.now() - v
            }
          }
          var x = new d()
          a.prototype.step = function(a, b, c) {
            c = c || 10
            b = b || 0
            if (0 === b) this.internalStep(a), (this.time += a)
            else {
              var d = Math.floor((this.time + b) / a) - Math.floor(this.time / a)
              d = Math.min(d, c)
              c = performance.now()
              for (
                var e = 0;
                e !== d && !(this.internalStep(a), performance.now() - c > 1e3 * a);
                e++
              );
              this.time += b
              a = (this.time % a) / a
              b = this.bodies
              for (d = 0; d !== b.length; d++)
                (c = b[d]),
                  c.type !== n.STATIC && c.sleepState !== n.SLEEPING
                    ? (c.position.vsub(c.previousPosition, x),
                      x.scale(a, x),
                      c.position.vadd(x, c.interpolatedPosition))
                    : (c.interpolatedPosition.copy(c.position),
                      c.interpolatedQuaternion.copy(c.quaternion))
            }
          }
          var z = { type: 'postStep' },
            C = { type: 'preStep' },
            A = { type: 'collide', body: null, contact: null },
            D = [],
            G = [],
            B = [],
            J = []
          new d()
          new d()
          new d()
          new d()
          new d()
          new d()
          new d()
          new d()
          new d()
          new e()
          var O = new e(),
            M = new e(),
            K = new d()
          a.prototype.internalStep = function(a) {
            this.dt = a
            var b = this.contacts,
              c = this.numObjects(),
              d = this.bodies,
              e = this.solver,
              f = this.gravity,
              g = this.doProfiling,
              h = this.profile,
              k = n.DYNAMIC,
              l,
              p = this.constraints
            f.norm()
            var q = f.x,
              r = f.y,
              u = f.z
            g && (l = performance.now())
            for (f = 0; f !== c; f++) {
              var t = d[f]
              if (t.type & k) {
                var v = t.force
                t = t.mass
                v.x += t * q
                v.y += t * r
                v.z += t * u
              }
            }
            f = 0
            for (t = this.subsystems.length; f !== t; f++) this.subsystems[f].update()
            g && (l = performance.now())
            B.length = 0
            J.length = 0
            this.broadphase.collisionPairs(this, B, J)
            g && (h.broadphase = performance.now() - l)
            t = p.length
            for (f = 0; f !== t; f++)
              if (((q = p[f]), !q.collideConnected))
                for (r = B.length - 1; 0 <= r; --r)
                  if (
                    (q.bodyA === B[r] && q.bodyB === J[r]) ||
                    (q.bodyB === B[r] && q.bodyA === J[r])
                  )
                    B.splice(r, 1), J.splice(r, 1)
            this.collisionMatrixTick()
            g && (l = performance.now())
            t = b.length
            for (f = 0; f !== t; f++) D.push(b[f])
            b.length = 0
            t = this.frictionEquations.length
            for (f = 0; f !== t; f++) G.push(this.frictionEquations[f])
            this.frictionEquations.length = 0
            this.narrowphase.getContacts(B, J, this, b, D, this.frictionEquations, G)
            g && (h.narrowphase = performance.now() - l)
            g && (l = performance.now())
            for (f = 0; f < this.frictionEquations.length; f++)
              e.addEquation(this.frictionEquations[f])
            f = b.length
            for (r = 0; r !== f; r++)
              (q = b[r]),
                (t = q.bi),
                (u = q.bj),
                t.material && u.material && this.getContactMaterial(t.material, u.material),
                t.material &&
                  u.material &&
                  0 <= t.material.restitution &&
                  0 <= u.material.restitution &&
                  (q.restitution = t.material.restitution * u.material.restitution),
                e.addEquation(q),
                t.allowSleep &&
                  t.type === n.DYNAMIC &&
                  t.sleepState === n.SLEEPING &&
                  u.sleepState === n.AWAKE &&
                  u.type !== n.STATIC &&
                  u.velocity.norm2() + u.angularVelocity.norm2() >=
                    2 * Math.pow(u.sleepSpeedLimit, 2) &&
                  (t._wakeUpAfterNarrowphase = !0),
                u.allowSleep &&
                  u.type === n.DYNAMIC &&
                  u.sleepState === n.SLEEPING &&
                  t.sleepState === n.AWAKE &&
                  t.type !== n.STATIC &&
                  t.velocity.norm2() + t.angularVelocity.norm2() >=
                    2 * Math.pow(t.sleepSpeedLimit, 2) &&
                  (u._wakeUpAfterNarrowphase = !0),
                this.collisionMatrix.set(t, u, !0),
                this.collisionMatrixPrevious.get(t, u) ||
                  ((A.body = u),
                  (A.contact = q),
                  t.dispatchEvent(A),
                  (A.body = t),
                  u.dispatchEvent(A))
            g && ((h.makeContactConstraints = performance.now() - l), (l = performance.now()))
            for (f = 0; f !== c; f++)
              (t = d[f]),
                t._wakeUpAfterNarrowphase && (t.wakeUp(), (t._wakeUpAfterNarrowphase = !1))
            t = p.length
            for (f = 0; f !== t; f++)
              for (q = p[f], q.update(), r = 0, b = q.equations.length; r !== b; r++)
                e.addEquation(q.equations[r])
            e.solve(a, this)
            g && (h.solve = performance.now() - l)
            e.removeAllEquations()
            e = Math.pow
            for (f = 0; f !== c; f++)
              if (
                ((t = d[f]),
                t.type & k &&
                  ((p = e(1 - t.linearDamping, a)),
                  (b = t.velocity),
                  b.mult(p, b),
                  (p = t.angularVelocity)))
              )
                (b = e(1 - t.angularDamping, a)), p.mult(b, p)
            this.dispatchEvent(C)
            for (f = 0; f !== c; f++) (t = d[f]), t.preStep && t.preStep.call(t)
            g && (l = performance.now())
            k = n.DYNAMIC | n.KINEMATIC
            e = 0 === this.stepnumber % (this.quatNormalizeSkip + 1)
            p = this.quatNormalizeFast
            b = 0.5 * a
            for (f = 0; f !== c; f++)
              if (
                ((t = d[f]),
                (q = t.force),
                (r = t.torque),
                t.type & k && t.sleepState !== n.SLEEPING)
              ) {
                u = t.velocity
                v = t.angularVelocity
                var w = t.position,
                  x = t.quaternion,
                  X = t.invMass,
                  ha = t.invInertiaWorld
                u.x += q.x * X * a
                u.y += q.y * X * a
                u.z += q.z * X * a
                t.angularVelocity && (ha.vmult(r, K), K.mult(a, K), K.vadd(v, v))
                w.x += u.x * a
                w.y += u.y * a
                w.z += u.z * a
                t.angularVelocity &&
                  (O.set(v.x, v.y, v.z, 0),
                  O.mult(x, M),
                  (x.x += b * M.x),
                  (x.y += b * M.y),
                  (x.z += b * M.z),
                  (x.w += b * M.w),
                  e && (p ? x.normalizeFast() : x.normalize()))
                t.aabb && (t.aabbNeedsUpdate = !0)
                t.updateInertiaWorld && t.updateInertiaWorld()
              }
            this.clearForces()
            this.broadphase.dirty = !0
            g && (h.integrate = performance.now() - l)
            this.time += a
            this.stepnumber += 1
            this.dispatchEvent(z)
            for (f = 0; f !== c; f++) (t = d[f]), (a = t.postStep) && a.call(t)
            if (this.allowSleep) for (f = 0; f !== c; f++) d[f].sleepTick(this.time)
          }
          a.prototype.clearForces = function() {
            for (var a = this.bodies, b = a.length, c = 0; c !== b; c++) {
              var d = a[c]
              d.force.set(0, 0, 0)
              d.torque.set(0, 0, 0)
            }
          }
        },
        {
          '../collision/AABB': 3,
          '../collision/ArrayCollisionMatrix': 4,
          '../collision/NaiveBroadphase': 7,
          '../collision/Ray': 9,
          '../collision/RaycastResult': 10,
          '../equations/ContactEquation': 19,
          '../equations/FrictionEquation': 21,
          '../material/ContactMaterial': 24,
          '../material/Material': 25,
          '../math/Quaternion': 28,
          '../math/Vec3': 30,
          '../objects/Body': 31,
          '../shapes/Shape': 43,
          '../solver/GSSolver': 46,
          '../utils/EventTarget': 49,
          '../utils/TupleDictionary': 52,
          '../utils/Vec3Pool': 54,
          './Narrowphase': 55,
        },
      ],
    },
    {},
    [2],
  )(2)
})
CANNON = CANNON || {}
var camera,
  scene,
  renderer,
  controls = null,
  s_oRender
// cannon.js
// CBall.js
// CScenario.js
var s_oScenario
// CDetector.js
function TimeSeries(m) {
  m = m || {}
  m.resetBoundsInterval = m.resetBoundsInterval || 3e3
  m.resetBounds = void 0 === m.resetBounds ? !0 : m.resetBounds
  this.options = m
  this.data = []
  this.label = m.label || ''
  this.maxDataLength = m.maxDataLength || 1e3
  this.dataPool = []
  this.minValue = this.maxValue = Number.NaN
  m.resetBounds &&
    (this.boundsTimer = setInterval(
      (function(c) {
        return function() {
          c.resetBounds()
        }
      })(this),
      m.resetBoundsInterval,
    ))
}
TimeSeries.prototype.resetBounds = function() {
  this.minValue = this.maxValue = Number.NaN
  for (var m = 0; m < this.data.length; m++)
    (this.maxValue = isNaN(this.maxValue)
      ? this.data[m][1]
      : Math.max(this.maxValue, this.data[m][1])),
      (this.minValue = isNaN(this.minValue)
        ? this.data[m][1]
        : Math.min(this.minValue, this.data[m][1]))
}
TimeSeries.prototype.append = function(m, c) {
  this.lastTimeStamp = m
  var e = this.dataPool.length ? this.dataPool.pop() : [m, c]
  e[0] = m
  e[1] = c
  this.data.push(e)
  this.maxValue = isNaN(this.maxValue) ? c : Math.max(this.maxValue, c)
  for (
    this.minValue = isNaN(this.minValue) ? c : Math.min(this.minValue, c);
    this.data.length > this.maxDataLength;

  )
    this.dataPool.push(this.data.shift())
}
// SmoothieChart.js
var Stats = function() {
  var m = 0,
    c = 0,
    e = Date.now(),
    g = e,
    a = e,
    d = 0,
    b = 1e3,
    l = 0,
    k = [[16, 16, 48], [0, 255, 255]],
    h = 0,
    f = 1e3,
    q = 0,
    n = [[16, 48, 16], [0, 255, 0]]
  var p = document.createElement('div')
  p.style.cursor = 'pointer'
  p.style.width = '80px'
  p.style.opacity = '0.9'
  p.style.zIndex = '10001'
  p.addEventListener(
    'mousedown',
    function(a) {
      a.preventDefault()
      m = (m + 1) % 2
      0 == m
        ? ((u.style.display = 'block'), (v.style.display = 'none'))
        : ((u.style.display = 'none'), (v.style.display = 'block'))
    },
    !1,
  )
  var u = document.createElement('div')
  u.style.textAlign = 'left'
  u.style.lineHeight = '1.2em'
  u.style.backgroundColor =
    'rgb(' +
    Math.floor(k[0][0] / 2) +
    ',' +
    Math.floor(k[0][1] / 2) +
    ',' +
    Math.floor(k[0][2] / 2) +
    ')'
  u.style.padding = '0 0 3px 3px'
  p.appendChild(u)
  var r = document.createElement('div')
  r.style.fontFamily = 'Helvetica, Arial, sans-serif'
  r.style.fontSize = '9px'
  r.style.color = 'rgb(' + k[1][0] + ',' + k[1][1] + ',' + k[1][2] + ')'
  r.style.fontWeight = 'bold'
  r.innerHTML = 'FPS'
  u.appendChild(r)
  var w = document.createElement('div')
  w.style.position = 'relative'
  w.style.width = '74px'
  w.style.height = '30px'
  w.style.backgroundColor = 'rgb(' + k[1][0] + ',' + k[1][1] + ',' + k[1][2] + ')'
  for (u.appendChild(w); 74 > w.children.length; ) {
    var t = document.createElement('span')
    t.style.width = '1px'
    t.style.height = '30px'
    t.style.cssFloat = 'left'
    t.style.backgroundColor = 'rgb(' + k[0][0] + ',' + k[0][1] + ',' + k[0][2] + ')'
    w.appendChild(t)
  }
  var v = document.createElement('div')
  v.style.textAlign = 'left'
  v.style.lineHeight = '1.2em'
  v.style.backgroundColor =
    'rgb(' +
    Math.floor(n[0][0] / 2) +
    ',' +
    Math.floor(n[0][1] / 2) +
    ',' +
    Math.floor(n[0][2] / 2) +
    ')'
  v.style.padding = '0 0 3px 3px'
  v.style.display = 'none'
  p.appendChild(v)
  var x = document.createElement('div')
  x.style.fontFamily = 'Helvetica, Arial, sans-serif'
  x.style.fontSize = '9px'
  x.style.color = 'rgb(' + n[1][0] + ',' + n[1][1] + ',' + n[1][2] + ')'
  x.style.fontWeight = 'bold'
  x.innerHTML = 'MS'
  v.appendChild(x)
  var z = document.createElement('div')
  z.style.position = 'relative'
  z.style.width = '74px'
  z.style.height = '30px'
  z.style.backgroundColor = 'rgb(' + n[1][0] + ',' + n[1][1] + ',' + n[1][2] + ')'
  for (v.appendChild(z); 74 > z.children.length; )
    (t = document.createElement('span')),
      (t.style.width = '1px'),
      (t.style.height = 30 * Math.random() + 'px'),
      (t.style.cssFloat = 'left'),
      (t.style.backgroundColor = 'rgb(' + n[0][0] + ',' + n[0][1] + ',' + n[0][2] + ')'),
      z.appendChild(t)
  return {
    domElement: p,
    update: function() {
      e = Date.now()
      h = e - g
      f = Math.min(f, h)
      q = Math.max(q, h)
      x.textContent = h + ' MS (' + f + '-' + q + ')'
      var k = Math.min(30, 30 - (h / 200) * 30)
      z.appendChild(z.firstChild).style.height = k + 'px'
      g = e
      c++
      e > a + 1e3 &&
        ((d = Math.round((1e3 * c) / (e - a))),
        (b = Math.min(b, d)),
        (l = Math.max(l, d)),
        (r.textContent = d + ' FPS (' + b + '-' + l + ')'),
        (k = Math.min(30, 30 - (d / 100) * 30)),
        (w.appendChild(w.firstChild).style.height = k + 'px'),
        (a = e),
        (c = 0))
    },
  }
}
THREE.TrackballControls = function(m, c) {
  function e(a) {
    !1 !== b.enabled &&
      (window.removeEventListener('keydown', e), (f = h), h === l.NONE) &&
      (a.keyCode !== b.keys[l.ROTATE] || b.noRotate
        ? a.keyCode !== b.keys[l.ZOOM] || b.noZoom
          ? a.keyCode !== b.keys[l.PAN] || b.noPan || (h = l.PAN)
          : (h = l.ZOOM)
        : (h = l.ROTATE))
  }
  function g(a) {
    !1 !== b.enabled &&
      (a.preventDefault(),
      a.stopPropagation(),
      h !== l.ROTATE || b.noRotate
        ? h !== l.ZOOM || b.noZoom
          ? h !== l.PAN || b.noPan || x.copy(D(a.pageX, a.pageY))
          : r.copy(D(a.pageX, a.pageY))
        : p.copy(G(a.pageX, a.pageY)))
  }
  function a(c) {
    !1 !== b.enabled &&
      (c.preventDefault(),
      c.stopPropagation(),
      (h = l.NONE),
      document.removeEventListener('mousemove', g),
      document.removeEventListener('mouseup', a),
      b.dispatchEvent(A))
  }
  function d(a) {
    if (!1 !== b.enabled) {
      a.preventDefault()
      a.stopPropagation()
      var c = 0
      a.wheelDelta ? (c = a.wheelDelta / 40) : a.detail && (c = -a.detail / 3)
      u.y += 0.01 * c
      b.dispatchEvent(C)
      b.dispatchEvent(A)
    }
  }
  var b = this,
    l = {
      NONE: -1,
      ROTATE: 0,
      ZOOM: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_ZOOM_PAN: 4,
    }
  this.object = m
  this.domElement = void 0 !== c ? c : document
  this.enabled = !0
  this.screen = { left: 0, top: 0, width: 0, height: 0 }
  this.rotateSpeed = 1
  this.zoomSpeed = 1.2
  this.panSpeed = 0.3
  this.staticMoving = this.noRoll = this.noPan = this.noZoom = this.noRotate = !1
  this.dynamicDampingFactor = 0.2
  this.minDistance = 0
  this.maxDistance = Infinity
  this.keys = [65, 83, 68]
  this.target = new THREE.Vector3()
  var k = new THREE.Vector3(),
    h = l.NONE,
    f = l.NONE,
    q = new THREE.Vector3(),
    n = new THREE.Vector3(),
    p = new THREE.Vector3(),
    u = new THREE.Vector2(),
    r = new THREE.Vector2(),
    w = 0,
    t = 0,
    v = new THREE.Vector2(),
    x = new THREE.Vector2()
  this.target0 = this.target.clone()
  this.position0 = this.object.position.clone()
  this.up0 = this.object.up.clone()
  var z = { type: 'change' },
    C = { type: 'start' },
    A = { type: 'end' }
  this.handleResize = function() {
    if (this.domElement === document)
      (this.screen.left = 0),
        (this.screen.top = 0),
        (this.screen.width = window.innerWidth),
        (this.screen.height = window.innerHeight)
    else {
      var a = this.domElement.getBoundingClientRect(),
        b = this.domElement.ownerDocument.documentElement
      this.screen.left = a.left + window.pageXOffset - b.clientLeft
      this.screen.top = a.top + window.pageYOffset - b.clientTop
      this.screen.width = a.width
      this.screen.height = a.height
    }
  }
  this.handleEvent = function(a) {
    if ('function' == typeof this[a.type]) this[a.type](a)
  }
  var D = (function() {
      var a = new THREE.Vector2()
      return function(c, d) {
        a.set((c - b.screen.left) / b.screen.width, (d - b.screen.top) / b.screen.height)
        return a
      }
    })(),
    G = (function() {
      var a = new THREE.Vector3(),
        c = new THREE.Vector3(),
        d = new THREE.Vector3()
      return function(e, f) {
        d.set(
          (e - 0.5 * b.screen.width - b.screen.left) / (0.5 * b.screen.width),
          (0.5 * b.screen.height + b.screen.top - f) / (0.5 * b.screen.height),
          0,
        )
        var g = d.length()
        b.noRoll
          ? (d.z = g < Math.SQRT1_2 ? Math.sqrt(1 - g * g) : 0.5 / g)
          : 1 < g
            ? d.normalize()
            : (d.z = Math.sqrt(1 - g * g))
        q.copy(b.object.position).sub(b.target)
        a.copy(b.object.up).setLength(d.y)
        a.add(
          c
            .copy(b.object.up)
            .cross(q)
            .setLength(d.x),
        )
        a.add(q.setLength(d.z))
        return a
      }
    })()
  this.rotateCamera = (function() {
    var a = new THREE.Vector3(),
      c = new THREE.Quaternion()
    return function() {
      var d = Math.acos(n.dot(p) / n.length() / p.length())
      d &&
        (a.crossVectors(n, p).normalize(),
        (d *= b.rotateSpeed),
        c.setFromAxisAngle(a, -d),
        q.applyQuaternion(c),
        b.object.up.applyQuaternion(c),
        p.applyQuaternion(c),
        b.staticMoving
          ? n.copy(p)
          : (c.setFromAxisAngle(a, d * (b.dynamicDampingFactor - 1)), n.applyQuaternion(c)))
    }
  })()
  this.zoomCamera = function() {
    if (h === l.TOUCH_ZOOM_PAN) {
      var a = w / t
      w = t
      q.multiplyScalar(a)
    } else
      (a = 1 + (r.y - u.y) * b.zoomSpeed),
        1 !== a &&
          0 < a &&
          (q.multiplyScalar(a),
          b.staticMoving ? u.copy(r) : (u.y += (r.y - u.y) * this.dynamicDampingFactor))
  }
  this.panCamera = (function() {
    var a = new THREE.Vector2(),
      c = new THREE.Vector3(),
      d = new THREE.Vector3()
    return function() {
      a.copy(x).sub(v)
      a.lengthSq() &&
        (a.multiplyScalar(q.length() * b.panSpeed),
        d
          .copy(q)
          .cross(b.object.up)
          .setLength(a.x),
        d.add(c.copy(b.object.up).setLength(a.y)),
        b.object.position.add(d),
        b.target.add(d),
        b.staticMoving
          ? v.copy(x)
          : v.add(a.subVectors(x, v).multiplyScalar(b.dynamicDampingFactor)))
    }
  })()
  this.checkDistances = function() {
    ;(b.noZoom && b.noPan) ||
      (q.lengthSq() > b.maxDistance * b.maxDistance &&
        b.object.position.addVectors(b.target, q.setLength(b.maxDistance)),
      q.lengthSq() < b.minDistance * b.minDistance &&
        b.object.position.addVectors(b.target, q.setLength(b.minDistance)))
  }
  this.update = function() {
    q.subVectors(b.object.position, b.target)
    b.noRotate || b.rotateCamera()
    b.noZoom || b.zoomCamera()
    b.noPan || b.panCamera()
    b.object.position.addVectors(b.target, q)
    b.checkDistances()
    b.object.lookAt(b.target)
    1e-6 < k.distanceToSquared(b.object.position) && (b.dispatchEvent(z), k.copy(b.object.position))
  }
  this.reset = function() {
    f = h = l.NONE
    b.target.copy(b.target0)
    b.object.position.copy(b.position0)
    b.object.up.copy(b.up0)
    q.subVectors(b.object.position, b.target)
    b.object.lookAt(b.target)
    b.dispatchEvent(z)
    k.copy(b.object.position)
  }
  this.domElement.addEventListener(
    'contextmenu',
    function(a) {
      a.preventDefault()
    },
    !1,
  )
  this.domElement.addEventListener(
    'mousedown',
    function(c) {
      !1 !== b.enabled &&
        (c.preventDefault(),
        c.stopPropagation(),
        h === l.NONE && (h = c.button),
        h !== l.ROTATE || b.noRotate
          ? h !== l.ZOOM || b.noZoom
            ? h !== l.PAN || b.noPan || (v.copy(D(c.pageX, c.pageY)), x.copy(v))
            : (u.copy(D(c.pageX, c.pageY)), r.copy(u))
          : (n.copy(G(c.pageX, c.pageY)), p.copy(n)),
        document.addEventListener('mousemove', g, !1),
        document.addEventListener('mouseup', a, !1),
        b.dispatchEvent(C))
    },
    !1,
  )
  this.domElement.addEventListener('mousewheel', d, !1)
  this.domElement.addEventListener('DOMMouseScroll', d, !1)
  this.domElement.addEventListener(
    'touchstart',
    function(a) {
      if (!1 !== b.enabled) {
        switch (a.touches.length) {
          case 1:
            h = l.TOUCH_ROTATE
            n.copy(G(a.touches[0].pageX, a.touches[0].pageY))
            p.copy(n)
            break
          case 2:
            h = l.TOUCH_ZOOM_PAN
            var c = a.touches[0].pageX - a.touches[1].pageX,
              d = a.touches[0].pageY - a.touches[1].pageY
            t = w = Math.sqrt(c * c + d * d)
            v.copy(
              D(
                (a.touches[0].pageX + a.touches[1].pageX) / 2,
                (a.touches[0].pageY + a.touches[1].pageY) / 2,
              ),
            )
            x.copy(v)
            break
          default:
            h = l.NONE
        }
        b.dispatchEvent(C)
      }
    },
    !1,
  )
  this.domElement.addEventListener(
    'touchend',
    function(a) {
      if (!1 !== b.enabled) {
        switch (a.touches.length) {
          case 1:
            p.copy(G(a.touches[0].pageX, a.touches[0].pageY))
            n.copy(p)
            break
          case 2:
            ;(w = t = 0),
              x.copy(
                D(
                  (a.touches[0].pageX + a.touches[1].pageX) / 2,
                  (a.touches[0].pageY + a.touches[1].pageY) / 2,
                ),
              ),
              v.copy(x)
        }
        h = l.NONE
        b.dispatchEvent(A)
      }
    },
    !1,
  )
  this.domElement.addEventListener(
    'touchmove',
    function(a) {
      if (!1 !== b.enabled)
        switch ((a.preventDefault(), a.stopPropagation(), a.touches.length)) {
          case 1:
            p.copy(G(a.touches[0].pageX, a.touches[0].pageY))
            break
          case 2:
            var c = a.touches[0].pageX - a.touches[1].pageX,
              d = a.touches[0].pageY - a.touches[1].pageY
            t = Math.sqrt(c * c + d * d)
            x.copy(
              D(
                (a.touches[0].pageX + a.touches[1].pageX) / 2,
                (a.touches[0].pageY + a.touches[1].pageY) / 2,
              ),
            )
            break
          default:
            h = l.NONE
        }
    },
    !1,
  )
  window.addEventListener('keydown', e, !1)
  window.addEventListener(
    'keyup',
    function(a) {
      !1 !== b.enabled && ((h = f), window.addEventListener('keydown', e, !1))
    },
    !1,
  )
  this.handleResize()
  this.update()
}
THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype)
// dat.js
// CWinPanel.js
// CAreYouSurePanel.js
// CGolaKeeper.js
// CStartBall.js
// CVector2.js
// CPlayer.js
// CScoreBoard.js
MS_ROLLING_SCORE = 750
// CRollingScore.js
// CLaunchBoard.js
// CHandSwipeAnim.js
// CGoal.js
TEXT_GAMEOVER = '游戏结束'
TEXT_OF = '/'
TEXT_SCORE = '得分'
TEXT_BEST_SCORE = '最高分'
TEXT_MULTIPLIER = 'x'
TEXT_ARE_SURE = '确定离开吗?'
TEXT_BALL_OUT = '打飞了'
TEXT_PAUSE = '暂停'
TEXT_CONGRATULATION = ['nb!', '绝了!', '学习了!!!']
TEXT_SAVED = '神扑'
TEXT_HELP = '滑动来射门'
TEXT_SHARE_IMAGE = '200x200.jpg'
TEXT_SHARE_TITLE = '恭喜!'
TEXT_SHARE_MSG1 = 'You collected <strong>'
TEXT_SHARE_MSG2 = ' points</strong>!<br><br>Share your score with your friends!'
TEXT_SHARE_SHARE1 = 'My score is '
TEXT_SHARE_SHARE2 = ' points! Can you do better?'
function CGoalKeeper(m, c, e) {
  var g,
    a,
    d,
    b,
    l,
    k,
    h = 0,
    f = 0,
    q = IDLE
  this._init = function(c, e, f) {
    l = f
    g = c
    a = e
    d = new createjs.Container()
    d.x = g
    d.y = a
    l.addChild(d)
    d.tickChildren = !1
    k = []
    b = []
    for (f = e = c = 0; f < NUM_SPRITE_GOALKEEPER.length; f++) {
      b[f] = new createjs.Container()
      b[f].x = OFFSET_CONTAINER_GOALKEEPER[f].x
      b[f].y = OFFSET_CONTAINER_GOALKEEPER[f].y
      k.push(this.loadAnim(SPRITE_NAME_GOALKEEPER[f], NUM_SPRITE_GOALKEEPER[f], b[f]))
      d.addChild(b[f])
      var h = s_oSpriteLibrary.getSprite(SPRITE_NAME_GOALKEEPER[f] + 0)
      h.width > c && (c = h.width)
      h.height > e && (e = h.height)
    }
    d.cache(-c, -e, 2 * c, 2 * e)
    k[IDLE][0].visible = !0
  }
  this.getAnimType = function() {
    return q
  }
  this.getAnimArray = function() {
    return k[q]
  }
  this.loadAnim = function(a, b, c) {
    for (var d = [], e = 0; e < b; e++)
      d.push(createBitmap(s_oSpriteLibrary.getSprite(a + e))), (d[e].visible = !1), c.addChild(d[e])
    return d
  }
  this.getX = function() {
    return d.x
  }
  this.getY = function() {
    return d.y
  }
  this.disableAllAnim = function() {
    for (var a = 0; a < b.length; a++) b[a].visible = !1
  }
  this.setPosition = function(a, b) {
    d.x = a
    d.y = b
  }
  this.setVisible = function(a) {
    d.visible = a
  }
  this.fadeAnimation = function(a) {
    createjs.Tween.get(d, { override: !0 }).to({ alpha: a }, 500)
  }
  this.setAlpha = function(a) {
    d.alpha = a
  }
  this.getObject = function() {
    return d
  }
  this.getFrame = function() {
    return f
  }
  this.viewFrame = function(a, b) {
    a[b].visible = !0
  }
  this.hideFrame = function(a, b) {
    a[b].visible = !1
  }
  this.getDepthPos = function() {
    return GOAL_KEEPER_DEPTH_Y
  }
  this.animGoalKeeper = function(a, b) {
    h += s_iTimeElaps
    if (h > BUFFER_ANIM_PLAYER) {
      this.hideFrame(a, f)
      if (f + 1 < b) this.viewFrame(a, f + 1), f++
      else return (h = f = 0), this.viewFrame(a, f), !1
      h = 0
      d.updateCache()
    }
    return !0
  }
  this.resetAnimation = function(a) {
    this.resetAnimFrame(k[a], NUM_SPRITE_GOALKEEPER[a])
  }
  this.resetAnimFrame = function(a, b) {
    for (var c = 1; c < b; c++) a[c].visible = !1
    a[0].visible = !0
  }
  this.setVisibleContainer = function(a, c) {
    b[a].visible = c
  }
  this.runAnim = function(a) {
    this.disableAllAnim()
    this.resetAnimation(a)
    this.setVisibleContainer(a, !0)
    q = a
    f = 0
  }
  this.update = function() {
    return this.animGoalKeeper(k[q], NUM_SPRITE_GOALKEEPER[q])
  }
  this._init(m, c, e)
  return this
}
CANNON.Demo = function(m) {
  function c() {
    if (z) {
      for (var a in z.__controllers) z.__controllers[a].updateDisplay()
      for (var b in z.__folders)
        for (a in z.__folders[b].__controllers) z.__folders[b].__controllers[a].updateDisplay()
    }
  }
  function e(a) {
    function b(a, c) {
      a.material && (a.material = c)
      for (var d = 0; d < a.children.length; d++) b(a.children[d], c)
    }
    if (-1 === T.indexOf(a)) throw Error('Render mode ' + a + ' not found!')
    switch (a) {
      case 'solid':
        p.currentMaterial = B
        Q.intensity = 1
        Y.color.setHex(2236962)
        break
      case 'wireframe':
        ;(p.currentMaterial = J), (Q.intensity = 0), Y.color.setHex(16777215)
    }
    for (var c = 0; c < v.length; c++) b(v[c], p.currentMaterial)
    r.rendermode = a
  }
  function g() {
    for (var a = t.length, b = 0; b < a; b++) {
      var c = t[b]
      c.position.copy(c.initPosition)
      c.velocity.copy(c.initVelocity)
      c.initAngularVelocity &&
        (c.angularVelocity.copy(c.initAngularVelocity), c.quaternion.copy(c.initQuaternion))
    }
  }
  function a(a) {
    0 === a.x && (a.x = 1e-6)
    0 === a.y && (a.y = 1e-6)
    0 === a.z && (a.z = 1e-6)
  }
  function d() {
    for (var b = t.length, c = 0; c < b; c++) {
      var d = t[c],
        e = v[c]
      e.position.copy(d.position)
      d.quaternion && e.quaternion.copy(d.quaternion)
    }
    M.restart()
    if (r.contacts)
      for (c = 0; c < E.contacts.length; c++)
        for (b = 0; 2 > b; b++) {
          e = M.request()
          var f = E.contacts[c]
          d = 0 === b ? f.bi : f.bj
          var g = 0 === b ? f.ri : f.rj
          e.position.set(d.position.x + g.x, d.position.y + g.y, d.position.z + g.z)
        }
    M.hideCached()
    K.restart()
    if (r.cm2contact)
      for (c = 0; c < E.contacts.length; c++)
        for (b = 0; 2 > b; b++)
          (e = K.request()),
            (f = E.contacts[c]),
            (d = 0 === b ? f.bi : f.bj),
            (g = 0 === b ? f.ri : f.rj),
            e.scale.set(g.x, g.y, g.z),
            a(e.scale),
            e.position.copy(d.position)
    K.hideCached()
    y.restart()
    N.restart()
    if (r.constraints) {
      for (c = 0; c < E.constraints.length; c++)
        (f = E.constraints[c]),
          f instanceof CANNON.DistanceConstraint &&
            ((d = f.equations.normal),
            (b = d.bi),
            (d = d.bj),
            (e = y.request()),
            (d = d.position ? d.position : d),
            e.scale.set(d.x - b.position.x, d.y - b.position.y, d.z - b.position.z),
            a(e.scale),
            e.position.copy(b.position))
      for (c = 0; c < E.constraints.length; c++)
        if (((f = E.constraints[c]), f instanceof CANNON.PointToPointConstraint)) {
          g = f.equations.normal
          b = g.bi
          d = g.bj
          e = N.request()
          f = N.request()
          var h = N.request()
          e.scale.set(g.ri.x, g.ri.y, g.ri.z)
          f.scale.set(g.rj.x, g.rj.y, g.rj.z)
          h.scale.set(-g.penetrationVec.x, -g.penetrationVec.y, -g.penetrationVec.z)
          a(e.scale)
          a(f.scale)
          a(h.scale)
          e.position.copy(b.position)
          f.position.copy(d.position)
          g.bj.position.vadd(g.rj, h.position)
        }
    }
    N.hideCached()
    y.hideCached()
    I.restart()
    if (r.normals)
      for (c = 0; c < E.contacts.length; c++)
        (f = E.contacts[c]),
          (b = f.bi),
          (e = I.request()),
          (g = f.ni),
          (d = b),
          e.scale.set(g.x, g.y, g.z),
          a(e.scale),
          e.position.copy(d.position),
          f.ri.vadd(e.position, e.position)
    I.hideCached()
    P.restart()
    if (r.axes)
      for (b = 0; b < t.length; b++)
        (d = t[b]),
          (e = P.request()),
          e.position.copy(d.position),
          d.quaternion && e.quaternion.copy(d.quaternion)
    P.hideCached()
    F.restart()
    if (r.aabbs)
      for (c = 0; c < t.length; c++)
        (d = t[c]),
          d.computeAABB &&
            (d.aabbNeedsUpdate && d.computeAABB(),
            isFinite(d.aabb.lowerBound.x) &&
              isFinite(d.aabb.lowerBound.y) &&
              isFinite(d.aabb.lowerBound.z) &&
              isFinite(d.aabb.upperBound.x) &&
              isFinite(d.aabb.upperBound.y) &&
              isFinite(d.aabb.upperBound.z) &&
              0 != d.aabb.lowerBound.x - d.aabb.upperBound.x &&
              0 != d.aabb.lowerBound.y - d.aabb.upperBound.y &&
              0 != d.aabb.lowerBound.z - d.aabb.upperBound.z &&
              ((e = F.request()),
              e.scale.set(
                d.aabb.lowerBound.x - d.aabb.upperBound.x,
                d.aabb.lowerBound.y - d.aabb.upperBound.y,
                d.aabb.lowerBound.z - d.aabb.upperBound.z,
              ),
              e.position.set(
                0.5 * (d.aabb.lowerBound.x + d.aabb.upperBound.x),
                0.5 * (d.aabb.lowerBound.y + d.aabb.upperBound.y),
                0.5 * (d.aabb.lowerBound.z + d.aabb.upperBound.z),
              )))
    F.hideCached()
  }
  function b() {
    requestAnimationFrame(b)
    r.paused || d()
    h()
    W.update()
  }
  function l(a) {
    mouseX = a.clientX - S
    mouseY = a.clientY - aa
  }
  function k(a) {
    U = s_iCanvasResizeWidth + 2 * s_iCanvasOffsetWidth
    V = s_iCanvasResizeHeight + 2 * s_iCanvasOffsetHeight
    CAMERA_TEST_TRACKBALL && ((controls.screen.width = U), (controls.screen.height = V))
  }
  function h() {
    ;(CAMERA_TEST_TRACKBALL || (CAMERA_TEST_TRANSFORM && null !== controls)) && controls.update()
    renderer.clear()
    renderer.render(p.scene, camera)
  }
  function f(a) {
    p.dispatchEvent({ type: 'destroy' })
    r.paused = !1
    c()
    q(a)
  }
  function q(a) {
    for (var b = v.length, d = 0; d < b; d++) {
      E.remove(t.pop())
      var e = v.pop()
      p.scene.remove(e)
    }
    for (; E.constraints.length; ) E.removeConstraint(E.constraints[0])
    x[a]()
    r.iterations = E.solver.iterations
    r.gx = E.gravity.x + 0
    r.gy = E.gravity.y + 0
    r.gz = E.gravity.z + 0
    r.quatNormalizeSkip = E.quatNormalizeSkip
    r.quatNormalizeFast = E.quatNormalizeFast
    c()
    M.restart()
    M.hideCached()
    K.restart()
    K.hideCached()
    y.restart()
    y.hideCached()
    I.restart()
    I.hideCached()
  }
  function n(a) {
    var b = [],
      c = []
    this.request = function() {
      geo = b.length ? b.pop() : a()
      scene.add(geo)
      c.push(geo)
      return geo
    }
    this.restart = function() {
      for (; c.length; ) b.push(c.pop())
    }
    this.hideCached = function() {
      for (var a = 0; a < b.length; a++) scene.remove(b[a])
    }
  }
  var p = this
  this.addScene = function(a, b) {
    if ('string' !== typeof a)
      throw Error('1st argument of Demo.addScene(title,initfunc) must be a string!')
    if ('function' !== typeof b)
      throw Error('2nd argument of Demo.addScene(title,initfunc) must be a function!')
    x.push(b)
    var c = x.length - 1
    D[a] = function() {
      f(c)
    }
    u.add(D, a)
  }
  this.restartCurrentScene = g
  this.changeScene = f
  this.start = function() {
    q(0)
  }
  var u,
    r = (this.settings = {
      stepFrequency: 60,
      quatNormalizeSkip: 2,
      quatNormalizeFast: !0,
      gx: 0,
      gy: 0,
      gz: 0,
      iterations: 3,
      tolerance: 1e-4,
      k: 1e6,
      d: 3,
      scene: 0,
      paused: !1,
      rendermode: 'solid',
      constraints: !1,
      contacts: !1,
      cm2contact: !1,
      normals: !1,
      axes: !1,
      particleSize: 0.1,
      shadows: !1,
      aabbs: !1,
      profiling: !1,
      maxSubSteps: 3,
    })
  m = m || {}
  for (var w in m) w in r && (r[w] = m[w])
  if (0 !== r.stepFrequency % 60) throw Error('stepFrequency must be a multiple of 60.')
  var t = (this.bodies = []),
    v = (this.visuals = []),
    x = [],
    z = null,
    C = null,
    A = null,
    D = {},
    G = new THREE.SphereGeometry(0.1, 6, 6)
  this.particleGeo = new THREE.SphereGeometry(1, 16, 8)
  var B = new THREE.MeshPhongMaterial({
      color: 11184810,
      specular: 1118481,
      shininess: 50,
    }),
    J = new THREE.MeshLambertMaterial({ color: 16777215, wireframe: !0 })
  this.currentMaterial = B
  var O = new THREE.MeshPhongMaterial({ color: 16711680 })
  this.particleMaterial = new THREE.MeshLambertMaterial({ color: 16711680 })
  var M = new n(function() {
      return new THREE.Mesh(G, O)
    }),
    K = new n(function() {
      var a = new THREE.Geometry()
      a.vertices.push(new THREE.Vector3(0, 0, 0))
      a.vertices.push(new THREE.Vector3(1, 1, 1))
      return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 16711680 }))
    }),
    H = new THREE.BoxGeometry(1, 1, 1),
    L = new THREE.MeshBasicMaterial({ color: 11184810, wireframe: !0 }),
    F = new n(function() {
      return new THREE.Mesh(H, L)
    }),
    y = new n(function() {
      var a = new THREE.Geometry()
      a.vertices.push(new THREE.Vector3(0, 0, 0))
      a.vertices.push(new THREE.Vector3(1, 1, 1))
      return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 16711680 }))
    }),
    N = new n(function() {
      var a = new THREE.Geometry()
      a.vertices.push(new THREE.Vector3(0, 0, 0))
      a.vertices.push(new THREE.Vector3(1, 1, 1))
      return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 16711680 }))
    }),
    I = new n(function() {
      var a = new THREE.Geometry()
      a.vertices.push(new THREE.Vector3(0, 0, 0))
      a.vertices.push(new THREE.Vector3(1, 1, 1))
      return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 65280 }))
    }),
    P = new n(function() {
      var a = new THREE.Object3D(),
        b = new THREE.Vector3(0, 0, 0),
        c = new THREE.Geometry(),
        d = new THREE.Geometry(),
        e = new THREE.Geometry()
      c.vertices.push(b)
      d.vertices.push(b)
      e.vertices.push(b)
      c.vertices.push(new THREE.Vector3(1, 0, 0))
      d.vertices.push(new THREE.Vector3(0, 1, 0))
      e.vertices.push(new THREE.Vector3(0, 0, 1))
      b = new THREE.Line(c, new THREE.LineBasicMaterial({ color: 16711680 }))
      d = new THREE.Line(d, new THREE.LineBasicMaterial({ color: 65280 }))
      e = new THREE.Line(e, new THREE.LineBasicMaterial({ color: 255 }))
      a.add(b)
      a.add(d)
      a.add(e)
      return a
    }),
    E = (this.world = new CANNON.World())
  E.broadphase = new CANNON.NaiveBroadphase()
  var T = ['solid', 'wireframe'],
    Q,
    Y,
    W,
    R
  Detector.webgl || Detector.addGetWebGLMessage()
  var U = s_iCanvasResizeWidth + s_iCanvasOffsetWidth,
    V = s_iCanvasResizeHeight + s_iCanvasOffsetHeight,
    Z,
    S = U / 2,
    aa = V / 2
  ;(function() {
    Z = document.createElement('div')
    document.body.appendChild(Z)
    CAMERA_TEST_TRACKBALL
      ? ((NEAR = 1),
        (camera = new THREE.PerspectiveCamera(45, U / V, NEAR, FAR)),
        camera.lookAt(
          new THREE.Vector3(CAMERA_TEST_LOOK_AT.x, CAMERA_TEST_LOOK_AT.y, CAMERA_TEST_LOOK_AT.z),
        ),
        camera.position.set(0, 500, 500),
        camera.up.set(0, 0, 1))
      : (camera = createOrthoGraphicCamera())
    scene = p.scene = new THREE.Scene()
    scene.fog = new THREE.Fog(8306926, 0.5 * FAR, FAR)
    Y = new THREE.AmbientLight(4473924)
    scene.add(Y)
    Q = new THREE.DirectionalLight(16777181, 1)
    Q.position.set(180, 0, 180)
    Q.target.position.set(0, 0, 0)
    Q.castShadow = !0
    Q.shadow.camera.near = 10
    Q.shadow.camera.far = 100
    Q.shadow.camera.fov = FOV
    Q.shadowMapBias = 0.0139
    Q.shadowMapDarkness = 0.1
    Q.shadow.mapSize.width = 1024
    Q.shadow.mapSize.height = 1024
    new THREE.CameraHelper(Q.shadow.camera)
    scene.add(Q)
    scene.add(camera)
    renderer = SHOW_3D_RENDER
      ? new THREE.WebGLRenderer({
          clearColor: 0,
          clearAlpha: 0.5,
          antialias: !0,
          alpha: !0,
        })
      : new THREE.CanvasRenderer({
          clearColor: 0,
          clearAlpha: 0.5,
          antialias: !1,
          alpha: !0,
        })
    renderer.setSize(U, V)
    renderer.domElement.style.position = 'relative'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.opacity = CANVAS_3D_OPACITY
    Z.appendChild(renderer.domElement)
    R = document.createElement('div')
    R.style.position = 'absolute'
    R.style.top = '10px'
    R.style.width = '100%'
    R.style.textAlign = 'center'
    R.innerHTML =
      '<a href="http://github.com/schteppe/cannon.js">cannon.js</a> - javascript 3d physics'
    Z.appendChild(R)
    document.addEventListener('mousemove', l)
    window.addEventListener('resize', k)
    renderer.setClearColor(scene.fog.color, 1)
    renderer.autoClear = !1
    A = document.createElement('canvas')
    A.width = U
    A.height = V
    A.style.opacity = 0.5
    A.style.position = 'absolute'
    A.style.top = '0px'
    A.style.zIndex = 90
    Z.appendChild(A)
    C = new SmoothieChart({
      labelOffsetY: 50,
      maxDataSetLength: 100,
      millisPerPixel: 2,
      grid: {
        strokeStyle: 'none',
        fillStyle: 'none',
        lineWidth: 1,
        millisPerLine: 250,
        verticalSections: 6,
      },
      labels: { fillStyle: 'rgb(180, 180, 180)' },
    })
    C.streamTo(A)
    var a = {},
      b = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0], [255, 0, 255], [0, 255, 255]],
      c = 0,
      d
    for (d in E.profile) {
      var f = b[c % b.length]
      a[d] = new TimeSeries({
        label: d,
        fillStyle: 'rgb(' + f[0] + ',' + f[1] + ',' + f[2] + ')',
        maxDataLength: 500,
      })
      c++
    }
    E.addEventListener('postStep', function(b) {
      for (var c in E.profile) a[c].append(1e3 * E.time, E.profile[c])
    })
    c = 0
    for (d in E.profile)
      (f = b[c % b.length]),
        C.addTimeSeries(a[d], {
          strokeStyle: 'rgb(' + f[0] + ',' + f[1] + ',' + f[2] + ')',
          lineWidth: 2,
        }),
        c++
    E.doProfiling = !1
    C.stop()
    A.style.display = 'none'
    W = new Stats()
    W.domElement.style.position = 'absolute'
    W.domElement.style.top = '0px'
    W.domElement.style.zIndex = 100
    Z.appendChild(W.domElement)
    void 0 != window.dat &&
      ((z = new dat.GUI()),
      (z.domElement.parentNode.style.zIndex = 120),
      (b = z.addFolder('Rendering')),
      b.add(r, 'rendermode', { Solid: 'solid', Wireframe: 'wireframe' }).onChange(function(a) {
        e(a)
      }),
      b.add(r, 'contacts'),
      b.add(r, 'cm2contact'),
      b.add(r, 'normals'),
      b.add(r, 'constraints'),
      b.add(r, 'axes'),
      b
        .add(r, 'particleSize')
        .min(0)
        .max(1)
        .onChange(function(a) {
          for (var b = 0; b < v.length; b++)
            t[b] instanceof CANNON.Particle && v[b].scale.set(a, a, a)
        }),
      b.add(r, 'shadows').onChange(function(a) {
        a
          ? (renderer.shadowMapAutoUpdate = !0)
          : ((renderer.shadowMapAutoUpdate = !1), renderer.clearTarget(Q.shadowMap))
      }),
      b.add(r, 'aabbs'),
      b.add(r, 'profiling').onChange(function(a) {
        a
          ? ((E.doProfiling = !0), C.start(), (A.style.display = 'block'))
          : ((E.doProfiling = !1), C.stop(), (A.style.display = 'none'))
      }),
      (b = z.addFolder('World')),
      b.add(r, 'paused').onChange(function(a) {}),
      b.add(r, 'stepFrequency', 60, 600).step(60),
      b.add(r, 'gx', -100, 100).onChange(function(a) {
        isNaN(a) || E.gravity.set(a, r.gy, r.gz)
      }),
      b.add(r, 'gy', -100, 100).onChange(function(a) {
        isNaN(a) || E.gravity.set(r.gx, a, r.gz)
      }),
      b.add(r, 'gz', -100, 100).onChange(function(a) {
        isNaN(a) || E.gravity.set(r.gx, r.gy, a)
      }),
      b
        .add(r, 'quatNormalizeSkip', 0, 50)
        .step(1)
        .onChange(function(a) {
          isNaN(a) || (E.quatNormalizeSkip = a)
        }),
      b.add(r, 'quatNormalizeFast').onChange(function(a) {
        E.quatNormalizeFast = !!a
      }),
      (b = z.addFolder('Solver')),
      b
        .add(r, 'iterations', 1, 50)
        .step(1)
        .onChange(function(a) {
          E.solver.iterations = a
        }),
      b.add(r, 'k', 10, 1e7).onChange(function(a) {
        p.setGlobalSpookParams(r.k, r.d, 1 / r.stepFrequency)
      }),
      b
        .add(r, 'd', 0, 20)
        .step(0.1)
        .onChange(function(a) {
          p.setGlobalSpookParams(r.k, r.d, 1 / r.stepFrequency)
        }),
      b
        .add(r, 'tolerance', 0, 10)
        .step(0.01)
        .onChange(function(a) {
          E.solver.tolerance = a
        }),
      (u = z.addFolder('Scenes')),
      u.open())
    CAMERA_TEST_TRACKBALL &&
      ((controls = new THREE.TrackballControls(camera, renderer.domElement)),
      (controls.rotateSpeed = 1),
      (controls.zoomSpeed = 1.2),
      (controls.panSpeed = 0.2),
      (controls.noZoom = !1),
      (controls.noPan = !1),
      (controls.staticMoving = !1),
      (controls.dynamicDampingFactor = 0.3),
      (controls.minDistance = 0),
      (controls.maxDistance = 1e5),
      (controls.keys = [65, 83, 68]),
      (controls.screen.width = U),
      (controls.screen.height = V))
  })()
  b()
  s_oRender = h
  document.addEventListener('keypress', function(a) {
    if (a.keyCode)
      switch (a.keyCode) {
        case 32:
          g()
          break
        case 104:
          'none' == W.domElement.style.display
            ? ((W.domElement.style.display = 'block'), (R.style.display = 'block'))
            : ((W.domElement.style.display = 'none'), (R.style.display = 'none'))
          break
        case 97:
          r.aabbs = !r.aabbs
          c()
          break
        case 99:
          r.constraints = !r.constraints
          c()
          break
        case 112:
          r.paused = !r.paused
          c()
          break
        case 115:
          E.step(1 / r.stepFrequency)
          d()
          break
        case 109:
          a = T.indexOf(r.rendermode)
          a++
          a %= T.length
          e(T[a])
          c()
          break
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          x.length > a.keyCode - 49 &&
            !document.activeElement.localName.match(/input/) &&
            f(a.keyCode - 49)
      }
  })
}
CANNON.Demo.prototype = new CANNON.EventTarget()
CANNON.Demo.constructor = CANNON.Demo
CANNON.Demo.prototype.setGlobalSpookParams = function(m, c, e) {
  for (var g = this.world, a = 0; a < g.constraints.length; a++)
    for (var d = g.constraints[a], b = 0; b < d.equations.length; b++)
      d.equations[b].setSpookParams(m, c, e)
  for (a = 0; a < g.contactmaterials.length; a++)
    (e = g.contactmaterials[a]),
      (e.contactEquationStiffness = m),
      (e.frictionEquationStiffness = m),
      (e.contactEquationRelaxation = c),
      (e.frictionEquationRelaxation = c)
  g.defaultContactMaterial.contactEquationStiffness = m
  g.defaultContactMaterial.frictionEquationStiffness = m
  g.defaultContactMaterial.contactEquationRelaxation = c
  g.defaultContactMaterial.frictionEquationRelaxation = c
}
CANNON.Demo.prototype.createTransformControl = function(m, c) {
  controls = new THREE.TransformControls(camera, renderer.domElement)
  scene.add(m)
  controls.attach(m, c)
  scene.add(controls)
  console.log('CREATE')
  window.addEventListener('keydown', function(c) {
    switch (c.keyCode) {
      case 81:
        controls.setSpace('local' === controls.space ? 'world' : 'local')
        break
      case 17:
        controls.setTranslationSnap(100)
        controls.setRotationSnap(THREE.Math.degToRad(15))
        break
      case 87:
        controls.setMode('translate')
        break
      case 69:
        controls.setMode('rotate')
        break
      case 82:
        controls.setMode('scale')
        break
      case 187:
      case 107:
        controls.setSize(controls.size + 0.1)
        break
      case 189:
      case 109:
        controls.setSize(Math.max(controls.size - 0.1, 0.1))
    }
  })
  window.addEventListener('keyup', function(c) {
    switch (c.keyCode) {
      case 17:
        controls.setTranslationSnap(null), controls.setRotationSnap(null)
    }
  })
}
CANNON.Demo.prototype.getWorld = function() {
  return this.world
}
CANNON.Demo.prototype.addVisual = function(m, c) {
  var e
  m instanceof CANNON.Body && (e = this.shape2mesh(m, c))
  e &&
    (this.bodies.push(m),
    this.visuals.push(e),
    (m.visualref = e),
    (m.visualref.visualId = this.bodies.length - 1),
    this.scene.add(e))
  return e
}
CANNON.Demo.prototype.addVisuals = function(m) {
  for (var c = 0; c < m.length; c++) this.addVisual(m[c])
}
CANNON.Demo.prototype.removeVisual = function(m) {
  if (m.visualref) {
    for (var c = this.bodies, e = this.visuals, g = [], a = [], d = c.length, b = 0; b < d; b++)
      g.unshift(c.pop()), a.unshift(e.pop())
    d = m.visualref.visualId
    for (var l = 0; l < g.length; l++)
      l !== d &&
        ((b = l > d ? l - 1 : l),
        (c[b] = g[l]),
        (e[b] = a[l]),
        (c[b].visualref = g[l].visualref),
        (c[b].visualref.visualId = b))
    m.visualref.visualId = null
    this.scene.remove(m.visualref)
    m.visualref = null
  }
}
CANNON.Demo.prototype.removeAllVisuals = function() {
  for (; this.bodies.length; ) this.removeVisual(this.bodies[0])
}
CANNON.Demo.prototype.shape2mesh = function(m, c) {
  for (var e = new THREE.Object3D(), g = 0; g < m.shapes.length; g++) {
    var a = m.shapes[g]
    switch (a.type) {
      case CANNON.Shape.types.SPHERE:
        var d = new THREE.SphereGeometry(a.radius, 8, 8)
        a = void 0 === c ? new THREE.Mesh(d, this.currentMaterial) : new THREE.Mesh(d, c)
        a.castShadow = !0
        break
      case CANNON.Shape.types.PARTICLE:
        a = new THREE.Mesh(this.particleGeo, this.particleMaterial)
        d = this.settings
        a.scale.set(d.particleSize, d.particleSize, d.particleSize)
        break
      case CANNON.Shape.types.PLANE:
        var b = new THREE.PlaneGeometry(10, 10, 4, 4)
        a = new THREE.Object3D()
        d = new THREE.Object3D()
        b = void 0 === c ? new THREE.Mesh(b, this.currentMaterial) : new THREE.Mesh(b, c)
        b.scale.set(100, 100, 100)
        d.add(b)
        b.castShadow = !1
        b.receiveShadow = !0
        a.add(d)
        break
      case CANNON.Shape.types.BOX:
        d = new THREE.BoxGeometry(2 * a.halfExtents.x, 2 * a.halfExtents.y, 2 * a.halfExtents.z)
        a = void 0 === c ? new THREE.Mesh(d, this.currentMaterial) : new THREE.Mesh(d, c)
        break
      case CANNON.Shape.types.CONVEXPOLYHEDRON:
        b = new THREE.Geometry()
        for (d = 0; d < a.vertices.length; d++) {
          var l = a.vertices[d]
          b.vertices.push(new THREE.Vector3(l.x, l.y, l.z))
        }
        for (d = 0; d < a.faces.length; d++) {
          var k = a.faces[d],
            h = k[0]
          for (l = 1; l < k.length - 1; l++) b.faces.push(new THREE.Face3(h, k[l], k[l + 1]))
        }
        b.computeBoundingSphere()
        b.computeFaceNormals()
        a = void 0 === c ? new THREE.Mesh(b, this.currentMaterial) : new THREE.Mesh(b, c)
        break
      case CANNON.Shape.types.HEIGHTFIELD:
        b = new THREE.Geometry()
        k = new CANNON.Vec3()
        h = new CANNON.Vec3()
        var f = new CANNON.Vec3()
        for (l = 0; l < a.data.length - 1; l++)
          for (var q = 0; q < a.data[l].length - 1; q++)
            for (var n = 0; 2 > n; n++)
              a.getConvexTrianglePillar(l, q, 0 === n),
                k.copy(a.pillarConvex.vertices[0]),
                h.copy(a.pillarConvex.vertices[1]),
                f.copy(a.pillarConvex.vertices[2]),
                k.vadd(a.pillarOffset, k),
                h.vadd(a.pillarOffset, h),
                f.vadd(a.pillarOffset, f),
                b.vertices.push(
                  new THREE.Vector3(k.x, k.y, k.z),
                  new THREE.Vector3(h.x, h.y, h.z),
                  new THREE.Vector3(f.x, f.y, f.z),
                ),
                (d = b.vertices.length - 3),
                b.faces.push(new THREE.Face3(d, d + 1, d + 2))
        b.computeBoundingSphere()
        b.computeFaceNormals()
        a = void 0 === c ? new THREE.Mesh(b, this.currentMaterial) : new THREE.Mesh(b, c)
        break
      case CANNON.Shape.types.TRIMESH:
        b = new THREE.Geometry()
        k = new CANNON.Vec3()
        h = new CANNON.Vec3()
        f = new CANNON.Vec3()
        for (d = 0; d < a.indices.length / 3; d++)
          a.getTriangleVertices(d, k, h, f),
            b.vertices.push(
              new THREE.Vector3(k.x, k.y, k.z),
              new THREE.Vector3(h.x, h.y, h.z),
              new THREE.Vector3(f.x, f.y, f.z),
            ),
            (l = b.vertices.length - 3),
            b.faces.push(new THREE.Face3(l, l + 1, l + 2))
        b.computeBoundingSphere()
        b.computeFaceNormals()
        a = void 0 === c ? new THREE.Mesh(b, this.currentMaterial) : new THREE.Mesh(b, c)
        break
      default:
        throw 'Visual type not recognized: ' + a.type
    }
    a.receiveShadow = !0
    a.castShadow = !0
    if (a.children)
      for (d = 0; d < a.children.length; d++)
        if (((a.children[d].castShadow = !0), (a.children[d].receiveShadow = !0), a.children[d]))
          for (l = 0; l < a.children[d].length; l++)
            (a.children[d].children[l].castShadow = !0),
              (a.children[d].children[l].receiveShadow = !0)
    d = m.shapeOffsets[g]
    b = m.shapeOrientations[g]
    a.position.set(d.x, d.y, d.z)
    a.quaternion.set(b.x, b.y, b.z, b.w)
    e.add(a)
  }
  this.camera = function() {
    return camera
  }
  this.getScene = function() {
    return scene
  }
  return e
}
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
function CPreloader() {
  var m, c, e, g, a, d, b, l
  this._init = function() {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this)
    s_oSpriteLibrary.addSprite('bg_menu', './sprites/bg_menu.jpg')
    s_oSpriteLibrary.addSprite('progress_bar', './sprites/progress_bar.png')
    s_oSpriteLibrary.loadSprites()
    l = new createjs.Container()
    s_oStage.addChild(l)
  }
  this.unload = function() {
    l.removeAllChildren()
  }
  this.hide = function() {
    var a = this
    setTimeout(function() {
      createjs.Tween.get(b)
        .to({ alpha: 1 }, 500)
        .call(function() {
          a.unload()
          s_oMain.gotoMenu()
        })
    }, 1e3)
  }
  this._onImagesLoaded = function() {}
  this._onAllImagesLoaded = function() {
    this.attachSprites()
    s_oMain.preloaderReady()
  }
  this.attachSprites = function() {
    var k = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'))
    l.addChild(k)
    k = s_oSpriteLibrary.getSprite('progress_bar')
    a = createBitmap(k)
    a.x = CANVAS_WIDTH / 2 - k.width / 2
    a.y = CANVAS_HEIGHT - 200
    l.addChild(a)
    m = k.width
    c = k.height
    d = new createjs.Shape()
    d.graphics.beginFill('rgba(255,255,255,0.01)').drawRect(a.x, a.y, 1, c)
    l.addChild(d)
    a.mask = d
    e = new createjs.Text('', '30px ' + FONT_GAME, '#fff')
    e.x = CANVAS_WIDTH / 2
    e.y = CANVAS_HEIGHT - 200
    e.textBaseline = 'alphabetic'
    e.textAlign = 'center'
    l.addChild(e)
    g = new createjs.Text('', '30px ' + SECONDARY_FONT, '#fff')
    g.x = CANVAS_WIDTH + 200
    g.y = CANVAS_HEIGHT + 200
    g.textBaseline = 'alphabetic'
    g.textAlign = 'center'
    l.addChild(g)
    b = new createjs.Shape()
    b.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    b.alpha = 0
    l.addChild(b)
  }
  this.refreshLoader = function(b) {
    e.text = b + '%'
    g.text = b + '%'
    d.graphics.clear()
    b = Math.floor((b * m) / 100)
    d.graphics.beginFill('rgba(255,255,255,0.01)').drawRect(a.x, a.y, b, c)
  }
  this._init()
}
$(document).ready(function() {
  var oMain = new CMain({
    area_goal: [
      { id: 0, probability: 100 },
      { id: 1, probability: 80 },
      { id: 2, probability: 60 },
      { id: 3, probability: 80 },
      { id: 4, probability: 100 },
      { id: 5, probability: 75 },
      { id: 6, probability: 60 },
      { id: 7, probability: 50 },
      { id: 8, probability: 60 },
      { id: 9, probability: 75 },
      { id: 10, probability: 80 },
      { id: 11, probability: 65 },
      { id: 12, probability: 70 },
      { id: 13, probability: 65 },
      { id: 14, probability: 80 },
    ], //PROBABILITY AREA GOALS START TO LEFT UP TO RIGHT DOWN
    //0  1  2  3  4
    //5  6  7  8  9
    //10 11 12 13 14
    num_of_penalty: 5, //MAX NUMBER OF PENALTY FOR END GAME
    multiplier_step: 0.1, //INCREASE MULTIPLIER EVERY GOAL
    fullscreen: false, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
    check_orientation: false, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
  })

  if (isIOS()) {
    setTimeout(function() {
      sizeHandler()
    }, 200)
  } else {
    sizeHandler()
  }
})
function CHelpText(oParentContainer) {
  var _oParentContainer = oParentContainer
  var _oHelpText
  var _oHelpTextStroke
  var _oContainer

  this._init = function() {
    _oContainer = new createjs.Container()
    _oParentContainer.addChild(_oContainer)

    _oHelpText = new createjs.Text(TEXT_HELP, '42px ' + FONT_GAME, TEXT_COLOR)
    _oHelpText.x = CANVAS_WIDTH / 2
    _oHelpText.y = CANVAS_HEIGHT_HALF
    _oHelpText.textAlign = 'center'

    _oContainer.addChild(_oHelpText)

    _oHelpTextStroke = new createjs.Text(TEXT_HELP, '42px ' + FONT_GAME, TEXT_COLOR_STROKE)
    _oHelpTextStroke.x = CANVAS_WIDTH / 2
    _oHelpTextStroke.y = _oHelpText.y
    _oHelpTextStroke.textAlign = 'center'
    _oHelpTextStroke.outline = OUTLINE_WIDTH

    _oContainer.addChild(_oHelpTextStroke)
    _oContainer.alpha = 0
  }

  this.fadeAnim = function(fVal, oFunc) {
    createjs.Tween.get(_oContainer, { override: true })
      .to({ alpha: fVal }, MS_TIME_FADE_HELP_TEXT)
      .call(
        function() {
          if (oFunc !== null) {
            oFunc()
          }
        },
        null,
        this,
      )
  }

  this.unload = function() {
    createjs.Tween.removeTweens(_oContainer)
    _oParentContainer.removeChild(_oContainer)
  }

  this._init()

  return this
}
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
function CHandSwipeAnim(m, c, e, g) {
  var a,
    d,
    b = !1
  this._init = function(b) {
    d = new createjs.Container()
    a = createBitmap(b)
    a.x = m.x
    a.y = m.y
    a.regX = 0.5 * b.width
    a.regY = 0.5 * b.height
    a.alpha = 0
    g.addChild(d)
    d.addChild(a)
  }
  this.animAllSwipe = function() {
    b = !0
    var d = this
    createjs.Tween.get(a)
      .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
      .wait(0.3 * MS_TIME_SWIPE_END)
      .to({ alpha: 0 }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut)
    createjs.Tween.get(a)
      .to({ x: c[0].x, y: c[0].y }, MS_TIME_SWIPE_END, createjs.Ease.quartOut)
      .call(function() {
        a.x = m.x
        a.y = m.y
        createjs.Tween.get(a)
          .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
          .wait(0.3 * MS_TIME_SWIPE_END)
          .to({ alpha: 0 }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut)
        createjs.Tween.get(a)
          .to({ x: c[1].x, y: c[1].y }, MS_TIME_SWIPE_END, createjs.Ease.quartOut)
          .call(function() {
            a.x = m.x
            a.y = m.y
            createjs.Tween.get(a)
              .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
              .wait(0.3 * MS_TIME_SWIPE_END)
              .to({ alpha: 0 }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut)
            createjs.Tween.get(a)
              .to({ x: c[2].x, y: c[2].y }, MS_TIME_SWIPE_END, createjs.Ease.quartOut)
              .call(function() {
                a.x = m.x
                a.y = m.y
                d.animAllSwipe()
              })
          })
      })
  }
  this.fadeAnim = function(a) {
    createjs.Tween.get(d, { override: !0 }).to({ alpha: a }, 250)
  }
  this.isAnimate = function() {
    return b
  }
  this.setVisible = function(b) {
    a.visible = b
  }
  this.removeTweens = function() {
    createjs.Tween.removeTweens(a)
    b = !1
  }
  this._init(e)
  return this
}
function CScenario() {
  var m, c, e, g, a, d, b, l, k, h, f, q, n, p, u, r
  if (SHOW_3D_RENDER) var w = new CANNON.Demo()
  this.getDemo = function() {
    return w
  }
  this._init = function() {
    m = SHOW_3D_RENDER ? w.getWorld() : new CANNON.World()
    m.gravity.set(0, 0, -9.81)
    m.broadphase = new CANNON.NaiveBroadphase()
    m.solver.iterations = 50
    m.solver.tolerance = 1e-5
    c = new CANNON.Material()
    e = new CANNON.Material()
    g = new CANNON.Material()
    var a = new CANNON.ContactMaterial(e, g, {
        friction: 0.1,
        restitution: 0.01,
      }),
      b = new CANNON.ContactMaterial(e, c, { friction: 0.2, restitution: 0.3 })
    m.addContactMaterial(a)
    m.addContactMaterial(b)
    s_oScenario._createBallBody()
    s_oScenario._createFieldBody()
    s_oScenario._createGoal()
    s_oScenario.createBackGoalWall()
    SHOW_AREAS_GOAL
      ? s_oScenario.createAreasGoal()
      : s_oScenario.createAreaGoal(GOAL_LINE_POS, BACK_WALL_GOAL_SIZE, COLOR_AREA_GOAL[0], null)
  }
  this.createAreasGoal = function() {
    for (
      var a = 0, b = FIRST_AREA_GOAL_POS.x, c = FIRST_AREA_GOAL_POS.z, d = 0;
      d < NUM_AREA_GOAL.h;
      d++
    ) {
      for (var e = 0; e < NUM_AREA_GOAL.w; e++)
        s_oScenario.createAreaGoal(
          {
            x: b,
            y: FIRST_AREA_GOAL_POS.y,
            z: c,
          },
          AREA_GOAL_PROPERTIES,
          COLOR_AREA_GOAL[a],
          AREAS_INFO[a],
        ),
          (b += 2 * AREA_GOAL_PROPERTIES.width),
          a++
      b = FIRST_AREA_GOAL_POS.x
      c -= 2 * AREA_GOAL_PROPERTIES.height
    }
  }
  this._createFieldBody = function() {
    l = new CANNON.Plane()
    k = new CANNON.Body({ mass: 0, material: c })
    k.addShape(l)
    k.position.z = -9
    k.addEventListener('collide', function(a) {
      s_oScenario.fieldCollision()
    })
    m.addBody(k)
    if (SHOW_3D_RENDER) {
      var a = new THREE.MeshPhongMaterial({
        color: 5803568,
        specular: 1118481,
        shininess: 10,
      })
      w.addVisual(k, a)
    }
  }
  this._createGoal = function() {
    h = new CANNON.Cylinder(
      POLE_RIGHT_LEFT_SIZE.radius_top,
      POLE_RIGHT_LEFT_SIZE.radius_bottom,
      POLE_RIGHT_LEFT_SIZE.height,
      POLE_RIGHT_LEFT_SIZE.segments,
    )
    q = new CANNON.Body({ mass: 0 })
    f = new CANNON.Cylinder(
      POLE_UP_SIZE.radius_top,
      POLE_UP_SIZE.radius_bottom,
      POLE_UP_SIZE.height,
      POLE_UP_SIZE.segments,
    )
    var a = new CANNON.Quaternion()
    a.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
    f.transformAllPoints(new CANNON.Vec3(), a)
    q.addShape(h, new CANNON.Vec3(0.5 * POLE_UP_SIZE.height, 0, 0))
    q.addShape(h, new CANNON.Vec3(0.5 * -POLE_UP_SIZE.height, 0, 0))
    q.addShape(f, new CANNON.Vec3(0, 0, 0.5 * POLE_RIGHT_LEFT_SIZE.height))
    q.position.set(
      BACK_WALL_GOAL_POSITION.x,
      BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth,
      BACK_WALL_GOAL_POSITION.z,
    )
    q.addEventListener('collide', function(a) {
      s_oScenario.poleCollision()
    })
    m.addBody(q)
    SHOW_3D_RENDER &&
      ((a = new THREE.MeshPhongMaterial({
        color: 16777215,
        specular: 1118481,
        shininess: 50,
      })),
      w.addVisual(q, a))
  }
  this.createBackGoalWall = function() {
    n = new CANNON.Box(
      new CANNON.Vec3(
        BACK_WALL_GOAL_SIZE.width,
        BACK_WALL_GOAL_SIZE.depth,
        BACK_WALL_GOAL_SIZE.height,
      ),
    )
    p = new CANNON.Box(
      new CANNON.Vec3(
        LEFT_RIGHT_WALL_GOAL_SIZE.width,
        LEFT_RIGHT_WALL_GOAL_SIZE.depth,
        LEFT_RIGHT_WALL_GOAL_SIZE.height,
      ),
    )
    u = new CANNON.Box(
      new CANNON.Vec3(UP_WALL_GOAL_SIZE.width, UP_WALL_GOAL_SIZE.depth, UP_WALL_GOAL_SIZE.height),
    )
    r = new CANNON.Body({ mass: 0, material: g })
    r.addShape(n)
    r.addShape(p, new CANNON.Vec3(BACK_WALL_GOAL_SIZE.width, 0, 0))
    r.addShape(p, new CANNON.Vec3(-BACK_WALL_GOAL_SIZE.width, 0, 0))
    r.addShape(u, new CANNON.Vec3(0, 0, BACK_WALL_GOAL_SIZE.height))
    r.position.set(BACK_WALL_GOAL_POSITION.x, BACK_WALL_GOAL_POSITION.y, BACK_WALL_GOAL_POSITION.z)
    m.addBody(r)
    SHOW_3D_RENDER && w.addVisual(r)
  }
  this.createAreaGoal = function(a, b, c, d) {
    b = new CANNON.Box(new CANNON.Vec3(b.width, b.depth, b.height))
    d = new CANNON.Body({ mass: 0, userData: d })
    d.addShape(b)
    d.position.set(a.x, a.y, a.z)
    d.collisionResponse = 0
    d.addEventListener('collide', function(a) {
      s_oScenario.lineGoalCollision(a)
    })
    m.addBody(d)
    SHOW_3D_RENDER &&
      ((a = new THREE.MeshPhongMaterial({
        color: c,
        specular: 1118481,
        shininess: 70,
      })),
      w.addVisual(d, a))
    return d
  }
  this._createBallBody = function() {
    a = new CANNON.Sphere(BALL_RADIUS)
    d = new CANNON.Body({
      mass: BALL_MASS,
      material: e,
      linearDamping: BALL_LINEAR_DAMPING,
      angularDamping: 2 * BALL_LINEAR_DAMPING,
    })
    var c = new CANNON.Vec3(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z)
    d.position.copy(c)
    d.addShape(a)
    m.add(d)
    SHOW_3D_RENDER &&
      ((c = new THREE.MeshPhongMaterial({
        color: 16777215,
        specular: 1118481,
        shininess: 70,
      })),
      (b = w.addVisual(d, c)))
  }
  this.addImpulse = function(a, b) {
    var c = new CANNON.Vec3(0, 0, BALL_RADIUS),
      d = new CANNON.Vec3(b.x, b.y, b.z)
    a.applyImpulse(d, c)
  }
  this.addForce = function(a, b) {
    var c = new CANNON.Vec3(0, 0, 0),
      d = new CANNON.Vec3(b.x, b.y, b.z)
    a.applyForce(d, c)
  }
  this.getBodyVelocity = function(a) {
    return a.velocity
  }
  this.ballBody = function() {
    return d
  }
  this.ballMesh = function() {
    return b
  }
  this.getCamera = function() {
    return w.camera()
  }
  this.fieldCollision = function() {
    s_oGame.fieldCollision()
    s_oGame.ballFadeForReset()
  }
  this.setElementAngularVelocity = function(a, b) {
    a.angularVelocity.set(b.x, b.y, b.z)
  }
  this.setElementVelocity = function(a, b) {
    var c = new CANNON.Vec3(b.x, b.y, b.z)
    a.velocity = c
  }
  this.setElementLinearDamping = function(a, b) {
    a.linearDamping = b
  }
  this.getFieldBody = function() {
    return k
  }
  this.lineGoalCollision = function(a) {
    s_oGame.areaGoal(a.contact.bj.userData)
  }
  this.update = function() {
    m.step(PHYSICS_STEP)
  }
  this.getGoalBody = function() {
    return q
  }
  this.poleCollision = function() {
    s_oGame.poleCollide()
  }
  this.destroyWorld = function() {
    for (var a = m.bodies, b = 0; b < a.length; b++) m.remove(a[b])
    m = null
  }
  s_oScenario = this
  SHOW_3D_RENDER ? (w.addScene('Test', this._init), w.start()) : this._init()
}
function CGame(m) {
  var c,
    e,
    g,
    a,
    d,
    b = null,
    l,
    k,
    h,
    f,
    q,
    n = null,
    p,
    u,
    r = !1,
    w = !1,
    t = !1,
    v = !1,
    x = !1,
    z = !1,
    C = !1,
    A = !1,
    D = !1,
    G,
    B,
    J = 0,
    O = 0,
    M = 0,
    K,
    H,
    L,
    F,
    y,
    N,
    I = STATE_INIT,
    P = null
  this._init = function() {
    $(s_oMain).trigger('start_session')
    this.pause(!0)
    $(s_oMain).trigger('start_level', 1)
    G = 0
    F = 1
    y = []
    l = new createjs.Container()
    s_oStage.addChild(l)
    e = createBitmap(s_oSpriteLibrary.getSprite('bg_game'))
    e.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    l.addChild(e)
    g = new CScenario(1)
    P = SHOW_3D_RENDER ? camera : createOrthoGraphicCamera()
    var h = s_oSpriteLibrary.getSprite('goal')
    u = new CGoal(291, 28, h, l)
    b = new CGoalKeeper(CANVAS_WIDTH_HALF - 100, CANVAS_HEIGHT_HALF - 225, l)
    y.push(b)
    h = s_oSpriteLibrary.getSprite('ball')
    a = new CBall(0, 0, h, g.ballBody(), l)
    y.push(a)
    this.ballPosition()
    a.setVisible(!1)
    L = MS_TIME_SWIPE_START
    d = new CStartBall(CANVAS_WIDTH_HALF + 55, CANVAS_HEIGHT_HALF + 168, l)
    q = new CPlayer(CANVAS_WIDTH_HALF - 150, CANVAS_HEIGHT_HALF - 320, l)
    q.setVisible(!1)
    h = 'cursor'
    s_bMobile ? ((h = 'hand_touch'), (TIME_SWIPE = 650)) : (TIME_SWIPE = 500)
    p = new CHandSwipeAnim(
      START_HAND_SWIPE_POS,
      END_HAND_SWIPE_POS,
      s_oSpriteLibrary.getSprite(h),
      s_oStage,
    )
    p.animAllSwipe()
    resizeCanvas3D()
    c = new CInterface()
    c.refreshTextScoreBoard(0, 0, 0, !1)
    c.refreshLaunchBoard(J, NUM_OF_PENALTY)
    N = new CANNON.Vec3(0, 0, 0)
    this.onExitHelp()
  }
  this.createControl = function() {
    SHOW_3D_RENDER
      ? (window.addEventListener('mousedown', this.onMouseDown),
        window.addEventListener('mousemove', this.onPressMove),
        window.addEventListener('mouseup', this.onPressUp))
      : ((f = new createjs.Shape()),
        f.graphics.beginFill('rgba(255,0,0,0.01)').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT),
        l.addChild(f),
        f.on('mousedown', this.onMouseDown),
        f.on('pressmove', this.onPressMove),
        f.on('pressup', this.onPressUp))
  }
  this.sortDepth = function(b, a) {
    b.getDepthPos() > a.getDepthPos()
      ? l.getChildIndex(b.getObject()) > l.getChildIndex(a.getObject()) &&
        l.swapChildren(b.getObject(), a.getObject())
      : b.getDepthPos() < a.getDepthPos() &&
        l.getChildIndex(a.getObject()) > l.getChildIndex(b.getObject()) &&
        l.swapChildren(a.getObject(), b.getObject())
  }
  this.onExitHelp = function() {
    this.createControl()
    this.pause(!1)
  }
  this.poleCollide = function() {
    H = TIME_POLE_COLLISION_RESET
    D = !0
  }
  this.fieldCollision = function() {}
  this.ballPosition = function() {
    var b = g.ballBody(),
      d = this.convert3dPosTo2dScreen(b.position, P),
      c = d.z * (BALL_SCALE_FACTOR - a.getStartScale()) + a.getStartScale()
    a.setPosition(d.x, d.y)
    a.scale(c)
    this.refreshShadowCast(a, b, c)
  }
  this.onMouseDown = function(b) {
    w ||
      ((L = MS_TIME_SWIPE_START),
      p.removeTweens(),
      p.setVisible(!1),
      (k = { x: s_oStage.mouseX, y: s_oStage.mouseY }))
  }
  this.onPressMove = function() {
    h = { x: s_oStage.mouseX, y: s_oStage.mouseY }
    M += s_iTimeElaps
  }
  this.onPressUp = function() {
    if (!(w || k.y < h.y || (0 === h.x && 0 === h.y))) {
      var b = Math.ceil(distanceV2(k, h)) * FORCE_RATE
      b > FORCE_MAX && (b = FORCE_MAX)
      if (M > TIME_SWIPE) M = 0
      else {
        var a = new CVector2(k.x - h.x, k.y - h.y)
        a.scalarProduct(b)
        b = a.length()
        b > HIT_BALL_MIN_FORCE &&
          (b > HIT_BALL_MAX_FORCE && (a.normalize(), a.scalarProduct(HIT_BALL_MAX_FORCE)),
          (x = !0),
          q.setVisible(!0),
          (b = M / 10),
          b > MAX_FORCE_Y ? (b = MAX_FORCE_Y) : b < MIN_FORCE_Y && (b = MIN_FORCE_Y),
          N.set(-a.getX() * FORCE_MULTIPLIER_AXIS.x, b, a.getY() * FORCE_MULTIPLIER_AXIS.z),
          (A = s_oGame.goalProbability()))
        h.x = 0
        h.y = 0
      }
    }
  }
  this.refreshShadowCast = function(b, a, d) {
    var c = g.getFieldBody()
    if (a.position.z < c.position.z) b.scaleShadow(0)
    else {
      var h = this.convert3dPosTo2dScreen({ x: a.position.x, y: a.position.y, z: c.position.z }, P)
      a =
        (a.position.z - BALL_RADIUS) * (c.position.z - SHADOWN_FACTOR - c.position.z) + c.position.z
      d *= a
      b.scaleShadow(d)
      0 > d || (b.setAlphaByHeight(a), b.setPositionShadow(h.x, h.y))
    }
  }
  this.addScore = function(b, a) {
    G += b
    c.refreshTextScoreBoard(G, F.toFixed(1), a, !0)
  }
  this.getLevel = function() {
    return 1
  }
  this.unload = function() {
    s_oStage.removeAllChildren()
    c.unload()
    f.removeAllEventListeners()
    g.destroyWorld()
    g = null
  }
  this.resetValues = function() {
    G = 0
    c.refreshTextScoreBoard(0, 0, 0, !1)
    J = 0
    F = 1
    c.refreshLaunchBoard(J, NUM_OF_PENALTY)
  }
  this.wallSoundCollision = function() {}
  this.areaGoal = function() {
    r ||
      C ||
      (A
        ? ((r = !0), (K = TIME_RESET_AFTER_GOAL), this.textGoal(), this.calculateScore())
        : this.goalKeeperSave())
  }
  this.goalKeeperSave = function() {
    C = !0
    K = TIME_RESET_AFTER_SAVE
    c.createAnimText(TEXT_SAVED, 80, !1, TEXT_COLOR_1, TEXT_COLOR_STROKE)
    this.rejectBall()
    F = 1
    O = 0
  }
  this.rejectBall = function() {
    a.getPhysics().velocity.negate(a.getPhysics().velocity)
    switch (B) {
      case 12:
        a.getPhysics().velocity = a
          .getPhysics()
          .velocity.vadd(
            new CANNON.Vec3(
              0.4 * a.getPhysics().velocity.x,
              0.4 * a.getPhysics().velocity.y,
              0.4 * a.getPhysics().velocity.z,
            ),
          )
        break
      default:
        a.getPhysics().velocity.vsub(new CANNON.Vec3(0, 50, 0))
    }
  }
  this.calculateScore = function() {
    var b = MAX_PERCENT_PROBABILITY - (MAX_PERCENT_PROBABILITY - AREAS_INFO[B].probability)
    this.addScore(b * F, b)
    F += MULTIPLIER_STEP
  }
  this.goalProbability = function() {
    B = -1
    for (var b = 0; b < CALCULATE_PROBABILITY.length; b++)
      N.z < CALCULATE_PROBABILITY[b].zMax &&
        N.z > CALCULATE_PROBABILITY[b].zMin &&
        N.x < CALCULATE_PROBABILITY[b].xMax &&
        N.x > CALCULATE_PROBABILITY[b].xMin &&
        (B = b)
    if (-1 === B) return !1
    var a = []
    for (b = 0; b < MAX_PERCENT_PROBABILITY; b++) a.push(!1)
    for (b = 0; b < AREAS_INFO[B].probability; b++) a[b] = !0
    return a[Math.floor(Math.random() * a.length)]
  }
  this.addImpulseToBall = function(b) {
    if (!w && I === STATE_PLAY) {
      var c = g.ballBody()
      g.addImpulse(c, b)
      g.setElementAngularVelocity(c, { x: 0, y: 0, z: 0 })
      w = !0
      a.setVisible(!0)
      d.setVisible(!1)
      this.chooseDirectionGoalKeeper(b)
    }
  }
  this.chooseDirectionGoalKeeper = function(a) {
    if (A)
      switch (((a = b.getAnimType()), B)) {
        case 2:
        case 7:
        case 12:
          this.chooseWrongDirGK(ANIM_GOAL_KEEPER_FAIL_ALT)
          break
        default:
          this.chooseWrongDirGK(ANIM_GOAL_KEEPER_FAIL, a)
      }
    else
      switch (B) {
        case -1:
          a.x < GOAL_KEEPER_TOLLERANCE_LEFT
            ? b.runAnim(LEFT)
            : a.y > GOAL_KEEPER_TOLLERANCE_RIGHT && b.runAnim(RIGHT)
          break
        default:
          b.runAnim(AREA_GOALS_ANIM[B])
      }
    z = !0
  }
  this.chooseWrongDirGK = function(a) {
    for (var d = Math.floor(Math.random() * a.length); d === AREA_GOALS_ANIM[B]; )
      d = Math.floor(Math.random() * a.length)
    b.runAnim(a[d])
  }
  this.pause = function(b) {
    I = b ? STATE_PAUSE : STATE_PLAY
    createjs.Ticker.paused = b
  }
  this.onExit = function() {
    this.unload()
    $(s_oMain).trigger('show_interlevel_ad')
    $(s_oMain).trigger('end_session')
    s_oMain.gotoMenu()
  }
  this.restartLevel = function() {
    this.resetValues()
    this.resetScene()
    I = STATE_PLAY
    this.startOpponentShot()
    $(s_oMain).trigger('restart_level', 1)
  }
  this.resetBallPosition = function() {
    var b = g.ballBody()
    b.position.set(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z)
    g.setElementVelocity(b, { x: 0, y: 0, z: 0 })
    g.setElementAngularVelocity(b, { x: 0, y: 0, z: 0 })
    a.fadeAnimation(1, 500, 0)
    a.setVisible(!1)
    d.setVisible(!0)
    d.setAlpha(0)
    d.fadeAnim(1, 500, 0)
  }
  this.ballFadeForReset = function() {
    C && r && t && !v && (a.fadeAnimation(0, 300, 10), (v = !0))
  }
  this._updateInit = function() {
    g.update()
    this._updateBall2DPosition()
    I = STATE_PLAY
  }
  this.convert2dScreenPosTo3d = function(b) {
    b = new THREE.Vector3(
      (b.x / s_iCanvasResizeWidth) * 2 - 1,
      2 * -(b.y / s_iCanvasResizeHeight) + 1,
      -1,
    )
    b.unproject(P)
    b.sub(P.position)
    b.normalize()
    b.multiply(new THREE.Vector3(0, 1, 0))
    return b
  }
  this.convert3dPosTo2dScreen = function(b, a) {
    var d = new THREE.Vector3(b.x, b.y, b.z).project(a),
      c = 0.5 * Math.floor(s_iCanvasResizeWidth),
      h = 0.5 * Math.floor(s_iCanvasResizeHeight)
    d.x = (d.x * c + c) * s_fInverseScaling
    d.y = (-(d.y * h) + h) * s_fInverseScaling
    return d
  }
  this.timeReset = function() {
    0 < K ? (K -= s_iTimeElaps) : this.endTurn()
  }
  this.restartGame = function() {
    this.resetValues()
    this.resetScene()
    I = STATE_PLAY
    w = !1
  }
  this.endTurn = function() {
    J++
    c.refreshLaunchBoard(J, NUM_OF_PENALTY)
    J < NUM_OF_PENALTY
      ? (this.resetScene(), (w = !1), (L = MS_TIME_SWIPE_START))
      : ((I = STATE_FINISH),
        G > s_iBestScore &&
          ((s_iBestScore = Math.floor(G)),
          saveItem(LOCALSTORAGE_STRING[LOCAL_BEST_SCORE], Math.floor(G))),
        c.createWinPanel(Math.floor(G)),
        $(s_oMain).trigger('end_level', 1))
  }
  this.textGoal = function() {
    if (O < TEXT_CONGRATULATION.length) {
      var b = !1
      O >= TEXT_CONGRATULATION.length - 1 && (b = !0)
      c.createAnimText(TEXT_CONGRATULATION[O], TEXT_SIZE[O], b, TEXT_COLOR, TEXT_COLOR_STROKE)
      O++
    } else {
      b = !1
      var a = Math.floor(Math.random() * (TEXT_CONGRATULATION.length - 1)) + 1
      a >= TEXT_CONGRATULATION.length - 1 && (b = !0)
      c.createAnimText(TEXT_CONGRATULATION[a], TEXT_SIZE[a], b, TEXT_COLOR, TEXT_COLOR_STROKE)
    }
  }
  this.goalAnimation = function(b) {
    b > FORCE_BALL_DISPLAY_SHOCK[0].min && b < FORCE_BALL_DISPLAY_SHOCK[0].max
      ? this.displayShock(
          INTENSITY_DISPLAY_SHOCK[0].time,
          INTENSITY_DISPLAY_SHOCK[0].x,
          INTENSITY_DISPLAY_SHOCK[0].y,
        )
      : b > FORCE_BALL_DISPLAY_SHOCK[1].min && b < FORCE_BALL_DISPLAY_SHOCK[1].max
        ? this.displayShock(
            INTENSITY_DISPLAY_SHOCK[1].time,
            INTENSITY_DISPLAY_SHOCK[1].x,
            INTENSITY_DISPLAY_SHOCK[1].y,
          )
        : b > FORCE_BALL_DISPLAY_SHOCK[2].min && b < FORCE_BALL_DISPLAY_SHOCK[2].max
          ? this.displayShock(
              INTENSITY_DISPLAY_SHOCK[2].time,
              INTENSITY_DISPLAY_SHOCK[2].x,
              INTENSITY_DISPLAY_SHOCK[2].y,
            )
          : b > FORCE_BALL_DISPLAY_SHOCK[3].min &&
            this.displayShock(
              INTENSITY_DISPLAY_SHOCK[3].time,
              INTENSITY_DISPLAY_SHOCK[3].x,
              INTENSITY_DISPLAY_SHOCK[3].y,
            )
  }
  this.displayShock = function(b, a, d) {
    createjs.Tween.get(l)
      .to({ x: Math.round(Math.random() * a), y: Math.round(Math.random() * d) }, b)
      .call(function() {
        createjs.Tween.get(l)
          .to(
            {
              x: Math.round(Math.random() * a * 0.8),
              y: -Math.round(Math.random() * d * 0.8),
            },
            b,
          )
          .call(function() {
            createjs.Tween.get(l)
              .to(
                {
                  x: Math.round(Math.random() * a * 0.6),
                  y: Math.round(Math.random() * d * 0.6),
                },
                b,
              )
              .call(function() {
                createjs.Tween.get(l)
                  .to(
                    {
                      x: Math.round(Math.random() * a * 0.4),
                      y: -Math.round(Math.random() * d * 0.4),
                    },
                    b,
                  )
                  .call(function() {
                    createjs.Tween.get(l)
                      .to(
                        {
                          x: Math.round(Math.random() * a * 0.2),
                          y: Math.round(Math.random() * d * 0.2),
                        },
                        b,
                      )
                      .call(function() {
                        createjs.Tween.get(l)
                          .to({ y: 0, x: 0 }, b)
                          .call(function() {})
                      })
                  })
              })
          })
      })
  }
  this.resetScene = function() {
    v = D = A = C = t = r = !1
    b.setAlpha(0)
    b.fadeAnimation(1)
    b.runAnim(IDLE)
    this.resetBallPosition()
    this.sortDepth(a, u)
  }
  this._onEnd = function() {
    this.onExit()
  }
  this.swapChildrenIndex = function() {
    for (var b = 0; b < y.length - 1; b++)
      for (var a = b + 1; a < y.length; a++)
        y[b].getObject().visible && y[a].getObject().visible && this.sortDepth(y[b], y[a])
  }
  this.ballOut = function() {
    if (!t && !r && !C) {
      var b = a.getPhysics().position
      if (b.y > BALL_OUT_Y || b.x > BACK_WALL_GOAL_SIZE.width || b.x < -BACK_WALL_GOAL_SIZE.width)
        (t = !0),
          (K = TIME_RESET_AFTER_BALL_OUT),
          c.createAnimText(TEXT_BALL_OUT, 90, !1, TEXT_COLOR_1, TEXT_COLOR_STROKE),
          (F = 1),
          (O = 0)
    }
  }
  this.animPlayer = function() {
    x
      ? ((x = q.animPlayer()),
        q.getFrame() === SHOOT_FRAME &&
          (this.addImpulseToBall({ x: N.x, y: N.y, z: N.z }),
          (M = 0),
          this.goalAnimation(N.y),
          c.unloadHelpText()))
      : q.setVisible(!1)
  }
  this.animGoalKeeper = function() {
    w
      ? z &&
        ((z = b.update()),
        z ||
          (b.viewFrame(b.getAnimArray(), b.getAnimArray().length - 1),
          b.hideFrame(b.getAnimArray(), 0),
          b.fadeAnimation(0)))
      : b.update()
  }
  this.resetPoleCollision = function() {
    0 < H
      ? (H -= s_iTimeElaps)
      : (r && C) ||
        (c.createAnimText(TEXT_BALL_OUT, 80, !1, TEXT_COLOR_1, TEXT_COLOR_STROKE),
        (F = 1),
        (O = 0),
        this.endTurn(),
        (H = TIME_POLE_COLLISION_RESET))
  }
  this.handSwipeAnim = function() {
    p.isAnimate() ||
      w ||
      (0 < L
        ? (L -= s_iTimeElaps)
        : (p.animAllSwipe(), p.setVisible(!0), (L = MS_TIME_SWIPE_START)))
  }
  this.swapGoal = function() {
    a.getPhysics().position.z > GOAL_SPRITE_SWAP_Z && this.sortDepth(a, u)
  }
  this._updatePlay = function() {
    for (var b = 0; b < PHYSICS_ACCURACY; b++) g.update()
    this.ballOut()
    r || t || C ? this.timeReset() : D && this.resetPoleCollision()
    this.animGoalKeeper()
    this.animPlayer()
    this._updateBall2DPosition()
    this.handSwipeAnim()
    this.swapChildrenIndex()
    this.swapGoal()
  }
  this.update = function() {
    switch (I) {
      case STATE_INIT:
        this._updateInit()
        break
      case STATE_PLAY:
        this._updatePlay()
    }
  }
  this._updateBall2DPosition = function() {
    this.ballPosition()
    a.rolls()
    P.updateProjectionMatrix()
    P.updateMatrixWorld()
  }
  s_oGame = this
  AREAS_INFO = m.area_goal
  NUM_OF_PENALTY = m.num_of_penalty
  MULTIPLIER_STEP = m.multiplier_step
  this._init()
}
function CStartBall(m, c, e) {
  var g
  this._init = function() {
    var a = s_oSpriteLibrary.getSprite('start_ball')
    g = createBitmap(a)
    g.regX = 0.5 * a.width
    g.regY = 0.5 * a.height
    this.setPosition(m, c)
    e.addChild(g)
  }
  this.setPosition = function(a, c) {
    g.x = a
    g.y = c
  }
  this.fadeAnim = function(a, c, b) {
    createjs.Tween.get(g, { override: !0 })
      .wait(b)
      .to({ alpha: a }, c)
  }
  this.setAlpha = function(a) {
    g.alpha = a
  }
  this.setVisible = function(a) {
    g.visible = a
  }
  this._init()
  return this
}
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
var CANVAS_WIDTH = 1360,
  CANVAS_HEIGHT = 640,
  CANVAS_WIDTH_HALF = 0.5 * CANVAS_WIDTH,
  CANVAS_HEIGHT_HALF = 0.5 * CANVAS_HEIGHT,
  EDGEBOARD_X = 250,
  EDGEBOARD_Y = 20,
  DISABLE_SOUND_MOBILE = 1,
  FONT_GAME = 'blackplotanregular',
  SECONDARY_FONT = 'blackplotanregular',
  FPS = 30,
  FPS_DESKTOP = 60,
  FPS_TIME = 1 / FPS,
  ROLL_BALL_RATE = 60 / FPS,
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 1,
  STATE_GAME = 3,
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_DRAG_START = 4,
  ON_DRAG_END = 5,
  ON_TWEEN_ENDED = 6,
  ON_BUT_NO_DOWN = 7,
  ON_BUT_YES_DOWN = 8,
  STEP_RATE = 1.5,
  TEXT_SIZE = [80, 100, 130],
  LOCAL_BEST_SCORE = 0,
  START_HAND_SWIPE_POS = { x: CANVAS_WIDTH_HALF, y: CANVAS_HEIGHT_HALF + 200 },
  END_HAND_SWIPE_POS = [
    { x: CANVAS_WIDTH_HALF - 250, y: CANVAS_HEIGHT_HALF - 200 },
    { x: CANVAS_WIDTH_HALF, y: CANVAS_HEIGHT_HALF - 200 },
    { x: CANVAS_WIDTH_HALF + 250, y: CANVAS_HEIGHT_HALF - 200 },
  ],
  MS_TIME_SWIPE_END = 1e3,
  MS_TIME_SWIPE_START = 3e3,
  MS_TIME_FADE_HELP_TEXT = 500,
  LOCALSTORAGE_STRING = ['penalty_best_score'],
  TEXT_EXCELLENT_COLOR = ['#fff', '#5d96fe'],
  TEXT_COLOR = '#ffffff',
  TEXT_COLOR_1 = '#ff2222',
  TEXT_COLOR_STROKE = '#002a59',
  OUTLINE_WIDTH = 1.5,
  TIME_INTERVAL_STROBE = 0.2,
  PHYSICS_ACCURACY = 3,
  MOBILE_OFFSET_GLOVES_X = -100,
  BALL_VELOCITY_MULTIPLIER = 1,
  PHYSICS_STEP = 1 / (FPS * STEP_RATE),
  MS_WAIT_SHOW_GAME_OVER_PANEL = 250,
  STATE_INIT = 0,
  STATE_PLAY = 1,
  STATE_FINISH = 2,
  STATE_PAUSE = 3,
  IDLE = 0,
  RIGHT = 1,
  LEFT = 2,
  CENTER_DOWN = 3,
  CENTER_UP = 4,
  LEFT_DOWN = 5,
  RIGHT_DOWN = 6,
  ANIM_GOAL_KEEPER_FAIL = [LEFT, RIGHT, CENTER_DOWN, CENTER_UP, LEFT_DOWN, RIGHT_DOWN],
  ANIM_GOAL_KEEPER_FAIL_ALT = [LEFT, RIGHT, LEFT_DOWN, RIGHT_DOWN],
  NUM_SPRITE_PLAYER = 31,
  SPRITE_NAME_GOALKEEPER = 'gk_idle_ gk_save_right_ gk_save_left_ gk_save_center_down_ gk_save_center_up_ gk_save_down_left_ gk_save_down_right'.split(
    ' ',
  ),
  NUM_SPRITE_GOALKEEPER = [24, 34, 34, 51, 25, 34, 34],
  OFFSET_CONTAINER_GOALKEEPER = [
    { x: 0, y: 0 },
    { x: 15, y: -29 },
    { x: -360, y: -29 },
    { x: -15, y: -15 },
    { x: -20, y: -85 },
    { x: -355, y: 20 },
    { x: 21, y: 20 },
  ],
  BALL_MASS = 0.5,
  BALL_RADIUS = 0.64,
  BALL_LINEAR_DAMPING = 0.2,
  OBJECT,
  TIME_TRY_TO_SHOT_BALL_OPPONENT = 0.7,
  START_POS_FLAG = { x: 277, y: 268 },
  FLAG_ADDED_POS = { x: 61, y: 69 },
  FLAG_LIMIT_POS_X = 690,
  TOT_TEAM = 32,
  MIN_BALL_VEL_ROTATION = 0.1,
  TIME_RESET_AFTER_GOAL = 1e3,
  SHOOT_FRAME = 7,
  HAND_KEEPER_ANGLE_RATE = 0.15,
  TIME_POLE_COLLISION_RESET = 1e3,
  LIMIT_HAND_RANGE_POS = {
    x: 16.8,
    zMax: 3.1,
    zMin: -8.5,
  },
  BACK_WALL_GOAL_SIZE = { width: 20.5, depth: 1, height: 7.5 },
  LEFT_RIGHT_WALL_GOAL_SIZE = { width: 0.1, depth: 25, height: 7.5 },
  UP_WALL_GOAL_SIZE = { width: 20.5, depth: 25, height: 0.1 },
  BACK_WALL_GOAL_POSITION = { x: 0, y: 155, z: -2.7 },
  GOAL_LINE_POS = {
    x: 0,
    y: BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth + 2,
    z: BACK_WALL_GOAL_POSITION.z,
  },
  POSITION_BALL = { x: 0.05, y: 15.4, z: -9 + BALL_RADIUS },
  NUM_AREA_GOAL = { h: 3, w: 5 },
  AREA_GOALS_ANIM = [
    LEFT,
    LEFT,
    CENTER_UP,
    RIGHT,
    RIGHT,
    LEFT,
    LEFT,
    CENTER_UP,
    RIGHT,
    RIGHT,
    LEFT_DOWN,
    LEFT_DOWN,
    CENTER_DOWN,
    RIGHT_DOWN,
    RIGHT_DOWN,
  ],
  GOAL_SPRITE_SWAP_Y = GOAL_LINE_POS.y,
  GOAL_SPRITE_SWAP_Z = BACK_WALL_GOAL_POSITION.z + LEFT_RIGHT_WALL_GOAL_SIZE.height,
  BALL_OUT_Y = BACK_WALL_GOAL_POSITION.y + 3,
  BUFFER_ANIM_PLAYER = FPS,
  MS_EFFECT_ADD = 1500,
  MS_ROLLING_SCORE = 500,
  MAX_PERCENT_PROBABILITY = 100,
  GOAL_KEEPER_TOLLERANCE_LEFT = -4,
  GOAL_KEEPER_TOLLERANCE_RIGHT = 4,
  TIME_RESET_AFTER_BALL_OUT = 250,
  TIME_RESET_AFTER_SAVE = 500,
  AREA_GOAL_PROPERTIES = { width: 4, depth: 1, height: 2.4 },
  FIRST_AREA_GOAL_POS = {
    x: -14 - 0.5 * AREA_GOAL_PROPERTIES.width,
    y: BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth + 1.1,
    z: 3.1 - 0.5 * AREA_GOAL_PROPERTIES.height,
  },
  GOAL_KEEPER_DEPTH_Y = BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth,
  POLE_UP_SIZE = {
    radius_top: 0.5,
    radius_bottom: 0.5,
    height: 40.5,
    segments: 10,
  },
  POLE_RIGHT_LEFT_SIZE = {
    radius_top: 0.5,
    radius_bottom: 0.5,
    height: 15,
    segments: 10,
  },
  COLOR_AREA_GOAL = [
    16711680,
    65280,
    255,
    16776960,
    16711935,
    65535,
    15790320,
    986895,
    16759705,
    16777215,
    5675280,
    10083618,
    1056896,
    8392736,
    9017449,
  ],
  OFFSET_FIELD_Y = 35,
  OFFSET_FIELD_X = 35,
  HIT_BALL_MAX_FORCE = 130,
  HIT_BALL_MIN_FORCE = 5,
  FORCE_RATE = 0.0014,
  SHOW_AREAS_GOAL = !1,
  FORCE_MULTIPLIER_AXIS = { x: 0.12, y: 0.4, z: 0.08 },
  FORCE_MAX = 0.5,
  FIELD_POSITION,
  MAX_FORCE_Y = 66,
  MIN_FORCE_Y = 50,
  CALCULATE_PROBABILITY = [
    { xMax: -7, xMin: -11, zMax: 11, zMin: 8 },
    { xMax: -3.6, xMin: -7, zMax: 11, zMin: 8 },
    { xMax: 3.6, xMin: -3.6, zMax: 11, zMin: 8 },
    { xMax: 7, xMin: 3.6, zMax: 11, zMin: 8 },
    { xMax: 11, xMin: 7, zMax: 11, zMin: 8 },
    { xMax: -7, xMin: -7, zMax: 8, zMin: 5 },
    { xMax: -3.6, xMin: -7, zMax: 8, zMin: 5 },
    { xMax: 3.6, xMin: -3.6, zMax: 8, zMin: 5 },
    { xMax: 7, xMin: 3.6, zMax: 8, zMin: 5 },
    { xMax: 11, xMin: 7, zMax: 8, zMin: 5 },
    {
      xMax: -7,
      xMin: -11,
      zMax: 5,
      zMin: 0,
    },
    { xMax: -3.6, xMin: -7, zMax: 5, zMin: 0 },
    { xMax: 3.6, xMin: -3.6, zMax: 5, zMin: 0 },
    { xMax: 7, xMin: 3.6, zMax: 5, zMin: 0 },
    { xMax: 11, xMin: 7, zMax: 5, zMin: 0 },
  ],
  SHOW_3D_RENDER = !1,
  CAMERA_TEST_TRACKBALL = !1,
  CAMERA_TEST_TRANSFORM = !1,
  CANVAS_3D_OPACITY = 0.5,
  MOUSE_SENSIBILTY = 0.03,
  CAMERA_TEST_LOOK_AT = { x: 0, y: -500, z: -100 },
  BALL_SCALE_FACTOR = 0.07,
  SHADOWN_FACTOR = 1.1,
  INTENSITY_DISPLAY_SHOCK = [
    { x: 10, y: 7.5, time: 50 },
    { x: 20, y: 9, time: 50 },
    { x: 30, y: 12, time: 50 },
    { x: 33, y: 15, time: 50 },
  ],
  FORCE_BALL_DISPLAY_SHOCK = [
    { max: 55, min: MIN_FORCE_Y - 1 },
    { max: 58, min: 55 },
    { max: 62, min: 58 },
    { max: MAX_FORCE_Y, min: 62 },
  ],
  CAMERA_POSITION = { x: 0, y: 0, z: -7 },
  FOV = 15,
  NEAR = 1,
  FAR = 2e3,
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  TIME_SWIPE
function CRollingScore() {
  var m = null,
    c = null
  this.rolling = function(e, g, a) {
    m = createjs.Tween.get(e, { override: !0 })
      .to({ text: a }, MS_ROLLING_SCORE, createjs.Ease.cubicOut)
      .addEventListener('change', function() {
        e.text = Math.floor(e.text)
      })
      .call(function() {
        createjs.Tween.removeTweens(m)
      })
    null !== g &&
      (c = createjs.Tween.get(g, { override: !0 })
        .to({ text: a }, MS_ROLLING_SCORE, createjs.Ease.cubicOut)
        .addEventListener('change', function() {
          g.text = Math.floor(g.text)
        })
        .call(function() {
          createjs.Tween.removeTweens(c)
        }))
  }
  return this
}
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
