"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const views = require("koa-views");
const serve = require("koa-static");
const path = require("path");
const routes_1 = require("./routes");
const app = new Koa();
const port = process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000;
app
    .use(bodyParser())
    .use(serve(path.join(__dirname, '../public')))
    .use(views(path.join(__dirname, '../views'), {
    extension: 'ejs',
}))
    .use(routes_1.default.routes())
    .use(routes_1.default.allowedMethods());
app.listen(port, () => console.log(`    Listening on port ${port}`));
exports.default = app;
//# sourceMappingURL=app.js.map