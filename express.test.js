var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function(){
  
  it('renders index page', function(done){
    superagent.get('http://localhost:3000/')
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null);
        expect(res.text).to.be('Hello, world!');
        done();
      })
  });

  it('get the default video list', function(done){
    superagent.get('http://localhost:3000/api')
      .end(function(e, res){
        //console.log(res.body.length)
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        done();
      })
  });

  it('get the default city video list', function(done){
    superagent.get('http://localhost:3000/api?city=hk&time=d')
      .end(function(e, res){
        //console.log(res)
        expect(e).to.eql(null);
        expect(res.body).to.have.property('city', 'hk');
        done();
      })
  });

});


// it('retrieves an object', function(done){
//     superagent.get('http://localhost:3000/collections/test/'+id)
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
//     superagent.get('http://localhost:3000/collections/test')
//       .end(function(e, res){
//         // console.log(res.body)
//         expect(e).to.eql(null)
//         expect(res.body.length).to.be.above(0)
//         expect(res.body.map(function (item){return item._id})).to.contain(id)
//         done()
//       })
//   })