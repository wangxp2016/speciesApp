/*
Navicat MySQL Data Transfer

Source Server         : liang
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : juyi

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2018-08-25 11:10:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '类目id',
  `cname` varchar(20) NOT NULL COMMENT '类目名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`id`,`cname`) values 

(1,'公司产品'),

(2,'公司案例'),

(3,'新闻中心');

/*Table structure for table `company` */

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '公司id',
  `name` varchar(50) NOT NULL COMMENT '公司名称',
  `adds` varchar(100) NOT NULL COMMENT '公司地址',
  `phone` varchar(100) NOT NULL COMMENT '公司电话',
  `email` varchar(100) NOT NULL COMMENT '公司邮箱',
  `location` varchar(100) NOT NULL COMMENT '公司坐标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `company` */

insert  into `company`(`id`,`name`,`adds`,`phone`,`email`,`location`) values 

(1,'Orthoptera Species Online Index Database','陕西师范大学','15100284122','xuan03121994@163.com','108.903499,34.158469');

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '客户id',
  `name` varchar(7) DEFAULT NULL COMMENT '客户姓名',
  `email` varchar(40) DEFAULT NULL COMMENT '客户邮箱',
  `phone` char(11) NOT NULL COMMENT '客户电话',
  `content` varchar(150) DEFAULT NULL COMMENT '客户留言',
  `reply` tinyint(1) unsigned NOT NULL COMMENT '联系状态',
  `time` int(10) unsigned NOT NULL COMMENT '添加用户时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `customer` */

insert  into `customer`(`id`,`name`,`email`,`phone`,`content`,`reply`,`time`) values 

(1,'无心','xuan03121994@163.com','15100274122','热爱世界，保护大自然保护地球保定动物',0,1531293512),

(2,'岳绮罗','1403190714@qq.com','18742179677','热爱地球，保护大自然，保护家园',0,1530498347),

(3,'月牙','liang4122@127.com','13341752809','保护家园，保护野生动物，热爱自然',0,1530498355),

(4,'顾玄武','gudaren8888@163.com','18122447875','保护自然热爱世界，热爱动物',0,1530498457),

(5,'张显宗','qiluo5201314@163.com','15126472819','保护世界保护大自然保护地球',0,1530498579),

(12,'梁景','xuan03121994@163.com','15100284122','',0,1534471081),

(13,'梁景','1403190714@qq.com','15100284122','测试1234',0,1534471131),

(14,'梁','xuan03121','15100285412','测试测试1122',0,1534499422),

(15,'梁景轩','xuan03121994@163.com','15100284122','咨询太阳能安装问题',1,1535164314);

/*Table structure for table `goods` */

DROP TABLE IF EXISTS `goods`;

