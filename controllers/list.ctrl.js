var FileModel = require('mongoose').model('File'),
	recursive = require('recursive-readdir'),
	fs = require('fs'),
	async = require('async'),
	path = require('path');

module.exports = function(req, res){
	console.time('process');
	recursive('d:/ЖДТУ', function (err, files) {
		console.timeEnd('process');
		console.time('db');
		async.each(files, function(filePath, cb){
			var basename = path.basename(filePath),
				extname = path.extname(filePath),
				name = path.basename(basename, extname);
			fs.stat(filePath, function(err, data){
				new FileModel({
					name: name,
					basename: basename,
					extname: extname,
					stats: data
				}).save(function(){
						cb()
					});
			})
		}, function(){
			console.timeEnd('db');
			console.log('done');
		});
	});
	res.sendStatus(200);
};