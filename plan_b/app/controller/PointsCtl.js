class UserCtl {
  find(ctx) {
    ctx.body = {
      message: 'success',
      result: [
        {
          name: '阿婷',
          id: 1,
        },
        {
          name: '阿斌',
          id: 2,
        },
      ],
    };
  };
  create(ctx) {

  };

  findById(ctx) {

  };
  
  update(ctx) {

  };

  delete(ctx) {

  };
}

module.exports = new UserCtl();