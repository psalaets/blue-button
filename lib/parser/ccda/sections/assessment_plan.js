"use strict";

var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportAssessmentPlanSection = function () {
  var indication = component.define("indication")
    .templateRoot("2.16.840.1.113883.10.20.22.4.19")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "0..1", "h:value", shared.ConceptDescriptor]
    ]);

  var instruction = component.define("instruction")
    .templateRoot("2.16.840.1.113883.10.20.22.4.20")
    .fields([
      ["code", "1..1", "h:code", shared.ConceptDescriptor]
    ]);

  var priorityPreference = component.define("priorityPreference")
    .templateRoot("2.16.840.1.113883.10.20.22.4.143")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value", shared.ConceptDescriptor]
    ]);

  var plannedAct = component.define("plannedAct")
    .templateRoot("2.16.840.1.113883.10.20.22.4.39")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["status_code", "1..1", "h:statusCode/@value"],
      ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
      ["performers", "0..*", "h:performer/h:assignedEntity", shared.assignedEntity],
      ["priority_preferences", "0..*", "h:entryRelationship[@typeCode='REFR']/h:observation", priorityPreference],
      ["indications", "0..*", "h:entryRelationship[@typeCode='RSON']/h:observation", indication],
      ["instructions", "0..*", "h:entryRelationship[@typeCode='SUBJ']/h:act", instruction]
    ]);

  var assessmentPlanSection = component.define("assessmentPlanSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.9")
    .fields([
      ["acts", "0..*", "h:entry/h:act", plannedAct]
    ])
    .cleanupStep(cleanup.replaceWithField('acts'));

    return assessmentPlanSection;
};
exports.assessmentPlanSection = exportAssessmentPlanSection;
exports.assessmentPlanEntry = exportAssessmentPlanSection;