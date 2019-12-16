describe('my first test', () => {
  let sut;
  beforeEach(() => {
    sut = {};
  });
  it('should be true if true', () => {
    sut.a = false;   //arrange
    sut.a = true;    //act
    expect(sut.a).toBe(true);
  });
})
