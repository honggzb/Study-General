const jest = require('expect');

var login = require('./app');

describe('App', () => {
  
  it('should call the spy correctly', () =>{
    const spy = jest.spyOn(login, 'handleSignup');
    const signup = login.handleSignup();
    
    expect(spy).toHaveBeenCalled();
    expect(signup).toBe(true);

    spy.mockReset();
    spy.mockRestore();
  });
  
});
