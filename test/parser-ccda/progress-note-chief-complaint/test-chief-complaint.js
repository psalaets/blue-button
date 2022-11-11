var fs = require('fs');
var bb = require('../../../index.js');

describe('chief_complaint', function () {
  it('without', function () {
    var xmlfile = fs.readFileSync(__dirname + '/without.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.chief_complaint).not.toBeDefined();
  });

  it('with', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.chief_complaint).toBeDefined();
    expect(result.data.chief_complaint.title).toBe("CHIEF COMPLAINT");
    expect(result.data.chief_complaint.text).toBe("Back Pain");
  });
});
