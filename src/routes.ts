import * as Router from 'koa-router'
import { set } from 'lodash'

const router = new Router()

async function game(ctx) {
  await ctx.render('game')
}

async function about(ctx) {
  await ctx.render('about')
}

async function health(ctx) {
  ctx.body = set(ctx.request.body, 'success', true)
  ctx.type = 'application/json'
}

router.get('/', game)
router.get('/about', about)
router.post('/health', health)

export default router
