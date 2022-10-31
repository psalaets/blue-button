var fs = require('fs');

var bb = require('../../../index.js');

describe('assessment', function () {
  it('one observation', function () {
    var xmlfile = fs.readFileSync(__dirname + '/one-assessment.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.assessment.length).toBe(1);

    var observation = result.data.assessment[0];
    expect(observation.date_time).toEqual({"point": {"date": "2013-05-12T00:00:00.000Z", "precision": "day"}});
    expect(observation.value).toEqual("well nourished");
  });

/*   it('multiple assessment', function () {
    var xmlfile = fs.readFileSync(__dirname + '/multiple-assessment.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.assessment.length).toBe(2);
  }); */
});

