function CScenario() {
    var m, c, e, g, a, d, b, l, k, h, f, q, n, p, u, r;
    if (SHOW_3D_RENDER) var w = new CANNON.Demo();
    this.getDemo = function() {
      return w;
    };
    this._init = function() {
      m = SHOW_3D_RENDER ? w.getWorld() : new CANNON.World();
      m.gravity.set(0, 0, -9.81);
      m.broadphase = new CANNON.NaiveBroadphase();
      m.solver.iterations = 50;
      m.solver.tolerance = 1e-5;
      c = new CANNON.Material();
      e = new CANNON.Material();
      g = new CANNON.Material();
      var a = new CANNON.ContactMaterial(e, g, {
          friction: 0.1,
          restitution: 0.01
        }),
        b = new CANNON.ContactMaterial(e, c, { friction: 0.2, restitution: 0.3 });
      m.addContactMaterial(a);
      m.addContactMaterial(b);
      s_oScenario._createBallBody();
      s_oScenario._createFieldBody();
      s_oScenario._createGoal();
      s_oScenario.createBackGoalWall();
      SHOW_AREAS_GOAL
        ? s_oScenario.createAreasGoal()
        : s_oScenario.createAreaGoal(
            GOAL_LINE_POS,
            BACK_WALL_GOAL_SIZE,
            COLOR_AREA_GOAL[0],
            null
          );
    };
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
              z: c
            },
            AREA_GOAL_PROPERTIES,
            COLOR_AREA_GOAL[a],
            AREAS_INFO[a]
          ),
            (b += 2 * AREA_GOAL_PROPERTIES.width),
            a++;
        b = FIRST_AREA_GOAL_POS.x;
        c -= 2 * AREA_GOAL_PROPERTIES.height;
      }
    };
    this._createFieldBody = function() {
      l = new CANNON.Plane();
      k = new CANNON.Body({ mass: 0, material: c });
      k.addShape(l);
      k.position.z = -9;
      k.addEventListener("collide", function(a) {
        s_oScenario.fieldCollision();
      });
      m.addBody(k);
      if (SHOW_3D_RENDER) {
        var a = new THREE.MeshPhongMaterial({
          color: 5803568,
          specular: 1118481,
          shininess: 10
        });
        w.addVisual(k, a);
      }
    };
    this._createGoal = function() {
      h = new CANNON.Cylinder(
        POLE_RIGHT_LEFT_SIZE.radius_top,
        POLE_RIGHT_LEFT_SIZE.radius_bottom,
        POLE_RIGHT_LEFT_SIZE.height,
        POLE_RIGHT_LEFT_SIZE.segments
      );
      q = new CANNON.Body({ mass: 0 });
      f = new CANNON.Cylinder(
        POLE_UP_SIZE.radius_top,
        POLE_UP_SIZE.radius_bottom,
        POLE_UP_SIZE.height,
        POLE_UP_SIZE.segments
      );
      var a = new CANNON.Quaternion();
      a.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
      f.transformAllPoints(new CANNON.Vec3(), a);
      q.addShape(h, new CANNON.Vec3(0.5 * POLE_UP_SIZE.height, 0, 0));
      q.addShape(h, new CANNON.Vec3(0.5 * -POLE_UP_SIZE.height, 0, 0));
      q.addShape(f, new CANNON.Vec3(0, 0, 0.5 * POLE_RIGHT_LEFT_SIZE.height));
      q.position.set(
        BACK_WALL_GOAL_POSITION.x,
        BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth,
        BACK_WALL_GOAL_POSITION.z
      );
      q.addEventListener("collide", function(a) {
        s_oScenario.poleCollision();
      });
      m.addBody(q);
      SHOW_3D_RENDER &&
        ((a = new THREE.MeshPhongMaterial({
          color: 16777215,
          specular: 1118481,
          shininess: 50
        })),
        w.addVisual(q, a));
    };
    this.createBackGoalWall = function() {
      n = new CANNON.Box(
        new CANNON.Vec3(
          BACK_WALL_GOAL_SIZE.width,
          BACK_WALL_GOAL_SIZE.depth,
          BACK_WALL_GOAL_SIZE.height
        )
      );
      p = new CANNON.Box(
        new CANNON.Vec3(
          LEFT_RIGHT_WALL_GOAL_SIZE.width,
          LEFT_RIGHT_WALL_GOAL_SIZE.depth,
          LEFT_RIGHT_WALL_GOAL_SIZE.height
        )
      );
      u = new CANNON.Box(
        new CANNON.Vec3(
          UP_WALL_GOAL_SIZE.width,
          UP_WALL_GOAL_SIZE.depth,
          UP_WALL_GOAL_SIZE.height
        )
      );
      r = new CANNON.Body({ mass: 0, material: g });
      r.addShape(n);
      r.addShape(p, new CANNON.Vec3(BACK_WALL_GOAL_SIZE.width, 0, 0));
      r.addShape(p, new CANNON.Vec3(-BACK_WALL_GOAL_SIZE.width, 0, 0));
      r.addShape(u, new CANNON.Vec3(0, 0, BACK_WALL_GOAL_SIZE.height));
      r.position.set(
        BACK_WALL_GOAL_POSITION.x,
        BACK_WALL_GOAL_POSITION.y,
        BACK_WALL_GOAL_POSITION.z
      );
      m.addBody(r);
      SHOW_3D_RENDER && w.addVisual(r);
    };
    this.createAreaGoal = function(a, b, c, d) {
      b = new CANNON.Box(new CANNON.Vec3(b.width, b.depth, b.height));
      d = new CANNON.Body({ mass: 0, userData: d });
      d.addShape(b);
      d.position.set(a.x, a.y, a.z);
      d.collisionResponse = 0;
      d.addEventListener("collide", function(a) {
        s_oScenario.lineGoalCollision(a);
      });
      m.addBody(d);
      SHOW_3D_RENDER &&
        ((a = new THREE.MeshPhongMaterial({
          color: c,
          specular: 1118481,
          shininess: 70
        })),
        w.addVisual(d, a));
      return d;
    };
    this._createBallBody = function() {
      a = new CANNON.Sphere(BALL_RADIUS);
      d = new CANNON.Body({
        mass: BALL_MASS,
        material: e,
        linearDamping: BALL_LINEAR_DAMPING,
        angularDamping: 2 * BALL_LINEAR_DAMPING
      });
      var c = new CANNON.Vec3(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
      d.position.copy(c);
      d.addShape(a);
      m.add(d);
      SHOW_3D_RENDER &&
        ((c = new THREE.MeshPhongMaterial({
          color: 16777215,
          specular: 1118481,
          shininess: 70
        })),
        (b = w.addVisual(d, c)));
    };
    this.addImpulse = function(a, b) {
      var c = new CANNON.Vec3(0, 0, BALL_RADIUS),
        d = new CANNON.Vec3(b.x, b.y, b.z);
      a.applyImpulse(d, c);
    };
    this.addForce = function(a, b) {
      var c = new CANNON.Vec3(0, 0, 0),
        d = new CANNON.Vec3(b.x, b.y, b.z);
      a.applyForce(d, c);
    };
    this.getBodyVelocity = function(a) {
      return a.velocity;
    };
    this.ballBody = function() {
      return d;
    };
    this.ballMesh = function() {
      return b;
    };
    this.getCamera = function() {
      return w.camera();
    };
    this.fieldCollision = function() {
      s_oGame.fieldCollision();
      s_oGame.ballFadeForReset();
    };
    this.setElementAngularVelocity = function(a, b) {
      a.angularVelocity.set(b.x, b.y, b.z);
    };
    this.setElementVelocity = function(a, b) {
      var c = new CANNON.Vec3(b.x, b.y, b.z);
      a.velocity = c;
    };
    this.setElementLinearDamping = function(a, b) {
      a.linearDamping = b;
    };
    this.getFieldBody = function() {
      return k;
    };
    this.lineGoalCollision = function(a) {
      s_oGame.areaGoal(a.contact.bj.userData);
    };
    this.update = function() {
      m.step(PHYSICS_STEP);
    };
    this.getGoalBody = function() {
      return q;
    };
    this.poleCollision = function() {
      s_oGame.poleCollide();
    };
    this.destroyWorld = function() {
      for (var a = m.bodies, b = 0; b < a.length; b++) m.remove(a[b]);
      m = null;
    };
    s_oScenario = this;
    SHOW_3D_RENDER ? (w.addScene("Test", this._init), w.start()) : this._init();
  }