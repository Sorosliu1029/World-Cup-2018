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
