/*
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-02-24 18:08:34
 */
module.exports = {
    devServer: {
        port: 9233 // 确保这个端口没有被其他应用占用
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
}