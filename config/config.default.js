'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539930061712_5777';

  config.view = {
    defauleViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
    // root:[
    //   path.join(appInfo.baseDir, 'app/view'),
    // ]
  }

  // PostgresSQL
  config.pg = {
    client: {
      dialect: 'postgres',//db类型
      database: 'postgres',//数据库名
      host: '192.168.100.181',//主机
      port: '5432',//端口
      username: 'postgres',
      password: '123456',
    }
};

  // add your config here
  config.middleware = [];

  return config;
};
