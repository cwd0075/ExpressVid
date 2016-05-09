'use strict';

var superagent = require('superagent');
var expect = require('expect.js');
var id = '';
describe('express rest api server', function(){
  
  it('renders index page', function(done){
    superagent.get('http://localhost:8080/')
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null);
        expect(res.text).to.be('Hello, world!');
        done();
      })
  });

  it('get the default video list', function(done){
    superagent.get('http://localhost:8080/api/videos')
      .end(function(e, res){
        //console.log(res.body.length)
        expect(e).to.eql(null);
        expect(res.body).to.have.property('country', 'US');
        done();
      })
  });

  it('get the requested country video list', function(done){
    superagent.get('http://localhost:8080/api/videos?area=HK')
      .end(function(e, res){
        //console.log(res)
        expect(e).to.eql(null);
        expect(res.body).to.have.property('country', 'HK');
        id = res.body.items[0].id;
        done();
      })
  });

  it('get the video details by query the id', function(done){
    superagent.get('http://localhost:8080/api/video?id=' + id)
      .end(function(e, res){
        //console.log(res.body);
        expect(e).to.eql(null);
        expect(res.body.items[0].id).to.be(id);
        done();
      })
  });

  it('get US video list if country code is incorrect', function(done){
    superagent.get('http://localhost:8080/api/videos?area=Gog')
      .end(function(e, res){
        //console.log(res)
        expect(e).to.eql(null);
        expect(res.body).to.have.property('country', 'US');
        done();
      })
  });
  it('get country list', function(done){
    superagent.get('http://localhost:8080/api/arealist')
      .end(function(e, res){
        //console.log(res)
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(10);
        done();
      })
  });

});


// it('retrieves an object', function(done){
//     superagent.get('http://localhost:8080/collections/test/'+id)
//       .end(function(e, res){
//         // console.log(res.body)
//         expect(e).to.eql(null)
//         expect(typeof res.body).to.eql('object')
//         expect(res.body._id.length).to.eql(24)
//         expect(res.body._id).to.eql(id)
//         expect(res.body.name).to.eql('John')
//         done()
//       })
//   })

//   it('retrieves a collection', function(done){
//     superagent.get('http://localhost:8080/collections/test')
//       .end(function(e, res){
//         // console.log(res.body)
//         expect(e).to.eql(null)
//         expect(res.body.length).to.be.above(0)
//         expect(res.body.map(function (item){return item._id})).to.contain(id)
//         done()
//       })
//   })