/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50561
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50561
File Encoding         : 65001

<<<<<<< HEAD
Date: 2019-03-10 21:54:53
=======
Date: 2019-05-09 10:27:13
>>>>>>> 0e4cd8e6a9a817da5871db7665d0279f15dbe478
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
  `roles` int(11) DEFAULT '1',
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123456', '1', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3731181584,2917406548&fm=26&gp=0.jpg');
INSERT INTO `user` VALUES ('2', 'shu', 'shu', '2', 'http://5b0988e595225.cdn.sohucs.com/images/20181014/5e6de08285844e149db806858593aacc.jpeg');
SET FOREIGN_KEY_CHECKS=1;
