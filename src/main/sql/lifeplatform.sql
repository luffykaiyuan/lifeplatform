/**
* @Description: 学生生活服务平台
* @Author: 陈开源
* @Date: 2019/10/14
*/


-- ----------------------------
-- Table structure for `login_info`
-- ----------------------------
DROP TABLE IF EXISTS `login_info`;
CREATE TABLE `login_info` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
    `username` varchar(11) NOT NULL COMMENT '用户名（邮箱）',
    `password` varchar(11) NOT NULL COMMENT '登录密码',
    `nick_name` varchar(11) NOT NULL COMMENT '昵称',
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '用户登录信息表';