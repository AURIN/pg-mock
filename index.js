/**
 * Mock object for the PostgreSQL driver (pg) using Promises (andnot callbacks)
 *
 * To inject test data into it, just do this: add a 'testData' property to the
 * constructor params argument
 */

"use strict";

class Client {

  constructor (params) {
    this.open = true;
    this.logger = params.logger;
    this.host = params.host;
    this.user = params.user;
    this.password = params.password;
    this.testData = params.testData;
    this.closeError = params.closeError;
  };

  connect (config) {
    return new Promise ((resolve, reject) => {
      setTimeout (() => {
        if (this.host === this.testData['INVALIDHOST'].host) {
          reject (this.testData['INVALIDHOST'].err);
        } else {
          resolve ({});
        }
      }, 30);
    });
  }

  query (sql) {
    if (sql instanceof Cursor) {
      return new Promise ((resolve, reject) => {
        setTimeout (() => {
          sql.testData = this.testData;
          resolve (sql);
        }, 30);
      });
    } else {
      return new Promise ((resolve, reject) => {
        setTimeout (() => {
          if (this.testData[sql].err) {
            reject (this.testData[sql].err);
          } else {
            resolve (this.testData[sql].rs);
          }
        }, 30);
      });
    }
  }

  end (callback) {
    setTimeout (() => {
      if (this.closeError) {
        callback (new Error ('Error in closing the client'));
      } else {
        callback ();
      }
    }, 30);
  }
}

class Cursor {

  constructor (sql, params) {
    this.sql = sql;
    this.testData = null;
    this.nrow = 0;
  };

  read (size, callback) {
    setTimeout (() => {
      this.nrow += size;
      callback (this.testData[this.sql].err, this.testData[this.sql].rs && this.testData[this.sql].rs.rows.slice (this.nrow - size, this.nrow))
    }, 5);
  }
}

module.exports = {
  Client: Client,
  Cursor: Cursor
};
