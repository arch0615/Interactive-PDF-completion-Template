import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config.js';

const F = config.fields;

function drawText(page, font, fieldConfig, text) {
  if (!text || !fieldConfig) return;
  page.drawText(String(text), {
    x: fieldConfig.x,
    y: fieldConfig.y,
    size: fieldConfig.size || 9,
    font,
    color: rgb(0, 0, 0),
  });
}

function drawCheckmark(page, font, pos) {
  if (!pos) return;
  page.drawText('X', {
    x: pos.x || pos.yesX,
    y: pos.y,
    size: 10,
    font,
    color: rgb(0, 0.3, 0),
  });
}

export async function generatePdf(formData) {
  const templateBytes = fs.readFileSync(config.templatePath);
  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();
  const p1 = pages[0];
  const p2 = pages[1];

  // ===================== ACCOUNTS =====================
  drawText(p1, fontBold, F.companyName, formData.companyName);
  drawText(p1, font, F.tradingAs, formData.tradingAs);
  drawText(p1, font, F.regNumber, formData.regNumber);
  drawText(p1, font, F.proprietorPartnerName, formData.proprietorPartnerName);
  drawText(p1, font, F.invoiceAddress1, formData.invoiceAddress1);
  drawText(p1, font, F.invoiceAddress2, formData.invoiceAddress2);
  drawText(p1, font, F.invoiceAddress3, formData.invoiceAddress3);
  drawText(p1, font, F.invoicePostcode, formData.invoicePostcode);
  drawText(p1, font, F.invoiceContact, formData.invoiceContact);
  drawText(p1, font, F.invoiceTel, formData.invoiceTel);
  drawText(p1, font, F.invoiceEmail, formData.invoiceEmail);
  drawText(p1, font, F.invoiceMobile, formData.invoiceMobile);
  drawText(p1, font, F.proprietorHomeAddress1, formData.proprietorHomeAddress1);
  drawText(p1, font, F.proprietorHomeAddress2, formData.proprietorHomeAddress2);
  drawText(p1, font, F.proprietorHomePostcode, formData.proprietorHomePostcode);

  // Business type checkbox
  if (formData.businessType && F.businessType[formData.businessType]) {
    drawCheckmark(p1, fontBold, F.businessType[formData.businessType]);
  }

  // ===================== SERVICE =====================
  drawText(p1, font, F.collectionSiteAddress1, formData.collectionSiteAddress1);
  drawText(p1, font, F.collectionSiteAddress2, formData.collectionSiteAddress2);
  drawText(p1, font, F.collectionSitePostcode, formData.collectionSitePostcode);
  drawText(p1, font, F.serviceContactName, formData.serviceContactName);
  drawText(p1, font, F.serviceTel, formData.serviceTel);
  drawText(p1, font, F.serviceEmail, formData.serviceEmail);
  drawText(p1, font, F.serviceMobile, formData.serviceMobile);

  // ===================== SERVICE SCHEDULE =====================
  drawText(p1, font, F.orderNumber, formData.orderNumber);

  // Service table rows
  if (formData.serviceRows) {
    formData.serviceRows.forEach((row, i) => {
      const y = F.serviceTableStartY - i * F.serviceTableRowHeight;
      const cols = F.serviceTableColumns;
      const sz = F.serviceTableSize;

      for (const [key, col] of Object.entries(cols)) {
        if (row[key]) {
          p1.drawText(String(row[key]), {
            x: col.x,
            y,
            size: sz,
            font,
            color: rgb(0, 0, 0),
          });
        }
      }
    });
  }

  // Special Conditions
  const sc = F.specialConditions;
  for (let i = 0; i < 5; i++) {
    const key = `specialConditions${i + 1}`;
    if (formData[key]) {
      p1.drawText(formData[key], {
        x: sc.x,
        y: sc.startY - i * sc.lineHeight,
        size: sc.size,
        font,
        color: rgb(0, 0, 0),
      });
    }
  }

  // ===================== PAGE 2 =====================

  // Invoicing & Payment
  if (formData.electronicInvoicing) {
    drawCheckmark(p2, fontBold, F.electronicInvoicing);
  }
  drawText(p2, font, F.electronicInvoicingEmail, formData.electronicInvoicingEmail);
  drawText(p2, font, F.initialServiceTermWeeks, formData.initialServiceTermWeeks);
  if (formData.paymentMethod && F.paymentMethod[formData.paymentMethod]) {
    drawCheckmark(p2, fontBold, F.paymentMethod[formData.paymentMethod]);
  }
  drawText(p2, font, F.inAdvanceWeeks, formData.inAdvanceWeeks);

  // Waste Schedule
  drawText(p2, font, F.producer, formData.producer);
  drawText(p2, font, F.wasteProcess, formData.wasteProcess);
  drawText(p2, font, F.transferNoteFrom, formData.transferNoteFrom);
  drawText(p2, font, F.transferNoteTo, formData.transferNoteTo);

  if (formData.wasteTypes) {
    for (const [key, checked] of Object.entries(formData.wasteTypes)) {
      if (checked && F.wasteTypes[key]) {
        drawCheckmark(p2, fontBold, F.wasteTypes[key]);
      }
    }
  }

  // Pre-treatment Declaration
  if (formData.segregateWaste && F.segregateWaste[formData.segregateWaste]) {
    drawCheckmark(p2, fontBold, F.segregateWaste[formData.segregateWaste]);
  }

  if (formData.recoveredItems) {
    for (const [key, checked] of Object.entries(formData.recoveredItems)) {
      if (checked && F.recoveredItems[key]) {
        drawCheckmark(p2, fontBold, F.recoveredItems[key]);
      }
    }
  }
  drawText(p2, font, F.recoveredOther1, formData.recoveredOther1);
  drawText(p2, font, F.recoveredOther2, formData.recoveredOther2);

  // Health & Safety
  if (formData.healthSafety) {
    for (const [key, value] of Object.entries(formData.healthSafety)) {
      if (value && F.healthSafety[key]) {
        const hs = F.healthSafety[key];
        const x = value === 'yes' ? hs.yesX : hs.noX;
        p2.drawText('X', {
          x,
          y: hs.y,
          size: 10,
          font: fontBold,
          color: rgb(0, 0.3, 0),
        });
      }
    }
  }

  // Authorisation - text fields
  drawText(p2, font, F.supplierPrintName, formData.supplierPrintName);
  drawText(p2, font, F.customerPrintName, formData.customerPrintName);
  drawText(p2, font, F.supplierPosition, formData.supplierPosition);
  drawText(p2, font, F.customerPosition, formData.customerPosition);
  drawText(p2, font, F.supplierDate, formData.supplierDate);
  drawText(p2, font, F.customerDate, formData.customerDate);

  // Authorisation - signatures
  for (const sigKey of ['supplierSignature', 'customerSignature']) {
    if (formData[sigKey]) {
      try {
        const base64Data = formData[sigKey].replace(/^data:image\/png;base64,/, '');
        const sigBytes = Buffer.from(base64Data, 'base64');
        const sigImage = await pdfDoc.embedPng(sigBytes);
        const sc = F[sigKey];
        p2.drawImage(sigImage, {
          x: sc.x,
          y: sc.y,
          width: sc.width,
          height: sc.height,
        });
      } catch (err) {
        console.error(`Failed to embed ${sigKey}:`, err.message);
      }
    }
  }

  // Save
  const pdfBytes = await pdfDoc.save();
  const filename = `completed_${uuidv4()}.pdf`;
  const outputPath = join(config.outputDir, filename);
  fs.writeFileSync(outputPath, pdfBytes);

  return { filename, outputPath };
}
