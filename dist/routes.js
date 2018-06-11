"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const lodash_1 = require("lodash");
const router = new Router();
async function game(ctx) {
    await ctx.render('game', {
        games: [],
    });
}
async function about(ctx) {
    await ctx.render('about');
}
async function health(ctx) {
    ctx.body = lodash_1.set(ctx.request.body, 'success', true);
    ctx.type = 'application/json';
}
router.get('/', game);
router.get('/about', about);
router.post('/health', health);
exports.default = router;
//# sourceMappingURL=routes.js.map