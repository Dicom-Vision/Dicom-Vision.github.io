---
layout: case
title: "TAVI-TEC: AI-Assisted TAVI Planning | DICOM Vision"
description: "Automatic CTA segmentation, annular measurements, vascular access assessment and valve sizing support for preoperative TAVI planning — in a single web-based workflow. Evaluated on 109 patients."
permalink: /showcase/tavi-tec
slug_it: /vetrina/tavi-tec
hide_footer_cta: true

case:
  badge: "Cardiac Imaging · AI Workflow · TAVI Planning"
  name: "TAVI-TEC"
  tagline: "AI-assisted TAVI planning inside DICOM Vision®"
  subtitle: "A showcase of how DICOM Vision® brings CTA imaging, AI segmentation, 3D visualization, vascular access assessment and sizing support into a single web-based workflow for TAVI planning."
  cta_primary:
    label: "Request a Demo"
    url: /contact
  cta_secondary:
    label: "View Workflow"
    url: "#workflow"
  stats:
    - value: "109"
      label: "patients — evaluated retrospective CTA cohort"
    - value: "2–6 min"
      label: "automated processing time on GPU"
    - value: "82%"
      label: "retrospective agreement with implanted SAPIEN 3 Ultra valve size"
    - value: "0.934 CCC"
      label: "annular area agreement vs clinician measurements"
  sections:
    - title: "The problem"
      body: >
        TAVI planning depends on accurate CTA assessment of the aortic annulus, aortic root,
        calcifications and vascular access.


        Manual measurements can be time-consuming and may vary between operators, especially
        in borderline cases.


        TAVI-TEC explores how AI can help standardize this workflow and bring automatic
        measurements directly into the clinical imaging environment.


        **Designed for hospitals, Heart Teams, research groups and medtech projects working
        on advanced cardiac imaging workflows.**
    - title: "What TAVI-TEC does"
      body: >
        TAVI-TEC automatically processes preoperative CTA studies to support:
      bullets:
        - "Aortic root segmentation"
        - "Annular plane identification"
        - "Annular area, perimeter and diameter measurements"
        - "Calcification visualization"
        - "Vascular access assessment"
        - "CPR views of iliac and femoral arteries"
        - "Prosthesis size evaluation"
        - "3D anatomical review inside DICOM Vision®"
      image: /assets/images/showcase/tavi-tec-viewer.png
      image_alt: "TAVI-TEC inside the DICOM Vision viewer: axial CTA with 3D aortic root segmentation and full-body vascular access view"
      image_caption: "TAVI-TEC inside DICOM Vision®. (A) Axial view of the aorta and three-dimensional view of the segmented aortic root with annotations in the right panel. (B) Full-body scan with three-dimensional view of the segmented aorta for vascular access assessment."
    - title: "The workflow"
      id: "workflow"
      body: >
        From CTA upload to Heart Team discussion, every step happens in the same web-based
        environment — no exports, no separate workstation software.
      image: /assets/images/showcase/tavi-tec-pipeline.png
      image_alt: "Pipeline of the TAVI-TEC computational framework"
      image_caption: "Pipeline of the computational framework for automated annotations and valve-size prediction."
    - title: "Why DICOM Vision®"
      body: >
        DICOM Vision® provides the web-based environment where clinicians can review the
        original CTA images, inspect AI-generated outputs, visualize 3D reconstructions,
        check measurements and discuss the case within a single platform.


        The goal is not to replace clinical judgment, but to make advanced imaging analysis
        easier to access, review and share.
    - title: "Evaluated on real clinical data"
      body: >
        In a retrospective evaluation of **109 TAVI patients**, the TAVI-TEC workflow
        processed CTA studies in **2.2 to 6.4 minutes** on a GPU.


        The system showed strong agreement with clinician-derived annular measurements
        (CCC 0.934 for annular area) and achieved **82% agreement with implanted
        SAPIEN 3 Ultra valve sizes**, with most mismatches occurring between adjacent sizes.
  final_cta:
    title: "Build advanced imaging workflows with DICOM Vision®"
    text: "DICOM Vision® helps clinical and research teams combine DICOM visualization, collaboration, annotation, segmentation and AI-assisted analysis in a single web-based environment. Discover how workflows like TAVI-TEC can support research, procedural planning and multidisciplinary review."
    button_primary: "Request a Demo"
    button_secondary: "Contact Us"
  disclaimer: "TAVI-TEC is presented as a research and innovation showcase. The workflow is intended to support qualified healthcare professionals and does not replace clinical judgment. Further validation may be required depending on clinical use, deployment context and regulatory status."
---
