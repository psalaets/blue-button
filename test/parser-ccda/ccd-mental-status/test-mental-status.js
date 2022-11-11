var fs = require('fs');

var bb = require('../../../index.js');

describe('mental-status', function () {
  it('parses its nested collections', function () {
    var xmlfile = fs.readFileSync(__dirname + '/mental-status.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.mental_status).toBeDefined();

    var organizers = result.data.mental_status.organizers;
    expect(organizers.length).toBe(1);

    var observations = result.data.mental_status.observations;
    expect(observations.length).toBe(2);

    var assessmentObservations = result.data.mental_status.assessment_observations;
    expect(assessmentObservations.length).toBe(1);
  });
});
