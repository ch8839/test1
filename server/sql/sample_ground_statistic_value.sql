/*
Navicat MySQL Data Transfer

Source Server         : tank
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : tank

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2019-05-22 00:28:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sample_ground_statistic_value
-- ----------------------------
DROP TABLE IF EXISTS `sample_ground_statistic_value`;
CREATE TABLE `sample_ground_statistic_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statistic_value` varchar(255) DEFAULT NULL,
  `assess_type` int(11) DEFAULT NULL,
  `sample_cave` varchar(255) NOT NULL COMMENT '采样洞',
  `point_num` varchar(255) NOT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sample_ground_statistic_value
-- ----------------------------
INSERT INTO `sample_ground_statistic_value` VALUES ('1', 'max_value', '1', '2019-0001-0001-0001', '2019-0001-0001-0001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('2', 'max_value', '1', '2019-0001-0001-0002', '2019-0001-0001-0002', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('3', 'max_value', '1', 'MW-1', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('4', 'max_value', '1', 'MW-2', '31010720190001002', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('5', 'max_value', '1', 'MW-3', '31010720190001003', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('6', 'max_value', '1', 'MW-4', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('7', 'max_value', '1', 'MW-5', '31010720190001005', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('8', 'max_value', '1', 'MW-6', '31010720190001006', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('9', 'max_value', '1', 'SB-1', '31010720190001007', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('10', 'max_value', '1', 'SB-2', '31010720190001008', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('11', 'max_value', '1', 'SB-3', '31010720190001009', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('12', 'max_value', '1', 'SB-4', '31010720190001010', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('13', 'max_value', '1', 'SB-5', '31010720190001011', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('14', 'max_value', '1', 'SB-6', '31010720190001012', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('15', 'max_value', '1', 'SB-7', '31010720190001013', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('16', 'max_value', '2', '2019-0001-0001-0001', '2019-0001-0001-0001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('17', 'max_value', '2', '2019-0001-0001-0002', '2019-0001-0001-0002', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('18', 'max_value', '2', 'S1', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('19', 'max_value', '2', 'S2', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('20', 'max_value', '2', 'S3', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('21', 'max_value', '2', 'S4', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('22', 'max_value', '2', 'S2', '31010720190001003', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('23', 'max_value', '2', 'S9', '31010720190001003', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('24', 'max_value', '2', 'S5', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('25', 'max_value', '2', 'S7', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('26', 'max_value', '2', 'S8', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('27', 'max_value', '2', 'S9', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('28', 'max_value', '2', 'S4', '31010720190001007', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('29', 'max_value', '2', 'S6', '31010720190001007', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('30', 'max_value', '2', 'S7', '31010720190001007', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('31', 'max_value', '2', 'S6', '31010720190001009', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('32', 'max_value', '2', 'S7', '31010720190001009', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('33', 'max_value', '2', 'S8', '31010720190001009', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('34', 'mean_value', '1', '2019-0001-0001-0001', '2019-0001-0001-0001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('35', 'mean_value', '1', '2019-0001-0001-0002', '2019-0001-0001-0002', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('36', 'mean_value', '1', 'MW-1', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('37', 'mean_value', '1', 'MW-2', '31010720190001002', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('38', 'mean_value', '1', 'MW-3', '31010720190001003', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('39', 'mean_value', '1', 'MW-4', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('40', 'mean_value', '1', 'MW-5', '31010720190001005', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('41', 'mean_value', '1', 'MW-6', '31010720190001006', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('42', 'mean_value', '1', 'SB-1', '31010720190001007', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('43', 'mean_value', '1', 'SB-2', '31010720190001008', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('44', 'mean_value', '1', 'SB-3', '31010720190001009', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('45', 'mean_value', '1', 'SB-4', '31010720190001010', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('46', 'mean_value', '1', 'SB-5', '31010720190001011', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('47', 'mean_value', '1', 'SB-6', '31010720190001012', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('48', 'mean_value', '1', 'SB-7', '31010720190001013', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('49', 'mean_value', '2', '2019-0001-0001-0001', '2019-0001-0001-0001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('50', 'mean_value', '2', '2019-0001-0001-0002', '2019-0001-0001-0002', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('51', 'mean_value', '2', 'S1', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('52', 'mean_value', '2', 'S2', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('53', 'mean_value', '2', 'S3', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('54', 'mean_value', '2', 'S4', '31010720190001001', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('55', 'mean_value', '2', 'S2', '31010720190001003', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('56', 'mean_value', '2', 'S9', '31010720190001003', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('57', 'mean_value', '2', 'S5', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('58', 'mean_value', '2', 'S7', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('59', 'mean_value', '2', 'S8', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('60', 'mean_value', '2', 'S9', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('61', 'mean_value', '2', 'S4', '31010720190001007', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('62', 'mean_value', '2', 'S6', '31010720190001007', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('63', 'mean_value', '2', 'S7', '31010720190001007', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('64', 'mean_value', '2', 'S6', '31010720190001009', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('65', 'mean_value', '2', 'S7', '31010720190001009', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('66', 'mean_value', '2', 'S8', '31010720190001009', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('67', 'mean_value', '3', 'Ⅳ-CB5-1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('68', 'mean_value', '3', 'Ⅳ-CB5-2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('69', 'mean_value', '3', 'Ⅳ-D1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('70', 'mean_value', '3', 'Ⅳ-CB1-1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('71', 'mean_value', '3', 'Ⅳ-CB1-2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('72', 'mean_value', '3', 'Ⅳ-d2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('73', 'mean_value', '3', 'Ⅳ-CB2-1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('74', 'mean_value', '3', 'Ⅳ-CB2-2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('75', 'mean_value', '3', 'Ⅳ-D5', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('76', 'mean_value', '3', 'Ⅳ-CB4-1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('77', 'mean_value', '3', 'Ⅳ-CB4-2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('78', 'mean_value', '3', 'Ⅳ-D4', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('79', 'max_value', '3', 'Ⅳ-CB5-1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('80', 'max_value', '3', 'Ⅳ-CB5-2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('81', 'max_value', '3', 'Ⅳ-D1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('82', 'max_value', '3', 'Ⅳ-CB1-1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('83', 'max_value', '3', 'Ⅳ-CB1-2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('84', 'max_value', '3', 'Ⅳ-d2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('85', 'max_value', '3', 'Ⅳ-CB2-1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('86', 'max_value', '3', 'Ⅳ-CB2-2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('87', 'max_value', '3', 'Ⅳ-D5', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('88', 'max_value', '3', 'Ⅳ-CB4-1', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('89', 'max_value', '3', 'Ⅳ-CB4-2', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `sample_ground_statistic_value` VALUES ('90', 'max_value', '3', 'Ⅳ-D4', '31010720190001004', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
SET FOREIGN_KEY_CHECKS=1;
