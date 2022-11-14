"use strict";

var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");
var bbm = require("@amida-tech/blue-button-meta");

var exportFunctionalStatusSection = function (version) {
  var sectionIDs = bbm.CCDA["sections" + version];
  var clinicalStatementsIDs = bbm.CCDA["statements" + version];

  var time = component.define("time")
    .fields([
      ["low", "1..1", "h:low"],
      ["high", "0..1", "h:high"],
    ]);

  var participants = component.define("participants")
    .fields([
      ["time", "0..1", "h:effectiveTime", [shared.EffectiveTime, time]],
      ["participantRole", "1..1", "h:participantRole[@classCode=CAREGIVER]"]
    ]);

  var caregiverCharacteristics = component.define("caregiverCharacteristics")
    .templateRoot("2.16.840.1.113883.10.20.22.4.72")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:id"],
      ["code", "1..1", "h:code"],
      ["statusCode", "1..1", "h:statusCode"],
      ["value", "1..1", "h:value"],
      ["participant", "1..1", "h:participant[]@typecode=IND", participants],
    ]);

  var reference = component.define("reference")
    .fields([
      ["value", "0..1", "h:value/@value"]
    ]);

  var observationRange = component.define("observationRange")
    .fields([
      ["text", "0..1", "text/@text()", reference]
    ]);

  var scaleObservation = component.define("scaleObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.69")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:id"],
      ["code", "1..1", "h:code"],
      ["derivationExpr", "0..1", "h:derivationExpr"],
      ["statusCode", "1..1", "h:statusCode"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value"],
      ["interpretationCode", "0..*", "h:interpretationCode"],
      ["author", "0..1", "h:author"],
      ["referenceRange", "0..*", "h:referenceRange", observationRange],
    ]);

  var productInstance = component.define("productInstance")
    .templateRoot("2.16.840.1.113883.10.20.22.4.37")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:id"],
      ["playingDevice", "1..1", "h:playingDevice"],
      ["scopingEntity", "1..1", "h:scopingEntity"],
    ]);

  var instruction = component.define("instruction")
    .templateRoot("2.16.840.1.113883.10.20.22.4.20")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:id"],
      ["code", "1..1", "h:code"],
      ["statusCode", "1..1", "h:statusCode"]
    ]);

  var nonMedicinalSupplyActivity = component.define("nonMedicinalSupplyActivity")
    .templateRoot("2.16.840.1.113883.10.20.22.4.50")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:id"],
      ["statusCode", "1..1", "h:statusCode"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["quantity", "0..1", "h:quantity"],
      ["participant", "0..1", "h:participant", productInstance],
      ["instruction", "0..1", "h:instruction", instruction]
    ]);

  var assignedPerson = component.define("assignedPerson")
    .fields([
      ["name", "0..*", "h:author/h:assignedAuthor/h:assignedPerson/h:name"]
    ]);

  var representedOrganization = component.define("representedOrganization")
    .fields([
      ["id", "0..*", "h:assignedAuthor/h:representedOrganization/h:id"],
      ["name", "0..*", "h:assignedAuthor/h:representedOrganization/h:name"],
      ["telecom", "0..*", "h:assignedAuthor/h:representedOrganization/h:telecom"],
      ["addr", "0..*", "h:assignedAuthor/h:representedOrganization/h:addr"]
    ]);

  var assignedAuthor = component.define("assignedAuthor")
    .fields([
      ["id", "1..*", "h:assignedAuthor/h:id", shared.Identifier],
      ["code", "0..1", "h:assignedAuthor/h:code", shared.ConceptDescriptor],
      ["assignedPerson", "0..1", "h:assignedAuthor/h:assignedPerson", assignedPerson],
      ["representedOrganization", "0..1", "h:assignedAuthor/h:representedOrganization", representedOrganization]
    ]);

  var authorParticipation = component.define("authorParticipation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.119")
    .fields([
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["assignedAuthor", "1..1", "h:assignedAuthor", assignedAuthor],
    ]);

  var sensoryStatus = component.define("sensoryStatus")
    .templateRoot("2.16.840.1.113883.10.20.22.4.127")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["statusCode", "1..1", "h:statusCode"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value"],
      ["authorParticipation", "0..*", "h:author", authorParticipation],
      ["scaleObservation", "0..*", "h:", scaleObservation]
    ]);

  var selfCareActivities = component.define("selfCareActivities")
    .templateRoot("2.16.840.1.113883.10.20.22.4.128")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:id"],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["statusCode", "1..1", "h:statusCode"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["authorParticipation", "0..*", "h:author", authorParticipation],
    ]);

  var statusObservation = component.define("statusObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.67")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:id"],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["statusCode", "1..1", "h:statusCode"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
      ["authorParticipation", "0..*", "h:author", authorParticipation],
      ["nonMedicinalSupplyActivity", "0..1", "h:supply", nonMedicinalSupplyActivity],
      ["caregiverCharacteristics", "0..1", "h:observation/h:participant", caregiverCharacteristics],
      ["assessmentScaleObservation", "0..1", "h:observation", scaleObservation],
      ["referenceRange", "0..*", "h:observation/h:text/h:reference"],
    ]);

  var statusOrganizer = component.define("statusOrganizer")
    .templateRoot("2.16.840.1.113883.10.20.22.4.66")
    .fields([
      ["identifier", "1..1", "h:id", shared.Identifier],
      ["id", "1..*", "h:id"],
      ["code", "1..1", "h:value", shared.ConceptDescriptor],
      ["statusCode", "1..1", "h:value"],
      ["statusObservation", "0..*", "h:status", statusObservation],
      ["selfCareActivities", "1..*", "h:code[@displayName]", selfCareActivities]
    ]);

  var functionalStatus = component.define("functionalStatus")
    .templateRoot("2.16.840.1.113883.10.20.22.2.14")
    .fields([
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["title", "1..1", "h:title", shared.ConceptDescriptor],
      ["text", "1..1", "h:text", shared.ConceptDescriptor],
      ["statusOrganizer", "0..*", "", statusOrganizer],
      ["statusObservation", "0..*", "h:observation", statusObservation],
      ["caregiverCharacteristics", "0..*", "h:", caregiverCharacteristics],
      ["scaleObservation", "0..*", "h:", scaleObservation],
      ["nonMedicinalSupplyActivity", "0..*", "h:", nonMedicinalSupplyActivity],
      ["selfCareActivities", "0..*", "h:", selfCareActivities],
      ["sensoryStatus", "0..*", "h:", sensoryStatus]
    ]);




  var status = component.define('functionalStatusEntry');
  status.templateRoot([clinicalStatementsIDs.FunctionalStatusProblemObservation, clinicalStatementsIDs.CognitiveStatusProblemObservation]);
  status.fields([
      ["identifiers", "0..*", "h:id", shared.Identifier],
      ["type", "1..1", "h:code", shared.ConceptDescriptor],
      ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
      ["code", "0..1", "h:value", shared.ConceptDescriptor],
      ["status", "0..1", "./@negationInd"],
      ["functionalStatus", "0..1", "h:section", functionalStatus]
    ])
    // cleanup to map present @negationInd to {"status": "negative"},
    // and absent @negationInd to {"status": "completed"}
    .cleanupStep(cleanup.replaceWithObject("status", "negative"))
    .cleanupStep(function () {
      if (this.js && !this.js["status"]) {
        this.js["status"] = "completed";
      }
    });

  var functionalStatusSection = component.define('functionalStatusSection');
  functionalStatusSection.templateRoot([sectionIDs.FunctionalStatusSection]);
  functionalStatusSection.fields([
    ["statuses", "0..*", status.xpath(), status]
  ]);
  functionalStatusSection.cleanupStep(cleanup.replaceWithField(["statuses"]));
  return [functionalStatusSection, status];
};
exports.functionalStatusSection = exportFunctionalStatusSection;
exports.functionStatusEntry = exportFunctionalStatusSection;
