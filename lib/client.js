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
    var record = this.testData.outputs[sql];
    if (record === undefined) {
      var exc = {
        "pg-mock-error" : "missing-test-data",
        "query" : sql
      };
      console.log(exc);
      throw exc;
    }
    callback(record.err, record.rs);
  } else {
    // XXX Not sure what to do if the client is closed.
    var exc = {
      "pg-mock-error" : "connection-closed"
    };
    console.log(exc);
    throw exc;
  }
}

Client.prototype.end = function() {
  this.open = false;
}

module.exports = Client;
