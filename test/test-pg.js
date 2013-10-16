"use strict";

describe("test-pg.js", function() {

	var chai = require("chai");
	var assert = chai.assert;
	var expect = chai.expect;
	var should = chai.should();
	var pg;
	var testData;

	before(function(done) {
		pg = require("../lib/pgMock.js");
		pg.testData = require("./testdata.js");
		done();
	});

	it("returns a mock RowSet and a null error object", function(done) {
		var sql= "SELECT * FROM Xxx";
		pg.connect({}, function(err, client, releaseClient) {
			expect(err).to.be.null;
			client.query(sql,
					function(err, result) {
						expect(err).not.null;
						expect(result).to.be.null;
						done();
					});
		});
	});

	it("returns a null RowSet and an error object", function(done) {
		var sql= "SELECT * FROM User";
		pg.connect({}, function(err, client, releaseClient) {
			expect(err).to.be.null;
			client.query(sql,
					function(err, result) {
				   expect(err).to.be.null;
						expect(result).to.eql(pg.testData.outputs[sql].rs);
						done();
					});
		});
	});

	it("simulates a CREATE TABLE", function(done) {
		var sql= "CREATE TABLE a (id INTEGER)";
		pg.connect({}, function(err, client, releaseClient) {
			expect(err).to.be.null;
			client.query(sql,
					function(err, result) {
				   expect(err).to.be.null;
						expect(result.rowCount).to.be.null;
			      expect(result.command).to.equal("CREATE");
						done();
					});
		});
	});

	it("simulates a CREATE TABLE", function(done) {
		var sql= "INSERT INTO a (id) VALUES (1)";
		pg.connect({}, function(err, client, releaseClient) {
			expect(err).to.be.null;
			client.query(sql,
					function(err, result) {
				   expect(err).to.be.null;
						expect(result.rowCount).to.equal(1);
			      expect(result.command).to.equal("INSERT");
						done();
					});
		});
	});
	
	it("simulates a DBMS crash", function(done) {
		// A null configuration forces the mock PG object to return null connection clients
		pg.nullClient = true;
		pg.connect({}, function(err, client, releaseClient) {
			expect(client).to.be.null;
			pg.nullClient = false;
			done();
		});
	});

	it("binds the end event", function(done) {
		pg.connect({}, function(err, client, releaseClient) {
			client.on('drain', client.end.bind(client));
			done();
		});
	});

	after(function(done) {
		console.log("...End of unit tests");
		done();
	});

});
