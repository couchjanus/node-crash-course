const server = require('../server');
const http = require('http');
const assert = require('assert');

describe('server', function () {
    before(function () {
      server.listen(3000);
    });
  
    after(function () {
      server.close();
    });
});

describe('Hello world', function(){

    it('Status code of / should be 200', function(done){
        http.get('http://localhost:3000/', function(res){
            assert(200, res.statusCode);
            done();
        })
    })

    it('/xxx should not exists', function(done){
        http.get('http://localhost:3000/xxx', function(res){
            assert(404, res.statusCode)
            done()
        })
    });
});

