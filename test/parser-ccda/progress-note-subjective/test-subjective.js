var fs = require('fs');
var bb = require('../../../index.js');

describe('subjective', function () {
  it('with', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.subjective).toBe('Complaints of something');
  });

  it('without', function () {
    var xmlfile = fs.readFileSync(__dirname + '/without.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.subjective).not.toBeDefined();
  });
});
