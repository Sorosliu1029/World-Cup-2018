function CScoreBoard(m) {
    var c, e, g, a, d, b, l, k, h, f, q;
    this._init = function() {
      c = { x: CANVAS_WIDTH_HALF - 660, y: CANVAS_HEIGHT - 64 };
      f = new createjs.Container();
      f.x = c.x;
      f.y = c.y;
      m.addChild(f);
      g = new createjs.Text(TEXT_SCORE, "50px " + FONT_GAME, TEXT_COLOR);
      g.textAlign = "left";
      f.addChild(g);
      a = new createjs.Text(TEXT_SCORE, "50px " + FONT_GAME, TEXT_COLOR_STROKE);
      a.textAlign = "left";
      a.outline = OUTLINE_WIDTH;
      f.addChild(a);
      d = new createjs.Text(999999, "50px " + FONT_GAME, TEXT_COLOR);
      d.textAlign = "left";
      d.x = 150;
      f.addChild(d);
      b = new createjs.Text(999999, "50px " + FONT_GAME, TEXT_COLOR_STROKE);
      b.textAlign = "left";
      b.x = d.x;
      b.outline = OUTLINE_WIDTH;
      f.addChild(b);
      q = new createjs.Container();
      q.x = 50;
      l = new createjs.Text(
        "+5555 " + TEXT_MULTIPLIER + 1,
        "36px " + FONT_GAME,
        TEXT_COLOR
      );
      l.textAlign = "left";
      q.addChild(l);
      k = new createjs.Text(
        "+5555 " + TEXT_MULTIPLIER + 1,
        "36px " + FONT_GAME,
        TEXT_COLOR_STROKE
      );
      k.textAlign = "left";
      k.outline = OUTLINE_WIDTH;
      q.addChild(k);
      q.y = e = -k.getBounds().height;
      q.visible = !1;
      f.addChild(q);
      h = new CRollingScore();
    };
    this.getStartPosScore = function() {
      return c;
    };
    this.setPosScore = function(a, b) {
      f.x = a;
      f.y = b;
    };
    this.refreshTextScore = function(a) {
      h.rolling(d, b, a);
    };
    this.effectAddScore = function(a, b) {
      q.visible = !0;
      l.text = "+" + a + " " + TEXT_MULTIPLIER + b;
      k.text = l.text;
      createjs.Tween.get(q)
        .to({ y: e - 50, alpha: 0 }, MS_EFFECT_ADD, createjs.Ease.cubicOut)
        .call(function() {
          q.visible = !1;
          q.alpha = 1;
          q.y = e;
        });
    };
    this._init();
    return this;
  }