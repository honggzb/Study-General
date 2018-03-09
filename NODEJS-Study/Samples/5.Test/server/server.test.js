const request = require("supertest");
const expect = require('expect');

var app = require("./server").app; 

describe('Express Server', () => {
  
  //Servers
    //Get/
      //some test case
    //Get /users
      //some test case
  describe('Get /', () => {
    it('it should return Hello Express response', (done) =>{
      request(app)
        .get('/')
        //.expect('Hello Express')
        .expect(404)
        .expect((res) => {
          expect(res.body).toMatchObject({error: 'Page not Found'});
        })
        .end(done);
      })
  });
    
  describe('Get /users', () => {
      it('it should return my user object', (done) =>{
        request(app)
          .get('/users')
          .expect(200)
          .expect((res) => {
            expect(res.body).toContainEqual({name: "Jen",age: 24});
          })
          .end(done);
      })
  });
    
});

