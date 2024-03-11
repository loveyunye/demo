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
const json = require('./employee.json')


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

router.get('/getLocation', async (ctx) => {
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

// 获取微信小程序聊天记录
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
      "starttime": timestamp - 60 * 24,
      "endtime": timestamp,
      "msgid": 1,
      "number": 10000
    }
  })
  ctx.body = res.data;
})




// 获取公众号token、 公众号密码Xu123456
router.get('/getAcc', async (ctx) => {
  const res = await axios.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    params: {
      grant_type: 'client_credential',
      appid: 'wx6d716b50006fd8e0',
      secret: '4fbd89a9eff00158353567c5c00c3dbb'
      // appid: 'wx64390c431d820cfd',
      // secret: '522041fa1cb754f8e077396e74db1656'
    }
  })
  ctx.body = res.data;
})

// 获取token
router.get('/cgi-bin/gettoken', (ctx) => {
  ctx.body = {
    "errcode": 0,
    "errmsg": "ok",
    "access_token": "accesstoken000001",
    "expires_in": 7200
  }
})

router.get('/cgi-bin/getJson', (ctx) => {
  ctx.body = json;
})

// 员工id列表
router.post('/cgi-bin/user/list_id', (ctx) => {
  // ctx.request.body
  ctx.body = {
    "errcode": 0,
    "errmsg": "ok",
    "next_cursor": "aaaaaaaaa",
    "dept_user": [
      {
        // 用户userid，当用户在多个部门下时会有多条记录
        "userid": "zhangsan",
        "department": 1
      },
      {
        "userid": "lisi",
        "department": 2
      },
      {
        "userid": "zhangsan",
        "department": 2
      },
      {
        // 用户userid，当用户在多个部门下时会有多条记录
        "userid": "wangwu",
        "department": 3
      },
      {
        // 用户userid，当用户在多个部门下时会有多条记录
        "userid": "zhaoer",
        "department": 4
      },
    ]
  }
})

// 成员详情
router.post('/cgi-bin/user/get', (ctx) => {
  console.log(ctx.request.body)
  ctx.body = {
    "errcode": 0,
    "errmsg": "ok",
    "userid": "zhangsan",
    "name": "张三",
    "department": [1, 2],
    "order": [1, 2],
    "position": "后台工程师",
    "mobile": "13800000000",
    "gender": "1",
    "email": "zhangsan@gzdev.com",
    "biz_mail": "zhangsan@qyycs2.wecom.work",
    "is_leader_in_dept": [1, 0],
    "direct_leader": ["lisi"],
    "avatar": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/0",
    "thumb_avatar": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/100",
    "telephone": "020-123456",
    "alias": "jackzhang",
    "address": "广州市海珠区新港中路",
    "open_userid": "xxxxxx",
    "main_department": 1,
    "extattr": {
      "attrs": [
        {
          "type": 0,
          "name": "文本名称",
          "text": {
            "value": "文本"
          }
        },
        {
          "type": 1,
          "name": "网页名称",
          "web": {
            "url": "http://www.test.com",
            "title": "标题"
          }
        }
      ]
    },
    "status": 1,
    "qr_code": "https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=xxx",
    "external_position": "产品经理",
    "external_profile": {
      "external_corp_name": "企业简称",
      "wechat_channels": {
        "nickname": "视频号名称",
        "status": 1
      },
      "external_attr": [{
        "type": 0,
        "name": "文本名称",
        "text": {
          "value": "文本"
        }
      },
      {
        "type": 1,
        "name": "网页名称",
        "web": {
          "url": "http://www.test.com",
          "title": "标题"
        }
      },
      {
        "type": 2,
        "name": "测试app",
        "miniprogram": {
          "appid": "wx8bd80126147dFAKE",
          "pagepath": "/index",
          "title": "my miniprogram"
        }
      }
      ]
    }
  }
})

// 部门列表
router.post('/cgi-bin/department/simplelist', (ctx) => {
  // ctx.request.body
  ctx.body = {
    "errcode": 0,
    "errmsg": "ok",
    "department_id": [
        {
            "id": 2,
            "parentid": 1,
            "order": 1
        },
        {
            "id": 2,
            "parentid": 1,
            "order": 2
        },
        {
            "id": 3,
            "parentid": 2,
            "order": 1
        },
        {
            "id": 4,
            "parentid": 3,
            "order": 4
        }
    ]
 }
 
})

// 员工id列表
router.post('/cgi-bin/user/list_id', (ctx) => {
  // ctx.request.body
  ctx.body = {
    "errcode": 0,
    "errmsg": "ok",
    "next_cursor": "aaaaaaaaa",
    "dept_user": [
      {
        "userid": "zhangsan",
        "department": 1
      },
      {
        "userid": "zhangsan",
        "department": 2
      }
    ]
  }
})


app.use(router.routes())
app.listen(3001)
console.log('服务运行: http://localhost:3001')