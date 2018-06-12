import * as Router from 'koa-router'
import { set, take } from 'lodash'
import { get_games } from './utils'

const router = new Router()

async function game(ctx) {
  const games = await get_games()
  await ctx.render('game', {
    games: take(games, 3),
  })
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
