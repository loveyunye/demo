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

router.get('/getLocation', async(ctx) => {
  const res = await axios.request({
    url: 'https://restapi.amap.com/v3/geocode/regeo?key=8a517826086b12dc42d1b66a5e5ac4e5&location=114.123123,28.123123',
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

router.get('/getImg', async (ctx) => {
  const res = await axios.request({
    url: 'https://pics5.baidu.com/feed/94cad1c8a786c9174f3c71824ba383c53ac757f2.jpeg?token=419e0bfa70c27a9b1632e6ca1af6d8d8',
  })
  console.log(res)
  ctx.body = res.data
})

router.get('/getMess', async (ctx) => {
  const res2 = await axios.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    params: {
      grant_type: 'client_credential',
      appid: 'wxc120028248996483',
      secret: '72da950cfd2613866771719aad1526e8'
    }
  })
  console.log(res2)
  const token = '63_auvSasRbjaRirysIzSdIGjr3xi31iR-E6lFvZmD2mO2rJHQ228rNzmLbsqFPUJRky3SRQMAwq7KSWeGFp2yYIDuvzaH7D_-i6fC4TXIZsWq9VtoDI4VhNynFzIoWRLeAAANIC'
  
  const dateTime = new Date().getTime();
  const timestamp = Math.floor(dateTime / 1000);

  const res = await axios.request({
    url: 'https://api.weixin.qq.com/customservice/msgrecord/getmsglist?access_token=' + token,
    method: 'post',
    data: {
      // access_token: token,
      "starttime" : timestamp - 60 * 24,
      "endtime" : timestamp,
      "msgid" : 1,
      "number" : 10000 
    }
  })
  ctx.body = res.data;
})

app.use(router.routes())

app.listen(3001)
console.log('服务运行: http://localhost:3001')