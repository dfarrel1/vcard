import { buildVCard, generateVCardFilename, VCardData } from '@/lib/vcard';

describe('vCard Builder', () => {
  const sampleData: VCardData = {
    firstName: 'John',
    lastName: 'Smith',
    title: 'Senior Analyst',
    organization: 'Department of Defense; Intelligence Division',
    mobile: '+1-555-123-4567',
    dsn: '312-1234',
    email: 'john.smith@example.gov',
    url: 'https://www.example.gov',
    street: '1234 Main Street',
    city: 'Washington',
    state: 'DC',
    zip: '20500',
    country: 'United States',
    notes: 'Available Monday-Friday\n9:00 AM - 5:00 PM EST',
  };

  test('should build valid vCard 3.0 format', () => {
    const vcard = buildVCard(sampleData);
    
    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('VERSION:3.0');
    expect(vcard).toContain('END:VCARD');
  });

  test('should include full name', () => {
    const vcard = buildVCard(sampleData);
    expect(vcard).toContain('FN:John Smith');
  });

  test('should include structured name', () => {
    const vcard = buildVCard(sampleData);
    expect(vcard).toContain('N:Smith;John;;;');
  });

  test('should include title and organization', () => {
    const vcard = buildVCard(sampleData);
    expect(vcard).toContain('TITLE:Senior Analyst');
    expect(vcard).toContain('ORG:Department of Defense\\; Intelligence Division');
  });

  test('should include phone numbers', () => {
    const vcard = buildVCard(sampleData);
    expect(vcard).toContain('TEL;TYPE=CELL:+1-555-123-4567');
    expect(vcard).toContain('TEL;TYPE=WORK:312-1234');
  });

  test('should include email and URL', () => {
    const vcard = buildVCard(sampleData);
    expect(vcard).toContain('EMAIL;TYPE=INTERNET:john.smith@example.gov');
    expect(vcard).toContain('URL:https://www.example.gov');
  });

  test('should include address', () => {
    const vcard = buildVCard(sampleData);
    expect(vcard).toContain('ADR;TYPE=WORK:;;1234 Main Street;Washington;DC;20500;United States');
  });

  test('should escape newlines in notes', () => {
    const vcard = buildVCard(sampleData);
    expect(vcard).toContain('NOTE:Available Monday-Friday\\n9:00 AM - 5:00 PM EST');
  });

  test('should handle empty data gracefully', () => {
    const emptyData: VCardData = {
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
    };
    
    const vcard = buildVCard(emptyData);
    expect(vcard).toContain('BEGIN:VCARD');
    expect(vcard).toContain('VERSION:3.0');
    expect(vcard).toContain('END:VCARD');
  });

  test('should generate correct filename', () => {
    const filename = generateVCardFilename(sampleData);
    expect(filename).toBe('John_Smith.vcf');
  });

  test('should generate default filename for empty names', () => {
    const emptyData: VCardData = {
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
    };
    
    const filename = generateVCardFilename(emptyData);
    expect(filename).toBe('contact.vcf');
  });

  test('should escape special characters', () => {
    const specialData: VCardData = {
      ...sampleData,
      organization: 'Company, Inc.; Department',
      notes: 'Line 1\nLine 2\nLine 3',
    };
    
    const vcard = buildVCard(specialData);
    expect(vcard).toContain('ORG:Company\\, Inc.\\; Department');
    expect(vcard).toContain('NOTE:Line 1\\nLine 2\\nLine 3');
  });
});
