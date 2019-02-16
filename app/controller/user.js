'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller{

    async queryUser() {
      let result;
      try {
        // 请求数据
        result = await this.ctx.service.user.queryUser();
      } finally {
        this.logger.info('数据length：', result.length)
        // 渲染数据
        await this.ctx.render('user.html', {list : result});
      }
      //this.ctx.body = '哈哈'
    }
}

module.exports = UserController;
