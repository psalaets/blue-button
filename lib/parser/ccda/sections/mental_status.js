var shared = require("../shared");
var cleanup = require("../cleanup");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();

var exportMentalStatusSection = function () {
  var assessmentSupportingObservation = component.define("assessmentSupportingObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.86")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code/@displayName"],
      ["value", "1..1", "h:value[@xsi:type='INT']/@value"],
    ]);

  var assessmentScaleObservationId = "2.16.840.1.113883.10.20.22.4.69";
  var assessmentScaleObservation = component.define("assessmentScaleObservation")
    .templateRoot(assessmentScaleObservationId)
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code/@displayName"],
      ["derivation_expression", "0..1", "h:derivationExpr/text()"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='INT']/@value"],
      ["supporting_observations", "0..*", "h:entryRelationship[@typeCode='COMP']/h:observation", assessmentSupportingObservation]
    ]);

  var mentalStatusObservationId = "2.16.840.1.113883.10.20.22.4.74";
  var mentalStatusObservation = component.define("mentalStatusObservation")
    .templateRoot(mentalStatusObservationId)
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code/@displayName"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
      ["reference_range", "0..1", "h:referenceRange", referenceRange],
      ["assessment_observations", "0..*", "h:entryRelationship[@typeCode='COMP']/h:observation", assessmentScaleObservation]
    ]);

  var mentalStatusOrganizer = component.define("mentalStatusOrganizer")
    .templateRoot("2.16.840.1.113883.10.20.22.4.75")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code/@displayName"],
      ["date_time", "0..1", "h:effectiveTime", shared.EffectiveTime],
      ["observations", "1..*", "h:component/h:observation", mentalStatusObservation]
    ]);

  var referenceRangeValue = component.define('referenceRangeValue')
    .fields([
      ["standard_value", "0..1", ".", shared.ConceptDescriptor],
      ["interpretation", "0..1", "../h:interpretationCode/@code"]
    ])
    .cleanupStep(cleanup.extractAllFields(["standard_value"]));

  var referenceRange = component.define('referenceRange')
    .fields([
      ["low", "0..1", "h:value/h:low/@value"],
      ["high", "0..1", "h:value/h:high/@value"],
      ["unit", "0..1", "h:value/h:low/@unit"],
      ["range", "0..1", "h:text/text()"],
      ["value", "0..1", "h:value[@xsi:type='CO']", referenceRangeValue]
    ]);

  var mentalStatusSection = component.define("mentalStatusSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.56")
    .fields([
      ["organizers", "0..*", "h:entry/h:organizer", mentalStatusOrganizer],
      ["observations", "0..*", "h:entry/h:observation/h:templateId[@root='" + mentalStatusObservationId + "']/..", mentalStatusObservation],
      ["assessment_observations", "0..*", "h:entry/h:observation/h:templateId[@root='" + assessmentScaleObservationId + "']/..", assessmentScaleObservation]
    ]);

  return [mentalStatusSection];

};

exports.mentalStatusSection = exportMentalStatusSection;
