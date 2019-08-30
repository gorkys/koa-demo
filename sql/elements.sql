/*
Navicat MySQL Data Transfer

Source Server         : koa
Source Server Version : 50162
Source Host           : 127.0.0.1:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 50162
File Encoding         : 65001

Date: 2019-08-30 16:24:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for elements
-- ----------------------------
DROP TABLE IF EXISTS `elements`;
CREATE TABLE `elements` (
  `id` bigint(15) NOT NULL,
  `templateId` int(11) DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `zIndex` varchar(255) DEFAULT NULL,
  `locking` varchar(255) DEFAULT NULL,
  `active` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `templateId` (`templateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
