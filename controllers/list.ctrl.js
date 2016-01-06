let FileModel = require('mongoose').model('File'),
	recursive = require('recursive-readdir'),
	fs = require('fs'),
	async = require('async'),
	path = require('path');

module.exports = function(req, res){
	console.time('process');
	recursive('d:/ЖДТУ', (err, files = []) => {
		console.timeEnd('process');
		console.time('db');
		async.each(files, (filePath, cb) => {
			const basename = path.basename(filePath),
				extname = path.extname(filePath),
				name = path.basename(basename, extname);
			fs.stat(filePath, (err, data = {}) => {
				new FileModel({
					name,
					basename,
					extname,
					stats: data
				}).save(() => {cb()});
			})
		}, () => {
			console.timeEnd('db');
			console.log('done');
		});
	});
	res.sendStatus(200);
};