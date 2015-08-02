'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Project name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	githubUrl: {
		type: String,
		default: '',
		trim: true
	},
	websiteUrl: {
		type: String,
		default: '',
		trim: true
	},
	animation: {
		type: String,
		default: '',
		trim: true
	},
	image: {
		type: String,
		default: '',
		trim:true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Project', ProjectSchema);