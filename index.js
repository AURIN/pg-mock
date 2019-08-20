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
    this.testData = params.testData;
    this.closeError= params.closeError;
  };

  connect (config) {
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
    return new Promise ((resolve, reject) => {
      setTimeout (() => {
        if (this.closeError) {
          reject (new Error ('Error in closing the client'));
        } else {
          resolve ();
        }
      }, 300);
    });

  }
}

module.exports = {
  Client: Client
};
