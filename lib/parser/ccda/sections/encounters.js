"use strict";

var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");
var bbm = require("@amida-tech/blue-button-meta");

var exportEncountersSection = function (version) {
  var sectionIDs = bbm.CCDA["sections" + version];
  var clinicalStatementsIDs = bbm.CCDA["statements" + version];

  var finding = component.define("finding");
  finding.templateRoot([clinicalStatementsIDs.Indication]);
  finding.fields([
    ["identifiers", "1..*", "h:id", shared.Identifier],
    ["value", "1..1", "h:value", shared.ConceptDescriptor],
    ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime]
  ]);
  //finding.cleanupStep(cleanup.extractAllFields(['value']));
  var ageObservation = component.define("ageObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.31'])
    .fields([
      ["code", "1..1", "h:code"],
      ["statusCode", "1..1", "h:statusCode"],
      ["value", "1..1", "h:value"]
    ]);
  var prognosisObservation = component.define("prognosisObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.113'])
    .fields([
      ["code", "1..1", "h:code"],
      ["statusCode", "1..1", "h:statusCode"],
      ["time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value"]
    ]);

  var author1 = component.define("author1")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.19'])
    .fields([
      ["code", "1..1", "h:code"],
      ["time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value"],
      ["author", "0..*", "h:author", author1]
    ]);

  var priorityPreference = component.define("priorityPreference")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.143'])
    .fields([
      ["code", "1..1", "h:code"],
      ["time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value"],
      ["author", "0..*", "h:author", author1]
    ]);
  var problemStatus = component.define("problemStatus")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.6'])
    .fields([
      ["code", "1..1", "h:code"],
      ["statusCode", "1..1", "h:statusCode"],
      ["value", "1..1", "h:value"]
    ]);
  var assignedPerson = component.define("assignedPerson")
    .fields([
      ["name", "0..*", "h:assignedPerson/h:name"]
    ]);
  var assignedAuthor = component.define("assignedAuthor")
    .fields([
      ["id", "1..*", "h:id"],
      ["code", "0..1", "h:code"],
      ["assignedPerson", "0..1", "h:assignedPerson", assignedPerson]
    ]);
  var representedOrganization = component.define("representedOrganization")
    .fields([
      ["id", "0..*", "h:representedOrganization/h:id"],
      ["name", "0..*", "h:representedOrganization/h:name"],
      ["telecom", "0..*", "h:representedOrganization/h:telecom"],
      ["addr", "0..*", "h:representedOrganization/h:addr"],
    ]);
  var authorParticipation = component.define("authorParticipation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.6'])
    .fields([
      ["time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["assignedAuthor", "1..1", "h:assignedAuthor", assignedAuthor],
      ["representedOrganization", "1..1", "h:representedOrganization", representedOrganization],
      ["value", "1..1", "h:value"]
    ]);
  var supportingObservation = component.define("supportingObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.86'])
    .fields([
      ["code", "1..1", "h:observation/h:code"],
      ["id", "1..1", "h:observation/h:id", shared.EffectiveTime],
      ["value", "1..1", "h:value"],
      ["statusCode", "1..1", "h:statusCode"]
    ]);
  var observationRange = component.define("observationRange")
      .fields([
        ["text", "0..1", "h:text/text()", shared.TextWithReference],
        ["reference", "0..1", "h:reference"],
      ]);
  var scaleObservation = component.define("scaleObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.69'])
    .fields([
      ["code", "1..1", "h:observation/h:code"],
      ["statusCode", "1..1", "h:observation/h:statusCode"],
      ["time", "1..1", "h:observation/h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:observation/h:value"],
      ["derivationExpr", "0..1", "h:observation/h:derivationExpr"],
      ["value", "1..1", "h:observation/h:value"],
      ["interpretationCode", "0..*", "h:observation/h:interpretationCode"],
      ["author", "0..*", "h:observation/h:author"],
      ["observation", "0..*", "h:observation", supportingObservation],
      ["range", "0..*", "h:reference"],
      ["observation", "0..*", "h:observation", observationRange],
    ]);
  var entryReference = component.define("entryReference")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.122'])
    .fields([
      ["id", "1..*", "h:entry/h:id"],
      ["code", "1..1", "h:entry/h:code"],
      ["statusCode", "1..1", "h:entry/h:statusCode"],
    ]);
  var dateOfDiagnosisAct = component.define("dateOfDiagnosisAct")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.502'])
    .fields([
      ["code", "1..1", "h:diagnosis/h:code"],
      ["statusCode", "1..1", "h:diagnosis/h:statusCode"],
      ["effectiveTime", "1..1", "h:diagnosis/h:effectiveTime:not(([low, high])"],
    ]);

  var problemObservation = component.define("problemObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.4'])
    .fields([
      ["id", "1..*", "h:id"],
      ["code", "1..1", "h:code"],
      ["statusCode", "1..1", "h:statusCode"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value"],
      ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
      ["age", "0..1", "h:age", ageObservation],
      ["prognosis", "0..1", "h:observation", prognosisObservation],
      ["priority", "0..*", "h:age", priorityPreference],
      ["problemStatus", "0..1", "h:age", problemStatus],
      ["entryReference", "0..*", "h:age", entryReference],
      ["scale", "0..*", "h:age", scaleObservation],
      ["diagnosisDate", "0..*", "h:age", dateOfDiagnosisAct]
    ]);

  // If needed add this later by refactoring Problem Observation from Problems.  They should share.
  var diagnosis = component.define("diagnosis");
  diagnosis.templateRoot(['2.16.840.1.113883.10.20.22.4.80']);
  diagnosis.fields([
   ["code", "1..1", "h:code", shared.ConceptDescriptor],
   ["diagnosis", "1..1", "h:entryRelationship", problemObservation],
  ]);
  // diagnosis.cleanupStep(cleanup.extractAllFields(['code']));

  var activity = component.define('activity');
  activity.templateRoot([clinicalStatementsIDs.EncounterActivities, clinicalStatementsIDs.EncounterActivity]);
  activity.fields([
    ["encounter", "1..1", "h:code", shared.ConceptDescriptor],
    ["identifiers", "0..*", "h:id", shared.Identifier],
    ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
    ["performers", "0..*", "h:performer/h:assignedEntity", shared.assignedEntity],
    ["locations", "0..*", "h:participant/h:participantRole", shared.serviceDeliveryLocation],
    ["findings", "0..*", finding.xpath(), finding], //,
    ["diagnoses", "0..*", diagnosis.xpath(), diagnosis]
  ]);

  var encountersSection = component.define('encountersSection');
  encountersSection.templateRoot([sectionIDs.EncountersSection, sectionIDs.EncountersSectionEntriesOptional]);
  encountersSection.fields([
    ["activity", "0..*", activity.xpath(), activity]
  ]);
  encountersSection.cleanupStep(cleanup.replaceWithField(["activity"]));
  return [encountersSection, activity];
};
exports.encountersSection = exportEncountersSection;
exports.encountersEntry = exportEncountersSection;
