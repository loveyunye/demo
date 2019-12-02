const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const app = new Koa();
const routing = require('./routes');
const path = require('path');
require('dotenv').config();

const isDev = process.env.NODE_ENV === 'prod' ? true : false;

app.use(
  error({
    postFormat: (e, { stack, ...rest }) => (isDev ? { stack, ...rest } : rest),
  }),
);
app.use(koaStatic(path.join(__dirname, './public')));
app.use(bodyParser());
routing(app);

app.listen(3000, () => console.log('程序启动在 3000 端口了'));