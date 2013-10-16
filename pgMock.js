/**
 * pgMock.js
 * 
 * Mock object for the PostgreSQL driver (pg)
 * 
 * To inject test data into it, just do this: require("pgMock.js").testData= require("foo.js") 
 */

"use strict";

var EventEmitter = require('events').EventEmitter;

exports.nullClient = false;
exports.testData= null;

exports.connect = function(config, callback) {

	var client = function() {
		EventEmitter.call(this);

		this.query = function(sql, callback) {
			// Returns a given output form test data using the SQL query as key and
			callback(exports.testData.outputs[sql].err, exports.testData.outputs[sql].rs);
		}
	};

	// Returns a null client when nullClient is defined
	if (exports.nullClient) {
		callback(null, null, function() {
		});
	} else {
		callback(null, client, function() {
		});
	}
};

exports.pools = {
	getOrCreate : function(dbConfig) {
		return dbConfig;
	}
};

exports.defaults = {
	poolSize : 0
};