CREATE TABLE `goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goods_name` varchar(20) NOT NULL COMMENT '商品名称',
  `goods_point` varchar(100) DEFAULT NULL COMMENT '商品卖点',
  `goods_pic` varchar(300) DEFAULT NULL COMMENT '商品图片',
  `goods_summary` varchar(500) DEFAULT NULL COMMENT '商品概述',
  `state` tinyint(1) unsigned NOT NULL COMMENT '商品上下架状态',
  `nice` tinyint(1) unsigned NOT NULL COMMENT '热门商品状态',
  `sid` int(10) unsigned NOT NULL COMMENT '类目外键',
  `goods_time` int(10) unsigned NOT NULL COMMENT '商品添加时间',
  `i` tinyint(1) unsigned NOT NULL COMMENT '商品类型',
  PRIMARY KEY (`id`,`goods_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `goods` */

/*Table structure for table `link` */

DROP TABLE IF EXISTS `link`;

CREATE TABLE `link` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `link` varchar(500) NOT NULL,
  `images` varchar(500) NOT NULL,
  `type` varchar(10) DEFAULT NULL,
  `createTime` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `link` */

insert  into `link`(`id`,`name`,`link`,`images`,`type`,`createTime`) values 

(1,'test','http://www.snnu.edu.cn/','/uploads/upload_30302b495772694bdb58c1f1031671f9.jpg','website','1573977845');

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '新闻id',
  `title` varchar(40) NOT NULL COMMENT '新闻标题',
  `time` int(10) unsigned NOT NULL COMMENT '新闻时间',
  `content` varchar(5000) NOT NULL COMMENT '新闻内容',
  `sid` int(11) NOT NULL COMMENT '类目外键',
  `state` tinyint(1) unsigned NOT NULL COMMENT '发布状态',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

/*Data for the table `news` */

insert  into `news`(`id`,`title`,`time`,`content`,`sid`,`state`,`uid`) values 

(25,'保护野生动物，热爱世界',1531466700,'<p>在野生动物保护工作的各个领域里，最直观、最感人，也最容易引发共鸣的，无疑是&ldquo;救助个体&rdquo;。看到一只伤愈的红隼重返蓝天，足以让每一个在场者热泪盈眶。</p>\n\n<p>但是，很容易被志愿者忽略的一点是，救助野生动物个体的价值往往并不在个体本身，而更多地在个体背后的整个种群。这和救助人类社会中的弱势个体是不同的。</p>\n\n<p>动物和人的差异很多，按照演化生物学家 <a href=\"http://www.guokr.com/article/66487/\" target=\"_blank\">道金斯</a> 等人的观点，最大的差异可能在于动物缺乏文化。在这里，文化的定义是&ldquo;与遗传无关、但可以模仿和传承的行为模式&rdquo;。</p>\n\n<p>人类社会中，文化因素正在逐渐压倒遗传生理的因素。我们对自我的改造能力越来越强，先天遗传素质的重要性也越来越小。当我们说 &ldquo;每个人都独一无二&rdquo; 的时候，这种独特性大部分来源于后天。而一个人对社会的贡献更是几乎全部来自文化领域：他的一生中会创造出无数的新思想和新事物，影响身边的每一个人；而当他死去时，哪怕他的血脉有后代来传承，那些未曾表达出来的无数思想也会永远消失。相比之下，他对人类的遗传贡献显得微不足道。</p>\n\n<p>然而，野生动物个体在环境中的绝大部分行为，都可以回溯到它的基因；个体间的文化传承即便存在，影响也通常微乎其微 <a href=\"#id12\">[1]</a> 。 如果两群狼面对同一场景做出了不同的反应，那是因为它们的遗传特征不同，而不是因为它们各自经历了不同的狼群历史、有不同的狼群文化。就算有动物因为和人相处而从人类这里习得了复杂的行为，当它回归野外时也几乎不可能把自己学会的 &ldquo;人类技巧&rdquo; 教给其它动物、改变原有的文化。一种不适应其所在环境的人类文化可以导致一个文明的毁灭，但动物界中的文化似乎从来没有这样巨大的效果。</p>\n\n<p>因此，野生动物的价值更多地承载于它的基因之中，种群本身的延续更为关键。个体的死亡是必然的，但基因通过种群基因库可以长存下去，维持物种的存在。 <strong>我们保护野生动物个体，更多是一种保护种群的手段，本身并非目的。</strong> 所以黄石公园才会引入狼来控制鹿的数量、来淘汰老弱病残。这样的行为在人类中无法想象，在自然界却是完全正常合理的；我们经常用人类的眼光去看野生动物，忘记了我们之间的客观差异。</p>\n\n<p>而假如一个物种本身并未濒危，那么刻意保护它们的个体，对整个物种也没有多少好处。如果我们出于其他理由、依然希望保护这些个体免于死亡的话，那就不属于狭义动物保护的范畴了。</p>\n\n<p><br />\n<br />\n作者：Ent<br />\n链接：https://www.guokr.com/article/89800/<br />\n来源：果壳<br />\n本文版权属于果壳网（guokr.com），禁止转载。如有需要，请联系sns@guokr.com</p>\n',2,1,36),

(26,'热爱大自然，保护野生动物',1531147200,'<p>在野生动物保护工作的各个领域里，最直观、最感人，也最容易引发共鸣的，无疑是&ldquo;救助个体&rdquo;。看到一只伤愈的红隼重返蓝天，足以让每一个在场者热泪盈眶。</p>\n\n<p>但是，很容易被志愿者忽略的一点是，救助野生动物个体的价值往往并不在个体本身，而更多地在个体背后的整个种群。这和救助人类社会中的弱势个体是不同的。</p>\n\n<p>动物和人的差异很多，按照演化生物学家 <a href=\"http://www.guokr.com/article/66487/\" target=\"_blank\">道金斯</a> 等人的观点，最大的差异可能在于动物缺乏文化。在这里，文化的定义是&ldquo;与遗传无关、但可以模仿和传承的行为模式&rdquo;。</p>\n\n<p>人类社会中，文化因素正在逐渐压倒遗传生理的因素。我们对自我的改造能力越来越强，先天遗传素质的重要性也越来越小。当我们说 &ldquo;每个人都独一无二&rdquo; 的时候，这种独特性大部分来源于后天。而一个人对社会的贡献更是几乎全部来自文化领域：他的一生中会创造出无数的新思想和新事物，影响身边的每一个人；而当他死去时，哪怕他的血脉有后代来传承，那些未曾表达出来的无数思想也会永远消失。相比之下，他对人类的遗传贡献显得微不足道。</p>\n\n<p>然而，野生动物个体在环境中的绝大部分行为，都可以回溯到它的基因；个体间的文化传承即便存在，影响也通常微乎其微 <a href=\"#id12\">[1]</a> 。 如果两群狼面对同一场景做出了不同的反应，那是因为它们的遗传特征不同，而不是因为它们各自经历了不同的狼群历史、有不同的狼群文化。就算有动物因为和人相处而从人类这里习得了复杂的行为，当它回归野外时也几乎不可能把自己学会的 &ldquo;人类技巧&rdquo; 教给其它动物、改变原有的文化。一种不适应其所在环境的人类文化可以导致一个文明的毁灭，但动物界中的文化似乎从来没有这样巨大的效果。</p>\n\n<p>因此，野生动物的价值更多地承载于它的基因之中，种群本身的延续更为关键。个体的死亡是必然的，但基因通过种群基因库可以长存下去，维持物种的存在。 <strong>我们保护野生动物个体，更多是一种保护种群的手段，本身并非目的。</strong> 所以黄石公园才会引入狼来控制鹿的数量、来淘汰老弱病残。这样的行为在人类中无法想象，在自然界却是完全正常合理的；我们经常用人类的眼光去看野生动物，忘记了我们之间的客观差异。</p>\n\n<p>而假如一个物种本身并未濒危，那么刻意保护它们的个体，对整个物种也没有多少好处。如果我们出于其他理由、依然希望保护这些个体免于死亡的话，那就不属于狭义动物保护的范畴了。</p>\n\n<p><br />\n<br />\n作者：Ent<br />\n链接：https://www.guokr.com/article/89800/<br />\n来源：果壳<br />\n本文版权属于果壳网（guokr.com），禁止转载。如有需要，请联系sns@guokr.com</p>\n',3,1,36),

(27,'热爱世界，热爱野生动物',1531147500,'<p>在野生动物保护工作的各个领域里，最直观、最感人，也最容易引发共鸣的，无疑是&ldquo;救助个体&rdquo;。看到一只伤愈的红隼重返蓝天，足以让每一个在场者热泪盈眶。</p>\n\n<p>但是，很容易被志愿者忽略的一点是，救助野生动物个体的价值往往并不在个体本身，而更多地在个体背后的整个种群。这和救助人类社会中的弱势个体是不同的。</p>\n\n<p>动物和人的差异很多，按照演化生物学家 <a href=\"http://www.guokr.com/article/66487/\" target=\"_blank\">道金斯</a> 等人的观点，最大的差异可能在于动物缺乏文化。在这里，文化的定义是&ldquo;与遗传无关、但可以模仿和传承的行为模式&rdquo;。</p>\n\n<p>人类社会中，文化因素正在逐渐压倒遗传生理的因素。我们对自我的改造能力越来越强，先天遗传素质的重要性也越来越小。当我们说 &ldquo;每个人都独一无二&rdquo; 的时候，这种独特性大部分来源于后天。而一个人对社会的贡献更是几乎全部来自文化领域：他的一生中会创造出无数的新思想和新事物，影响身边的每一个人；而当他死去时，哪怕他的血脉有后代来传承，那些未曾表达出来的无数思想也会永远消失。相比之下，他对人类的遗传贡献显得微不足道。</p>\n\n<p>然而，野生动物个体在环境中的绝大部分行为，都可以回溯到它的基因；个体间的文化传承即便存在，影响也通常微乎其微 <a href=\"#id12\">[1]</a> 。 如果两群狼面对同一场景做出了不同的反应，那是因为它们的遗传特征不同，而不是因为它们各自经历了不同的狼群历史、有不同的狼群文化。就算有动物因为和人相处而从人类这里习得了复杂的行为，当它回归野外时也几乎不可能把自己学会的 &ldquo;人类技巧&rdquo; 教给其它动物、改变原有的文化。一种不适应其所在环境的人类文化可以导致一个文明的毁灭，但动物界中的文化似乎从来没有这样巨大的效果。</p>\n\n<p>因此，野生动物的价值更多地承载于它的基因之中，种群本身的延续更为关键。个体的死亡是必然的，但基因通过种群基因库可以长存下去，维持物种的存在。 <strong>我们保护野生动物个体，更多是一种保护种群的手段，本身并非目的。</strong> 所以黄石公园才会引入狼来控制鹿的数量、来淘汰老弱病残。这样的行为在人类中无法想象，在自然界却是完全正常合理的；我们经常用人类的眼光去看野生动物，忘记了我们之间的客观差异。</p>\n\n<p>而假如一个物种本身并未濒危，那么刻意保护它们的个体，对整个物种也没有多少好处。如果我们出于其他理由、依然希望保护这些个体免于死亡的话，那就不属于狭义动物保护的范畴了。</p>\n\n<p><br />\n<br />\n作者：Ent<br />\n链接：https://www.guokr.com/article/89800/<br />\n来源：果壳<br />\n本文版权属于果壳网（guokr.com），禁止转载。如有需要，请联系sns@guokr.com</p>\n',2,1,36),

(28,'守护野生动物，守护大自然',1531147800,'<p>在野生动物保护工作的各个领域里，最直观、最感人，也最容易引发共鸣的，无疑是&ldquo;救助个体&rdquo;。看到一只伤愈的红隼重返蓝天，足以让每一个在场者热泪盈眶。</p>\n\n<p>但是，很容易被志愿者忽略的一点是，救助野生动物个体的价值往往并不在个体本身，而更多地在个体背后的整个种群。这和救助人类社会中的弱势个体是不同的。</p>\n\n<p>动物和人的差异很多，按照演化生物学家 <a href=\"http://www.guokr.com/article/66487/\" target=\"_blank\">道金斯</a> 等人的观点，最大的差异可能在于动物缺乏文化。在这里，文化的定义是&ldquo;与遗传无关、但可以模仿和传承的行为模式&rdquo;。</p>\n\n<p>人类社会中，文化因素正在逐渐压倒遗传生理的因素。我们对自我的改造能力越来越强，先天遗传素质的重要性也越来越小。当我们说 &ldquo;每个人都独一无二&rdquo; 的时候，这种独特性大部分来源于后天。而一个人对社会的贡献更是几乎全部来自文化领域：他的一生中会创造出无数的新思想和新事物，影响身边的每一个人；而当他死去时，哪怕他的血脉有后代来传承，那些未曾表达出来的无数思想也会永远消失。相比之下，他对人类的遗传贡献显得微不足道。</p>\n\n<p>然而，野生动物个体在环境中的绝大部分行为，都可以回溯到它的基因；个体间的文化传承即便存在，影响也通常微乎其微 <a href=\"#id12\">[1]</a> 。 如果两群狼面对同一场景做出了不同的反应，那是因为它们的遗传特征不同，而不是因为它们各自经历了不同的狼群历史、有不同的狼群文化。就算有动物因为和人相处而从人类这里习得了复杂的行为，当它回归野外时也几乎不可能把自己学会的 &ldquo;人类技巧&rdquo; 教给其它动物、改变原有的文化。一种不适应其所在环境的人类文化可以导致一个文明的毁灭，但动物界中的文化似乎从来没有这样巨大的效果。</p>\n\n<p>因此，野生动物的价值更多地承载于它的基因之中，种群本身的延续更为关键。个体的死亡是必然的，但基因通过种群基因库可以长存下去，维持物种的存在。 <strong>我们保护野生动物个体，更多是一种保护种群的手段，本身并非目的。</strong> 所以黄石公园才会引入狼来控制鹿的数量、来淘汰老弱病残。这样的行为在人类中无法想象，在自然界却是完全正常合理的；我们经常用人类的眼光去看野生动物，忘记了我们之间的客观差异。</p>\n\n<p>而假如一个物种本身并未濒危，那么刻意保护它们的个体，对整个物种也没有多少好处。如果我们出于其他理由、依然希望保护这些个体免于死亡的话，那就不属于狭义动物保护的范畴了。</p>\n\n<p><br />\n<br />\n作者：Ent<br />\n链接：https://www.guokr.com/article/89800/<br />\n来源：果壳<br />\n本文版权属于果壳网（guokr.com），禁止转载。如有需要，请联系sns@guokr.com</p>\n',1,1,36),

(29,'中储粮集团：4月以来未购美国大豆 南美大豆占比已超美国',1532070300,'<p>近期，中储粮集团公司紧密跟踪中美贸易摩擦相关情况，坚决执行国家对外贸易政策。自今年4月以来，中储粮未再新采购美国大豆，转而全部采购以巴西、阿根廷、乌拉圭为主的南美大豆。</p>\n\n<p>　　本报北京7月10日电 （记者杜海涛）&ldquo;近两年，我们已经主动调整进口来源地，降低集中度过高带来的风险，并已形成稳定成熟的多元化国际贸易渠道。&rdquo;中储粮集团公司相关负责人介绍，从中储粮集团油脂公司的情况看，2017年进口的大豆26.2%来自巴西，43.2%来自阿根廷、乌拉圭，30.6%来自美国。在大豆进口贸易实际操作中，采购方拥有货源地选择权，更倾向于选择贸易关系良好、有稳定政策预期、进口税率更低的大豆主产国。</p>\n\n<p>　　这位负责人表示，近期，中储粮集团公司紧密跟踪中美贸易摩擦相关情况，坚决执行国家对外贸易政策。自今年4月以来，中储粮未再新采购美国大豆，转而全部采购以巴西、阿根廷、乌拉圭为主的南美大豆。</p>\n\n<p>　　根据中国海关统计，我国大豆进口来源呈现多元化趋势，南美大豆供给占比超过美国。2016&mdash;2017年度，我国大豆进口量9349万吨，其中巴西4534万吨，占48.5%，较三年前增加1.7个百分点；美国3684万吨，占39.4%，较三年前下降1个百分点。以南美为主的非美大豆进口已经占到我国大豆进口量的六成以上，且呈稳定增长趋势。未来，南美将越来越成为我国进口大豆供应的主力地区。</p>\n\n<p>　　中储粮集团公司相关负责人表示，当前我国油脂油料储备体系完善，储备资源充足，加工和流通配套能力良好，能够随时响应保证供应、稳定市场的调控指令，储备资源充足，流通能力良好。</p>\n\n<p>　　&ldquo;中储粮集团在布局油脂油料储备时，遵循市场流通的规律，将储备库与加工厂一体布局，形成油脂油料储备和加工基地，使储备轮出到加工的链条缩短、效率提高。目前，中储粮年油脂压榨能力达到650万吨，成为参与市场供应的重要主体。由于与储备结合，在原料供应更有保障的同时，储备投放市场更加高效，维护市场稳定的能力更强。&rdquo;这位负责人说。</p>\n',3,1,36),

(30,'大自然保护协会',1531293512,'<p><a href=\"https://www.baidu.com/s?wd=%E5%A4%A7%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%8D%8F%E4%BC%9A&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">大自然保护协会</a>The Nature Conservancy (TNC) 是从事生态环境保护的国际民间组织，成立于1951年，总部设在<a href=\"https://www.baidu.com/s?wd=%E7%BE%8E%E5%9B%BD%E5%8D%8E%E7%9B%9B%E9%A1%BF&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">美国华盛顿</a>。协会的使命是：通过保护代表地球<a href=\"https://www.baidu.com/s?wd=%E7%94%9F%E7%89%A9%E5%A4%9A%E6%A0%B7%E6%80%A7&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">生物多样性</a>的动物、植物和自然群落赖以生存的陆地和水域，来实现对这些动物、植物和自然群落的保护。 由于坚持采取合作而非对抗性的策略，以及用科学的原理和方法来指导保护行动，经过50余年的不懈努力，协会已跻身美国十大慈善机构行列，位居全球生态环境保护非营利民间组织前茅。目前仅美国本土而言，协会拥有1600多个自然保护区，总面积达1400万英亩，遍布50个州。并与合作伙伴一起在<a href=\"https://www.baidu.com/s?wd=%E6%8B%89%E4%B8%81%E7%BE%8E%E6%B4%B2&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">拉丁美洲</a>、<a href=\"https://www.baidu.com/s?wd=%E5%8A%A0%E5%8B%92%E6%AF%94%E6%B5%B7&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">加勒比海</a>，以及亚太等30个国家管护着超过1.02x108英亩的<a href=\"https://www.baidu.com/s?wd=%E7%94%9F%E7%89%A9%E5%A4%9A%E6%A0%B7%E6%80%A7&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">生物多样性</a>热点地区。协会在全球设有400个办公室，员工人数达3800名，拥有会员上百万，约20000名志愿者参与服务。 1997年，协会开始进入中国。经前期全面考察，并在科学论证的基础上，最终将云南滇西北选定为协会在中国的<a href=\"https://www.baidu.com/s?wd=%E7%94%9F%E7%89%A9%E5%A4%9A%E6%A0%B7%E6%80%A7&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">生物多样性</a>保护的首要 实施地。在与<a href=\"https://www.baidu.com/s?wd=%E4%BA%91%E5%8D%97%E7%9C%81%E6%94%BF%E5%BA%9C&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">云南省政府</a>合作编制了&ldquo;滇西北保护与发展行动计划&rdquo;之后，协会在滇西北的老君山、拉市海、<a href=\"https://www.baidu.com/s?wd=%E6%A2%85%E9%87%8C%E9%9B%AA%E5%B1%B1&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">梅里雪山</a>、<a href=\"https://www.baidu.com/s?wd=%E9%A6%99%E6%A0%BC%E9%87%8C%E6%8B%89&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">香格里拉</a>和<a href=\"https://www.baidu.com/s?wd=%E9%AB%98%E9%BB%8E%E8%B4%A1%E5%B1%B1&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">高黎贡山</a>北段开展并实施了一些具体的保护项目。北京办公室的设立，标志着协会在中国更大范围内开展生物多样性保护工作。 经过短短几年的努力，<a href=\"https://www.baidu.com/s?wd=%E5%A4%A7%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%8D%8F%E4%BC%9A&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">大自然保护协会</a>在中国逐渐成长壮大，成为民间生态环境保护队伍中的重要力量，为生态环境保护事业做出了贡献。</p>\n',3,1,37);

/*Table structure for table `species` */

DROP TABLE IF EXISTS `species`;

CREATE TABLE `species` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_m` varchar(100) NOT NULL,
  `suborder` varchar(100) NOT NULL,
  `superfamily` varchar(100) NOT NULL,
  `family` varchar(100) NOT NULL,
  `subfamily` varchar(100) NOT NULL,
  `genus` varchar(100) NOT NULL,
  `species` varchar(100) NOT NULL,
  `linkAddr` varchar(500) DEFAULT NULL,
  `introduction` varchar(2048) DEFAULT NULL,
  `introduction_img` varchar(500) DEFAULT NULL,
  `habitat` varchar(2048) DEFAULT NULL,
  `habitat_img` varchar(500) DEFAULT NULL,
  `distribution_img` varchar(500) DEFAULT NULL,
  `distribution` varchar(2048) DEFAULT NULL,
  `morphology_img` varchar(500) DEFAULT NULL,
  `body_color` varchar(500) DEFAULT NULL,
  `body_length_male` varchar(500) DEFAULT NULL,
  `body_length_female` varchar(500) DEFAULT NULL,
  `forewing_length_male` varchar(500) DEFAULT NULL,
  `forewing_length_female` varchar(500) DEFAULT NULL,
  `hindFemur_length_male` varchar(500) DEFAULT NULL,
  `hindFemur_length_female` varchar(500) DEFAULT NULL,
  `pronotum_length_male` varchar(500) DEFAULT NULL,
  `pronotum_length_female` varchar(500) DEFAULT NULL,
  `nucleus_male` varchar(500) DEFAULT NULL,
  `nucleus_female` varchar(500) DEFAULT NULL,
  `literature` varchar(2048) DEFAULT NULL,
  `species_time` varchar(500) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `keyWord` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=307 DEFAULT CHARSET=utf8;

/*Data for the table `species` */

insert  into `species`(`id`,`order_m`,`suborder`,`superfamily`,`family`,`subfamily`,`genus`,`species`,`linkAddr`,`introduction`,`introduction_img`,`habitat`,`habitat_img`,`distribution_img`,`distribution`,`morphology_img`,`body_color`,`body_length_male`,`body_length_female`,`forewing_length_male`,`forewing_length_female`,`hindFemur_length_male`,`hindFemur_length_female`,`pronotum_length_male`,`pronotum_length_female`,`nucleus_male`,`nucleus_female`,`literature`,`species_time`,`remark`,`keyWord`) values 

(1,'orthoptera','Caelifera','Acridoidea','Acrididae','Acridinae','Fruhstorferiola','Fruhstorferiola_tonkinensis','','','','','','','','','','','','','','','','','','','','','','',''),

(2,'orthoptera','Caelifera','Acridoidea','Acrididae','Acridinae','Acrida ','Acrida cinerea','','','','','','','','','','','','','','','','','','','','','','',''),

(3,'orthoptera','Caelifera','Acridoidea','Acrididae','Acridinae','Acrida','Acrida willemsei','','','','','','','','','','','','','','','','','','','','','','',''),

(4,'orthoptera','Caelifera','Acridoidea','Acrididae','Calliptaminae','Calliptamus','Calliptamus abbreviatus','','','','','','','','','','','','','','','','','','','','','','',''),

(5,'orthoptera','Caelifera','Acridoidea','Acrididae','Calliptaminae','Calliptamus','Calliptamus italicus','','','','','','','','','','','','','','','','','','','','','','',''),

(6,'orthoptera','Caelifera','Acridoidea','Acrididae','Calliptaminae','Peripolus','Peripolus nepalensis','','','','','','','','','','','','','','','','','','','','','','',''),

(7,'orthoptera','Caelifera','Acridoidea','Acrididae','Catantopinae','Choroedocus','Choroedocus violaceipes','','','','','','','','','','','','','','','','','','','','','','',''),

(8,'orthoptera','Caelifera','Acridoidea','Acrididae','Catantopinae','Longchuanacris','Longchuanacris curvifurculus','','','','','','','','','','','','','','','','','','','','','','',''),

(9,'orthoptera','Caelifera','Acridoidea','Acrididae','Catantopinae','Ognevia','Ognevia longipennis','','','','','','','','','','','','','','','','','','','','','','',''),

(10,'orthoptera','Caelifera','Acridoidea','Acrididae','Catantopinae','Prumna','Prumna arctica','','','','','','','','','','','','','','','','','','','','','','',''),

(11,'orthoptera','Caelifera','Acridoidea','Acrididae','Catantopinae','Traulia','Traulia minuta','','','','','','','','','','','','','','','','','','','','','','',''),

(12,'orthoptera','Caelifera','Acridoidea','Acrididae','Catantopinae','Traulia','Traulia szetschuanensis','','','','','','','','','','','','','','','','','','','','','','',''),

(13,'orthoptera','Caelifera','Acridoidea','Acrididae','Catantopinae','Xenocatantops','Xenocatantops brachycerus','','','','','','','','','','','','','','','','','','','','','','',''),

(14,'orthoptera','Caelifera','Acridoidea','Acrididae','Cyrtacanthacridinae','Chondracris','Chondracris rosea','','','','','','','','','','','','','','','','','','','','','','',''),

(15,'orthoptera','Caelifera','Acridoidea','Acrididae','Cyrtacanthacridinae','Nomadacris','Nomadacris japonica','','','','','','','','','','','','','','','','','','','','','','',''),

(16,'orthoptera','Caelifera','Acridoidea','Acrididae','Cyrtacanthacridinae','Schistocerca','Schistocerca gregaria gregaria','','','','','','','','','','','','','','','','','','','','','','',''),

(17,'orthoptera','Caelifera','Acridoidea','Acrididae','Eyprepocnemidinae','Shirakiacris','Shirakiacris shirakii','','','','','','','','','','','','','','','','','','','','','','',''),

(18,'orthoptera','Caelifera','Acridoidea','Acrididae','Gomphocerinae','Arcyptera','Arcyptera coreana','','','','','','','','','','','','','','','','','','','','','','',''),

(19,'orthoptera','Caelifera','Acridoidea','Acrididae','Gomphocerinae','Bryodema','Bryodema luctuosum luctuosum','','','','','','','','','','','','','','','','','','','','','','',''),

(20,'orthoptera','Caelifera','Acridoidea','Pamphagidae','Thrinchinae','Filchnerella','Filchnerella helanshanensis','','','','','','','','','','','','','','','','','','','','','','',''),

(21,'orthoptera','Caelifera','Acridoidea','Pamphagidae','Thrinchinae','Pseudotmethis','Pseudotmethis rubimarginis','','','','','','','','','','','','','','','','','','','','','','',''),

(22,'orthoptera','Caelifera','Acridoidea','Pamphagidae','Thrinchinae','Sinotmethis','Sinotmethis brachypterus','','','','','','','','','','','','','','','','','','','','','','',''),

(23,'orthoptera','Caelifera','Acridoidea','Pamphagidae','Thrinchinae','Asiotmethis','Asiotmethis jubatus','','','','','','','','','','','','','','','','','','','','','','',''),

(24,'orthoptera','Caelifera','Acridoidea','Pamphagidae','Thrinchinae','Asiotmethis','Asiotmethis zacharjini','','','','','','','','','','','','','','','','','','','','','','',''),

(25,'orthoptera','Caelifera','Acridoidea','Pamphagidae','Thrinchinae','Thrinchus','Thrinchus schrenkii','','','','','','','','','','','','','','','','','','','','','','',''),

(27,'orthoptera','Caelifera','Acridoidea','Pyrgomorphidae','Pyrgomorphinae','Atractomorpha','Atractomorpha sinensis','','','','','','','','','','','','','','','','','','','','','','',''),

(28,'orthoptera','Caelifera','Acridoidea','Pyrgomorphidae','Pyrgomorphinae','Mekongiana','Mekongiana xiangchengensis','','','','','','','','','','','','','','','','','','','','','','',''),

(29,'orthoptera','Caelifera','Acridoidea','Gryllidae','Gryllinae','Teleogryllus','Teleogryllus oceanicus','','','','','','','','','','','','','','','','','','','','','','',''),

(30,'orthoptera','Caelifera','Acridoidea','Gryllidae','Gryllinae','Teleogryllus','Teleogryllus commodus','','','','','','','','','','','','','','','','','','','','','','',''),

(31,'orthoptera','Caelifera','Acridoidea','Gryllidae','Gryllinae','Velarifictorus','Velarifictorus hemelytrus','','','','','','','','','','','','','','','','','','','','','','',''),

(33,'orthoptera','Caelifera','Acridoidea','Gryllidae','Oecanthinae','Oecanthus','Oecanthus sinensis','','','','','','','','','','','','','','','','','','','','','','',''),

(34,'orthoptera','Caelifera','Acridoidea','Gryllidae','Podoscirtinae','Truljalia','Truljalia hibinonis','','','','','','','','','','','','','','','','','','','','','','',''),

(35,'orthoptera','Caelifera','Pneumoroidea','Pneumoridae','Pneumorinae','Physemacris','Physemacris variolosa','','','','','','','','','','','','','','','','','','','','','','',''),

(36,'orthoptera','Caelifera','Eumastacoidea','Chorotypidae','Chorotypinae','Chorotypus','Chorotypus fenestratus','','','','','','','','','','','','','','','','','','','','','','',''),

(37,'orthoptera','Caelifera','Eumastacoidea','Chorotypidae','Erianthinae','Erianthus','Erianthus versicolor','','','','','','','','','','','','','','','','','','','','','','',''),

(38,'orthoptera','Caelifera','Eumastacoidea','Episactidae','Episactinae','Pielomastax','Pielomastax zhengi','','','','','','','','','','','','','','','','','','','','','','',''),

(39,'orthoptera','Caelifera','Eumastacoidea','Eumastacidae','Paramastacinae','Paramastax','Paramastax nigra','','','','','','','','','','','','','','','','','','','','','','',''),

(40,'orthoptera','Caelifera','Eumastacoidea','Thericleidae','Thericleinae','Pseudothericles','Pseudothericles compressifrons','','','','','','','','','','','','','','','','','','','','','','',''),

(41,'orthoptera','Caelifera','Proscopioidea','Proscopiidae','Proscopiinae','Proscopia','Proscopia sp.','','','','','','','','','','','','','','','','','','','','','','',''),

(44,'orthoptera','Ensifera','Grylloidea','Trigonidiidae','Trigonidiinae','Trigonidium','Trigonidium sjostedti','','','','','','','','','','','','','','','','','','','','','','',''),

(45,'orthoptera','Ensifera','Gryllotalpoidea','Myrmecophilidae','Myrmecophilinae','Myrmecophilus','Myrmecophilus manni','','','','','','','','','','','','','','','','','','','','','','',''),

(46,'orthoptera','Ensifera','Gryllotalpoidea','Gryllotalpidae','Gryllotalpinae','Gryllotalpa','Gryllotalpa orientalis','','','','','','','','','','','','','','','','','','','','','','',''),

(47,'orthoptera','Ensifera','Gryllotalpoidea','Gryllotalpidae','Gryllotalpinae','Gryllotalpa','Gryllotalpa pluvialis','','','','','','','','','','','','','','','','','','','','','','',''),

(48,'orthoptera','Ensifera','Gryllotalpoidea','Gryllotalpidae','Gryllotalpinae','Gryllotalpa','Gryllotalpa unispina','','','','','','','','','','','','','','','','','','','','','','',''),

(49,'orthoptera','Ensifera','Hagloidea','Prophalangopsidae','Cyphoderrinae','Cyphoderris','Cyphoderris monstrosa','','','','','','','','','','','','','','','','','','','','','','',''),

(50,'orthoptera','Ensifera','Hagloidea','Prophalangopsidae','Prophalangopsinae','Tarragoilus','Tarragoilus diuturnus','','','','','','','','','','','','','','','','','','','','','','',''),

(51,'orthoptera','Ensifera','Rhaphidophoroidea','Rhaphidophoridae','Aemodogryllinae','Diestramima','Diestramima sp.\r','','','','','','','','','','','','','','','','','','','','','','',''),

(306,'Test','Ss','Dd','Aa','Rr','Ff','Gg','http:www.baidu.com','<p>To see information contained in the database, use the links across the top of the page. &nbsp;Click on Search to find a specific taxon or other kinds of information. &nbsp;Clicking on Taxa will make the order Orthoptera your current taxon unless you have previously moved to a different taxon in this session.</p>\n','/uploads/upload_050bcedf32219cd670d814ced27d9f85.jpg','<p>The Orthoptera Species File is a taxonomic database of the world&#39;s Orthoptera (grasshoppers, locusts, katydids and crickets), both living and fossil. It has full synonymic and taxonomic information for more than 28,410 valid species, 46,460 scientific names, 220,300 citations to 14,700 references, 103,100 images, 1700 sound recordings, and 101,800 specimen records.<br />\n&nbsp;</p>\n','/uploads/upload_3e52f067262cac912ed4efad449985ea.jpg,/uploads/upload_a00ddcef1324e80603aba6917a95cde1.jpg,/uploads/upload_3be3096d6a3df5e81b778de85f34e584.jpg,/uploads/upload_c4868a0db7a120f5c4d8af8b4774ac7c.jpg,/uploads/upload_546080b2e1211aad91cf8600548b87df.jpg,/uploads/upload_a26882fe2528c01a9dab56b022065dea.jpg,/uploads/upload_d5179ca82b7f97159b5fe4e546ef1271.jpg','/uploads/upload_bd67fe7c155b990f3a506e47d23a019c.jpg','To see information contained in the database, use the links across the top of the page.  Click on Search to find a specific taxon or other kinds of information.  Clicking on Taxa will make the order Orthoptera your current taxon unless you have previously moved to a different taxon in this session.','/uploads/upload_3ebd9be244e99bef31f43ac477161a92.jpg,/uploads/upload_b4c46475f481051ac134b459108a2bdf.jpg','<p>To see information contained in the database, use the links across the top of the page. &nbsp;Click on Search to find a specific taxon or other kinds of information. &nbsp;Clicking on Taxa will make the order Orthoptera your current taxon unless you have previously moved to a different taxon in this session.</p>\n','22','66','77','88','99','99','99','99','99','3','test||test444','1573988767','test','G');

/*Table structure for table `subcategory` */

DROP TABLE IF EXISTS `subcategory`;

CREATE TABLE `subcategory` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '子类目id',
  `sname` varchar(20) NOT NULL,
  `cid` int(10) unsigned NOT NULL COMMENT '父类id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `subcategory` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` char(10) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '用户密码',
  `roles` varchar(100) NOT NULL COMMENT '用户权限',
  `tel` char(11) NOT NULL COMMENT '用户电话',
  `rolesType` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`,`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`roles`,`tel`,`rolesType`) values 

