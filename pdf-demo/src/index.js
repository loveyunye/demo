const Koa = require('koa')
const Route = require('koa-router')
const koaBody = require('koa-body')
const koaStatic = require('koa-static');
const cors = require('@koa/cors');
const path = require('path')
const app = new Koa();
const router = new Route()
const { exportPdf } = require('./utils/exportPdf')
const EnumHtml = require('./enum')
const { scheduleTask } = require('./utils')
const axios = require('axios')

scheduleTask();
app.use(koaBody());
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})
app.use(cors());
app.use(koaStatic(path.resolve(__dirname, '../temporary')));
app.use(koaStatic(path.resolve(__dirname, '../static')));

router.get('/test/504', async (ctx) => {
  setTimeout(() => {
    ctx.status = 504
  }, 2000)
})


router.post('/', async (ctx) => {
  const data = ctx.request.body
  const { template, name, fn = null } = EnumHtml(data.type)
  const exportPath = await exportPdf(template, name + data.createTime, data, fn)
  ctx.body = exportPath
  ctx.status = 200
})

router.get('/Office/blockTypeInfo/list', async (ctx) => {
  const res = await axios.request({
    url: 'https://rh.2hrh.com/Office/blockTypeInfo/list?page=1&limit=10&typeName=',
    headers: {
      Authorization: 'Bearer 50a15217-7cdf-49c4-8fc6-2686a4b100ae'
    }
  })
  ctx.body = res.data
  ctx.status = 200
})


router.get('/Office/companyBlockManage/list', async (ctx) => {
  const { typeId, direction } = ctx.query
  const res = await axios.request({
    url: 'https://rh.2hrh.com/Office/companyBlockManage/list?page=1&limit=10',
    headers: {
      Authorization: 'Bearer 50a15217-7cdf-49c4-8fc6-2686a4b100ae'
    },
    params: {
      typeId,
      direction,
    }
  })
  ctx.body = res.data
  ctx.status = 200
})

router.get('/geojson', async (ctx) => {
  const { code } = ctx.request.query
  console.log(code);
  const { data } = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}_full`)
  ctx.body = data
})


router.get('/123/text/html', async (ctx) => {
  const res = await axios.request({
    url: 'http://www.ccta.org.cn/xhzc/cybj/202102/t20210226_4109991.html'
  })
  console.log(res)
  ctx.body = res.data
})


app.use(router.routes())

app.listen(3001)
console.log('服务运行: http://localhost:3001')