import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as views from 'koa-views'
import * as serve from 'koa-static'
import * as path from 'path'

import router from './routes'

const app = new Koa()
const port = process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000

app
  .use(bodyParser())
  .use(serve(path.join(__dirname, '../public')))
  .use(
    views(path.join(__dirname, '../views'), {
      extension: 'ejs',
    }),
  )
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => console.log(`    Listening on port ${port}`))
export default app
