'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const data = {
      title: '科技公司人员名单',
      list: [
        {id: 1, name: '雯雯', sex: '女', tel: '111'},
        {id: 2, name: '丽丽', sex: '女', tel: '222'},
        {id: 3, name: '小明', sex: '男', tel: '333'},
      ]
    }
    // this.ctx.body = 'Hello world';
    await this.ctx.render('home.html', data);
  }
}

module.exports = HomeController;
