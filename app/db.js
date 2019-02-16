const pg = require('pg');

module.exports = app => {
  // 第一个参数 mysql 指定了挂载到 app 上的字段，我们可以通过 `app.mysql` 访问到 MySQL singleton 实例
  // 第二个参数 createPostgreSQL 接受两个参数(config, app)，并返回一个 MySQL 的实例
  app.addSingleton('pg', createPostgreSQL);
}

function createPostgreSQL(config, app){
  assert(config.host && config.port && config.user && config.database);
  var pool = new pg.Pool(config);
  // 查询
  pool.connect(function (isErr, client, done) {
    if (isErr) {
        console.log('connect query:' + isErr.message);
        return;
    }
    client.query('select now();', [], function (isErr, rst) {
        done();
        if (isErr) {
            console.log('query error:' + isErr.message);
        } else {
            console.log('query success, data is: ' + rst.rows[0].now);
        }
    })
  });
}
