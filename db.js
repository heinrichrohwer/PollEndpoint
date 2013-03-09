var mysql = require('mysql');

module.exports = {
	init:function(){
		var conn = mysql.createConnection({
			host:'127.0.0.1',
			user:'root',
			password:'',
			database:'poll'
		});
		/*
		var services = JSON.parse(process.env.VCAP_SERVICES);
		var credit = services['mysql-5.1'][0].credentials;
		var conn = mysql.createConnection({
			host:credit.host,
			user:credit.user,
			password:credit.password,
			database:credit.name
		});
		*/
		conn.connect(function(err){
			if(err){
				console.log('Error connecting to MySQL database',err);
				if(err.fatal) process.exit();
			}
			//Create the tables if not exists
			var noop = function(e){
				!e && console.log('Table creation succeed.');
			};
			conn.query('SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";',noop);
			conn.query('SET time_zone = "+00:00";',noop);
			conn.query('CREATE TABLE IF NOT EXISTS `answers` (`question_id` varchar(40) NOT NULL,`poll_id` varchar(25) NOT NULL,`id` varchar(40) NOT NULL,`value` text NOT NULL,`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY (`id`),KEY `poll_id` (`poll_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;',noop);
			conn.query('CREATE TABLE IF NOT EXISTS `polls` ( `id` varchar(25) NOT NULL, `name` varchar(100) NOT NULL, `desc` text, `keywords` varchar(200) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;',noop);
			conn.query('CREATE TABLE IF NOT EXISTS `questions` ( `id` varchar(40) NOT NULL, `belongs` varchar(25) NOT NULL, `type` varchar(20) NOT NULL, `name` text NOT NULL, `choices` text, `required` tinyint(1) NOT NULL DEFAULT \'1\', PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;',noop);
		});
		
		return conn;
	},
	escape:mysql.escape
};