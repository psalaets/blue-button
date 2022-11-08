"use strict";

var component = require("@amida-tech/blue-button-xml").component;
var shared = require("./shared");

var exportCCD = function (version) {
  var header = require("./header").header;
  var patient = require("./demographics").patient;
  var resultsSection = require("./sections/results").resultsSection(version)[0];
  var vitalSignsSection = require("./sections/vitals").vitalSignsSection(version)[0];
  var problemsSection = require("./sections/problems").problemsSection(version)[0];
  var immunizationsSection = require("./sections/immunizations").immunizationsSection(version)[0];
  var socialHistorySection = require("./sections/social_history").socialHistorySection(version)[0];
  var medicationsSection = require("./sections/medications").medicationsSection(version)[0];
  var allergiesSection = require("./sections/allergies").allergiesSection(version)[0];
  var encountersSection = require("./sections/encounters").encountersSection(version)[0];
  var proceduresSection = require("./sections/procedures").proceduresSection(version)[0];
  var plan_of_care_section = require("./sections/plan_of_care").plan_of_care_section(version)[0];
  var payers_section = require("./sections/payers").payers_section(version)[0];
  var reason_for_referral_section = require("./sections/reason_for_referral").reason_for_referral_section(version)[0];
  var hospital_discharge_instructions_section = require("./sections/hospital_discharge_instructions").hospital_discharge_instructions_section(version)[0];
  var hospital_discharge_medications_section = require("./sections/hospital_discharge_medications").hospital_discharge_medications_section(version)[0];
  var functional_status_section = require("./sections/functional_status").functionalStatusSection(version)[0];
  var review_of_systems_section = require("./sections/review_of_systems").reviewOfSystemsSection(version)[0];
  var nutrition_section = require("./sections/nutrition").nutritionSection(version);
  var mental_status_section = require("./sections/mental_status").mentalStatusSection()[0];
  var plan_of_treatment_section = require("./sections/plan_of_treatment").planOfTreatmentSection(version);
  var assessment_section = require("./sections/assessment").assessmentSection();
  var subjective_section = require("./sections/subjective").subjectiveSection(version);
  var objective_section = require("./sections/objective").objectiveSection(version);
  var chief_complaint_section = require("./sections/chief_complaint").chiefComplaintSection();
  var instructions_section = require("./sections/instructions").instructionsSection(version);
  var physical_exam_section = require("./sections/physical_exam").physicalExamSection();
  var medical_equipment_section = require("./sections/medical_equipment_section").medicalEquipmentSection(version)[0];
  var assessment_plan_section = require("./sections/assessment_plan").assessmentPlanSection(version);

  return component.define("CCD")
    .fields([
      ["meta", "0..1", ".", shared.metaData],
      ["header", "1..1", "(/ | //h:ClinicalDocument)[last()]", header],
      ["demographics", "1..1", "(/ | //h:recordTarget/h:patientRole)[last()]", patient],
      ["vitals", "0..1", vitalSignsSection.xpath(), vitalSignsSection],
      ["results", "0..1", resultsSection.xpath(), resultsSection],
      ["medications", "0..1", medicationsSection.xpath(), medicationsSection],
      ["encounters", "0..1", encountersSection.xpath(), encountersSection],
      ["allergies", "0..1", allergiesSection.xpath(), allergiesSection],
      ["immunizations", "0..1", immunizationsSection.xpath(), immunizationsSection],
      ["social_history", "0..1", socialHistorySection.xpath(), socialHistorySection],
      ["problems", "0..1", problemsSection.xpath(), problemsSection],
      ["procedures", "0..1", proceduresSection.xpath(), proceduresSection],
      ["plan_of_care", "0..1", plan_of_care_section.xpath(), plan_of_care_section],
      ["payers", "0..1", payers_section.xpath(), payers_section],
      ["reason_for_referral", "0..1", reason_for_referral_section.xpath(), reason_for_referral_section],
      ["hospital_discharge_instructions", "0..1", hospital_discharge_instructions_section.xpath(), hospital_discharge_instructions_section],
      ["hospital_discharge_medications", "0..1", hospital_discharge_medications_section.xpath(), hospital_discharge_medications_section],
      ["functional_statuses", "0..1", functional_status_section.xpath(), functional_status_section],
      ["nutrition_observations", "0..1", nutrition_section.xpath(), nutrition_section],
      ["review_of_systems", "0..1", review_of_systems_section.xpath(), review_of_systems_section],
      ["mental_status", "0..1", mental_status_section.xpath(), mental_status_section],
      ["plan_of_treatment", "0..1", plan_of_treatment_section.xpath(), plan_of_treatment_section],
      ["assessment", "0..1", assessment_section.xpath(), assessment_section],
      ["subjective", "0..1", subjective_section.xpath(), subjective_section],
      ["objective", "0..1", objective_section.xpath(), objective_section],
      ["chief_complaint", "0..1", chief_complaint_section.xpath(), chief_complaint_section],
      ["instructions", "0..1", instructions_section.xpath(), instructions_section],
      ["physical_exam", "0..1", physical_exam_section.xpath(), physical_exam_section],
      ["medical_devices", "0..1", medical_equipment_section.xpath(), medical_equipment_section],
      ["assessment_plan", "0..1", assessment_plan_section.xpath(), assessment_plan_section]
    ]);
};

exports.CCD = exportCCD;
