/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-05-09 10:25:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for point_info
-- ----------------------------
DROP TABLE IF EXISTS `point_info`;
CREATE TABLE `point_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `point_num` varchar(255) DEFAULT NULL,
  `project_num` varchar(255) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `point_address` varchar(255) DEFAULT NULL,
  `point_lng` double(30,10) DEFAULT NULL,
  `point_lat` double(30,10) DEFAULT NULL,
  `point_intro` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `assess_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of point_info
-- ----------------------------
INSERT INTO `point_info` VALUES ('1', '2019-0001-0001-0001', '2019-0001-0001', '1', 'G2', '121.4576780000', '31.2738270000', '静安1号监测点0001', '无', '20', null);
INSERT INTO `point_info` VALUES ('2', '2019-0001-0001-0002', '2019-0001-0001', '3', 'B2', '121.4563690000', '31.2789250000', '静安1号监测点0002', '无', '20', null);
INSERT INTO `point_info` VALUES ('3', '2019-0001-0001-0003', '2019-0001-0001', '4', 'C4', '121.4569690000', '31.2793250000', '静安1号监测点0003', '无', '20', null);
INSERT INTO `point_info` VALUES ('4', '2019-0001-0002-0001', '2019-0001-0002', '5', 'B3', '121.4437520000', '31.2792370000', '静安2号监测点0001', '无', '20', null);
INSERT INTO `point_info` VALUES ('5', '2019-0001-0002-0002', '2019-0001-0002', '6', 'B2', '121.4432480000', '31.2821160000', '静安2号监测点0002', '无', '20', null);
INSERT INTO `point_info` VALUES ('6', '2019-0001-0003-0001', '2019-0001-0003', '7', 'A2', '121.4518030000', '31.2233540000', '静安3号监测点0001', '无', '20', null);
INSERT INTO `point_info` VALUES ('7', '2019-0001-0003-0002', '2019-0001-0003', '8', 'C1', '121.4529690000', '31.2389250000', '静安3号监测点0002', '无', '20', null);
INSERT INTO `point_info` VALUES ('11', '31010720190001001', '31010720190001', '8', null, '121.3810651000', '31.2248626700', '长风4号监测点0001', 'MW-1', '20', '2');
INSERT INTO `point_info` VALUES ('12', '31010720190001002', '31010720190001', '8', null, '121.3811818000', '31.2247431600', '长风4号监测点0002', 'MW-2', '20', '1');
INSERT INTO `point_info` VALUES ('13', '31010720190001003', '31010720190001', '8', null, '121.3810130000', '31.2242953400', '长风4号监测点0003', 'MW-3', '20', '2');
INSERT INTO `point_info` VALUES ('14', '31010720190001004', '31010720190001', '8', null, '121.3814175000', '31.2243357400', '长风4号监测点0004', 'MW-4', '20', '3');
INSERT INTO `point_info` VALUES ('15', '31010720190001005', '31010720190001', '8', null, '121.3817438000', '31.2238786000', '长风4号监测点0005', 'MW-5', '20', '1');
INSERT INTO `point_info` VALUES ('16', '31010720190001006', '31010720190001', '8', null, '121.3812947000', '31.2236707700', '长风4号监测点0006', 'MW-6', '20', '1');
INSERT INTO `point_info` VALUES ('17', '31010720190001007', '31010720190001', '8', null, '121.3815077000', '31.2246505700', '长风4号监测点0007', 'SB-1', '20', '2');
INSERT INTO `point_info` VALUES ('18', '31010720190001008', '31010720190001', '8', null, '121.3813242000', '31.2245309400', '长风4号监测点0008', 'SB-2', '20', '1');
INSERT INTO `point_info` VALUES ('19', '31010720190001009', '31010720190001', '8', null, '121.3817939000', '31.2245186300', '长风4号监测点0009', 'SB-3', '20', '2');
INSERT INTO `point_info` VALUES ('20', '31010720190001010', '31010720190001', '8', null, '121.3818252000', '31.2244170000', '长风4号监测点0010', 'SB-4', '20', '1');
INSERT INTO `point_info` VALUES ('21', '31010720190001011', '31010720190001', '8', null, '121.3813085000', '31.2241614200', '长风4号监测点0011', 'SB-5', '20', '1');
INSERT INTO `point_info` VALUES ('22', '31010720190001012', '31010720190001', '8', null, '121.3813810000', '31.2239790100', '长风4号监测点0012', 'SB-6', '20', '1');
INSERT INTO `point_info` VALUES ('23', '31010720190001013', '31010720190001', '8', null, '121.3816686000', '31.2235959800', '长风4号监测点0013', 'SB-7', '20', '1');
SET FOREIGN_KEY_CHECKS=1;
