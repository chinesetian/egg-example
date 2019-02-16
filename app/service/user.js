'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async queryUser(id) {
        const { ctx, app } = this;
        const pool = app.pg
        const querySQL = 'SELECT * from t_user'
        try {
            const { rows } = await pool.query(querySQL)
            this.ctx.logger.debug('debug info from service');
            return rows
        } catch (e) {
           return '查询出差出错了'
        }
    }

    // async findOne(id) {
    //     const {
    //         ctx,
    //     } = this;
    //     try {
    //         const user = await ctx.model.User.findById(id);
    //         if (!user) {
    //             ctx.throw(404, '用户不存在')
    //         }
    //         return user;

    //     } catch (error) {
    //         throw (500);
    //     }
    // }
}

module.exports = UserService;