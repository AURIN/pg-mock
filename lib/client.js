/**
 * client.js
 * 
 * Mock object for the PostgreSQL client
 * 
 */

"use strict";

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Client = function(config) {
	EventEmitter.call(this);

	config = config || {};
	this.open = true;
	this.testData = config.testData;
};

util.inherits(Client, EventEmitter);

Client.prototype.query = function(sql, callback) {
	if (this.open) {
		callback(this.testData.outputs[sql].err, this.testData.outputs[sql].rs);
	}
	else {
		// XXX Not sure what to do if the client is closed.
		throw { "pg-mock-error": "connection-closed" };
	}
}

Client.prototype.end = function() {
	this.open = false;
}

module.exports = Client;
