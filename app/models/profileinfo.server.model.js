'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Profileinfo Schema
 */
var ProfileinfoSchema = new Schema({
    
    profileImage: {
        type: String,
        default: '',
        trim: true
    },
    
	welcomeHeader: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	welcomeSubHeader: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	
	aboutHeader: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	
	about: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	
	projectHeader: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	
	projectSubHeader: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	
	contactHeader: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	
	contactSubHeader: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	
	email: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
	},
	
	phoneNumber: {
        text:{
            type: String,
            default: '',
            trim: true
        },
        animation:{
            type: String,
            default: '',
            trim: true
        }
		
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

mongoose.model('Profileinfo', ProfileinfoSchema);