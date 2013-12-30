angular.module('app')
  .factory('db', function(dbUrl, dbName) {

    var db =  new PouchDB(dbName);
    function syncError(data) {
      console.log(data);
    }

    var opts = {continuous: true, complete: syncError};
    db.replicate.from(dbUrl, opts);
    db.replicate.to(dbUrl, opts);
    return db;  
  });
