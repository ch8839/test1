/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-21 20:52:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ground_info
-- ----------------------------
DROP TABLE IF EXISTS `ground_info`;
CREATE TABLE `ground_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `point_num` varchar(255) DEFAULT NULL,
  `point_intro` varchar(255) DEFAULT NULL,
  `point_depth` varchar(255) DEFAULT NULL,
  `ground_num` varchar(255) DEFAULT NULL,
  `sampling_time` double(30,3) DEFAULT NULL,
  `point_address` varchar(255) DEFAULT NULL,
  `point_lng` double(30,10) DEFAULT NULL,
  `point_lat` double(30,10) DEFAULT NULL,
  `point_monitor_time` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ground_info
-- ----------------------------
INSERT INTO `ground_info` VALUES ('1', '31010720190001001', '静安1号监测点001的深度1', '0-10', '31010720190001', '24.000', 'B3', '121.4576780000', '31.2738270000', '2019.01.16', '无', '10');
INSERT INTO `ground_info` VALUES ('2', '31010720190001001', '静安1号监测点001的深度2', '10-20', '31010720190001', '24.000', 'B1', '121.4576780000', '31.2738270000', '2019.01.17', '哈哈', '13');
INSERT INTO `ground_info` VALUES ('4', '31010720190001002', '静安1号监测点002的深度1', '20-30', '31010720190001', '24.000', 'B1', '121.4563690000', '31.2789250000', '2019.01.12', '哈哈3', '2');
INSERT INTO `ground_info` VALUES ('6', '31010720190002001', '静安2号监测点001的深度1', '0-10', '31010720190002', '24.000', 'C4', '121.4437520000', '31.2792370000', '2019.04.08', '无', '4');
INSERT INTO `ground_info` VALUES ('7', '31010720190002002', '静安2号监测点002的深度1', '10-20', '31010720190002', '24.000', 'A8', '121.4432480000', '31.2821160000', '2019.04.15', '无', '4');
INSERT INTO `ground_info` VALUES ('8', '31010720190003001', '静安3号监测点001的深度1', '0-10', '31010720190003', '24.000', 'C3', '121.4518030000', '31.2233540000', '2019.04.12', '无', '4');
INSERT INTO `ground_info` VALUES ('11', '31110720190001001', '长宁1号监测点001的深度1', '0-10', '31110720190001', '24.000', 'A7', '121.3887517300', '31.3178163500', '2019.04.14', '啦', null);
INSERT INTO `ground_info` VALUES ('12', '31110720190001002', '长宁1号监测点002的深度1', '20-30', '31110720190001', '24.000', 'C6', '121.3887517300', '31.3178163500', '2019.04.15', '无', null);
INSERT INTO `ground_info` VALUES ('13', '31110720190002001', '长宁2号监测点001的深度1', '10-20', '31110720190002', '24.000', 'B1', '121.2448369900', '31.3789684200', '2019.04.13', null, null);
INSERT INTO `ground_info` VALUES ('14', '31210720190001001', '宝山1号监测点001的深度1', '10-20', '31210720190001', '24.000', 'B1', '121.3887517300', '31.3178163500', '2019.04.15', null, '6');
INSERT INTO `ground_info` VALUES ('15', '31210720190001002', '宝山1号监测点002的深度1', '0-10', '31210720190001', '24.000', 'C4', '121.3887517100', '31.3178163300', '2019.04.12', null, '7');
INSERT INTO `ground_info` VALUES ('16', '31210720190001002', '宝山1号监测点002的深度2', '10-20', '31210720190001', '24.000', 'A8', '121.3887517300', '31.3178163500', '2019.04.14', null, null);
INSERT INTO `ground_info` VALUES ('17', '31210720190002001', '宝山2号监测点001的深度1', '20-30', '31210720190002', '24.000', 'C3', '121.2448369900', '31.3789684200', '2019.04.15', null, '5');
INSERT INTO `ground_info` VALUES ('18', '31210720190002001', '宝山2号监测点001的深度2', '10-20', '31210720190001', '24.000', 'A7', '121.3887517300', '31.3178163500', '2019.04.13', null, '7');
SET FOREIGN_KEY_CHECKS=1;
