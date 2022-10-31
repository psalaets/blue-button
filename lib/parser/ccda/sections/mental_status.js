var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();

var exportMentalStatusSection = function () {
  var assessmentSupportingObservation = component.define("assessmentSupportingObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.86")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code/@displayName"],
      ["value", "1..1", "h:value[@xsi:type='INT']/@value"],
    ]);

  var assessmentScaleObservation = component.define("assessmentScaleObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.69")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code/@displayName"],
      ["derivation_expression", "0..1", "h:derivationExpr"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='INT']/@value"],
      ["supporting_observations", "0..*", "h:entryRelationship[@typeCode='COMP']/h:observation", assessmentSupportingObservation]
    ]);

  var mentalStatusOrganizer = component.define("mentalStatusOrganizer")
    .templateRoot("2.16.840.1.113883.10.20.22.4.75")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code/@displayName"],
      ["interval", "0..1", "h:effectiveTime", shared.EffectiveTime],
      ["observations", "1..*", "h:component/h:observation", mentalStatusObservation]
    ]);

  var mentalStatusObservation = component.define("mentalStatusObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.74")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code/@displayName"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
      ["reference_range", "0..1", "h:referenceRange"],
      ["assessment_observations", "0..*", "h:entryRelationship[@typeCode='COMP']/h:observation", assessmentScaleObservation]
    ]);

  var mentalStatusSection = component.define("mentalStatusSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.56")
    .fields([
      ["categories", "0..*", "h:entry/h:organizer", mentalStatusOrganizer],
      ["observations", "0..*", "h:entry/h:observation", mentalStatusObservation],
      ["assessment_observations", "0..*", "h:entry/h:observation", assessmentScaleObservation]
    ]);

  return [mentalStatusSection];

};

exports.mentalStatusSection = exportMentalStatusSection;
