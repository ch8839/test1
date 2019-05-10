/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-05-09 10:26:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sample_detector_water_info
-- ----------------------------
DROP TABLE IF EXISTS `sample_detector_water_info`;
CREATE TABLE `sample_detector_water_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sample_num` varchar(255) DEFAULT NULL,
  `assess_type` int(11) DEFAULT NULL,
  `point_num` varchar(255) DEFAULT NULL,
  `project_num` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `sample_depth` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `PH` varchar(255) DEFAULT '-1',
  `arsenic` varchar(255) DEFAULT '-1',
  `cadmium` varchar(255) DEFAULT '-1',
  `chromium` varchar(255) DEFAULT '-1',
  `copper` varchar(255) DEFAULT '-1',
  `lead` varchar(255) DEFAULT '-1',
  `mercury` varchar(255) DEFAULT '-1',
  `nickel` varchar(255) DEFAULT '-1',
  `antimony` varchar(255) DEFAULT '-1',
  `beryllium` varchar(255) DEFAULT '-1',
  `cobalt` varchar(255) DEFAULT '-1',
  `zinc` varchar(255) DEFAULT '-1',
  `silver` varchar(255) DEFAULT '-1',
  `thallium` varchar(255) DEFAULT '-1',
  `tin` varchar(255) DEFAULT '-1',
  `selenium` varchar(255) DEFAULT '-1',
  `molybdenum` varchar(255) DEFAULT '-1',
  `Alum` varchar(255) DEFAULT '-1',
  `attention` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sample_detector_water_info
-- ----------------------------
INSERT INTO `sample_detector_water_info` VALUES ('1', 'L-W-S-0001-0001-0001-0001', '1', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-23', '10m', '18', '7.320', '21.060', '-1', '-1', '-1', '-1', '-1', '5.690', '-1', '-1', '-1', '24.590', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('2', 'L-W-S-0001-0001-0001-0002', '1', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-23', '20m', '2', '7.420', '1.660', '-1', '-1', '-1', '-1', '-1', '26.690', '-1', '-1', '-1', '12.360', '-1', '-1', '-1', '2.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('3', 'L-W-S-0001-0001-0001-0003', '1', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-23', '30m', '3', '8.630', '1.160', '-1', '-1', '-1', '-1', '-1', '4.690', '-1', '-1', '-1', '12.360', '-1', '-1', '-1', '2.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('4', 'L-W-S-0001-0001-0002-0001', '1', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', '10m', '3', '6.780', '18.160', '-1', '-1', '-1', '-1', '-1', '24.690', '-1', '-1', '-1', '12.360', '-1', '-1', '-1', '24.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('5', 'L-W-S-0001-0001-0002-0002', '1', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', '20m', '5', '8.580', '1.160', '-1', '-1', '-1', '-1', '-1', '5.690', '-1', '-1', '-1', '11.360', '-1', '-1', '-1', '2.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('6', 'L-W-S-0001-0001-0002-0003', '1', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', '30m', '1', '6.750', '31.160', '-1', '-1', '-1', '-1', '-1', '6.690', '-1', '-1', '-1', '27.360', '-1', '-1', '-1', '3.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('7', 'L-W-D-0001-0001-0001-0001', '2', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-22', null, '3', '7.250', '1.160', '-1', '-1', '-1', '-1', '-1', '4.690', '-1', '-1', '-1', '12.360', '-1', '-1', '-1', '4.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('8', 'L-W-D-0001-0001-0001-0002', '2', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-22', null, '5', '7.360', '1.160', '-1', '-1', '-1', '-1', '-1', '25.690', '-1', '-1', '-1', '11.360', '-1', '-1', '-1', '2.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('9', 'L-W-D-0001-0001-0001-0003', '2', '2019-0001-0001-0001', '2019-0001-0001', '2019-04-22', null, '1', '8.350', '21.160', '-1', '-1', '-1', '-1', '-1', '6.690', '-1', '-1', '-1', '17.360', '-1', '-1', '-1', '23.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('10', 'L-W-D-0001-0001-0002-0001', '2', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', null, '3', '8.360', '1.160', '-1', '-1', '-1', '-1', '-1', '4.690', '-1', '-1', '-1', '12.360', '-1', '-1', '-1', '4.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('11', 'L-W-D-0001-0001-0002-0002', '2', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', null, '5', '9.390', '1.160', '-1', '-1', '-1', '-1', '-1', '5.690', '-1', '-1', '-1', '11.360', '-1', '-1', '-1', '2.960', '-1', '-1', '-1', '无');
INSERT INTO `sample_detector_water_info` VALUES ('12', 'L-W-D-0001-0001-0002-0003', '2', '2019-0001-0001-0002', '2019-0001-0001', '2019-04-22', null, '1', '6.960', '1.160', '-1', '-1', '-1', '-1', '-1', '6.690', '-1', '-1', '-1', '17.360', '-1', '-1', '-1', '3.960', '-1', '-1', '-1', '无');
SET FOREIGN_KEY_CHECKS=1;
