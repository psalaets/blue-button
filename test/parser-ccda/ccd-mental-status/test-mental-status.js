var fs = require('fs');

var bb = require('../../../index.js');

describe('mental-status', function () {
  it('one status', function () {
    var xmlfile = fs.readFileSync(__dirname + '/one-mental-status.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.mental_status.length).toBe(1);// fail until i get the xml showing mental status

    var observation = result.data.mental_status[0];
    expect(observation.date_time).toEqual({"point": {"date": "2013-05-12T00:00:00.000Z", "precision": "day"}});
    // expect(observation.value).toEqual("well behaved");
  });

  it('multiple statuses', function () {
    var xmlfile = fs.readFileSync(__dirname + '/multiple-mental-statuses.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.mental_status.length).toBe(2);
  });
});
