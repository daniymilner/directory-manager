var mongoose = require('mongoose'),
	fileSchema = new mongoose.Schema({
		name: String,
		basename: String,
		extname: String,
		stats: {},
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now}
	});

fileSchema.pre('save', function(next){
	this.updated_at = Date.now();
	next();
});

module.exports = fileSchema;