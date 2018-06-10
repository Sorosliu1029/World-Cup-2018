function CBall(m, c, e, g, a) {
    var d,
      b,
      l,
      k = null,
      h = FOV * BALL_RADIUS,
      f = 0,
      q = 0;
    this._init = function(a, c, e) {
      l = new createjs.Container();
      p.addChild(l);
      var f = new createjs.SpriteSheet({
        images: [e],
        frames: {
          width: e.width / 7,
          height: e.height,
          regX: e.width / 2 / 7,
          regY: e.height / 2
        }
      });
      d = createSprite(
        f,
        0,
        e.width / 2 / 7,
        e.height / 2,
        e.width / 7,
        e.height / 2
      );
      d.stop();
      this.scale(h);
      e = s_oSpriteLibrary.getSprite("ball_shadow");
      b = createBitmap(e);
      b.x = a;
      b.y = c;
      b.regX = 0.5 * e.width;
      b.regY = 0.5 * e.height;
      this.scaleShadow(h);
      l.addChild(b, d);
    };
    this.rolls = function() {
      d.rotation = Math.degrees(Math.sin(-(0.15 * n.velocity.x)));
      var a = Math.abs(n.angularVelocity.x),
        b = this._goToPrevFrame;
      0 > n.angularVelocity.x && (b = this._goToNextFrame);
      7 < a
        ? b()
        : 3 < a
          ? (f++, f > 2 / ROLL_BALL_RATE && (b(), (f = 0)))
          : 1 < a
            ? (f++, f > 3 / ROLL_BALL_RATE && (b(), (f = 0)))
            : a > MIN_BALL_VEL_ROTATION &&
              (f++, f > 4 / ROLL_BALL_RATE && (b(), (f = 0)));
    };
    this._goToPrevFrame = function() {
      0 === q ? (q = 6) : q--;
      d.gotoAndStop(q);
    };
    this._goToNextFrame = function() {
      7 === q ? (q = 1) : q++;
      d.gotoAndStop(q);
    };
    this.unload = function() {
      d.removeAllEventListeners();
      p.removeChild(d);
    };
    this.setVisible = function(a) {
      l.visible = a;
    };
    this.getStartScale = function() {
      return h;
    };
    this.startPosShadowY = function(a) {
      k = a;
    };
    this.getStartShadowYPos = function() {
      return k;
    };
    this.fadeAnimation = function(a, b, c) {
      this.tweenFade(a, b, c);
    };
    this.tweenFade = function(a, b, c) {
      createjs.Tween.get(l, { override: !0 })
        .wait(c)
        .to({ alpha: a }, b)
        .call(function() {});
    };
    this.setPositionShadow = function(a, c) {
      b.x = a;
      b.y = c;
    };
    this.setPosition = function(a, b) {
      d.x = a;
      d.y = b;
    };
    this.getPhysics = function() {
      return n;
    };
    this.setAngle = function(a) {
      d.rotation = a;
    };
    this.getX = function() {
      return d.x;
    };
    this.getY = function() {
      return d.y;
    };
    this.getStartScale = function() {
      return h;
    };
    this.scale = function(a) {
      d.scaleX = a;
      d.scaleY = a;
    };
    this.scaleShadow = function(a) {
      0.08 < a
        ? ((b.scaleX = a), (b.scaleY = a))
        : ((b.scaleX = 0.08), (b.scaleY = 0.08));
    };
    this.setAlphaByHeight = function(a) {
      b.alpha = a;
    };
    this.getScale = function() {
      return d.scaleX;
    };
    this.getObject = function() {
      return l;
    };
    this.getDepthPos = function() {
      return n.position.y;
    };
    var n = g;
    var p = a;
    this._init(m, c, e);
    return this;
  }