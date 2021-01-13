const Koa = require('koa')
const Route = require('koa-router')
const koaBody = require('koa-body')
const koaStatic = require('koa-static');
const cors = require('@koa/cors');
const path = require('path')
const app = new Koa();
const router = new Route()
const { exportPdf } = require('./utils/exportPdf')
const EnumHtml = require('./utils/enum')

app.use(koaBody());
app.use(cors());
app.use(koaStatic(path.resolve(__dirname, './temporary')));

router.post('/', async (ctx) => {
  const data = ctx.request.body
  const { template, name, fn = null } = EnumHtml(data.type)
  const exportPath = await exportPdf(template, name + data.createTime, data, fn)
  ctx.body = exportPath
  ctx.status = 200
})


app.use(router.routes())

app.listen(3000)
console.log('服务运行: http://localhost:3000')