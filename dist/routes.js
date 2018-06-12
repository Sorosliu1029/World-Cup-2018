"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
const router = new Router();
async function game(ctx) {
    const games = await utils_1.get_games();
    await ctx.render('game', {
        games: lodash_1.take(games, 3),
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