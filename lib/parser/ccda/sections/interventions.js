"use strict";

var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");
var bbm = require("@amida-tech/blue-button-meta");
var processor = require("@amida-tech/blue-button-xml").processor;


var exportinterventionsSection = function (version) {
//   var sectionIDs = bbm.CCDA["sections" + version];
//   var clinicalStatementsIDs = bbm.CCDA["statements" + version];

    var assignedPerson = component.define("assignedPerson")
        .fields([
            ["name", "1..*", "h:authorParticipation"]
        ]);


    var representedOrganization = component.define("representedOrganization")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["name", "1..*", "h:name"],
            ["telecom", "1..1", "h:telecom"],
            ["addr", "1..*", "h:addr"]
        ]);


    var serviceDeliveryLocation = component.define("serviceDeliveryLocation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.32");

    var participant = component.define("participant")
        .templateRoot("2.16.840.1.113883.10.20.22.4.119")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["addr", "1..*", "h:addr"],
            ["playingEntity", "0..1", "h:playingEntity"],
            ["name", "1..*", "h:name"],
            ["serviceDeliveryLocation", "1..1", "h:serviceDeliveryLocation", serviceDeliveryLocation]
        ]);


    var authorParticipation = component.define("authorParticipation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.119")
        .fields([
            ["date_time", "1..1", "h:effectiveTime", processor.EffectiveTime],
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "0..1", "h:code", shared.ConceptDescriptor],
            ["assignedPerson", "1..1", "h:assignedPerson"],
            ["authorParticipation", "0..*", "h:authorParticipation"],
            ["assignedPerson", "0..*", "h:assignedPerson", assignedPerson],
            ["representedOrganization", "0..*", "h:representedOrganization", representedOrganization]
        ]);


    var assessmentScaleSupportingObservation = component.define("assessmentScaleSupportingObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.86")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["value", "1..*", "h:value"]
        ]);



    var translation = component.define("translation")
        .fields([
            ["translation", "0..*", "h:translation"]
        ]);


    var observationRange = component.define("observationRange")
        .fields([
            ["text", "0..1", "h:text/@text()"],
            ["reference", "0..1", "h:reference"]
        ]);


    var assessmentScaleObservation = component.define("assessmentScaleObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.69")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["derivationExpr", "0..1", "h:assessmentScaleObservation"],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["authorParticipation", "1..*", "h:authorParticipation", authorParticipation],
            ["value", "1..1", "h:value"],
            ["interpretationCode", "0..*", "h:interpretationCode", translation],
            ["author", "0..*", "h:author"],
            ["assessmentScaleSupportingObservation", "1..1", "h:assessmentScaleSupportingObservation", assessmentScaleSupportingObservation],
            ["referenceRange", "1..1", "h:referenceRange", observationRange]
        ]);

    var externalDocumentReference = component.define("externalDocumentReference")
        .templateRoot("2.16.840.1.113883.10.20.22.4.115")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["setId", "0..1", "h:setId", shared.ConceptDescriptor],
            ["versionNumber", "0..1", "h:versionNumber"]
        ]);


    var entryReference = component.define("entryReference")
        .templateRoot("2.16.840.1.113883.10.20.22.4.122")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor]
        ]);


    var instruction = component.define("instruction")
        .templateRoot("2.16.840.1.113883.10.20.22.4.20")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor]
        ]);


    var productInstance = component.define("productInstance")
        .templateRoot("2.16.840.1.113883.10.20.22.4.37")
        .fields([
            ["id", "1..*", "h:code", shared.Identifier],
            ["playingDevice", "1..1", "h:playingDevice"],
            ["scopingEntity", "1..1", "h:scopingEntity"]
        ]);


    var nonMedicinalSupplyActivity = component.define("nonMedicinalSupplyActivity")
        .templateRoot("2.16.840.1.113883.10.20.22.4.50")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["quantity", "0..1", "h:quantity"],
            ["participant", "0..*", "h:participant", productInstance],
            ["instruction", "1..1", "h:instruction" , instruction]
        ]);


    var indication = component.define("indication")
        .templateRoot("2.16.840.1.113883.10.20.22.4.19")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor]
        ]);


    var drugMonitoringAct = component.define("drugMonitoringAct")
        .templateRoot("2.16.840.1.113883.10.20.22.4.123")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["participant", "1..*", "h:participant", participant]
        ]);


    var ageObservation = component.define("ageObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.31")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["value", "1..1", "h:value"]
        ]);


    var prognosisObservation = component.define("prognosisObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.113")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "1..1", "h:effectiveTime", processor.EffectiveTime],
            ["value", "1..1", "h:value"]
        ]);


    var dateofDiagnosisAct = component.define("dateofDiagnosisAct")
        .templateRoot("2.16.840.1.113883.10.20.22.4.502")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "1..1", "h:effectiveTime[not(low)][not(high)]", processor.EffectiveTime]
        ]);


    var problemStatus = component.define("problemStatus")
        .templateRoot("2.16.840.1.113883.10.20.22.4.6")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["value", "1..1", "h:value"]
        ]);



    var priorityPreference = component.define("priorityPreference")
        .templateRoot("2.16.840.1.113883.10.20.22.4.143")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["value", "1..1", "h:value"],
            ["authorParticipation", "1..*", "h:authorParticipation", authorParticipation]
        ]);


    var problemObservation = component.define("problemObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.4")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "1..1", "h:effectiveTime", processor.EffectiveTime],
            ["value", "1..1", "h:value"],
            ["ageObservation", "1..1", "h:ageObservation", ageObservation],
            ["prognosisObservation", "1..1", "h:prognosisObservation", prognosisObservation],
            ["priorityPreference", "1..1", "h:priorityPreference", priorityPreference],
            ["problemStatus", "1..1", "h:problemStatus", problemStatus],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
            ["assessmentScaleObservation ", "1..1", "h:assessmentScaleObservation", assessmentScaleObservation],
            ["entryReference", "0..*", "h:entryReference[@typeCode=RSON]", entryReference],
            ["dateofDiagnosisAct", "0..*", "h:dateofDiagnosisAct", dateofDiagnosisAct]
        ]);


    var encounterDiagnosis = component.define("encounterDiagnosis")
        .templateRoot("2.16.840.1.113883.10.20.22.4.80")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["problemObservation", "1..1", "h:problemObservation", problemObservation]
        ]);


    var encounterActivity = component.define("encounterActivity")
        .templateRoot("2.16.840.1.113883.10.20.22.4.49")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["date_time", "1..1", "h:effectiveTime", processor.EffectiveTime],
            ["encounterDiagnosis", "0..*", "h:encounterDiagnosis", encounterDiagnosis],
            ["indication", "1..1", "h:indication", indication],
            ["serviceDeliveryLocation", "1..1", "h:serviceDeliveryLocation", serviceDeliveryLocation]
        ]);


    var medicationInformation = component.define("medicationInformation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.23")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["manufacturedMaterial", "1..1", "h:manufacturedMaterial"],
            ["manufacturerOrganization", "0..1", "h:manufacturerOrganization"]
        ]);



    var immunizationMedicationInformation = component.define("immunizationMedicationInformation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.54")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["manufacturedMaterial", "1..1", "h:manufacturedMaterial"],
            ["manufacturerOrganization", "0..1", "h:manufacturerOrganization"]
        ]);


    var product = component.define("product")
        .fields([
            ["medicationInformation", "1..1", "h:medicationInformation", medicationInformation],
            ["immunizationMedicationInformation", "0..1", "h:immunizationMedicationInformation", immunizationMedicationInformation]
        ]);



    var manufacturedProduct = component.define("manufacturedProduct")
        .fields([
            ["manufacturedLabeledDrug", "1..1", "h:manufacturedLabeledDrug"]
        ]);


    var medicationFreeTextSig = component.define("medicationFreeTextSig")
        .templateRoot("2.16.840.1.113883.10.20.22.4.147")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["text", "1..1", "h:text/@text()"],
            ["consumable", "1..1", "h:consumable", manufacturedProduct]
        ]);


    var substanceAdministeredAct = component.define("substanceAdministeredAct")
        .templateRoot("2.16.840.1.113883.10.20.22.4.118")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime]
        ]);


    var medicationSupplyOrder = component.define("medicationSupplyOrder")
        .templateRoot("2.16.840.1.113883.10.20.22.4.17")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["repeatNumber", "0..1", "h:repeatNumber"],
            ["quantity", "0..1", "h:quantity"],
            ["product", "0..1", "h:product", product],
            ["author", "1..1", "h:author"],
            ["instruction", "1..1", "h:instruction" , instruction]
        ]);


    var medicationDispense = component.define("medicationDispense")
        .templateRoot("2.16.840.1.113883.10.20.22.4.18")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["repeatNumber", "0..1", "h:repeatNumber"],
            ["quantity", "0..1", "h:quantity"],
            ["product", "0..1", "h:product", product],
            ["medicationSupplyOrder", "1..1", "h:medicationSupplyOrder", medicationSupplyOrder]
        ]);


    var preconditionSubstanceAdministration = component.define("preconditionSubstanceAdministration")
        .templateRoot("2.16.840.1.113883.10.20.22.4.25")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["value", "1..1", "h:value"]
        ]);


    var severityObservation = component.define("severityObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.8")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["value", "1..1", "h:value"]
        ]);




    var reactionObservation = component.define("reactionObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.9")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["value", "1..1", "h:value"],
            ["severityObservation", "1..1", "h:severityObservation", severityObservation]
        ]);


    var procedureActivityProcedure = component.define("procedureActivityProcedure")
        .templateRoot("2.16.840.1.113883.10.20.22.4.14")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["priorityCode", "0..1", "h:priorityCode"],
            ["methodCode", "0..1", "h:methodCode"],
            ["targetSiteCode", "0..*", "h:targetSiteCode"],
            ["specimen", "0..*", "h:specimen"],
            ["participant", "0..*", "h:participant", productInstance],
            ["entryReference", "1..1", "h:entryReference", entryReference],
            ["assessmentScaleObservation ", "1..1", "h:assessmentScaleObservation", assessmentScaleObservation],
            ["authorParticipation", "0..*", "h:authorParticipation"],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["reactionObservation", "1..1", "h:reactionObservation", reactionObservation],
            ["serviceDeliveryLocation", "1..1", "h:serviceDeliveryLocation", serviceDeliveryLocation]
        ]);




    var medicationActivity = component.define("medicationActivity")
        .templateRoot("2.16.840.1.113883.10.20.22.4.16")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "1..1", "h:effectiveTime", processor.EffectiveTime],
            ["repeatNumber", "0..1", "h:repeatNumber"],
            ["routeCode", "0..1", "h:routeCode"],
            ["approachSiteCode", "0..1", "h:approachSiteCode"],
            ["doseQuantity", "1..1", "h:doseQuantity"],
            ["rateQuantity", "0..1", "h:rateQuantity"],
            ["maxDoseQuantity", "0..1", "h:maxDoseQuantity"],
            ["administrationUnitCode", "0..1", "h:administrationUnitCode"],
            ["consumable", "1..1", "h:consumable", medicationInformation],
            ["performer", "0..1", "h:performer"],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
            ["participant", "1..*", "h:participant", participant],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["medicationSupplyOrder", "1..1", "h:medicationSupplyOrder", medicationSupplyOrder],
            ["medicationDispense", "1..1", "h:medicationDispense", medicationDispense],
            ["reactionObservation", "1..1", "h:reactionObservation", reactionObservation],
            ["drugMonitoringAct", "1..1", "h:drugMonitoringAct", drugMonitoringAct],
            ["sequenceNumber", "0..1", "h:sequenceNumber"],
            ["substanceAdministeredAct", "1..1", "h:substanceAdministeredAct", substanceAdministeredAct],
            ["medicationFreeTextSig", "1..1", "h:medicationFreeTextSig", medicationFreeTextSig],
            ["preconditionSubstanceAdministration", "0..*", "h:preconditionSubstanceAdministration", preconditionSubstanceAdministration]
        ]);


    var encounter = component.define("encounter")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier]
        ]);


    var procedureActivityObservation = component.define("procedureActivityObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.13")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["priorityCode", "0..1", "h:priorityCode"],
            ["methodCode", "0..1", "h:methodCode"],
            ["targetSiteCode", "0..*", "h:targetSiteCode"],
            ["value", "1..1", "h:value"],
            ["authorParticipation", "0..*", "h:authorParticipation"],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["medicationActivity", "1..1", "h:medicationActivity", medicationActivity],
            ["reactionObservation", "1..1", "h:reactionObservation", reactionObservation],
            ["participant", "1..1", "h:participant", serviceDeliveryLocation],
            ["encounter", "1..1", "h:encounter", encounter]
        ]);


    var drugVehicle = component.define("drugVehicle")
        .templateRoot("2.16.840.1.113883.10.20.22.4.24");

        var immunizationRefusalReason = component.define("immunizationRefusalReason")
        .templateRoot("2.16.840.1.113883.10.20.22.4.53")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor]
        ]);


    var immunizationActivity = component.define("immunizationActivity")
        .templateRoot("2.16.840.1.113883.10.20.22.4.52")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["administrationUnitCode", "0..1", "h:administrationUnitCode"],
            ["repeatNumber", "0..1", "h:repeatNumber"],
            ["doseQuantity", "0..1", "h:doseQuantity"],
            ["approachSiteCode", "0..1", "h:approachSiteCode"],
            ["performer", "0..*", "h:authorParticipation"],
            ["consumable", "1..1", "h:consumable", immunizationMedicationInformation],
            ["drugVehicle", "1..1", "h:drugVehicle", drugVehicle],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["medicationSupplyOrder", "1..1", "h:medicationSupplyOrder", medicationSupplyOrder],
            ["medicationDispense", "1..1", "h:medicationDispense", medicationDispense],
            ["reactionObservation", "1..1", "h:reactionObservation", reactionObservation],
            ["immunizationRefusalReason", "1..1", "h:immunizationRefusalReason", immunizationRefusalReason],
            ["preconditionSubstanceAdministration", "0..*", "h:preconditionSubstanceAdministration", preconditionSubstanceAdministration],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
            ["substanceAdministeredAct", "1..1", "h:substanceAdministeredAct", substanceAdministeredAct],

        ]);


    var advanceDirectiveObservation = component.define("advanceDirectiveObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.48")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation]
        ]);



    var act = component.define("act")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor]
        ]);


    var performer = component.define("performer")
        .fields([
            ["assignedEntity", "1..1", "h:assignedEntity"],
            ["id", "1..*", "h:id", shared.Identifier],
            ["addr", "1..*", "h:addr"],
            ["telecom", "1..*", "h:telecom"],
            ["representedOrganization", "0..*", "h:representedOrganization", representedOrganization],

        ]);

    var plannedEncounter = component.define("plannedEncounter")
        .templateRoot("2.16.840.1.113883.10.20.22.4.40")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["performer", "0..*", "h:performer", performer],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
            ["serviceDeliveryLocation", "1..1", "h:serviceDeliveryLocation", serviceDeliveryLocation],
            ["priorityPreference", "1..1", "h:priorityPreference", priorityPreference],
            ["indication", "1..1", "h:indication", indication]
        ]);

    var plannedAct = component.define("plannedAct")
        .templateRoot("2.16.840.1.113883.10.20.22.4.39")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["performer", "0..*", "h:performer", performer],
            ["priorityPreference", "1..1", "h:priorityPreference", priorityPreference],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication]
        ]);




    var plannedCoverage = component.define("plannedCoverage")
        .templateRoot("2.16.840.1.113883.10.20.22.4.39")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["authorParticipation", "1..*", "h:authorParticipation", authorParticipation],
            ["act", "1..1", "h:act", act]
        ]);



    var plannedProcedure = component.define("plannedProcedure")
        .templateRoot("2.16.840.1.113883.10.20.22.4.41")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["methodCode", "0..*", "h:methodCode"],
            ["targetSiteCode", "0..*", "h:targetSiteCode"],
            ["performer", "0..*", "h:performer", performer],
            ["authorParticipation", "1..*", "h:authorParticipation", authorParticipation],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["plannedCoverage", "1..1", "h:plannedCoverage", plannedCoverage],
            ["assessmentScaleObservation ", "1..1", "h:assessmentScaleObservation", assessmentScaleObservation],
            ["entryReference", "1..1", "h:entryReference", entryReference]
        ]);


    var plannedObservation = component.define("plannedObservation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.44")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["value", "1..1", "h:value"],
            ["methodCode", "0..*", "h:methodCode"],
            ["targetSiteCode", "0..*", "h:targetSiteCode"],
            ["performer", "0..*", "h:performer", performer],
            ["authorParticipation", "1..*", "h:authorParticipation", authorParticipation],
            ["priorityPreference", "1..1", "h:priorityPreference", priorityPreference],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["plannedCoverage", "1..1", "h:plannedCoverage", plannedCoverage]
        ]);


    var procedureActivityAct = component.define("procedureActivityAct")
        .templateRoot("2.16.840.1.113883.10.20.22.4.12")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["priorityCode", "1..1", "h:priorityCode", shared.ConceptDescriptor],
            ["performer", "0..*", "h:performer", performer],
            ["participant", "0..*", "h:participant", participant],
            ["encounter", "1..1", "h:encounter", encounter],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["medicationActivity", "1..1", "h:medicationActivity", medicationActivity]
        ]);


    var handoffCommunicationParticipants = component.define("handoffCommunicationParticipants")
        .templateRoot("2.16.840.1.113883.10.20.22.4.141")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["authorParticipation", "1..*", "h:authorParticipation", authorParticipation],
            ["participant", "1..*", "h:participant", participant]
        ]);


    var plannedMedicationActivity = component.define("plannedMedicationActivity")
        .templateRoot("2.16.840.1.113883.10.20.22.4.42")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["repeatNumber", "0..1", "h:repeatNumber"],
            ["approachSiteCode", "1..*", "h:approachSiteCode"],
            ["doseQuantity", "1..1", "h:doseQuantity"],
            ["rateQuantity", "0..1", "h:rateQuantity"],
            ["maxDoseQuantity", "0..1", "h:maxDoseQuantity"],
            ["performer", "0..*", "h:performer"],
            ["priorityPreference", "1..1", "h:priorityPreference", priorityPreference],
            ["consumable", "1..1", "h:consumable", medicationInformation],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["preconditionSubstanceAdministration", "0..*", "h:preconditionSubstanceAdministration", preconditionSubstanceAdministration]
        ]);


    var plannedImmunizationActivity = component.define("plannedImmunizationActivity")
        .templateRoot("2.16.840.1.113883.10.20.22.4.120")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "1..1", "h:effectiveTime", processor.EffectiveTime],
            ["repeatNumber", "0..1", "h:repeatNumber"],
            ["routeCode", "0..1", "h:routeCode"],
            ["approachSiteCode", "0..1", "h:approachSiteCode"],
            ["doseQuantity", "1..1", "h:doseQuantity"],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
            ["priorityPreference", "1..1", "h:priorityPreference", priorityPreference],
            ["preconditionSubstanceAdministration", "0..*", "h:preconditionSubstanceAdministration", preconditionSubstanceAdministration],
            ["consumable", "0..1", "h:consumable", immunizationMedicationInformation]
        ]);


    var plannedSupply = component.define("plannedSupply")
        .templateRoot("2.16.840.1.113883.10.20.22.4.43")
        .fields([
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["repeatNumber", "0..1", "h:repeatNumber"],
            ["product", "0..1", "h:product", product],
            ["performer", "0..1", "h:performer"],
            ["participant", "1..*", "h:participant", participant],
            ["medicationInformation", "1..1", "h:medicationInformation", medicationInformation],
            ["immunizationMedicationInformation", "0..1", "h:immunizationMedicationInformation", immunizationMedicationInformation],
            ["instruction", "1..1", "h:instruction" , instruction],
            ["indication", "1..1", "h:indication", indication],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
            ["plannedCoverage", "1..1", "h:plannedCoverage", plannedCoverage],
            ["priorityPreference", "1..1", "h:priorityPreference", priorityPreference]
        ]);


    var nutritionRecommendation = component.define("nutritionRecommendation")
        .templateRoot("2.16.840.1.113883.10.20.22.4.130")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["plannedAct", "1..1", "h:plannedAct", plannedAct],
            ["plannedEncounter", "1..1", "h:plannedEncounter", plannedEncounter],
            ["plannedObservation", "1..1", "h:plannedObservation", plannedObservation],
            ["plannedProcedure", "1..1", "h:plannedProcedure", plannedProcedure],
            ["plannedMedicationActivity", "1..1", "h:plannedMedicationActivity", plannedMedicationActivity],
            ["plannedSupply", "1..1", "h:plannedSupply", plannedSupply]
        ]);

    var plannedInterventionAct = component.define("plannedInterventionAct")
        .templateRoot("2.16.840.1.113883.10.20.22.4.146")
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["advanceDirectiveObservation", "1..1", "h:advanceDirectiveObservation", advanceDirectiveObservation],
            ["immunizationActivity", "1..1", "h:immunizationActivity", immunizationActivity],
            ["medicationActivity", "1..1", "h:medicationActivity", medicationActivity],
            ["procedureActivityAct", "1..1", "h:procedureActivityAct", procedureActivityAct],
            ["procedureActivityObservation", "1..1", "h:procedureActivityObservation", procedureActivityObservation],
            ["procedureActivityProcedure", "1..1", "h:procedureActivityProcedure", procedureActivityProcedure],
            ["encounterActivity", "1..1", "h:encounterActivity", encounterActivity],
            ["instruction", "1..1", "h:instruction", instruction],
            ["nonMedicinalSupplyActivity", "1..1", "h:nonMedicinalSupplyActivity", nonMedicinalSupplyActivity],
            ["plannedAct", "1..1", "h:plannedAct", plannedAct],
            ["plannedEncounter", "1..1", "h:plannedEncounter", plannedEncounter],
            ["plannedObservation", "1..1", "h:plannedObservation", plannedObservation],
            ["plannedProcedure", "1..1", "h:plannedProcedure", plannedProcedure],
            ["plannedMedicationActivity", "1..1", "h:plannedMedicationActivity", plannedMedicationActivity],
            ["plannedSupply", "1..1", "h:plannedSupply", plannedSupply],
            ["entryReference", "1..1", "h:entryReference", entryReference],
            ["participants", "0..*", "h:participants", handoffCommunicationParticipants],
            ["plannedImmunizationActivity", "1..1", "h:plannedImmunizationActivity", plannedImmunizationActivity],
            ["authorParticipation", "1..1", "h:authorParticipation", authorParticipation],
            ["externalDocumentReference", "1..1", "h:externalDocumentReference", externalDocumentReference],
            ["nutritionRecommendation", "1..1", "h:nutritionRecommendation", nutritionRecommendation]
        ]);


    var interventionAct = component.define("interventionAct")
        .templateRoot("2.16.840.1.113883.10.20.22.4.131")
        .fields([
            ["id", "1..*", "h:id", shared.Identifier],
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["statusCode", "1..1", "h:statusCode", shared.ConceptDescriptor],
            ["date_time", "0..1", "h:effectiveTime", processor.EffectiveTime],
            ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
            ["advanceDirectiveObservation", "0..*", "h:advanceDirectiveObservation", advanceDirectiveObservation],
            ["immunizationActivity", "0..*", "h:immunizationActivity", immunizationActivity],
            ["medicationActivity", "0..*", "h:medicationActivity", medicationActivity],
            ["procedureActivityAct", "0..*", "h:procedureActivityAct", procedureActivityAct],
            ["procedureActivityObservation", "0..*", "h:procedureActivityObservation", procedureActivityObservation],
            ["procedureActivityProcedure", "0..*", "h:procedureActivityProcedure", procedureActivityProcedure],
            ["encounterActivity", "0..*", "h:encounterActivity", encounterActivity],
            ["instruction", "0..*", "h:instruction", instruction],
            ["nonMedicinalSupplyActivity", "0..*", "h:nonMedicinalSupplyActivity", nonMedicinalSupplyActivity],
            ["nutritionRecommendation", "0..*", "h:nutritionRecommendation", nutritionRecommendation],
            ["entryReference", "0..*", "h:entryReference[@typeCode=REFR]", entryReference],
            ["handoffCommunicationParticipants", "1..1", "h:participant", handoffCommunicationParticipants],
            ["plannedInterventionAct", "0..*", "h:plannedInterventionAct", plannedInterventionAct],
            ["externalDocumentReference", "0..*", "h:externalDocumentReference", externalDocumentReference]
        ]);


    var interventionsSection = component.define("interventions")
        .templateRoot(["2.16.840.1.113883.10.20.22.4.32"])
        .fields([
            ["code", "1..1", "h:code", shared.ConceptDescriptor],
            ["title", "1..1", "h:title", processor.asString],
            ["text", "1..1", "h:text", shared.asString],
            ["interventionAct", "0..*", "h:interventionAct", interventionAct],
            ["plannedInterventionAct", "0..*", "h:plannedInterventionAct", plannedInterventionAct],
            ["handoffCommunicationParticipants", "0..*", "h:participant", handoffCommunicationParticipants]
        ]);


  return interventionsSection;
};

exports.interventionsSection = exportinterventionsSection;