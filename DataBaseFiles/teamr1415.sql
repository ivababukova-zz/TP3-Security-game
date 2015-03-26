-- Team R 2014-15
-- TP3 - Security Game Project
-- Database dump for 3ncrypt
-- Author: BKenny
--
-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2015 at 09:37 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `teamr1415`
--

-- --------------------------------------------------------

--
-- Table structure for table `answersafter`
--

CREATE TABLE IF NOT EXISTS `answersafter` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timecompleted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `a1` varchar(300) NOT NULL,
  `a2` varchar(300) NOT NULL,
  `a3` varchar(10) NOT NULL,
  `a4` varchar(10) NOT NULL,
  `a5` varchar(10) NOT NULL,
  `a6` varchar(10) NOT NULL,
  `a7` varchar(10) NOT NULL,
  `a8` varchar(10) NOT NULL,
  `a9` varchar(3) NOT NULL,
  `a10` varchar(25) NOT NULL,
  `a11` varchar(25) NOT NULL,
  `a12` varchar(25) NOT NULL,
  `a13` varchar(25) NOT NULL,
  `a14` varchar(25) NOT NULL,
  `a15` varchar(25) NOT NULL,
  `a16` varchar(25) NOT NULL,
  `a17` varchar(300) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`timecompleted`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `answersbefore`
--

CREATE TABLE IF NOT EXISTS `answersbefore` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timecompleted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `a1` varchar(50) NOT NULL,
  `a2` varchar(10) NOT NULL,
  `a3` varchar(3) NOT NULL,
  `a4` varchar(3) NOT NULL,
  `a5` varchar(3) NOT NULL,
  `a6` varchar(3) NOT NULL,
  `a7` varchar(3) NOT NULL,
  `a8` varchar(3) NOT NULL,
  `a9` varchar(3) NOT NULL,
  `a10` varchar(3) NOT NULL,
  `a11` varchar(15) NOT NULL,
  `a12` varchar(15) NOT NULL,
  `a13` varchar(15) NOT NULL,
  `a14` varchar(15) NOT NULL,
  `a15` varchar(15) NOT NULL,
  `a16` varchar(3) NOT NULL,
  `a17` varchar(3) NOT NULL,
  `a18` varchar(3) NOT NULL,
  `a19` varchar(3) NOT NULL,
  `a20` varchar(3) NOT NULL,
  `a21` varchar(3) NOT NULL,
  `a22` varchar(3) NOT NULL,
  `a23` varchar(3) NOT NULL,
  `a24` varchar(3) NOT NULL,
  `a25` varchar(3) NOT NULL,
  `a26` varchar(3) NOT NULL,
  `a27` varchar(3) NOT NULL,
  `a28` varchar(3) NOT NULL,
  `a29` varchar(3) NOT NULL,
  `a30` varchar(3) NOT NULL,
  `a31` varchar(3) NOT NULL,
  `a32` varchar(3) NOT NULL,
  `a33` varchar(50) NOT NULL,
  `a34` varchar(50) NOT NULL,
  `a35` varchar(50) NOT NULL,
  `a36` varchar(50) NOT NULL,
  `a37` varchar(50) NOT NULL,
  `a38` varchar(50) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`timecompleted`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `doors`
--

