var fs = require('fs');
var bb = require('../../../index.js');

describe('assessment', function () {
  it('without', function () {
    var xmlfile = fs.readFileSync(__dirname + '/without.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.assessment).not.toBeDefined();
  });

  it('with', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.assessment).toBeDefined();
    expect(result.data.assessment.title).toBe("ASSESSMENT");
    expect(result.data.assessment.text).toBe("Recurrent GI bleed");
  });
});
