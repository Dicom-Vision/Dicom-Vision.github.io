---
layout: case
title: "TAVI-TEC: Pianificazione TAVI Assistita dall'IA | DICOM Vision"
description: "Segmentazione automatica della CTA, misure dell'annulus, valutazione degli accessi vascolari e supporto al sizing della protesi per la pianificazione preoperatoria TAVI — in un unico workflow web. Valutato su 109 pazienti."
permalink: /vetrina/tavi-tec
slug_en: /showcase/tavi-tec
hide_footer_cta: true

case:
  badge: "Imaging Cardiaco · Workflow IA · Pianificazione TAVI"
  name: "TAVI-TEC"
  tagline: "Pianificazione TAVI assistita dall'IA dentro DICOM Vision®"
  subtitle: "Uno showcase di come DICOM Vision® unisce imaging CTA, segmentazione IA, visualizzazione 3D, valutazione degli accessi vascolari e supporto al sizing in un unico workflow web per la pianificazione della TAVI."
  cta_primary:
    label: "Richiedi una Demo"
    url: /contact
  cta_secondary:
    label: "Vedi il Workflow"
    url: "#workflow"
  stats:
    - value: "109"
      label: "pazienti — coorte CTA retrospettiva valutata"
    - value: "2–6 min"
      label: "tempo di elaborazione automatica su GPU"
    - value: "82%"
      label: "concordanza retrospettiva con la taglia della valvola SAPIEN 3 Ultra impiantata"
    - value: "0.934 CCC"
      label: "concordanza sull'area dell'annulus vs misure del clinico"
  sections:
    - title: "Il problema"
      body: >
        La pianificazione della TAVI dipende da una valutazione CTA accurata dell'annulus
        aortico, della radice aortica, delle calcificazioni e degli accessi vascolari.


        Le misurazioni manuali richiedono tempo e possono variare tra operatori, soprattutto
        nei casi borderline.


        TAVI-TEC esplora come l'IA può aiutare a standardizzare questo workflow e portare
        le misurazioni automatiche direttamente nell'ambiente di imaging clinico.


        **Pensato per ospedali, Heart Team, gruppi di ricerca e progetti medtech che lavorano
        su workflow avanzati di imaging cardiaco.**
    - title: "Cosa fa TAVI-TEC"
      body: >
        TAVI-TEC elabora automaticamente gli studi CTA preoperatori per supportare:
      bullets:
        - "Segmentazione della radice aortica"
        - "Identificazione del piano dell'annulus"
        - "Misure di area, perimetro e diametri dell'annulus"
        - "Visualizzazione delle calcificazioni"
        - "Valutazione degli accessi vascolari"
        - "Viste CPR delle arterie iliache e femorali"
        - "Valutazione della taglia della protesi"
        - "Revisione anatomica 3D dentro DICOM Vision®"
      image: /assets/images/showcase/tavi-tec-viewer.png
      image_alt: "TAVI-TEC nel viewer DICOM Vision: CTA assiale con segmentazione 3D della radice aortica e vista total-body degli accessi vascolari"
      image_caption: "TAVI-TEC dentro DICOM Vision®. (A) Vista assiale dell'aorta e vista tridimensionale della radice aortica segmentata con annotazioni nel pannello di destra. (B) Scansione total-body con vista tridimensionale dell'aorta segmentata per la valutazione degli accessi vascolari."
    - title: "Il workflow"
      id: "workflow"
      body: >
        Dal caricamento della CTA alla discussione dell'Heart Team, ogni passaggio avviene
        nello stesso ambiente web — senza export, senza software da workstation separati.
      image: /assets/images/showcase/tavi-tec-pipeline.png
      image_alt: "Pipeline del framework computazionale TAVI-TEC"
      image_caption: "Pipeline del framework computazionale per le annotazioni automatiche e la predizione della taglia della valvola."
    - title: "Perché DICOM Vision®"
      body: >
        DICOM Vision® fornisce l'ambiente web in cui i clinici possono rivedere le immagini
        CTA originali, ispezionare gli output generati dall'IA, visualizzare le ricostruzioni
        3D, verificare le misurazioni e discutere il caso in un'unica piattaforma.


        L'obiettivo non è sostituire il giudizio clinico, ma rendere l'analisi avanzata delle
        immagini più facile da usare, rivedere e condividere.
    - title: "Valutato su dati clinici reali"
      body: >
        In una valutazione retrospettiva su **109 pazienti TAVI**, il workflow TAVI-TEC ha
        elaborato gli studi CTA in **2,2–6,4 minuti** su GPU.


        Il sistema ha mostrato una forte concordanza con le misurazioni dell'annulus
        effettuate dai clinici (CCC 0,934 per l'area dell'annulus) e ha raggiunto una
        **concordanza dell'82% con le taglie delle valvole SAPIEN 3 Ultra impiantate**,
        con la maggior parte delle discrepanze tra taglie adiacenti.
  final_cta:
    title: "Costruisci workflow di imaging avanzati con DICOM Vision®"
    text: "DICOM Vision® aiuta i team clinici e di ricerca a combinare visualizzazione DICOM, collaborazione, annotazione, segmentazione e analisi assistita dall'IA in un unico ambiente web. Scopri come workflow come TAVI-TEC possono supportare ricerca, pianificazione procedurale e revisione multidisciplinare."
    button_primary: "Richiedi una Demo"
    button_secondary: "Contattaci"
  disclaimer: "TAVI-TEC è presentato come showcase di ricerca e innovazione. Il workflow è pensato per supportare professionisti sanitari qualificati e non sostituisce il giudizio clinico. Ulteriori validazioni possono essere necessarie in base all'uso clinico, al contesto di implementazione e allo stato regolatorio."
---
