var expect = chai.expect;

describe('image2css', function () {
  it('Expect that exist a global variable', function(){
    expect(image2css).to.exist();
  });

  it('Expect image2css to be a function', function(){
    expect(image2css).to.be.a('function');
  });

  var images;

  before(function (done) {
    image2css({
      images: ['pistol.png']
    }, function (imagesArray) {
      images = imagesArray;

      console.log(images);

      done();
    });
  });

  it('Expect to be array', function () {
    expect(images).to.be.an('array');
  });

  it('Expect to be a object', function () {
    images.forEach(function (image) {
      expect(image).to.be.an('object');
    });
  });

  it('Expect to be a object', function () {
    images.forEach(function (image) {
      expect(image).to.be.an('object');
    });
  });

  it('Expect to be a number', function () {
    expect(images[0].bytes).to.be.a('number');
  });

  it('Expect to be string', function () {
    expect(images[0].index).to.be.a('string');
    expect(images[0].size).to.be.a('string');
    expect(images[0].filename).to.be.a('string');
    expect(images[0].boxshadow).to.be.a('string');
  });

  it('Expect to be KBs', function () {
    expect(images[0].size).to.be.equal('41.1 KB');
  });

  describe('#rgbtohex', function () {

    it('Expect image2css.rgbtohex to be a function', function(){
      expect(image2css.rgbtohex).to.be.a('function');
    });

    it('Expect that return strings', function () {
      expect(image2css.rgbtohex(0, 0, 0)).to.be.a('string');
    });

    it('Expect that return #000000 from rgb 0, 0, 0', function () {
      expect(image2css.rgbtohex(0, 0, 0)).to.be.equal('#000000');
    });

    it('Expect that return #91000f from rgb 145, 0, 15', function () {
      expect(image2css.rgbtohex(145, 0, 15)).to.be.equal('#91000f');
    });
  });

  describe('#bytesToSize', function () {
    it('Expect image2css.bytesToSize to be a function', function(){
      expect(image2css.bytesToSize).to.be.a('function');
    });

    it('Expect to return Bytes', function(){
      expect(image2css.bytesToSize(100)).to.be.equal('100 Bytes');
      expect(image2css.bytesToSize(733)).to.be.equal('733 Bytes');
    });

    it('Expect to return KB', function(){
      expect(image2css.bytesToSize(1000)).to.be.equal('1.00 KB');
      expect(image2css.bytesToSize(2000)).to.be.equal('2.00 KB');
      expect(image2css.bytesToSize(12345)).to.be.equal('12.3 KB');
    });

    it('Expect to return MB', function(){
      expect(image2css.bytesToSize(1000000)).to.be.equal('1.00 MB');
      expect(image2css.bytesToSize(1020200)).to.be.equal('1.02 MB');
      expect(image2css.bytesToSize(3020200)).to.be.equal('3.02 MB');
    });

    it('Expect to return GB', function(){
      expect(image2css.bytesToSize(1001000000)).to.be.equal('1.00 GB');
      expect(image2css.bytesToSize(1200920200)).to.be.equal('1.20 GB');
      expect(image2css.bytesToSize(4229020200)).to.be.equal('4.23 GB');
    });

    it('Expect to return TB', function(){
      expect(image2css.bytesToSize(1111001000000)).to.be.equal('1.11 TB');
      expect(image2css.bytesToSize(1511200920200)).to.be.equal('1.51 TB');
      expect(image2css.bytesToSize(4114229020200)).to.be.equal('4.11 TB');
    });
  });

  describe('#lengthInUtf8Bytes', function () {
    it('Expect image2css.lengthInUtf8Bytes to be a function', function(){
      expect(image2css.lengthInUtf8Bytes).to.be.a('function');
    });

    it('Expect return number', function () {
      expect(image2css.lengthInUtf8Bytes('some string')).to.be.a('number');
    });

    it('Expect return 11', function () {
      expect(image2css.lengthInUtf8Bytes('some string')).to.be.deep.equal(11);
    });
  });
});
