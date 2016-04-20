var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function(){
  
  it('renders index page', function(done){
    superagent.get('http://localhost:3000/')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(res.text).to.be('Hello, world!');
        done();
      })
  });


});