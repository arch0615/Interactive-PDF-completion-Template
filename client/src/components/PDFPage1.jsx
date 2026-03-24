import { useRef, useCallback } from 'react';
import LinkedInputs from './LinkedInputs';

export default function PDFPage1({ formData, updateField, updateNested, updateServiceRow }) {
  const columns = [
    { key: 'type', label: 'Type' },
    { key: 'size', label: 'Size' },
    { key: 'qty', label: 'Qty' },
    { key: 'wasteType', label: 'Waste Type' },
    { key: 'collectionFreq', label: 'Collection\nfreq' },
    { key: 'delDate', label: 'Del\ndate' },
    { key: 'emptyCharge', label: 'Empty\ncharge per\nbin / lift' },
    { key: 'rentalPerBin', label: 'Rental per\nbin / day' },
    { key: 'dutyCare', label: 'Duty of\ncare fee /\nday' },
    { key: 'delColFee', label: 'Del / Col\nfee' },
  ];

  return (
    <>
      {/* ===== ACCOUNTS ===== */}
      <div className="pdf-section-header">Accounts</div>
      <div className="pdf-section">
        <div className="pdf-row">
          <label className="pdf-field flex-3">
            <span className="pdf-label">Company name</span>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
            />
          </label>
          <label className="pdf-field-row flex-2">
            <span className="pdf-label">Limited Company</span>
            <input
              type="checkbox"
              className="pdf-checkbox"
              checked={formData.businessType === 'limitedCompany'}
              onChange={() =>
                updateField('businessType',
                  formData.businessType === 'limitedCompany' ? '' : 'limitedCompany')
              }
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-3">
            <span className="pdf-label">Trading as</span>
            <input
              type="text"
              value={formData.tradingAs}
              onChange={(e) => updateField('tradingAs', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-2">
            <span className="pdf-label">Reg number</span>
            <input
              type="text"
              value={formData.regNumber}
              onChange={(e) => updateField('regNumber', e.target.value)}
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-3">
            <span className="pdf-label">Or full name of proprietor/partner</span>
            <input
              type="text"
              value={formData.proprietorPartnerName}
              onChange={(e) => updateField('proprietorPartnerName', e.target.value)}
            />
          </label>
          <div className="flex-2" />
        </div>

        <LinkedInputs
          values={[formData.invoiceAddress1, formData.invoiceAddress2, formData.invoiceAddress3]}
          onChange={[
            (v) => updateField('invoiceAddress1', v),
            (v) => updateField('invoiceAddress2', v),
            (v) => updateField('invoiceAddress3', v),
          ]}
          label="Invoice address"
          rows={[
            { rightContent: (
              <label className="pdf-field-row flex-2">
                <span className="pdf-label">Limited liability partnership</span>
                <input type="checkbox" className="pdf-checkbox"
                  checked={formData.businessType === 'limitedLiabilityPartnership'}
                  onChange={() => updateField('businessType',
                    formData.businessType === 'limitedLiabilityPartnership' ? '' : 'limitedLiabilityPartnership')}
                />
              </label>
            )},
            { rightContent: (
              <label className="pdf-field-row flex-2">
                <span className="pdf-label">Sole trader</span>
                <input type="checkbox" className="pdf-checkbox"
                  checked={formData.businessType === 'soleTrader'}
                  onChange={() => updateField('businessType',
                    formData.businessType === 'soleTrader' ? '' : 'soleTrader')}
                />
              </label>
            )},
            { halfWidth: true,
              leftExtra: (
                <>
                  <span className="pdf-label">Postcode</span>
                  <input type="text"
                    value={formData.invoicePostcode}
                    onChange={(e) => updateField('invoicePostcode', e.target.value)}
                  />
                </>
              ),
              rightContent: (
                <label className="pdf-field-row flex-2">
                  <span className="pdf-label">Partnership</span>
                  <input type="checkbox" className="pdf-checkbox"
                    checked={formData.businessType === 'partnership'}
                    onChange={() => updateField('businessType',
                      formData.businessType === 'partnership' ? '' : 'partnership')}
                  />
                </label>
              ),
            },
          ]}
        />

        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Invoice contact</span>
            <input
              type="text"
              value={formData.invoiceContact}
              onChange={(e) => updateField('invoiceContact', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Tel</span>
            <input
              type="tel"
              value={formData.invoiceTel}
              onChange={(e) => updateField('invoiceTel', e.target.value)}
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Email</span>
            <input
              type="email"
              value={formData.invoiceEmail}
              onChange={(e) => updateField('invoiceEmail', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Mobile</span>
            <input
              type="tel"
              value={formData.invoiceMobile}
              onChange={(e) => updateField('invoiceMobile', e.target.value)}
            />
          </label>
        </div>

        <LinkedInputs
          values={[formData.proprietorHomeAddress1, formData.proprietorHomeAddress2]}
          onChange={[
            (v) => updateField('proprietorHomeAddress1', v),
            (v) => updateField('proprietorHomeAddress2', v),
          ]}
          label="Proprietor/partner home address"
          rows={[
            {},
            { halfWidth: true,
              leftExtra: (
                <>
                  <span className="pdf-label">Postcode</span>
                  <input type="text"
                    value={formData.proprietorHomePostcode}
                    onChange={(e) => updateField('proprietorHomePostcode', e.target.value)}
                  />
                </>
              ),
            },
          ]}
        />
      </div>

      {/* ===== SERVICE ===== */}
      <div className="pdf-section-header">Service</div>
      <div className="pdf-section">
        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Collection site address</span>
            <input
              type="text"
              value={formData.collectionSiteAddress1}
              onChange={(e) => updateField('collectionSiteAddress1', e.target.value)}
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-3">
            <input
              type="text"
              value={formData.collectionSiteAddress2}
              onChange={(e) => updateField('collectionSiteAddress2', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Postcode</span>
            <input
              type="text"
              value={formData.collectionSitePostcode}
              onChange={(e) => updateField('collectionSitePostcode', e.target.value)}
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Contact name</span>
            <input
              type="text"
              value={formData.serviceContactName}
              onChange={(e) => updateField('serviceContactName', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Tel</span>
            <input
              type="tel"
              value={formData.serviceTel}
              onChange={(e) => updateField('serviceTel', e.target.value)}
            />
          </label>
        </div>

        <div className="pdf-row">
          <label className="pdf-field flex-1">
            <span className="pdf-label">Email</span>
            <input
              type="email"
              value={formData.serviceEmail}
              onChange={(e) => updateField('serviceEmail', e.target.value)}
            />
          </label>
          <label className="pdf-field flex-1">
            <span className="pdf-label">Mobile</span>
            <input
              type="tel"
              value={formData.serviceMobile}
              onChange={(e) => updateField('serviceMobile', e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* ===== SERVICE SCHEDULE ===== */}
      <div className="pdf-section-header">Service Schedule</div>
      <div className="pdf-section">
        <div className="pdf-row">
          <label className="pdf-field" style={{ maxWidth: '300px' }}>
            <span className="pdf-label">Order number</span>
            <input
              type="text"
              value={formData.orderNumber}
              onChange={(e) => updateField('orderNumber', e.target.value)}
            />
          </label>
        </div>

        <div className="pdf-table-wrapper">
          <table className="pdf-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.serviceRows.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      <input
                        type="text"
                        value={row[col.key]}
                        onChange={(e) => updateServiceRow(i, col.key, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== SPECIAL CONDITIONS ===== */}
      <div className="pdf-section-header">Special Conditions</div>
      <div className="pdf-section">
        {[1, 2, 3, 4, 5].map((n) => (
          <div className="pdf-row" key={n}>
            <label className="pdf-field flex-1">
              <input
                type="text"
                value={formData[`specialConditions${n}`]}
                onChange={(e) => updateField(`specialConditions${n}`, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
