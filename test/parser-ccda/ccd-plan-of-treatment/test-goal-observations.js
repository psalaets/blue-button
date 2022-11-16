var fs = require('fs');

var bb = require('../../../index.js');

describe('plan of treatment', function () {
  describe('goal observations', function () {
    it('none', function () {
      var xmlfile = fs.readFileSync(__dirname + '/no-goal-observations.xml', 'utf-8').toString();
      var result = bb.parse(xmlfile);

      expect(result.data.plan_of_treatment).not.toBeDefined();
    });

    it('one', function () {
      var xmlfile = fs.readFileSync(__dirname + '/one-goal-observation.xml', 'utf-8').toString();
      var result = bb.parse(xmlfile);

      expect(result.data.plan_of_treatment.goal_observations.length).toBe(1);

      var goal = result.data.plan_of_treatment.goal_observations[0];
      expect(goal.code).toEqual({"code": "59408-5", "code_system_name": "LOINC", "name": "Oxygen saturation in Arterial blood by Pulse oximetry"});
      expect(goal.date_time).toEqual({"point": {"date": "2013-09-02T00:00:00.000Z", "precision": "day"}});
      expect(goal.value).toEqual({"low": {"unit": "%", "value": 92}});
    });

    it('multiple', function () {
      var xmlfile = fs.readFileSync(__dirname + '/multiple-goal-observations.xml', 'utf-8').toString();
      var result = bb.parse(xmlfile);

      expect(result.data.plan_of_treatment.goal_observations.length).toBe(2);
    });
  });
});