(1,'管理员','ae2d874fe06430805b3fa7e61ae7f46d','管理员','15567772021','admin'),

(2,'普通用户','ae2d874fe06430805b3fa7e61ae7f46d','普通用户','15100284122',NULL);

/*Table structure for table `websiteinfo` */

DROP TABLE IF EXISTS `websiteinfo`;

CREATE TABLE `websiteinfo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '网站信息id',
  `logo` varchar(300) DEFAULT NULL COMMENT '网站logo图片路径',
  `brand` varchar(2048) DEFAULT NULL COMMENT '网站品牌介绍',
  `sales` varchar(300) DEFAULT NULL COMMENT '网站活动宣传图片路径',
  `adinfo` varchar(1000) DEFAULT NULL COMMENT '轮播图信息',
  `adpics` varchar(300) DEFAULT NULL COMMENT '轮播图路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `websiteinfo` */

insert  into `websiteinfo`(`id`,`logo`,`brand`,`sales`,`adinfo`,`adpics`) values 

(16,'/uploads/upload_e414a40f237129d93b0c6721dae6f35b.jpg','{\"brandInfo\":\"Orthoptera Species Online Index Database\",\"speciesInfo\":\"The Orthoptera Species File is a taxonomic database of the world Orthoptera (grasshoppers, locusts, katydids and crickets), both living and fossil. It has full synonymic and taxonomic information for more than 28,410 valid species, 46,460 scientific names, 220,300 citations to 14,700 references, 103,100 images, 1700 sound recordings, and 101,800 specimen records. \\n To see information contained in the database, use the links across the top of the page.  Click on Search to find a specific taxon or other kinds of information.  Clicking on Taxa will make the order Orthoptera your current taxon unless you have previously moved to a different taxon in this session.\"}','/uploads/upload_28e4d822637ee47fa520b38fff9bbaa6.jpg,/uploads/upload_28fcda9ed5622100b7a9eb05e6c52b2b.jpg,/uploads/upload_56d65684f15933d5f484d73dd2937aa5.jpg','[{\"id\":\"0\",\"title\":\"轮播图标题1\",\"info\":\"轮播图文字描述测试1轮播图文字描述测试1轮播图文字描述测试1\",\"href\":\"/goods\",\"pic\":\"/uploads/upload_8488908d27cd2a734d57d6ddbba89e78.jpg\"},{\"id\":\"1\",\"title\":\"轮播图标题2\",\"info\":\"轮播图文字描述测试2轮播图文字描述测试2轮播图文字描述测试2\",\"href\":\"/goods\",\"pic\":\"/uploads/upload_afaee6a86d99178582911c3580bf7742.jpg\"},{\"id\":\"2\",\"title\":\"轮播图标题3\",\"info\":\"轮播图文字描述测试3轮播图文字描述测试3轮播图文字描述测试3\",\"href\":\"/goods\",\"pic\":\"/uploads/upload_73b7a50a6de2aa4894156c568294d6e5.jpg\"},{\"id\":\"3\",\"title\":\"轮播图标题4\",\"info\":\"轮播图文字描述测试4轮播图文字描述测试4轮播图文字描述测试4\",\"href\":\"/goods\",\"pic\":\"/uploads/upload_ef520c9cf5a4bee34046257538a50798.jpg\"}]','/uploads/upload_8488908d27cd2a734d57d6ddbba89e78.jpg,/uploads/upload_afaee6a86d99178582911c3580bf7742.jpg,/uploads/upload_73b7a50a6de2aa4894156c568294d6e5.jpg,/uploads/upload_ef520c9cf5a4bee34046257538a50798.jpg');

/*Table structure for table `websitelog` */

DROP TABLE IF EXISTS `websitelog`;

CREATE TABLE `websitelog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '日志id',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  `info` varchar(100) NOT NULL COMMENT '修改信息',
  `time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

/*Data for the table `websitelog` */

insert  into `websitelog`(`id`,`uid`,`info`,`time`) values 

(2,36,'修改了网站logo图片。',1535096511),

(3,36,'修改了广告轮播图片信息。',1535096576),

(4,36,'编辑了网站品牌介绍信息。',1535096595),

(5,36,'修改了活动宣传的图片。',1535096622),

(11,36,'编辑了网站品牌介绍信息。',1535098356),

(12,37,'编辑了网站品牌介绍信息。',1535098601),

(13,36,'编辑了网站品牌介绍信息。',1573971643),

(14,36,'修改了广告轮播图片信息。',1573972773),

(15,36,'编辑了网站品牌介绍信息。',1573973544),

(16,36,'编辑了网站品牌介绍信息。',1573974945),

(17,36,'编辑了网站品牌介绍信息。',1573975056),

(18,36,'编辑了网站品牌介绍信息。',1573975142),

(19,36,'编辑了网站品牌介绍信息。',1573975491),

(20,36,'编辑了网站品牌介绍信息。',1573976017),

(21,36,'编辑了网站品牌介绍信息。',1573976309),

(22,36,'修改了网站logo图片。',1573976347);
