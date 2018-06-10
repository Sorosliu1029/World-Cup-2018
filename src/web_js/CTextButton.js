function CTextButton(m, c, e, g, a, d, b) {
  var l, k, h;
  this._init = function(b, a, d, c, e, m, g) {
    l = [];
    k = [];
    var f = createBitmap(d),
      q = Math.ceil(g / 20),
      n = new createjs.Text(c, "bold " + g + "px " + e, "#000000");
    n.textAlign = "center";
    n.textBaseline = "alphabetic";
    var p = n.getBounds();
    n.x = d.width / 2 + q;
    n.y = Math.floor(d.height / 2) + p.height / 3 + q;
    c = new createjs.Text(c, "bold " + g + "px " + e, m);
    c.textAlign = "center";
    c.textBaseline = "alphabetic";
    p = c.getBounds();
    c.x = d.width / 2;
    c.y = Math.floor(d.height / 2) + p.height / 3;
    h = new createjs.Container();
    h.x = b;
    h.y = a;
    h.regX = d.width / 2;
    h.regY = d.height / 2;
    h.addChild(f, n, c);
    s_bMobile || (h.cursor = "pointer");
    s_oStage.addChild(h);
    this._initListener();
  };
  this.unload = function() {
    h.off("mousedown");
    h.off("pressup");
    s_oStage.removeChild(h);
  };
  this.setVisible = function(b) {
    h.visible = b;
  };
  this._initListener = function() {
    oParent = this;
    h.on("mousedown", this.buttonDown);
    h.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function(b, a, d) {
    l[b] = a;
    k[b] = d;
  };
  this.buttonRelease = function() {
    h.scaleX = 1;
    h.scaleY = 1;
    l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(k[ON_MOUSE_UP]);
  };
  this.buttonDown = function() {
    h.scaleX = 0.9;
    h.scaleY = 0.9;
    l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN]);
  };
  this.setPosition = function(b, a) {
    h.x = b;
    h.y = a;
  };
  this.setX = function(b) {
    h.x = b;
  };
  this.setY = function(b) {
    h.y = b;
  };
  this.getButtonImage = function() {
    return h;
  };
  this.getX = function() {
    return h.x;
  };
  this.getY = function() {
    return h.y;
  };
  this._init(m, c, e, g, a, d, b);
  return this;
}
