/*
Navicat MySQL Data Transfer

Source Server         : koa
Source Server Version : 50162
Source Host           : 127.0.0.1:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50162
File Encoding         : 65001

Date: 2019-08-30 16:24:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for template
-- ----------------------------
DROP TABLE IF EXISTS `template`;
CREATE TABLE `template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(255) DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `proTime` varchar(255) DEFAULT NULL,
  `resolution` varchar(255) DEFAULT NULL,
  `terminalType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
