var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();

var exportPhysicalExamSection = function () {
  var targetSiteCodeQualifier = component.define("targetSiteCodeQualifier")
    .fields([
      ["name", "0..1", "h:name/@displayName"],
      ["value", "0..1", "h:value/@displayName"],
    ]);

  var targetSiteCode = component.define('targetSiteCode')
    .fields([
      ["name", "0..1", "@displayName"],
      ["qualifiers", "0..*", "h:qualifier", targetSiteCodeQualifier]
    ]);

  var woundMeasurementId = '2.16.840.1.113883.10.20.22.4.133';
  var woundMeasurement = component.define('woundMeasurement')
    .templateRoot(woundMeasurementId)
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "1..1", "h:code", shared.ConceptDescriptor],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='PQ']", shared.PhysicalQuantity],
    ]);

  var woundCharacteristicId = '2.16.840.1.113883.10.20.22.4.134';
  var woundCharacteristic = component.define('woundCharacteristic')
    .templateRoot(woundCharacteristicId)
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
    ]);

  var pressureUlcerCountId = '2.16.840.1.113883.10.20.22.4.134';
  var pressureUlcerCount = component.define('pressureUlcerCount')
    .templateRoot(pressureUlcerCountId)
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='INT']/@value"],
    ])
    .cleanupStep(function valueAsNumber() {
      if (this.js && this.js.value != null) {
        var parsed = Number(this.js.value);
        if (!isNaN(parsed)) {
          this.js.value = parsed;
        } else {
          delete this.js.value;
        }
      }
    });

  var highestPressureUlverStageId = '2.16.840.1.113883.10.20.22.4.77';
  var highestPressureUlcerStage = component.define('highestPressureUlcerStage')
    .templateRoot(highestPressureUlverStageId)
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
    ]);

  var woundObservation = component.define("woundObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.114")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
      ["target_site_code", "0..1", "h:targetSiteCode", targetSiteCode],
      ["wound_measurements", "0..*", childObservationXpath(woundMeasurementId), woundMeasurement],
      ["wound_characteristics", "0..*", childObservationXpath(woundCharacteristicId), woundCharacteristic],
      ["pressure_ulcer_counts", "0..*", childObservationXpath(pressureUlcerCountId), pressureUlcerCount],
      ["highest_pressure_ulcer_stage", "0..1", childObservationXpath(highestPressureUlverStageId), highestPressureUlcerStage]
    ]);

  function childObservationXpath(templateId) {
    return [
      "h:entryRelationship[@typeCode='COMP']",
      "h:observation",
      "h:templateId[@root='" + templateId + "']",
      ".."
    ].join('/');
  }

  var physicalExamSubsection = component.define("physicalExamSubsection")
    .fields([
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"],
      ["code", "1..1", "h:code", shared.ConceptDescriptor]
    ]);

  var physicalExamSection = component.define("physicalExamSection")
    .templateRoot("2.16.840.1.113883.10.20.2.10")
    .fields([
      ["wound_observations", "0..*", "h:entry/h:observation", woundObservation],
      ["subsections", "0..*", "h:component/h:section", physicalExamSubsection]
    ]);

  return physicalExamSection;
};

exports.physicalExamSection = exportPhysicalExamSection;
