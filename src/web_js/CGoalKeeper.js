function CGoalKeeper(m, c, e) {
    var g,
      a,
      d,
      b,
      l,
      k,
      h = 0,
      f = 0,
      q = IDLE;
    this._init = function(c, e, f) {
      l = f;
      g = c;
      a = e;
      d = new createjs.Container();
      d.x = g;
      d.y = a;
      l.addChild(d);
      d.tickChildren = !1;
      k = [];
      b = [];
      for (f = e = c = 0; f < NUM_SPRITE_GOALKEEPER.length; f++) {
        b[f] = new createjs.Container();
        b[f].x = OFFSET_CONTAINER_GOALKEEPER[f].x;
        b[f].y = OFFSET_CONTAINER_GOALKEEPER[f].y;
        k.push(
          this.loadAnim(SPRITE_NAME_GOALKEEPER[f], NUM_SPRITE_GOALKEEPER[f], b[f])
        );
        d.addChild(b[f]);
        var h = s_oSpriteLibrary.getSprite(SPRITE_NAME_GOALKEEPER[f] + 0);
        h.width > c && (c = h.width);
        h.height > e && (e = h.height);
      }
      d.cache(-c, -e, 2 * c, 2 * e);
      k[IDLE][0].visible = !0;
    };
    this.getAnimType = function() {
      return q;
    };
    this.getAnimArray = function() {
      return k[q];
    };
    this.loadAnim = function(a, b, c) {
      for (var d = [], e = 0; e < b; e++)
        d.push(createBitmap(s_oSpriteLibrary.getSprite(a + e))),
          (d[e].visible = !1),
          c.addChild(d[e]);
      return d;
    };
    this.getX = function() {
      return d.x;
    };
    this.getY = function() {
      return d.y;
    };
    this.disableAllAnim = function() {
      for (var a = 0; a < b.length; a++) b[a].visible = !1;
    };
    this.setPosition = function(a, b) {
      d.x = a;
      d.y = b;
    };
    this.setVisible = function(a) {
      d.visible = a;
    };
    this.fadeAnimation = function(a) {
      createjs.Tween.get(d, { override: !0 }).to({ alpha: a }, 500);
    };
    this.setAlpha = function(a) {
      d.alpha = a;
    };
    this.getObject = function() {
      return d;
    };
    this.getFrame = function() {
      return f;
    };
    this.viewFrame = function(a, b) {
      a[b].visible = !0;
    };
    this.hideFrame = function(a, b) {
      a[b].visible = !1;
    };
    this.getDepthPos = function() {
      return GOAL_KEEPER_DEPTH_Y;
    };
    this.animGoalKeeper = function(a, b) {
      h += s_iTimeElaps;
      if (h > BUFFER_ANIM_PLAYER) {
        this.hideFrame(a, f);
        if (f + 1 < b) this.viewFrame(a, f + 1), f++;
        else return (h = f = 0), this.viewFrame(a, f), !1;
        h = 0;
        d.updateCache();
      }
      return !0;
    };
    this.resetAnimation = function(a) {
      this.resetAnimFrame(k[a], NUM_SPRITE_GOALKEEPER[a]);
    };
    this.resetAnimFrame = function(a, b) {
      for (var c = 1; c < b; c++) a[c].visible = !1;
      a[0].visible = !0;
    };
    this.setVisibleContainer = function(a, c) {
      b[a].visible = c;
    };
    this.runAnim = function(a) {
      this.disableAllAnim();
      this.resetAnimation(a);
      this.setVisibleContainer(a, !0);
      q = a;
      f = 0;
    };
    this.update = function() {
      return this.animGoalKeeper(k[q], NUM_SPRITE_GOALKEEPER[q]);
    };
    this._init(m, c, e);
    return this;
  }