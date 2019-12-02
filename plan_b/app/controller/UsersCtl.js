const Users = require('../models/user');

class UserCtl {
  async find(ctx) {
    ctx.body = await Users.findAll();
  };
  async create(ctx) {
    const { name } = ctx.request.body;
    const user = await Users.findOne({
      where: {
        name,
      },
    });
    if (user) {
      ctx.throw(409, 'name has been used')
    }
    ctx.body = await Users.create(ctx.request.body);
  };

  findById(ctx) {

  };
  
  update(ctx) {

  };

  delete(ctx) {

  };
}

module.exports = new UserCtl();