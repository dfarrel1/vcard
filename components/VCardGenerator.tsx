'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { VCardData, buildVCard, generateVCardFilename } from '@/lib/vcard';

export default function VCardGenerator() {
  const [formData, setFormData] = useState<VCardData>({
    firstName: '',
    lastName: '',
    title: '',
    organization: '',
    mobile: '',
    dsn: '',
    email: '',
    url: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    notes: '',
  });

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Generate QR code whenever form data changes
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const vCardString = buildVCard(formData);
        
        // Generate QR code with error correction 'Q' and white margin
        const dataUrl = await QRCode.toDataURL(vCardString, {
          errorCorrectionLevel: 'Q',
          margin: 4,
          width: 400,
          color: {
            dark: '#1e293b', // Slate-800
            light: '#ffffff', // White
          },
        });
        
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDownloadVCard = () => {
    const vCardString = buildVCard(formData);
    const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = generateVCardFilename(formData);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `${generateVCardFilename(formData).replace('.vcf', '')}_qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      title: '',
      organization: '',
      mobile: '',
      dsn: '',
      email: '',
      url: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      notes: '',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-semibold text-slate-900">vCard Generator</h1>
          <p className="mt-2 text-sm text-slate-600">
            Create professional vCards with QR codes. All data is processed locally in your browser.
          </p>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input Form */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h2>
            
            <form className="space-y-6">
              {/* Name Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">Name</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Info Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">Professional</h3>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-slate-700 mb-1">
                    Organization
                    <span className="text-xs text-slate-500 ml-2">(supports &quot;Parent; Child&quot; format)</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="e.g., Department; Division"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">Contact</h3>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="dsn" className="block text-sm font-medium text-slate-700 mb-1">
                    DSN
                    <span className="text-xs text-slate-500 ml-2">(Defense Switched Network)</span>
                  </label>
                  <input
                    type="tel"
                    id="dsn"
                    name="dsn"
                    value={formData.dsn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">Address</h3>
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-slate-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-slate-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-slate-700 uppercase tracking-wide">Notes</h3>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-md text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-md font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                >
                  Download vCard
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - QR Code Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">QR Code Preview</h2>
            
            <div className="flex flex-col items-center justify-center space-y-6">
              {qrCodeDataUrl ? (
                <>
                  <div className="bg-white p-8 rounded-lg border-2 border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCodeDataUrl}
                      alt="vCard QR Code"
                      className="w-full h-auto max-w-sm"
                    />
                  </div>
                  
                  <div className="text-center text-sm text-slate-600">
                    <p>Scan this QR code to import the contact</p>
                    <p className="mt-1">Error Correction Level: Q</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadQRCode}
                    className="w-full max-w-sm px-4 py-2 bg-slate-700 text-white rounded-md font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Download QR Code
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-slate-500">Fill in the form to generate a QR code</p>
                </div>
              )}
            </div>

            {/* Information Panel */}
            <div className="mt-8 p-4 bg-slate-50 rounded-md border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Privacy Notice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All data processing happens locally in your browser. No personal information 
                is transmitted to any server. The QR code is generated client-side using 
                industry-standard vCard 3.0 format.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
