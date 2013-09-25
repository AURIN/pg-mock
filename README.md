pg-mock
=======

Mock-up of a PostgreSQL database in Node,js (it emulates the pg library)


Build instructions
------------------

To prepare the package description (package.json) and compose the properties file:  
  `mvn compile -Ddeployment={deployment type} -Dsystem={developmet system}`
  
To install dependencies:  
  `npm install`

  
Test instructions
-----------------
  
To run unit tests:
  `mocha --no-color`


Using pg-mock
-------------

  // Sample test data (the SQL statement it's the key, the rwoset is the mock result of the query, 
  // err is the error, if any, returned
  exports.outputs = {};
  exports.outputs["SELECT * FROM User"] = {
    rs : {
      rowCount : 3,
      rows : []
    },
    err : {
      name : "foo",
      message : "bar"
    }
  };
  
  // Setup 
  pg = require("../pgMock.js");
  pg.testData = require("./testdata.js");

  // Test sample
  pg.connect({}, function(err, client, releaseClient) {
      expect(err).to.be.null;
      client.query("SELECT * FROM User",
          function(err, result) {
           expect(err).to.be.null;
            expect(result).to.eql(pg.testData.outputs["SELECT * FROM User"].rs);
          });
  });  