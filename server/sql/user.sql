/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : tank2

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-05-28 16:16:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles` varchar(255) DEFAULT NULL,
  `project_owner` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123456', 'super admin', '', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3731181584,2917406548&fm=26&gp=0.jpg');
INSERT INTO `user` VALUES ('2', 'shu', 'shu', 'admin', '31010720190001、2019-0001-0001', 'http://5b0988e595225.cdn.sohucs.com/images/20181014/5e6de08285844e149db806858593aacc.jpeg');
INSERT INTO `user` VALUES ('3', 'k', '123456', 'admin', '2019-0001-0001、2019-0001-0002、2019-0003-0001', null);
SET FOREIGN_KEY_CHECKS=1;
