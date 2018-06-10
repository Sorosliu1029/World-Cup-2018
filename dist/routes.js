"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
async function game(ctx) {
    await ctx.render('game');
}
async function about(ctx) {
    await ctx.render('about');
}
async function post(ctx) {
    const body = ctx.request.body;
    console.log(body);
}
router.get('/', game);
router.get('/about', about);
router.post('/', post);
exports.default = router;
//# sourceMappingURL=routes.js.map