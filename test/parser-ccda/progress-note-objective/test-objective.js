var fs = require('fs');
var bb = require('../../../index.js');

describe('objective', function () {
  it('with', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.objective).toBe('Normal breath sounds');
  });

  it('without', function () {
    var xmlfile = fs.readFileSync(__dirname + '/without.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.objective).not.toBeDefined();
  });
});
