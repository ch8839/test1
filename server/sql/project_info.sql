/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-05-22 21:16:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project_info
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_area` varchar(255) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `project_num` varchar(255) DEFAULT NULL,
  `project_type` int(11) DEFAULT NULL,
  `project_lng` double(30,10) DEFAULT NULL,
  `project_lat` double(30,10) DEFAULT NULL,
  `simple_count` int(255) DEFAULT NULL,
  `detail_count` int(255) DEFAULT NULL,
  `fixed_count` int(255) DEFAULT NULL,
  `all_count` int(255) DEFAULT NULL,
  `remarks` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_info
-- ----------------------------
INSERT INTO `project_info` VALUES ('1', '0001', '静安1号', '2019-0001-0001', '1', '121.4580310000', '31.2755960000', '38', '23', '0', '61', '无备注');
INSERT INTO `project_info` VALUES ('2', '0001', '静安2号', '2019-0001-0002', '1', '121.4450270000', '31.2807510000', '33', '0', '0', '33', '无备注');
INSERT INTO `project_info` VALUES ('3', '0001', '静安3号', '2019-0001-0003', '2', '121.4529650000', '31.2245600000', '0', '0', '0', '0', '无备注');
INSERT INTO `project_info` VALUES ('4', '0002', '长宁1号', '2019-0002-0001', '3', '121.4192810000', '31.2214830000', '7', '0', '0', '7', '无备注');
INSERT INTO `project_info` VALUES ('5', '0002', '长宁2号', '2019-0002-0002', '1', '121.4155380000', '31.2412240000', '22', '0', '0', '22', '无备注');
INSERT INTO `project_info` VALUES ('6', '0003', '宝山1号', '2019-0003-0001', '2', '121.3938720000', '31.3162930000', '0', '0', '0', '0', '无备注');
INSERT INTO `project_info` VALUES ('7', '0003', '宝山2号', '2019-0003-0002', '2', '121.4210610000', '31.3063040000', '0', '0', '0', '0', '无备注');
INSERT INTO `project_info` VALUES ('8', '0004', '长风4号', '31010720190001', '3', '121.3826690000', '31.2238080000', '145', '347', '6', '498', '无备注');
SET FOREIGN_KEY_CHECKS=1;
