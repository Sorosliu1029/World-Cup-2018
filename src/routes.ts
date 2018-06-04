import * as Router from 'koa-router'
import { getPureRandomResult } from './utils'

const router = new Router()

async function index(ctx) {
  await ctx.render('index', {result: getPureRandomResult()})
}

async function post(ctx) {
  const body = ctx.request.body
  console.log(body)
}

router.get('/', index)
router.post('/', post)

export default router
