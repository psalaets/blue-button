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

  var goalValue = component.define('goalObservationValue')
    .fields([
      ["low", "0..1", "h:low", shared.PhysicalQuantity],
      ["width", "0..1", "h:width", shared.PhysicalQuantity],
      ["high", "0..1", "h:high", shared.PhysicalQuantity],
      ["center", "0..1", "h:center", shared.PhysicalQuantity]
    ]);

  var goalObservation = component.define("goalObservation");
  goalObservation.templateRoot(["2.16.840.1.113883.10.20.22.4.121"]);
  goalObservation.fields([
    ["identifiers", "1..*", "h:id", shared.Identifier],
    ["code", "1..1", "h:code", shared.ConceptDescriptor],
    ["status", "1..1", "h:statusCode/@code"],
    ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
    ["value", "0..1", "h:value", goalValue]
  ]);


  var planOfTreatmentSection = component.define("planOfTreatmentSection");
  planOfTreatmentSection.templateRoot(["2.16.840.1.113883.10.20.22.2.10"]);
  planOfTreatmentSection.fields([
    ["indications", "0..*", planOfTreatmentIndication.xpath(), planOfTreatmentIndication],
    ["nutrition_recommendations", "0..*", planOfTreatmentNutritionRecommendation.xpath(), planOfTreatmentNutritionRecommendation],
    ["goal_observations", "0..*", "h:entryRelationship/h:observation", goalObservation]
  ]);

  return planOfTreatmentSection;
};

exports.planOfTreatmentSection = exportPlanOfTreatmentSection;
