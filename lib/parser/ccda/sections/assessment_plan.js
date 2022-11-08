"use strict";

var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
// var cleanup = require("../cleanup");
// var processor = require("@amida-tech/blue-button-xml").processor;
// var bbm = require("@amida-tech/blue-button-meta");
// var _ = require("lodash");

var exportAssessmentPlanSection = function (version) {
//   var sectionIDs = bbm.CCDA["sections" + version];
//   var clinicalStatementsIDs = bbm.CCDA["statements" + version];

  var author = component.define("author")
    .fields([
      ["date_time", "0..1", "h:time", shared.EffectiveTime],
      ["identifiers", "1..1", "h:assignedAuthor/h:id", shared.Identifier],
      ["name", "0..1", "h:assignedAuthor/h:assignedPerson/h:name", shared.IndividualName],
      ["organization", "0..1", "h:assignedAuthor/h:representedOrganization", shared.Organization]
    ]);

  var indication = component.define("indication")
  .templateRoot("2.16.840.1.113883.10.20.22.4.19")
  .fields([
    ["id", "1..*", "h:observation/h:id", shared.Identifier],
    ["code", "1..1", "h:code"],
    ["statusCode", "1..1", "h:statusCode"],
    ["effectiveTime", "1..1", "h:effectiveTime", shared.EffectiveTime],
    ["value", "1..1", "h:value", shared.ConceptDescriptor]
  ]);

  var instruction = component.define("instruction")
  .templateRoot("2.16.840.1.113883.10.20.22.4.20")
  .fields([
    ["code", "1..1", "h:code", shared.ConceptDescriptor],
    ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor]
  ]);
  var priorityPreference = component.define("priorityPreference")
    .templateRoot("2.16.840.1.113883.10.20.22.4.143")
    .fields([
      ["identifiers", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:assignedEntity/h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["effectiveTime", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value", shared.ConceptDescriptor]
    ]);

  var plannedAct = component.define("plannedAct")
    .templateRoot("2.16.840.1.113883.10.20.22.4.39")
    .fields([
      ["identifiers", "1..1", "h:act/h:templateId", shared.Identifier],
    //   ["id", "1..*", "h:assignedEntity/h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["statusCode", "1..1", "h:act/h:statusCode", shared.ConceptDescriptor],
      ["effectiveTime", "0..1", "h:effectiveTime", shared.EffectiveTime],
      ["performer", "0..*", "h:performer"],
      ["author", "0..1", "h:author/h:assignedAuthor", author],
      ["priority", "1..1", "h:entryRelationship", priorityPreference],
      ["indication", "1..1", "h:text/text()", indication],
      ["instruction", "1..1", "h:text/text()", instruction]
    ]);

  var assessmentPlanSection = component.define("assessmentPlanSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.9")
    .fields([
      ["identifiers", "1..1", "h:templateId", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["text", "1..1", "h:text/text()"],
      ["act", "0..*", "h:act", plannedAct]
    ]);

    return assessmentPlanSection;
};
exports.assessmentPlanSection = exportAssessmentPlanSection;
exports.assessmentPlanEntry = exportAssessmentPlanSection;