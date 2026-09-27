import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InspectionRecord, UserRole } from '../types/compliance';

/**
 * Generates an official, formal, branded Legal Metrology Inspection PDF Document
 * conforming to statutory formats under Section 15 of Legal Metrology Act, 2009
 * and Legal Metrology (Packaged Commodities) Rules, 2011.
 */
export async function generateOfficialNoticePdf(
  record: InspectionRecord,
  officer: UserRole
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const isCompliant = record.overallStatus === 'COMPLIANT';
  const isShortWeight = record.weightVerification.status === 'SHORT_WEIGHT_VIOLATION';

  // Palette
  const navyDark = [15, 23, 42]; // slate-900
  const navyMedium = [30, 41, 59]; // slate-800
  const indiaSaffron = [217, 119, 6]; // amber-600
  const indiaGreen = [22, 101, 52]; // emerald-800
  const alertRed = [185, 28, 28]; // rose-700
  const slateLight = [241, 245, 249]; // slate-100
  const slateMuted = [100, 116, 139]; // slate-500

  // 1. Official Border / Perimeter Rule
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Decorative top banner stripe
  doc.setFillColor(15, 23, 42); // Navy top stripe
  doc.rect(8, 8, pageWidth - 16, 4, 'F');

  let currentY = 17;

  // 2. Official Government Emblem & Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  doc.text('GOVERNMENT OF INDIA', pageWidth / 2, currentY, { align: 'center' });

  currentY += 4.5;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  doc.text('DEPARTMENT OF CONSUMER AFFAIRS', pageWidth / 2, currentY, { align: 'center' });

  currentY += 4.5;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navyMedium[0], navyMedium[1], navyMedium[2]);
  doc.text('DIRECTORATE OF LEGAL METROLOGY (PACKAGED COMMODITIES)', pageWidth / 2, currentY, {
    align: 'center',
  });

  currentY += 3.8;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(
    'Enforcement Wing under Legal Metrology Act, 2009 & Legal Metrology (PC) Rules, 2011',
    pageWidth / 2,
    currentY,
    { align: 'center' }
  );

  currentY += 3;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);

  currentY += 6;

  // Document Title Banner Box
  const bannerColor = isCompliant ? [240, 253, 244] : [254, 242, 242]; // light emerald or light red
  const bannerBorderColor = isCompliant ? indiaGreen : alertRed;
  doc.setFillColor(bannerColor[0], bannerColor[1], bannerColor[2]);
  doc.setDrawColor(bannerBorderColor[0], bannerBorderColor[1], bannerBorderColor[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, currentY, contentWidth, 12, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(bannerBorderColor[0], bannerBorderColor[1], bannerBorderColor[2]);
  const titleText = isCompliant
    ? 'CERTIFICATE OF COMPLIANCE (RULE 6)'
    : isShortWeight
    ? 'STATUTORY SEIZURE & SHORT-WEIGHT VIOLATION NOTICE (SECTION 15 & 36)'
    : 'FORM V: NOTICE OF OFFENCE & SHOW CAUSE MEMORANDUM (RULE 27)';
  doc.text(titleText, pageWidth / 2, currentY + 7.5, { align: 'center' });

  currentY += 16;

  // 3. Official Metadata Grid Table
  const metaLeft = [
    ['Case Ref Number:', record.caseNumber],
    ['Notice Number:', record.noticeNumber || `NOT-${record.caseNumber}`],
    ['Inspection Date:', new Date(record.inspectionDate).toLocaleString('en-IN')],
    ['Inspection Location:', record.location],
  ];

  const metaRight = [
    ['Inspecting Officer:', record.inspectorName],
    ['Inspector ID / Badge:', record.inspectorId],
    ['Jurisdiction:', record.jurisdiction],
    ['Compliance Verdict:', isCompliant ? 'COMPLIANT (PASSED)' : 'NON-COMPLIANT (OFFENCE DETECTED)'],
  ];

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'plain',
    styles: { fontSize: 7.5, cellPadding: 1.2 },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: [51, 65, 85], cellWidth: 34 },
      1: { textColor: [15, 23, 42], cellWidth: 56 },
      2: { fontStyle: 'bold', textColor: [51, 65, 85], cellWidth: 36 },
      3: { textColor: [15, 23, 42], cellWidth: 56 },
    },
    body: [
      [metaLeft[0][0], metaLeft[0][1], metaRight[0][0], metaRight[0][1]],
      [metaLeft[1][0], metaLeft[1][1], metaRight[1][0], metaRight[1][1]],
      [metaLeft[2][0], metaLeft[2][1], metaRight[2][0], metaRight[2][1]],
      [metaLeft[3][0], metaLeft[3][1], metaRight[3][0], metaRight[3][1]],
    ],
  });

  currentY = (doc as any).lastAutoTable.finalY + 4;

  // 4. Section 1: Commodity Particulars
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  doc.text('1. PARTICULARS OF PACKAGED COMMODITY SAMPLED', margin, currentY);

  currentY += 2;

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'grid',
    styles: { fontSize: 7.5, cellPadding: 1.5, lineColor: [226, 232, 240], lineWidth: 0.2 },
    headStyles: { fillColor: [248, 250, 252], textColor: [15, 23, 42], fontStyle: 'bold' },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 40 },
      1: { cellWidth: 51 },
      2: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 40 },
      3: { cellWidth: 51 },
    },
    body: [
      ['Product Commodity:', record.productName, 'Brand / Trademark:', record.brandName],
      ['Category:', record.category.replace(/_/g, ' '), 'Batch / Lot No:', record.batchNumber || 'N/A'],
      ['Declared Net Quantity:', record.weightVerification.declaredNetQuantity, 'Packaging Type:', record.pdpAnalysis.packagingType.replace(/_/g, ' ')],
      ['Barcode / GTIN:', record.barcode || 'N/A', 'Compliance Score:', `${record.complianceScore} / 100`],
    ],
  });

  currentY = (doc as any).lastAutoTable.finalY + 4;

  // 5. Section 2: Gravimetric Weight Verification (Second Schedule MPE)
  if (record.weightVerification.status !== 'NOT_TESTED') {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
    doc.text(
      '2. GRAVIMETRIC TESTING & MAXIMUM PERMISSIBLE ERROR (MPE) UNDER SECOND SCHEDULE',
      margin,
      currentY
    );

    currentY += 2;

    const diffDisplay =
      record.weightVerification.differenceG !== undefined && record.weightVerification.differenceG > 0
        ? `+${record.weightVerification.differenceG} g`
        : `${record.weightVerification.differenceG} g`;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      styles: { fontSize: 7.5, cellPadding: 1.8, lineColor: [226, 232, 240], lineWidth: 0.2 },
      headStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold', halign: 'center' },
      head: [
        [
          'Declared Quantity',
          'Gross Weight',
          'Tare Weight',
          'Actual Net Weight',
          'Difference (ΔW)',
          'Statutory MPE Limit',
          'Gravimetric Verdict',
        ],
      ],
      body: [
        [
          record.weightVerification.declaredNetQuantity,
          `${record.weightVerification.grossWeightG || '-'} g`,
          `${record.weightVerification.tareWeightG || '-'} g`,
          `${record.weightVerification.actualNetWeightG || '-'} g`,
          diffDisplay,
          `± ${record.weightVerification.mpeAllowedG} g (${record.weightVerification.mpePercentage}%)`,
          record.weightVerification.isWithinMpe ? 'PASS (WITHIN MPE)' : 'FAIL (SHORT-WEIGHT)',
        ],
      ],
      didParseCell: (data) => {
        if (data.section === 'body') {
          data.cell.styles.halign = 'center';
          if (data.column.index === 6) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.textColor = record.weightVerification.isWithinMpe
              ? [22, 101, 52]
              : [185, 28, 28];
          }
        }
      },
    });

    currentY = (doc as any).lastAutoTable.finalY + 1.5;

    // Small scale certification caption
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(
      `Verified on calibrated Class III electronic weighing scale (Certificate No: ${record.weightVerification.scaleCertificateNumber || 'CAL-DL-LM-2026-904'}). Finding: ${record.weightVerification.verdictNotes}`,
      margin,
      currentY,
      { maxWidth: contentWidth }
    );

    currentY += 4.5;
  }

  // 6. Section 3: Statutory Violations (if non-compliant) or Compliance Findings
  if (record.violations.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(alertRed[0], alertRed[1], alertRed[2]);
    doc.text('3. STATUTORY INFRACTIONS & VIOLATIONS NOTED', margin, currentY);

    currentY += 2;

    const violationRows = record.violations.map((v, i) => [
      (i + 1).toString(),
      v.ruleCitation,
      v.declarationField,
      v.description,
      v.penaltySection,
      v.recommendedAction,
    ]);

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      theme: 'grid',
      styles: { fontSize: 7, cellPadding: 1.5, lineColor: [254, 202, 202], lineWidth: 0.2 },
      headStyles: { fillColor: [254, 242, 242], textColor: [153, 27, 27], fontStyle: 'bold' },
      columnStyles: {
        0: { halign: 'center', cellWidth: 8 },
        1: { fontStyle: 'bold', cellWidth: 32 },
        2: { cellWidth: 26 },
        3: { cellWidth: 50 },
        4: { cellWidth: 34 },
        5: { cellWidth: 32 },
      },
      head: [['#', 'Rule Citation', 'Field', 'Violation Description', 'Penalty Clause', 'Action Ordered']],
      body: violationRows,
    });

    currentY = (doc as any).lastAutoTable.finalY + 3;

    // Statutory ultimatum notice text
    doc.setFillColor(254, 243, 199); // Amber-100
    doc.setDrawColor(217, 119, 6); // Amber-600
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, 12, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(146, 64, 14);
    doc.text(
      'STATUTORY NOTICE TO SHOW CAUSE WITHIN 14 DAYS (UNDER RULE 27 & SECTION 36):',
      margin + 2.5,
      currentY + 4
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(120, 53, 15);
    doc.text(
      'Take notice that failure to reply within 14 days from date of receipt will result in immediate prosecution under Section 36 in the Court of Judicial Magistrate. Compounding application under Section 48 may be submitted before the undersigned.',
      margin + 2.5,
      currentY + 7.5,
      { maxWidth: contentWidth - 5 }
    );

    currentY += 15;
  } else {
    // Compliant Certificate Statement
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, currentY, contentWidth, 10, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(22, 101, 52);
    doc.text('OFFICIAL CERTIFICATION UNDER LEGAL METROLOGY ACT, 2009:', margin + 3, currentY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(21, 128, 61);
    doc.text(
      'Sample commodity complies with all mandatory statutory declarations under Rule 6(1) and verified net weight satisfies Second Schedule MPE standards. No enforcement action required.',
      margin + 3,
      currentY + 7.5,
      { maxWidth: contentWidth - 6 }
    );

    currentY += 13;
  }

  // Check if we need to add a page or continue for declaration matrix
  if (currentY > pageHeight - 55) {
    doc.addPage();
    currentY = 16;
  }

  // 7. Section 4: Mandatory Declarations Checklist Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  doc.text('4. MANDATORY DECLARATIONS AUDIT MATRIX (RULE 6(1))', margin, currentY);

  currentY += 2;

  const declarationRows = record.declarations.map((d) => [
    d.ruleCitation,
    d.fieldName,
    `"${d.extractedText}"`,
    d.status,
  ]);

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    theme: 'grid',
    styles: { fontSize: 6.8, cellPadding: 1.4, lineColor: [226, 232, 240], lineWidth: 0.2 },
    headStyles: { fillColor: [248, 250, 252], textColor: [15, 23, 42], fontStyle: 'bold' },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 38 },
      2: { cellWidth: 84 },
      3: { halign: 'center', fontStyle: 'bold', cellWidth: 28 },
    },
    head: [['Rule Citation', 'Declaration Field', 'Extracted Packaging Text', 'Status']],
    body: declarationRows,
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 3) {
        const val = data.cell.raw as string;
        data.cell.styles.textColor = val === 'COMPLIANT' ? [22, 101, 52] : [185, 28, 28];
      }
    },
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // 8. Official Signatures and Endorsement Block
  if (currentY > pageHeight - 38) {
    doc.addPage();
    currentY = 20;
  }

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, currentY, pageWidth - margin, currentY);

  currentY += 5;

  const signColWidth = (contentWidth - 10) / 2;

  // Left: Trader / Manufacturer receipt acknowledgment
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  doc.text('Receipt Acknowledged by Trader / Manufacturer:', margin, currentY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('Signature: ____________________________________', margin, currentY + 8);
  doc.text('Authorized Name: ______________________________', margin, currentY + 12);
  doc.text('Designation & Seal: ____________________________', margin, currentY + 16);
  doc.text('Date of Receipt: _______________________________', margin, currentY + 20);

  // Right: Enforcement Officer Official Stamp & Digital Attestation
  const rightX = margin + signColWidth + 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  doc.text('Issued by Authorized Legal Metrology Officer:', rightX, currentY);

  // Digital seal badge
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.5);
  doc.roundedRect(rightX, currentY + 3, signColWidth, 20, 1.5, 1.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(record.inspectorName, rightX + 3, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(51, 65, 85);
  doc.text(`Legal Metrology Inspector (ID: ${record.inspectorId})`, rightX + 3, currentY + 12);
  doc.text(record.jurisdiction, rightX + 3, currentY + 15, { maxWidth: signColWidth - 6 });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(22, 101, 52);
  doc.text(`[DIGITALLY SEALED & VERIFIED · REF: ${record.caseNumber}]`, rightX + 3, currentY + 19);

  // Footer on all pages
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(
      `FOODRIX · Legal Metrology (Packaged Commodities) Compliance System · Official Statutory Record · Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 5,
      { align: 'center' }
    );
  }

  // Save PDF
  const cleanCase = record.caseNumber.replace(/[\/\\]/g, '_');
  const filename = `${cleanCase}_Official_Legal_Metrology_Notice.pdf`;
  doc.save(filename);
}
