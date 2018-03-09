const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {
  
  describe('# add', () => {
    
    it('it should add two numbers', ()=>{
      var res = utils.add(33,11);
      // if(res !== 44){
      //   throw new Error(`Expected 44, but got ${res}`);
      // }
      expect(res).toBe(44);
      expect(typeof res).toBe('number');
    });
    
    it('it should async add two numbers', (done)=>{   //done - async
      utils.asyncAdd(33,11, (sum) =>{
        expect(sum).toBe(44);
        expect(typeof sum).toBe('number');
        done();    //fire test now
      });
    });
    
  });
  
  describe('# square', () => {
    
    it('it should square a numbers', ()=>{
      var res = utils.square(3);
      // if(res !== 9){
      //   throw new Error(`Expected 9, but got ${res}`);
      // }
      expect(res).toBe(9);
    });
    
    it('it should square a numbers', (done)=>{   //done - async
      utils.asyncSquare(3, (sum) =>{
        expect(sum).toBe(9);
        done();    //fire test now
      });
    });
  });
  
  it('it should expect some values', ()=>{
    expect(12).not.toEqual(11);
  });
  
  //should verify first name and last names are set
  it('it should set firstName and lastName', ()=>{
    var user = {location: 'Philadelphia', age: 25};
    var res = utils.setName(user, 'Andrew Mead');
    expect.objectContaining({
      firstName: expect.any(String),
      lastName: expect.any(String)
    });
    expect(res.firstName).toBe('Andrew');
    expect(res.lastName).toBe('Mead');
  });
  
});
