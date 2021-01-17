/*
 Navicat Premium Data Transfer

 Source Server         : guojufeng
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : first

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 17/01/2021 15:12:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class_info
-- ----------------------------
DROP TABLE IF EXISTS `class_info`;
CREATE TABLE `class_info` (
  `class_id` int NOT NULL AUTO_INCREMENT COMMENT '班级id',
  `class_name` varchar(30) NOT NULL COMMENT '班级名称',
  `create_date` date NOT NULL COMMENT '开学日期',
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of class_info
-- ----------------------------
BEGIN;
INSERT INTO `class_info` VALUES (2, '181', '2009-09-01');
INSERT INTO `class_info` VALUES (3, '182', '2010-09-01');
INSERT INTO `class_info` VALUES (4, '183', '2020-01-20');
INSERT INTO `class_info` VALUES (5, '184', '2021-12-12');
INSERT INTO `class_info` VALUES (6, '185', '2021-12-13');
COMMIT;

-- ----------------------------
-- Table structure for student_info
-- ----------------------------
DROP TABLE IF EXISTS `student_info`;
CREATE TABLE `student_info` (
  `student_id` int NOT NULL AUTO_INCREMENT COMMENT '学号，修改时需要id',
  `class_id` int DEFAULT NULL COMMENT '班级id',
  `student_name` varchar(20) NOT NULL COMMENT '姓名，最长20个字符',
  `age` int NOT NULL COMMENT '年龄，整数必填',
  `sex` bit(1) NOT NULL DEFAULT b'0' COMMENT '性别，0男1女，必填。bit类型长度无用了，最大64',
  `hobby` varchar(255) DEFAULT NULL COMMENT '爱好',
  `motto` text COMMENT '人生格言',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  PRIMARY KEY (`student_id`),
  KEY `class_id` (`class_id`),
  CONSTRAINT `student_info_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class_info` (`class_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of student_info
-- ----------------------------
BEGIN;
INSERT INTO `student_info` VALUES (1, 2, '小石头', 12, b'0', '唱歌', '静以修身，俭以养德', '15757904431');
INSERT INTO `student_info` VALUES (2, NULL, 'xing.org1^', 27, b'1', '画画', '不会设计的程序员不是好产品', '15127145555');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