CREATE TABLE IF NOT EXISTS `doors` (
  `did` int(11) NOT NULL,
  `polid` int(11) NOT NULL,
  PRIMARY KEY (`did`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `educationalinfo`
--

CREATE TABLE IF NOT EXISTS `educationalinfo` (
  `cid` int(11) NOT NULL,
  `content` varchar(2500) NOT NULL,
  `approxtimetoread` int(11) NOT NULL COMMENT 'time in seconds',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `gamesessions`
--

CREATE TABLE IF NOT EXISTS `gamesessions` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `starttime` timestamp NULL DEFAULT NULL,
  `endtime` timestamp NULL DEFAULT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=57 ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `newedinfopasswordentropy`
--
CREATE TABLE IF NOT EXISTS `newedinfopasswordentropy` (
`uid` int(11)
,`sid` int(11)
,`gaid` int(11)
,`timestamp` timestamp
,`entropy` float
,`pid` int(11)
,`cid` int(11)
,`Content` text
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `newviewentropyanalysis`
--
CREATE TABLE IF NOT EXISTS `newviewentropyanalysis` (
`uid` int(11)
,`sid` int(11)
,`gaid` int(11)
,`timestamp` timestamp
,`entropy` float
,`pid` int(11)
);
-- --------------------------------------------------------

--
-- Table structure for table `passwords`
--

CREATE TABLE IF NOT EXISTS `passwords` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `stringrep` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `entropy` float NOT NULL,
  `firstentered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `length` int(11) NOT NULL,
  `lastused` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `timesused` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pid`),
  UNIQUE KEY `stringrep` (`stringrep`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=459 ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `passwordswithedinform`
--
CREATE TABLE IF NOT EXISTS `passwordswithedinform` (
`uid` int(11)
,`sid` int(11)
,`gaid` int(11)
,`timestamp` timestamp
,`entropy` double
,`pid` bigint(20)
);
-- --------------------------------------------------------

--
-- Table structure for table `policies`
--

CREATE TABLE IF NOT EXISTS `policies` (
  `polid` int(11) NOT NULL,
  `colour` varchar(15) NOT NULL,
  `lengthreq` int(11) NOT NULL,
  `numsreq` int(11) NOT NULL,
  `lowersreq` int(11) NOT NULL,
  `uppersreq` int(11) NOT NULL,
  `nonalphnumsreq` int(11) NOT NULL,
  PRIMARY KEY (`polid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `testviewforexport`
--
CREATE TABLE IF NOT EXISTS `testviewforexport` (
`uid` int(11)
,`sid` int(11)
,`gaid` int(11)
,`timestamp` timestamp
,`entropy` float
,`pid` int(11)
);
-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE IF NOT EXISTS `tools` (
  `tid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `emailadd` varchar(150) DEFAULT NULL,
  `q1` int(11) NOT NULL DEFAULT '0',
  `q2` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `emailadd` (`emailadd`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

-- --------------------------------------------------------

--
-- Table structure for table `useredinforeads`
--

CREATE TABLE IF NOT EXISTS `useredinforeads` (
  `timeclosed` timestamp NULL DEFAULT NULL,
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timeopened` timestamp NULL DEFAULT NULL,
  `usedredid` int(11) NOT NULL AUTO_INCREMENT,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`usedredid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `userfailedpasswordattempts`
--

CREATE TABLE IF NOT EXISTS `userfailedpasswordattempts` (
  `pid` int(11) NOT NULL,
  `did` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usergameattempts`
--

CREATE TABLE IF NOT EXISTS `usergameattempts` (
  `gaid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `starttime` timestamp NULL DEFAULT NULL,
  `endtime` timestamp NULL DEFAULT NULL,
  `success` tinyint(11) NOT NULL,
  `overallscore` int(11) NOT NULL,
  PRIMARY KEY (`gaid`,`uid`,`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userpasswordsresets`
--

CREATE TABLE IF NOT EXISTS `userpasswordsresets` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `did` int(11) NOT NULL,
  `penalty` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`did`,`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `usersbadpwdentries`
--

CREATE TABLE IF NOT EXISTS `usersbadpwdentries` (
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `did` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usersdoorsvisits`
--

CREATE TABLE IF NOT EXISTS `usersdoorsvisits` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `did` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`did`,`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userseducationalinfocollected`
--

CREATE TABLE IF NOT EXISTS `userseducationalinfocollected` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `timecollected` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`timecollected`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `usersgamesessions`
--

CREATE TABLE IF NOT EXISTS `usersgamesessions` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `difficulty` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`uid`,`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `usersnotesaccessed`
--

CREATE TABLE IF NOT EXISTS `usersnotesaccessed` (
  `unaid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timeopened` timestamp NULL DEFAULT NULL,
  `timeclosed` timestamp NULL DEFAULT NULL,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`unaid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

-- --------------------------------------------------------

--
-- Table structure for table `usersnotestaken`
--

CREATE TABLE IF NOT EXISTS `usersnotestaken` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `note` varchar(300) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`time`,`gaid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userspasswords`
--

CREATE TABLE IF NOT EXISTS `userspasswords` (
  `uid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `did` int(11) NOT NULL,
  `scorereceived` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`pid`,`sid`,`did`,`timestamp`),
  KEY `pid_idx` (`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userspoliciescollected`
--

CREATE TABLE IF NOT EXISTS `userspoliciescollected` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `colour` varchar(25) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`colour`,`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userssuccessfulpassworduse`
--

CREATE TABLE IF NOT EXISTS `userssuccessfulpassworduse` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `did` int(11) NOT NULL,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`timestamp`,`did`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userstoolscollected`
--

CREATE TABLE IF NOT EXISTS `userstoolscollected` (
  `uid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`sid`,`tid`,`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userstoolsused`
--

CREATE TABLE IF NOT EXISTS `userstoolsused` (
  `uid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `success` int(11) NOT NULL,
  `gaid` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`tid`,`sid`,`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure for view `newedinfopasswordentropy`
--
DROP TABLE IF EXISTS `newedinfopasswordentropy`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `newedinfopasswordentropy` AS select `newviewentropyanalysis`.`uid` AS `uid`,`newviewentropyanalysis`.`sid` AS `sid`,`newviewentropyanalysis`.`gaid` AS `gaid`,`newviewentropyanalysis`.`timestamp` AS `timestamp`,`newviewentropyanalysis`.`entropy` AS `entropy`,`newviewentropyanalysis`.`pid` AS `pid`,NULL AS `cid`,'' AS `Content` from `newviewentropyanalysis` where (`newviewentropyanalysis`.`uid` <> 0) union select `a`.`uid` AS `uid`,`a`.`sid` AS `sid`,`a`.`gaid` AS `gaid`,`a`.`timecollected` AS `timecollected`,NULL AS `NULL`,NULL AS `NULL`,`a`.`cid` AS `cid`,`b`.`content` AS `content` from (`userseducationalinfocollected` `a` join `educationalinfo` `b` on((`a`.`cid` = `b`.`cid`))) where (`a`.`uid` <> 0) order by `uid`,`sid`,`gaid`,`timestamp`;

-- --------------------------------------------------------

--
-- Structure for view `newviewentropyanalysis`
--
DROP TABLE IF EXISTS `newviewentropyanalysis`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `newviewentropyanalysis` AS select `up`.`uid` AS `uid`,`up`.`sid` AS `sid`,`up`.`gaid` AS `gaid`,`up`.`timestamp` AS `timestamp`,`p`.`entropy` AS `entropy`,`p`.`pid` AS `pid` from (`userspasswords` `up` join `passwords` `p` on((`up`.`pid` = `p`.`pid`))) order by `up`.`uid`,`up`.`sid`,`up`.`gaid`,`up`.`timestamp`;

-- --------------------------------------------------------

--
-- Structure for view `passwordswithedinform`
--
DROP TABLE IF EXISTS `passwordswithedinform`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `passwordswithedinform` AS select `newviewentropyanalysis`.`uid` AS `uid`,`newviewentropyanalysis`.`sid` AS `sid`,`newviewentropyanalysis`.`gaid` AS `gaid`,`newviewentropyanalysis`.`timestamp` AS `timestamp`,`newviewentropyanalysis`.`entropy` AS `entropy`,`newviewentropyanalysis`.`pid` AS `pid` from `newviewentropyanalysis` where (`newviewentropyanalysis`.`uid` <> 0) union select `userseducationalinfocollected`.`uid` AS `uid`,`userseducationalinfocollected`.`sid` AS `sid`,`userseducationalinfocollected`.`gaid` AS `gaid`,`userseducationalinfocollected`.`timecollected` AS `timecollected`,`userseducationalinfocollected`.`cid` AS `cid`,0 AS `0` from `userseducationalinfocollected` where (`userseducationalinfocollected`.`uid` <> 0) order by `uid`,`sid`,`gaid`,`timestamp`;

-- --------------------------------------------------------

--
-- Structure for view `testviewforexport`
--
DROP TABLE IF EXISTS `testviewforexport`;

CREATE ALGORITHM=UNDEFINED DEFINER=`2040038k`@`130.209.%` SQL SECURITY DEFINER VIEW `testviewforexport` AS select `up`.`uid` AS `uid`,`up`.`sid` AS `sid`,`up`.`gaid` AS `gaid`,`up`.`timestamp` AS `timestamp`,`p`.`entropy` AS `entropy`,`p`.`pid` AS `pid` from (`userspasswords` `up` join `passwords` `p` on((`up`.`pid` = `p`.`pid`))) where (`up`.`uid` = 2) order by `up`.`uid`,`up`.`sid`,`up`.`gaid`,`up`.`timestamp`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
