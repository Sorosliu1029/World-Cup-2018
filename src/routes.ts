import * as Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx, next) => {
  await next()
  await ctx.render('index')
})

export default router
