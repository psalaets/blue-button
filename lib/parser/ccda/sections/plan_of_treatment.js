var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();

var exportPlanOfTreatmentSection = function() {
  var planOfTreatmentNutritionRecommendation = component.define('planOfTreatmentNutritionRecommendation');
  planOfTreatmentNutritionRecommendation.templateRoot(["2.16.840.1.113883.10.20.22.4.130"]);
  planOfTreatmentNutritionRecommendation.fields([
    ["identifiers", "0..*", "h:id", shared.Identifier],
    ["code", "1..1", "h:code", shared.ConceptDescriptor],
    ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime]
  ]);

  var planOfTreatmentIndication = component.define("planOfTreatmentIndication");
  planOfTreatmentIndication.templateRoot(["2.16.840.1.113883.10.20.22.4.19"]);
  planOfTreatmentIndication.fields([
    ["identifiers", "0..*", "h:id", shared.Identifier],
    ["code", "0..1", "h:code", shared.ConceptDescriptor],
    ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
    ["value", "0..1", "h:value", shared.ConceptDescriptor]
  ]);

  var entryReference = component.define("entryReference");
  entryReference.templateRoot(["2.16.840.1.113883.10.20.22.4.122"]);
  entryReference.fields([
    ["id", "1..*", "h:id"],
    ["code", "1..1", "h:code"],
    ["statusCode", "1..1", "h:statusCode"]
  ]);

  var documentReference = component.define("documentReference");
  documentReference.templateRoot(["2.16.840.1.113883.10.20.22.4.115"]);
  documentReference.fields([
    ["id", "1..*", "h:id"],
    ["code", "1..1", "h:code"],
    ["setId", "0..1", "h:setId"],
    ["versionNumber", "0..1", "h:versionNumber"]
  ]);

  var assignedPerson = component.define("assignedPerson");
  assignedPerson.fields([
    ["name", "0..*", "h:name"]
  ]);

  var representedOrganization = component.define("representedOrganization");
  representedOrganization.fields([
    ["id", "0..*", "h:id"],
    ["name", "0..*", "h:name"],
    ["telecom", "0..*", "h:telecom"],
    ["addr", "0..*", "h:addr"],
  ]);

  var assignedAuthor = component.define("assignedAuthor");
  assignedAuthor.fields([
    ["code", "0..1", "h:code"],
    ["assignedPerson", "1..1", "h:assignedAuthor", assignedPerson],
    ["representedOrganization", "1..1", "h:representedOrganization", representedOrganization]
  ]);

  var authorParticipation = component.define("authorParticipation");
  authorParticipation.templateRoot(["2.16.840.1.113883.10.20.22.4.119"]);
  authorParticipation.fields([
    ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
    ["assignedAuthor", "1..1", "h:assignedAuthor", assignedAuthor]
  ]);

  var priorityPreference = component.define("priorityPreference");
  priorityPreference.templateRoot(["2.16.840.1.113883.10.20.22.4.143"]);
  priorityPreference.fields([
    ["id", "1..*", "h:id"],
    ["code", "1..1", "h:code"],
    ["effectiveTime", "0..1", "h:effectiveTime", shared.EffectiveTime],
    ["value", "1..1", "h:value"],
    ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation]
  ]);

  var goalObservation = component.define("goalObservation");
  goalObservation.templateRoot(["2.16.840.1.113883.10.20.22.4.121"]);
  goalObservation.fields([
    ["id", "1..*", "h:id"],
    ["code", "1..1", "h:code"],
    ["statusCode", "1..1", "h:statusCode"],
    ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
    ["value", "0..1", "h:value"],
    ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
    ["entryReference", "0..*", "h:entryReference", entryReference],
    ["priorityPreference", "0..1", "h:priorityPreference", priorityPreference],
    ["externalDocument", "0..*", "h:externalDocument", documentReference],
  ]);


  var planOfTreatmentSection = component.define("planOfTreatmentSection");
  planOfTreatmentSection.templateRoot(["2.16.840.1.113883.10.20.22.2.10"]);
  planOfTreatmentSection.fields([
    ["indications", "0..*", planOfTreatmentIndication.xpath(), planOfTreatmentIndication],
    ["nutrition_recommendations", "0..*", planOfTreatmentNutritionRecommendation.xpath(), planOfTreatmentNutritionRecommendation],
    ["goal_observation", "0..1", "h:observation", goalObservation]
  ]);

  return planOfTreatmentSection;
};

exports.planOfTreatmentSection = exportPlanOfTreatmentSection;
