CANNON.Demo = function(m) {
    function c() {
      if (z) {
        for (var a in z.__controllers) z.__controllers[a].updateDisplay();
        for (var b in z.__folders)
          for (a in z.__folders[b].__controllers)
            z.__folders[b].__controllers[a].updateDisplay();
      }
    }
    function e(a) {
      function b(a, c) {
        a.material && (a.material = c);
        for (var d = 0; d < a.children.length; d++) b(a.children[d], c);
      }
      if (-1 === T.indexOf(a)) throw Error("Render mode " + a + " not found!");
      switch (a) {
        case "solid":
          p.currentMaterial = B;
          Q.intensity = 1;
          Y.color.setHex(2236962);
          break;
        case "wireframe":
          (p.currentMaterial = J), (Q.intensity = 0), Y.color.setHex(16777215);
      }
      for (var c = 0; c < v.length; c++) b(v[c], p.currentMaterial);
      r.rendermode = a;
    }
    function g() {
      for (var a = t.length, b = 0; b < a; b++) {
        var c = t[b];
        c.position.copy(c.initPosition);
        c.velocity.copy(c.initVelocity);
        c.initAngularVelocity &&
          (c.angularVelocity.copy(c.initAngularVelocity),
          c.quaternion.copy(c.initQuaternion));
      }
    }
    function a(a) {
      0 === a.x && (a.x = 1e-6);
      0 === a.y && (a.y = 1e-6);
      0 === a.z && (a.z = 1e-6);
    }
    function d() {
      for (var b = t.length, c = 0; c < b; c++) {
        var d = t[c],
          e = v[c];
        e.position.copy(d.position);
        d.quaternion && e.quaternion.copy(d.quaternion);
      }
      M.restart();
      if (r.contacts)
        for (c = 0; c < E.contacts.length; c++)
          for (b = 0; 2 > b; b++) {
            e = M.request();
            var f = E.contacts[c];
            d = 0 === b ? f.bi : f.bj;
            var g = 0 === b ? f.ri : f.rj;
            e.position.set(
              d.position.x + g.x,
              d.position.y + g.y,
              d.position.z + g.z
            );
          }
      M.hideCached();
      K.restart();
      if (r.cm2contact)
        for (c = 0; c < E.contacts.length; c++)
          for (b = 0; 2 > b; b++)
            (e = K.request()),
              (f = E.contacts[c]),
              (d = 0 === b ? f.bi : f.bj),
              (g = 0 === b ? f.ri : f.rj),
              e.scale.set(g.x, g.y, g.z),
              a(e.scale),
              e.position.copy(d.position);
      K.hideCached();
      y.restart();
      N.restart();
      if (r.constraints) {
        for (c = 0; c < E.constraints.length; c++)
          (f = E.constraints[c]),
            f instanceof CANNON.DistanceConstraint &&
              ((d = f.equations.normal),
              (b = d.bi),
              (d = d.bj),
              (e = y.request()),
              (d = d.position ? d.position : d),
              e.scale.set(
                d.x - b.position.x,
                d.y - b.position.y,
                d.z - b.position.z
              ),
              a(e.scale),
              e.position.copy(b.position));
        for (c = 0; c < E.constraints.length; c++)
          if (
            ((f = E.constraints[c]), f instanceof CANNON.PointToPointConstraint)
          ) {
            g = f.equations.normal;
            b = g.bi;
            d = g.bj;
            e = N.request();
            f = N.request();
            var h = N.request();
            e.scale.set(g.ri.x, g.ri.y, g.ri.z);
            f.scale.set(g.rj.x, g.rj.y, g.rj.z);
            h.scale.set(
              -g.penetrationVec.x,
              -g.penetrationVec.y,
              -g.penetrationVec.z
            );
            a(e.scale);
            a(f.scale);
            a(h.scale);
            e.position.copy(b.position);
            f.position.copy(d.position);
            g.bj.position.vadd(g.rj, h.position);
          }
      }
      N.hideCached();
      y.hideCached();
      I.restart();
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
            f.ri.vadd(e.position, e.position);
      I.hideCached();
      P.restart();
      if (r.axes)
        for (b = 0; b < t.length; b++)
          (d = t[b]),
            (e = P.request()),
            e.position.copy(d.position),
            d.quaternion && e.quaternion.copy(d.quaternion);
      P.hideCached();
      F.restart();
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
                  d.aabb.lowerBound.z - d.aabb.upperBound.z
                ),
                e.position.set(
                  0.5 * (d.aabb.lowerBound.x + d.aabb.upperBound.x),
                  0.5 * (d.aabb.lowerBound.y + d.aabb.upperBound.y),
                  0.5 * (d.aabb.lowerBound.z + d.aabb.upperBound.z)
                )));
      F.hideCached();
    }
    function b() {
      requestAnimationFrame(b);
      r.paused || d();
      h();
      W.update();
    }
    function l(a) {
      mouseX = a.clientX - S;
      mouseY = a.clientY - aa;
    }
    function k(a) {
      U = s_iCanvasResizeWidth + 2 * s_iCanvasOffsetWidth;
      V = s_iCanvasResizeHeight + 2 * s_iCanvasOffsetHeight;
      CAMERA_TEST_TRACKBALL &&
        ((controls.screen.width = U), (controls.screen.height = V));
    }
    function h() {
      (CAMERA_TEST_TRACKBALL || (CAMERA_TEST_TRANSFORM && null !== controls)) &&
        controls.update();
      renderer.clear();
      renderer.render(p.scene, camera);
    }
    function f(a) {
      p.dispatchEvent({ type: "destroy" });
      r.paused = !1;
      c();
      q(a);
    }
    function q(a) {
      for (var b = v.length, d = 0; d < b; d++) {
        E.remove(t.pop());
        var e = v.pop();
        p.scene.remove(e);
      }
      for (; E.constraints.length; ) E.removeConstraint(E.constraints[0]);
      x[a]();
      r.iterations = E.solver.iterations;
      r.gx = E.gravity.x + 0;
      r.gy = E.gravity.y + 0;
      r.gz = E.gravity.z + 0;
      r.quatNormalizeSkip = E.quatNormalizeSkip;
      r.quatNormalizeFast = E.quatNormalizeFast;
      c();
      M.restart();
      M.hideCached();
      K.restart();
      K.hideCached();
      y.restart();
      y.hideCached();
      I.restart();
      I.hideCached();
    }
    function n(a) {
      var b = [],
        c = [];
      this.request = function() {
        geo = b.length ? b.pop() : a();
        scene.add(geo);
        c.push(geo);
        return geo;
      };
      this.restart = function() {
        for (; c.length; ) b.push(c.pop());
      };
      this.hideCached = function() {
        for (var a = 0; a < b.length; a++) scene.remove(b[a]);
      };
    }
    var p = this;
    this.addScene = function(a, b) {
      if ("string" !== typeof a)
        throw Error(
          "1st argument of Demo.addScene(title,initfunc) must be a string!"
        );
      if ("function" !== typeof b)
        throw Error(
          "2nd argument of Demo.addScene(title,initfunc) must be a function!"
        );
      x.push(b);
      var c = x.length - 1;
      D[a] = function() {
        f(c);
      };
      u.add(D, a);
    };
    this.restartCurrentScene = g;
    this.changeScene = f;
    this.start = function() {
      q(0);
    };
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
        rendermode: "solid",
        constraints: !1,
        contacts: !1,
        cm2contact: !1,
        normals: !1,
        axes: !1,
        particleSize: 0.1,
        shadows: !1,
        aabbs: !1,
        profiling: !1,
        maxSubSteps: 3
      });
    m = m || {};
    for (var w in m) w in r && (r[w] = m[w]);
    if (0 !== r.stepFrequency % 60)
      throw Error("stepFrequency must be a multiple of 60.");
    var t = (this.bodies = []),
      v = (this.visuals = []),
      x = [],
      z = null,
      C = null,
      A = null,
      D = {},
      G = new THREE.SphereGeometry(0.1, 6, 6);
    this.particleGeo = new THREE.SphereGeometry(1, 16, 8);
    var B = new THREE.MeshPhongMaterial({
        color: 11184810,
        specular: 1118481,
        shininess: 50
      }),
      J = new THREE.MeshLambertMaterial({ color: 16777215, wireframe: !0 });
    this.currentMaterial = B;
    var O = new THREE.MeshPhongMaterial({ color: 16711680 });
    this.particleMaterial = new THREE.MeshLambertMaterial({ color: 16711680 });
    var M = new n(function() {
        return new THREE.Mesh(G, O);
      }),
      K = new n(function() {
        var a = new THREE.Geometry();
        a.vertices.push(new THREE.Vector3(0, 0, 0));
        a.vertices.push(new THREE.Vector3(1, 1, 1));
        return new THREE.Line(
          a,
          new THREE.LineBasicMaterial({ color: 16711680 })
        );
      }),
      H = new THREE.BoxGeometry(1, 1, 1),
      L = new THREE.MeshBasicMaterial({ color: 11184810, wireframe: !0 }),
      F = new n(function() {
        return new THREE.Mesh(H, L);
      }),
      y = new n(function() {
        var a = new THREE.Geometry();
        a.vertices.push(new THREE.Vector3(0, 0, 0));
        a.vertices.push(new THREE.Vector3(1, 1, 1));
        return new THREE.Line(
          a,
          new THREE.LineBasicMaterial({ color: 16711680 })
        );
      }),
      N = new n(function() {
        var a = new THREE.Geometry();
        a.vertices.push(new THREE.Vector3(0, 0, 0));
        a.vertices.push(new THREE.Vector3(1, 1, 1));
        return new THREE.Line(
          a,
          new THREE.LineBasicMaterial({ color: 16711680 })
        );
      }),
      I = new n(function() {
        var a = new THREE.Geometry();
        a.vertices.push(new THREE.Vector3(0, 0, 0));
        a.vertices.push(new THREE.Vector3(1, 1, 1));
        return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 65280 }));
      }),
      P = new n(function() {
        var a = new THREE.Object3D(),
          b = new THREE.Vector3(0, 0, 0),
          c = new THREE.Geometry(),
          d = new THREE.Geometry(),
          e = new THREE.Geometry();
        c.vertices.push(b);
        d.vertices.push(b);
        e.vertices.push(b);
        c.vertices.push(new THREE.Vector3(1, 0, 0));
        d.vertices.push(new THREE.Vector3(0, 1, 0));
        e.vertices.push(new THREE.Vector3(0, 0, 1));
        b = new THREE.Line(c, new THREE.LineBasicMaterial({ color: 16711680 }));
        d = new THREE.Line(d, new THREE.LineBasicMaterial({ color: 65280 }));
        e = new THREE.Line(e, new THREE.LineBasicMaterial({ color: 255 }));
        a.add(b);
        a.add(d);
        a.add(e);
        return a;
      }),
      E = (this.world = new CANNON.World());
    E.broadphase = new CANNON.NaiveBroadphase();
    var T = ["solid", "wireframe"],
      Q,
      Y,
      W,
      R;
    Detector.webgl || Detector.addGetWebGLMessage();
    var U = s_iCanvasResizeWidth + s_iCanvasOffsetWidth,
      V = s_iCanvasResizeHeight + s_iCanvasOffsetHeight,
      Z,
      S = U / 2,
      aa = V / 2;
    (function() {
      Z = document.createElement("div");
      document.body.appendChild(Z);
      CAMERA_TEST_TRACKBALL
        ? ((NEAR = 1),
          (camera = new THREE.PerspectiveCamera(45, U / V, NEAR, FAR)),
          camera.lookAt(
            new THREE.Vector3(
              CAMERA_TEST_LOOK_AT.x,
              CAMERA_TEST_LOOK_AT.y,
              CAMERA_TEST_LOOK_AT.z
            )
          ),
          camera.position.set(0, 500, 500),
          camera.up.set(0, 0, 1))
        : (camera = createOrthoGraphicCamera());
      scene = p.scene = new THREE.Scene();
      scene.fog = new THREE.Fog(8306926, 0.5 * FAR, FAR);
      Y = new THREE.AmbientLight(4473924);
      scene.add(Y);
      Q = new THREE.DirectionalLight(16777181, 1);
      Q.position.set(180, 0, 180);
      Q.target.position.set(0, 0, 0);
      Q.castShadow = !0;
      Q.shadow.camera.near = 10;
      Q.shadow.camera.far = 100;
      Q.shadow.camera.fov = FOV;
      Q.shadowMapBias = 0.0139;
      Q.shadowMapDarkness = 0.1;
      Q.shadow.mapSize.width = 1024;
      Q.shadow.mapSize.height = 1024;
      new THREE.CameraHelper(Q.shadow.camera);
      scene.add(Q);
      scene.add(camera);
      renderer = SHOW_3D_RENDER
        ? new THREE.WebGLRenderer({
            clearColor: 0,
            clearAlpha: 0.5,
            antialias: !0,
            alpha: !0
          })
        : new THREE.CanvasRenderer({
            clearColor: 0,
            clearAlpha: 0.5,
            antialias: !1,
            alpha: !0
          });
      renderer.setSize(U, V);
      renderer.domElement.style.position = "relative";
      renderer.domElement.style.top = "0px";
      renderer.domElement.style.opacity = CANVAS_3D_OPACITY;
      Z.appendChild(renderer.domElement);
      R = document.createElement("div");
      R.style.position = "absolute";
      R.style.top = "10px";
      R.style.width = "100%";
      R.style.textAlign = "center";
      R.innerHTML =
        '<a href="http://github.com/schteppe/cannon.js">cannon.js</a> - javascript 3d physics';
      Z.appendChild(R);
      document.addEventListener("mousemove", l);
      window.addEventListener("resize", k);
      renderer.setClearColor(scene.fog.color, 1);
      renderer.autoClear = !1;
      A = document.createElement("canvas");
      A.width = U;
      A.height = V;
      A.style.opacity = 0.5;
      A.style.position = "absolute";
      A.style.top = "0px";
      A.style.zIndex = 90;
      Z.appendChild(A);
      C = new SmoothieChart({
        labelOffsetY: 50,
        maxDataSetLength: 100,
        millisPerPixel: 2,
        grid: {
          strokeStyle: "none",
          fillStyle: "none",
          lineWidth: 1,
          millisPerLine: 250,
          verticalSections: 6
        },
        labels: { fillStyle: "rgb(180, 180, 180)" }
      });
      C.streamTo(A);
      var a = {},
        b = [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
          [255, 255, 0],
          [255, 0, 255],
          [0, 255, 255]
        ],
        c = 0,
        d;
      for (d in E.profile) {
        var f = b[c % b.length];
        a[d] = new TimeSeries({
          label: d,
          fillStyle: "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")",
          maxDataLength: 500
        });
        c++;
      }
      E.addEventListener("postStep", function(b) {
        for (var c in E.profile) a[c].append(1e3 * E.time, E.profile[c]);
      });
      c = 0;
      for (d in E.profile)
        (f = b[c % b.length]),
          C.addTimeSeries(a[d], {
            strokeStyle: "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")",
            lineWidth: 2
          }),
          c++;
      E.doProfiling = !1;
      C.stop();
      A.style.display = "none";
      W = new Stats();
      W.domElement.style.position = "absolute";
      W.domElement.style.top = "0px";
      W.domElement.style.zIndex = 100;
      Z.appendChild(W.domElement);
      void 0 != window.dat &&
        ((z = new dat.GUI()),
        (z.domElement.parentNode.style.zIndex = 120),
        (b = z.addFolder("Rendering")),
        b
          .add(r, "rendermode", { Solid: "solid", Wireframe: "wireframe" })
          .onChange(function(a) {
            e(a);
          }),
        b.add(r, "contacts"),
        b.add(r, "cm2contact"),
        b.add(r, "normals"),
        b.add(r, "constraints"),
        b.add(r, "axes"),
        b
          .add(r, "particleSize")
          .min(0)
          .max(1)
          .onChange(function(a) {
            for (var b = 0; b < v.length; b++)
              t[b] instanceof CANNON.Particle && v[b].scale.set(a, a, a);
          }),
        b.add(r, "shadows").onChange(function(a) {
          a
            ? (renderer.shadowMapAutoUpdate = !0)
            : ((renderer.shadowMapAutoUpdate = !1),
              renderer.clearTarget(Q.shadowMap));
        }),
        b.add(r, "aabbs"),
        b.add(r, "profiling").onChange(function(a) {
          a
            ? ((E.doProfiling = !0), C.start(), (A.style.display = "block"))
            : ((E.doProfiling = !1), C.stop(), (A.style.display = "none"));
        }),
        (b = z.addFolder("World")),
        b.add(r, "paused").onChange(function(a) {}),
        b.add(r, "stepFrequency", 60, 600).step(60),
        b.add(r, "gx", -100, 100).onChange(function(a) {
          isNaN(a) || E.gravity.set(a, r.gy, r.gz);
        }),
        b.add(r, "gy", -100, 100).onChange(function(a) {
          isNaN(a) || E.gravity.set(r.gx, a, r.gz);
        }),
        b.add(r, "gz", -100, 100).onChange(function(a) {
          isNaN(a) || E.gravity.set(r.gx, r.gy, a);
        }),
        b
          .add(r, "quatNormalizeSkip", 0, 50)
          .step(1)
          .onChange(function(a) {
            isNaN(a) || (E.quatNormalizeSkip = a);
          }),
        b.add(r, "quatNormalizeFast").onChange(function(a) {
          E.quatNormalizeFast = !!a;
        }),
        (b = z.addFolder("Solver")),
        b
          .add(r, "iterations", 1, 50)
          .step(1)
          .onChange(function(a) {
            E.solver.iterations = a;
          }),
        b.add(r, "k", 10, 1e7).onChange(function(a) {
          p.setGlobalSpookParams(r.k, r.d, 1 / r.stepFrequency);
        }),
        b
          .add(r, "d", 0, 20)
          .step(0.1)
          .onChange(function(a) {
            p.setGlobalSpookParams(r.k, r.d, 1 / r.stepFrequency);
          }),
        b
          .add(r, "tolerance", 0, 10)
          .step(0.01)
          .onChange(function(a) {
            E.solver.tolerance = a;
          }),
        (u = z.addFolder("Scenes")),
        u.open());
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
        (controls.screen.height = V));
    })();
    b();
    s_oRender = h;
    document.addEventListener("keypress", function(a) {
      if (a.keyCode)
        switch (a.keyCode) {
          case 32:
            g();
            break;
          case 104:
            "none" == W.domElement.style.display
              ? ((W.domElement.style.display = "block"),
                (R.style.display = "block"))
              : ((W.domElement.style.display = "none"),
                (R.style.display = "none"));
            break;
          case 97:
            r.aabbs = !r.aabbs;
            c();
            break;
          case 99:
            r.constraints = !r.constraints;
            c();
            break;
          case 112:
            r.paused = !r.paused;
            c();
            break;
          case 115:
            E.step(1 / r.stepFrequency);
            d();
            break;
          case 109:
            a = T.indexOf(r.rendermode);
            a++;
            a %= T.length;
            e(T[a]);
            c();
            break;
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
              f(a.keyCode - 49);
        }
    });
  };
  CANNON.Demo.prototype = new CANNON.EventTarget();
  CANNON.Demo.constructor = CANNON.Demo;
  CANNON.Demo.prototype.setGlobalSpookParams = function(m, c, e) {
    for (var g = this.world, a = 0; a < g.constraints.length; a++)
      for (var d = g.constraints[a], b = 0; b < d.equations.length; b++)
        d.equations[b].setSpookParams(m, c, e);
    for (a = 0; a < g.contactmaterials.length; a++)
      (e = g.contactmaterials[a]),
        (e.contactEquationStiffness = m),
        (e.frictionEquationStiffness = m),
        (e.contactEquationRelaxation = c),
        (e.frictionEquationRelaxation = c);
    g.defaultContactMaterial.contactEquationStiffness = m;
    g.defaultContactMaterial.frictionEquationStiffness = m;
    g.defaultContactMaterial.contactEquationRelaxation = c;
    g.defaultContactMaterial.frictionEquationRelaxation = c;
  };
  CANNON.Demo.prototype.createTransformControl = function(m, c) {
    controls = new THREE.TransformControls(camera, renderer.domElement);
    scene.add(m);
    controls.attach(m, c);
    scene.add(controls);
    console.log("CREATE");
    window.addEventListener("keydown", function(c) {
      switch (c.keyCode) {
        case 81:
          controls.setSpace("local" === controls.space ? "world" : "local");
          break;
        case 17:
          controls.setTranslationSnap(100);
          controls.setRotationSnap(THREE.Math.degToRad(15));
          break;
        case 87:
          controls.setMode("translate");
          break;
        case 69:
          controls.setMode("rotate");
          break;
        case 82:
          controls.setMode("scale");
          break;
        case 187:
        case 107:
          controls.setSize(controls.size + 0.1);
          break;
        case 189:
        case 109:
          controls.setSize(Math.max(controls.size - 0.1, 0.1));
      }
    });
    window.addEventListener("keyup", function(c) {
      switch (c.keyCode) {
        case 17:
          controls.setTranslationSnap(null), controls.setRotationSnap(null);
      }
    });
  };
  CANNON.Demo.prototype.getWorld = function() {
    return this.world;
  };
  CANNON.Demo.prototype.addVisual = function(m, c) {
    var e;
    m instanceof CANNON.Body && (e = this.shape2mesh(m, c));
    e &&
      (this.bodies.push(m),
      this.visuals.push(e),
      (m.visualref = e),
      (m.visualref.visualId = this.bodies.length - 1),
      this.scene.add(e));
    return e;
  };
  CANNON.Demo.prototype.addVisuals = function(m) {
    for (var c = 0; c < m.length; c++) this.addVisual(m[c]);
  };
  CANNON.Demo.prototype.removeVisual = function(m) {
    if (m.visualref) {
      for (
        var c = this.bodies,
          e = this.visuals,
          g = [],
          a = [],
          d = c.length,
          b = 0;
        b < d;
        b++
      )
        g.unshift(c.pop()), a.unshift(e.pop());
      d = m.visualref.visualId;
      for (var l = 0; l < g.length; l++)
        l !== d &&
          ((b = l > d ? l - 1 : l),
          (c[b] = g[l]),
          (e[b] = a[l]),
          (c[b].visualref = g[l].visualref),
          (c[b].visualref.visualId = b));
      m.visualref.visualId = null;
      this.scene.remove(m.visualref);
      m.visualref = null;
    }
  };
  CANNON.Demo.prototype.removeAllVisuals = function() {
    for (; this.bodies.length; ) this.removeVisual(this.bodies[0]);
  };
  CANNON.Demo.prototype.shape2mesh = function(m, c) {
    for (var e = new THREE.Object3D(), g = 0; g < m.shapes.length; g++) {
      var a = m.shapes[g];
      switch (a.type) {
        case CANNON.Shape.types.SPHERE:
          var d = new THREE.SphereGeometry(a.radius, 8, 8);
          a =
            void 0 === c
              ? new THREE.Mesh(d, this.currentMaterial)
              : new THREE.Mesh(d, c);
          a.castShadow = !0;
          break;
        case CANNON.Shape.types.PARTICLE:
          a = new THREE.Mesh(this.particleGeo, this.particleMaterial);
          d = this.settings;
          a.scale.set(d.particleSize, d.particleSize, d.particleSize);
          break;
        case CANNON.Shape.types.PLANE:
          var b = new THREE.PlaneGeometry(10, 10, 4, 4);
          a = new THREE.Object3D();
          d = new THREE.Object3D();
          b =
            void 0 === c
              ? new THREE.Mesh(b, this.currentMaterial)
              : new THREE.Mesh(b, c);
          b.scale.set(100, 100, 100);
          d.add(b);
          b.castShadow = !1;
          b.receiveShadow = !0;
          a.add(d);
          break;
        case CANNON.Shape.types.BOX:
          d = new THREE.BoxGeometry(
            2 * a.halfExtents.x,
            2 * a.halfExtents.y,
            2 * a.halfExtents.z
          );
          a =
            void 0 === c
              ? new THREE.Mesh(d, this.currentMaterial)
              : new THREE.Mesh(d, c);
          break;
        case CANNON.Shape.types.CONVEXPOLYHEDRON:
          b = new THREE.Geometry();
          for (d = 0; d < a.vertices.length; d++) {
            var l = a.vertices[d];
            b.vertices.push(new THREE.Vector3(l.x, l.y, l.z));
          }
          for (d = 0; d < a.faces.length; d++) {
            var k = a.faces[d],
              h = k[0];
            for (l = 1; l < k.length - 1; l++)
              b.faces.push(new THREE.Face3(h, k[l], k[l + 1]));
          }
          b.computeBoundingSphere();
          b.computeFaceNormals();
          a =
            void 0 === c
              ? new THREE.Mesh(b, this.currentMaterial)
              : new THREE.Mesh(b, c);
          break;
        case CANNON.Shape.types.HEIGHTFIELD:
          b = new THREE.Geometry();
          k = new CANNON.Vec3();
          h = new CANNON.Vec3();
          var f = new CANNON.Vec3();
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
                    new THREE.Vector3(f.x, f.y, f.z)
                  ),
                  (d = b.vertices.length - 3),
                  b.faces.push(new THREE.Face3(d, d + 1, d + 2));
          b.computeBoundingSphere();
          b.computeFaceNormals();
          a =
            void 0 === c
              ? new THREE.Mesh(b, this.currentMaterial)
              : new THREE.Mesh(b, c);
          break;
        case CANNON.Shape.types.TRIMESH:
          b = new THREE.Geometry();
          k = new CANNON.Vec3();
          h = new CANNON.Vec3();
          f = new CANNON.Vec3();
          for (d = 0; d < a.indices.length / 3; d++)
            a.getTriangleVertices(d, k, h, f),
              b.vertices.push(
                new THREE.Vector3(k.x, k.y, k.z),
                new THREE.Vector3(h.x, h.y, h.z),
                new THREE.Vector3(f.x, f.y, f.z)
              ),
              (l = b.vertices.length - 3),
              b.faces.push(new THREE.Face3(l, l + 1, l + 2));
          b.computeBoundingSphere();
          b.computeFaceNormals();
          a =
            void 0 === c
              ? new THREE.Mesh(b, this.currentMaterial)
              : new THREE.Mesh(b, c);
          break;
        default:
          throw "Visual type not recognized: " + a.type;
      }
      a.receiveShadow = !0;
      a.castShadow = !0;
      if (a.children)
        for (d = 0; d < a.children.length; d++)
          if (
            ((a.children[d].castShadow = !0),
            (a.children[d].receiveShadow = !0),
            a.children[d])
          )
            for (l = 0; l < a.children[d].length; l++)
              (a.children[d].children[l].castShadow = !0),
                (a.children[d].children[l].receiveShadow = !0);
      d = m.shapeOffsets[g];
      b = m.shapeOrientations[g];
      a.position.set(d.x, d.y, d.z);
      a.quaternion.set(b.x, b.y, b.z, b.w);
      e.add(a);
    }
    this.camera = function() {
      return camera;
    };
    this.getScene = function() {
      return scene;
    };
    return e;
  };