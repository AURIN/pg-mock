/**
 * pgMock.js
 * 
 * Mock object for the PostgreSQL driver (pg)
 * 
 * To inject test data into it, just do this: require("pgMock.js").testData=
 * require("foo.js")
 */

"use strict";

var Client = require(__dirname + '/lib/client.js');

exports.nullClient = false;
exports.testData = null;

exports.connect = function(config, callback) {
	// Returns a null client when nullClient is defined
	if (exports.nullClient) {
		callback(null, null, function() {
		});
	} else {
		var config = {
			testData : exports.testData
		};
		callback(null, new Client(config), function() {
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

// NOTE: This is just for the mock object
exports.setTestData = function(data) {
	exports.testData = data;
}
