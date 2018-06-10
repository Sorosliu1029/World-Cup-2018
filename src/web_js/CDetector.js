Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function() {
      try {
        return (
          !!window.WebGLRenderingContext &&
          !!document.createElement("canvas").getContext("experimental-webgl")
        );
      } catch (m) {
        return !1;
      }
    })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function() {
      var m = document.createElement("div");
      m.id = "webgl-error-message";
      m.style.fontFamily = "monospace";
      m.style.fontSize = "13px";
      m.style.fontWeight = "normal";
      m.style.textAlign = "center";
      m.style.background = "#fff";
      m.style.color = "#000";
      m.style.padding = "1.5em";
      m.style.width = "400px";
      m.style.margin = "5em auto 0";
      this.webgl ||
        (m.innerHTML = window.WebGLRenderingContext
          ? 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
          : 'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.');
      return m;
    },
    addGetWebGLMessage: function(m) {
      m = m || {};
      var c = void 0 !== m.parent ? m.parent : document.body;
      m = void 0 !== m.id ? m.id : "oldie";
      var e = Detector.getWebGLErrorMessage();
      e.id = m;
      c.appendChild(e);
    }
  };