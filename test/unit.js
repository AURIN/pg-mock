'use strict';

const chai = require ('chai');
const {assert} = require ('chai');
const _ = require ('underscore');
const {Client} = require ('../index.js');
const SQLVALID = "SELECT COUNT(*) FROM information_schema.tables WHERE table_type = 'BASE TABLE'";
const SQLINVALIDHOST = "INVALIDHOST";
const SQLMISSINGTABLE = "SELECT COUNT(*) FROM information_schema.xxx WHERE table_type = 'BASE TABLE'";

const setParams = () => {
  const p = {
    host: 'www.example.com',
    user: 'user',
    password: 'password',
    database: 'database',
    port: 5432,
    testData: {}
  };

  p.testData[SQLVALID] = {rs: {rowCount: 1, rows: []}, err: null};
  p.testData[SQLINVALIDHOST] = {
    host: 'nohost.com',
    rs: null,
    err: {errno: 'ECONNREFUSED', code: 'ECONNREFUSED', syscall: 'connect'}
  };
  p.testData[SQLMISSINGTABLE] = {
    rs: {rowCount: 1, rows: []},
    err: {routine: 'parserOpenTable', code: '42P01', file: 'parse_relation.c'}
  };
  return p;
};

describe ('pg-mock', function () {

  it ('invalid host error', (done) => {
    const client = (new Client (_.extend (setParams (), {host: setParams ().testData[SQLINVALIDHOST].host})));
    client
      .connect ().then (() => {
      assert.isTrue (false, `Exception expected`);
      done ();
    }).catch ((err) => {
      assert.equal (err.errno, setParams ().testData[SQLINVALIDHOST].err.errno);
      assert.equal (err.code, setParams ().testData[SQLINVALIDHOST].err.code);
      assert.equal (err.syscall, setParams ().testData[SQLINVALIDHOST].err.syscall);
      done ();
    });
  });

  it ('missing table query', (done) => {
    const client = (new Client (setParams ()));
    client
      .connect ().then (() => {
      assert.isTrue (true, `Connection succeeded`);
    }).catch ((err) => {
      assert.isTrue (false, `Un-expected exception raised`);
      done ();
    });

    client
      .query (SQLMISSINGTABLE)
      .then ((result) => {
        assertTrue (false, `Exception expected`);
        done ();
      })
      .catch ((err) => {
        assert.equal (err.routine, setParams ().testData[SQLMISSINGTABLE].err.routine);
        assert.equal (err.code, setParams ().testData[SQLMISSINGTABLE].err.code);
        assert.equal (err.file, setParams ().testData[SQLMISSINGTABLE].err.file);
        done ();
      });
  });

  it ('valid query', (done) => {
    const client = (new Client (setParams ()));
    client
      .connect ().then (() => {
      assert.isTrue (true, `Connection succeeded`);
    }).catch ((err) => {
      assert.isTrue (false, `Un-expected exception raised`);
      done ();
    });

    client
      .query (SQLVALID)
      .then ((result) => {
        assert.equal (result.rowCount, setParams ().testData[SQLVALID].rs.rowCount);
        done ();
      })
      .catch ((err) => {
        assert.isTrue (false, `Un-expected exception raised`);
        done ();
      });
  });
});
