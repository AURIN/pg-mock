/**
 * Mock object for the PostgreSQL driver (pg)
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
    this.testData = params.testData;
  };

  connect (config, callback) {
    return new Promise ((resolve, reject) => {
      setTimeout (() => {
        if (this.host === this.testData['INVALIDHOST'].host) {
          reject (this.testData['INVALIDHOST'].err);
        } else {
          resolve ({});
        }
      }, 300);
    });
  }

  query (sql) {
    return new Promise ((resolve, reject) => {
      setTimeout (() => {
        if (this.testData[sql].err) {
          reject (this.testData[sql].err);
        } else {
          resolve (this.testData[sql].rs);
        }
      }, 300);
    });
  }

  end () {
  }
}

module.exports = {
  Client: Client
};
