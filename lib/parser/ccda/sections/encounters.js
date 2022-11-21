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

  var ageObservation = component.define("ageObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.31'])
    .fields([
      ["value", "1..1", "h:value", shared.PhysicalQuantity]
    ]);

  var prognosisObservation = component.define("prognosisObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.113'])
    .fields([
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='ST']/text() | h:value[@xsi:type='CD']/@displayName"]
    ]);

  var authorParticipation = component.define("authorParticipation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.119'])
    .fields([
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["assigned_author", "1..1", "h:assignedAuthor", assignedAuthor],
    ]);

  var priorityPreference = component.define("priorityPreference")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.143'])
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
      ["author", "0..*", "h:author", authorParticipation]
    ]);

  var problemStatus = component.define("problemStatus")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.6'])
    .fields([
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"]
    ]);

  var assignedPerson = component.define("assignedPerson")
    .fields([
      ["names", "0..*", "h:assignedPerson/h:name", shared.IndividualName]
    ]);

  var assignedAuthor = component.define("assignedAuthor")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "0..1", "h:code", shared.ConceptDescriptor],
      ["assigned_person", "0..1", "h:assignedPerson", assignedPerson]
    ]);

  var supportingObservation = component.define("supportingObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.86'])
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["values", "1..*", "h:value[@xsi:type='CD']/@displayName | h:value[@xsi:type='INT']/@value"],
    ]);

  var scaleObservationAuthor = component.define("scaleObservationAuthor")
    .fields([
      ["author", "0..*", "h:assignedAuthor", shared.assignedEntity],
      ["date_time", "1..1", "h:time", shared.EffectiveTime],
    ]);

  var scaleObservationReferenceRange = component.define('scaleObservationReferenceRange')
    .fields([
      ["low", "0..1", "h:value/h:low/@value"],
      ["high", "0..1", "h:value/h:high/@value"],
      ["unit", "0..1", "h:value/h:low/@unit"],
      ["range", "0..1", "h:text/text()"]
    ]);

  var scaleObservation = component.define("scaleObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.69'])
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["derivation_expression", "0..1", "h:derivationExpr"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='INT']/@value"],
      ["interpretation_codes", "0..*", "h:interpretationCode", shared.ConceptDescriptor],
      ["authors", "0..*", "h:author", scaleObservationAuthor],
      ["observations", "0..*", "h:entryRelationship[@typeCode='COMP']/h:observation", supportingObservation],
      ["ranges", "0..*", "h:referenceRange", scaleObservationReferenceRange],
    ]);

  var dateOfDiagnosisAct = component.define("dateOfDiagnosisAct")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.502'])
    .fields([
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime]
    ])
    .cleanupStep(cleanup.replaceWithField('date_time'));

  var problemObservation = component.define("problemObservation")
    .templateRoot(['2.16.840.1.113883.10.20.22.4.4'])
    .fields([
      ["negation", "0..1", "@negationInd"],
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["status_code", "1..1", "h:statusCode/@code"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
      ["author_participation", "0..*", "h:authorParticipation", authorParticipation],
      ["age", "0..1", "h:entryRelationship[@typeCode='SUBJ']/h:observation", ageObservation],
      ["prognosis", "0..1", "h:entryRelationship[@typeCode='REFR']/h:observation", prognosisObservation],
      ["priority_preferences", "0..*", "h:entryRelationship[@typeCode='REFR']/h:observation", priorityPreference],
      ["problem_status", "0..1", "h:entryRelationship[@typeCode='REFR']/h:observation", problemStatus],
      ["scales", "0..*", "h:entryRelationship[@typeCode='SPRT']/h:observation", scaleObservation],
      ["diagnosis_dates", "0..*", "h:entryRelationship[@typeCode='COMP']/h:act", dateOfDiagnosisAct]
    ])
    .cleanupStep(function negationAsBoolean() {
      if (this.js && this.js.negation != null) {
        this.js.negation = this.js.negation === 'true';
      }
    })

  // If needed add this later by refactoring Problem Observation from Problems.  They should share.
  var diagnosis = component.define("diagnosis");
  diagnosis.templateRoot(['2.16.840.1.113883.10.20.22.4.80']);
  diagnosis.fields([
   ["observation", "1..1", "h:entryRelationship[@typeCode='SUBJ']/h:observation", problemObservation],
  ]);
  diagnosis.cleanupStep(cleanup.extractAllFields(['observation']));

  var activity = component.define('activity');
  activity.templateRoot([clinicalStatementsIDs.EncounterActivities, clinicalStatementsIDs.EncounterActivity]);
  activity.fields([
    ["identifiers", "1..*", "h:id", shared.Identifier],
    ["encounter", "1..1", "h:code", shared.ConceptDescriptor],
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
