import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// PDF page size: 594.96 x 841.92 points (A4)
// Coordinate origin: bottom-left

export const config = {
  templatePath: join(__dirname, '..', '3a3de12b-352c-43a1-9527-2007b2948259.pdf'),
  outputDir: join(__dirname, 'output'),

  fields: {
    // ===================== PAGE 1 =====================

    // --- Accounts ---
    companyName:            { page: 0, x: 145, y: 693, size: 9 },
    businessType: {
      limitedCompany:                { page: 0, x: 530, y: 693 },
      limitedLiabilityPartnership:   { page: 0, x: 530, y: 641 },
      soleTrader:                    { page: 0, x: 530, y: 619 },
      partnership:                   { page: 0, x: 530, y: 597 },
    },
    tradingAs:              { page: 0, x: 115, y: 667, size: 9 },
    regNumber:              { page: 0, x: 460, y: 667, size: 9 },
    proprietorPartnerName:  { page: 0, x: 235, y: 641, size: 9 },
    invoiceAddress1:        { page: 0, x: 135, y: 619, size: 9 },
    invoiceAddress2:        { page: 0, x: 50,  y: 597, size: 9 },
    invoiceAddress3:        { page: 0, x: 50,  y: 575, size: 9 },
    invoicePostcode:        { page: 0, x: 260, y: 575, size: 9 },
    invoiceContact:         { page: 0, x: 130, y: 549, size: 9 },
    invoiceTel:             { page: 0, x: 400, y: 549, size: 9 },
    invoiceEmail:           { page: 0, x: 90,  y: 527, size: 9 },
    invoiceMobile:          { page: 0, x: 400, y: 527, size: 9 },
    proprietorHomeAddress1: { page: 0, x: 220, y: 501, size: 9 },
    proprietorHomeAddress2: { page: 0, x: 50,  y: 479, size: 9 },
    proprietorHomePostcode: { page: 0, x: 430, y: 479, size: 9 },

    // --- Service ---
    collectionSiteAddress1: { page: 0, x: 170, y: 437, size: 9 },
    collectionSiteAddress2: { page: 0, x: 50,  y: 415, size: 9 },
    collectionSitePostcode: { page: 0, x: 430, y: 415, size: 9 },
    serviceContactName:     { page: 0, x: 135, y: 393, size: 9 },
    serviceTel:             { page: 0, x: 400, y: 393, size: 9 },
    serviceEmail:           { page: 0, x: 90,  y: 371, size: 9 },
    serviceMobile:          { page: 0, x: 400, y: 371, size: 9 },

    // --- Service Schedule ---
    orderNumber:            { page: 0, x: 145, y: 335, size: 9 },

    // Service schedule table rows - each row has 10 columns
    // Table starts around y: 285, rows spaced ~22pt apart
    serviceTableStartY: 275,
    serviceTableRowHeight: 22,
    serviceTableColumns: {
      type:           { x: 50 },
      size:           { x: 120 },
      qty:            { x: 175 },
      wasteType:      { x: 210 },
      collectionFreq: { x: 295 },
      delDate:        { x: 370 },
      emptyCharge:    { x: 430 },
      rentalPerBin:   { x: 495 },
      dutyCare:       { x: 555 },
      delColFee:      { x: 615 },
    },
    serviceTableSize: 7,

    // --- Special Conditions ---
    specialConditions: {
      startY: 133,
      lineHeight: 20,
      x: 50,
      size: 9,
      page: 0,
    },

    // ===================== PAGE 2 =====================

    // --- Invoicing & Payment (top of page 2) ---
    electronicInvoicing:      { page: 1, x: 290, y: 710 },
    electronicInvoicingEmail: { page: 1, x: 135, y: 690, size: 9 },
    initialServiceTermWeeks:  { page: 1, x: 415, y: 710, size: 9 },
    paymentMethod: {
      directDebit:    { page: 1, x: 525, y: 718 },
      standardCredit: { page: 1, x: 525, y: 700 },
      inAdvance:      { page: 1, x: 525, y: 682 },
    },
    inAdvanceWeeks: { page: 1, x: 580, y: 682, size: 8 },

    // --- Waste Schedule ---
    producer:         { page: 1, x: 105, y: 631, size: 9 },
    wasteProcess:     { page: 1, x: 140, y: 609, size: 9 },
    transferNoteFrom: { page: 1, x: 430, y: 609, size: 9 },
    transferNoteTo:   { page: 1, x: 520, y: 609, size: 9 },
    wasteTypes: {
      paperCardboard:     { page: 1, x: 66,  y: 582 },
      glass:              { page: 1, x: 195, y: 582 },
      plastics:           { page: 1, x: 350, y: 582 },
      metals:             { page: 1, x: 490, y: 582 },
      wood:               { page: 1, x: 66,  y: 555 },
      cateringWaste:      { page: 1, x: 195, y: 555 },
      mixedMunicipalWaste:{ page: 1, x: 350, y: 555 },
    },

    // --- Pre-treatment Declaration ---
    segregateWaste: {
      yes: { page: 1, x: 285, y: 498 },
      no:  { page: 1, x: 480, y: 498 },
    },
    recoveredItems: {
      paper:     { page: 1, x: 66,  y: 467 },
      glass:     { page: 1, x: 150, y: 467 },
      plastic:   { page: 1, x: 245, y: 467 },
      metals:    { page: 1, x: 340, y: 467 },
      wood:      { page: 1, x: 66,  y: 445 },
      food:      { page: 1, x: 150, y: 445 },
      greenwaste:{ page: 1, x: 245, y: 445 },
      weee:      { page: 1, x: 340, y: 445 },
    },
    recoveredOther1: { page: 1, x: 440, y: 467, size: 8 },
    recoveredOther2: { page: 1, x: 440, y: 445, size: 8 },

    // --- Health & Safety ---
    healthSafety: {
      clearAccess:                   { page: 1, yesX: 490, noX: 540, y: 370 },
      wellLit:                       { page: 1, yesX: 490, noX: 540, y: 352 },
      reverseInOut:                  { page: 1, yesX: 490, noX: 540, y: 334 },
      overheadCablesNarrowGateways:  { page: 1, yesX: 490, noX: 540, y: 316 },
      gravelCobbles:                 { page: 1, yesX: 490, noX: 540, y: 298 },
      vehicleInView:                 { page: 1, yesX: 490, noX: 540, y: 280 },
      excessWalking:                 { page: 1, yesX: 490, noX: 540, y: 262 },
      publicStaffAnimals:            { page: 1, yesX: 490, noX: 540, y: 244 },
    },

    // --- Authorisation ---
    supplierSignature: { page: 1, x: 170, y: 170, width: 150, height: 35 },
    customerSignature: { page: 1, x: 430, y: 170, width: 150, height: 35 },
    supplierPrintName: { page: 1, x: 135, y: 148, size: 9 },
    customerPrintName: { page: 1, x: 400, y: 148, size: 9 },
    supplierPosition:  { page: 1, x: 115, y: 126, size: 9 },
    customerPosition:  { page: 1, x: 380, y: 126, size: 9 },
    supplierDate:      { page: 1, x: 95,  y: 104, size: 9 },
    customerDate:      { page: 1, x: 370, y: 104, size: 9 },
  },
};
