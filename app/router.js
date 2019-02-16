'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', controller.home.index, 302);
  router.get('/index', controller.home.index);
  router.get('/user', controller.user.queryUser)
  // router.get('/user/queryAll', controller.user.queryAll)
};
