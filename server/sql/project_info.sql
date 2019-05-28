/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-05-26 13:40:37
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
INSERT INTO `project_info` VALUES ('1', '0001', '静安1号', '31010720190002', '1', '121.4580310000', '31.2755960000', '22', '14', '0', '36', '无备注');
INSERT INTO `project_info` VALUES ('2', '0001', '静安2号', '31010720190003', '1', '121.4450270000', '31.2807510000', '25', '0', '0', '25', '无备注');
INSERT INTO `project_info` VALUES ('3', '0001', '静安3号', '31010720190004', '2', '121.4529650000', '31.2245600000', '5', '0', '0', '5', '无备注');
INSERT INTO `project_info` VALUES ('4', '0002', '长宁1号', '31010720190005', '3', '121.4192810000', '31.2214830000', '4', '0', '0', '4', '无备注');
INSERT INTO `project_info` VALUES ('5', '0002', '长宁2号', '31010720190006', '1', '121.4155380000', '31.2412240000', '13', '0', '0', '13', '无备注');
INSERT INTO `project_info` VALUES ('6', '0003', '宝山1号', '31010720190007', '2', '121.3938720000', '31.3162930000', '0', '0', '0', '0', '无备注');
INSERT INTO `project_info` VALUES ('7', '0003', '宝山2号', '31010720190008', '2', '121.4210610000', '31.3063040000', '0', '0', '0', '0', '无备注');
INSERT INTO `project_info` VALUES ('8', '0004', '长风4号', '31010720190001', '3', '121.3826690000', '31.2238080000', '107', '234', '13', '354', '无备注');
SET FOREIGN_KEY_CHECKS=1;
