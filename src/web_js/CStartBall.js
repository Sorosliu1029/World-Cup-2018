function CStartBall(m, c, e) {
    var g;
    this._init = function() {
      var a = s_oSpriteLibrary.getSprite("start_ball");
      g = createBitmap(a);
      g.regX = 0.5 * a.width;
      g.regY = 0.5 * a.height;
      this.setPosition(m, c);
      e.addChild(g);
    };
    this.setPosition = function(a, c) {
      g.x = a;
      g.y = c;
    };
    this.fadeAnim = function(a, c, b) {
      createjs.Tween.get(g, { override: !0 })
        .wait(b)
        .to({ alpha: a }, c);
    };
    this.setAlpha = function(a) {
      g.alpha = a;
    };
    this.setVisible = function(a) {
      g.visible = a;
    };
    this._init();
    return this;
  }