const Router = require('koa-router');
const layersCtl = require('../controller/layers');

// const Auth = require('../middlewares/auth');

const router = new Router({ prefix: '/screens/:screenId/layers' });

// const auth = new Auth();

// router.use(auth.verifyAuth);

router.get('/', layersCtl.list);
router.get('/edit', layersCtl.edit);

module.exports = router;
