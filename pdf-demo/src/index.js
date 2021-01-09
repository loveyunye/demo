const Koa = require('koa')
const Route = require('koa-router')
const koaBody = require('koa-body')
const app = new Koa();
const router = new Route()

app.use(koaBody());

router.post('/exportPdf', (ctx) => {
  ctx.body = 'export pdf'
})

router.post('/upload', (ctx) => {
  //接收前台POST过来的base64
  const base64Data = req.body.imgData;
  //过滤data:URL
  const dataBuffer = new Buffer.from(base64Data, 'base64'); // 解码图片
  fs.writeFile("image.png", dataBuffer, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("保存成功！");
    }
  });
  ctx.body = 123
});

router.get('/', (ctx) => {
  ctx.body = 'get export pdf'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)