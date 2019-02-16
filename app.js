
const pgOpt = require('pg');

module.exports = app => {

// 自定义内容
    // app.projectName = 'eggManual'
    
// 生命周期
    app.beforeStart(async () => {
        // 应用会等待这个函数执行完成才启动
        
        console.log("==app beforeStart==");
    });

    app.ready(async () => {
        console.log("==app ready==");
        console.log(app);
        // app.loggers.debug('app init');
    })

    app.beforeClose(async () => {
        console.log("==app beforeClose==");
    })

// 事件监听
    app.once('server', server => {
    // websocket
    });
    app.on('error', (err, ctx) => {
    // report error
    });
    app.on('request', ctx => {
    // log receive request
    });
    app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    // log total cost
    });

// 插件挂载
    // 第一个参数 mysql 指定了挂载到 app 上的字段，我们可以通过 `app.mysql` 访问到 MySQL singleton 实例
    // 第二个参数 createPostgreSQL 接受两个参数(config, app)，并返回一个 MySQL 的实例

    //app.addSingleton('pg', connectPgWithPool);
    app.addSingleton('pg', connectPgWithoutPool);
    //createPostgreSQL(app.config.pg, app)
};

/**
 * 用连接池
 * @param {*} config 
 * @param {*} app 
 * 连接池连接存在问题(PostgreSQL安全问题,no pg_hba.conf entry for host) ip未认证
 * 
 */
function connectPgWithPool(config, app){
    
    var pool = new pgOpt.Pool(config);
    // 查询
    pool.connect(function (isErr, client, done) {
        if (isErr) {
            console.log('连接数据库失败:' + isErr.message);
            // return;
        } else{
                console.log('连接数据库成功:');
        }
        client.query('select now();', [], function (isErr, rst) {
            done();
            if (isErr) {
                console.log('查询失败:' + isErr.message);
            } else {
                console.log('查询成功, data is: ' + rst.rows[0].now);
            }
        })
    });

    return pool
}



/**
 * 不使用连接池
 * @param {*} config 
 * @param {*} app 
 * 直接连接数据库客户端
 */
function connectPgWithoutPool(config, app) {
    // tcp://用户名：密码@localhost/数据库名
    var conStr = "tcp://postgres:123456@192.168.100.181:5432/postgres";
    var client = new pgOpt.Client(conStr);
    client.connect(function (isErr) {
        
        if (isErr) {
            console.log('连接数据库失败:' + isErr.message);
            client.end();
            // return;
        } else{
            console.log('连接数据库成功:');
        }
        const test = 'select now()'
        const querySQL = 'SELECT * from t_user'
        client.query(test, [], function (isErr, rst) {
            if (isErr) {
                console.log('查询失败:' + isErr.message);
            } else {
                console.log('查询成功, data is: ' + rst.rows[0].now);
            }

        })
    })
    //client.end();
    return client;
}    
