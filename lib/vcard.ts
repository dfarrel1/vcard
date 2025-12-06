/**
 * vCard 3.0 Builder
 * Builds vCard format string with proper newline handling
 */

export interface VCardData {
  // Name fields
  firstName: string;
  lastName: string;
  // Job information
  title: string;
  organization: string; // Supports "Parent; Child" format
  // Contact information
  mobile: string;
  dsn: string; // Defense Switched Network
  email: string;
  // Web
  url: string;
  // Address - structured
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  // Notes
  notes: string;
}

/**
 * Escapes special characters in vCard fields according to vCard 3.0 spec
 * Handles: semicolons, commas, newlines, and backslashes
 */
function escapeVCardField(value: string): string {
  if (!value) return '';
  
  return value
    .replace(/\\/g, '\\\\')    // Escape backslashes
    .replace(/;/g, '\\;')      // Escape semicolons
    .replace(/,/g, '\\,')      // Escape commas
    .replace(/\n/g, '\\n')     // Escape newlines
    .replace(/\r/g, '');       // Remove carriage returns
}

/**
 * Builds a vCard 3.0 formatted string from the provided data
 */
export function buildVCard(data: VCardData): string {
  const lines: string[] = [];
  
  // Begin vCard
  lines.push('BEGIN:VCARD');
  lines.push('VERSION:3.0');
  
  // Full name (FN) - required field
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  if (fullName) {
    lines.push(`FN:${escapeVCardField(fullName)}`);
  }
  
  // Structured name (N) - LastName;FirstName;MiddleName;Prefix;Suffix
  if (data.lastName || data.firstName) {
    lines.push(`N:${escapeVCardField(data.lastName)};${escapeVCardField(data.firstName)};;;`);
  }
  
  // Title
  if (data.title) {
    lines.push(`TITLE:${escapeVCardField(data.title)}`);
  }
  
  // Organization - supports "Parent; Child" format
  if (data.organization) {
    lines.push(`ORG:${escapeVCardField(data.organization)}`);
  }
  
  // Mobile phone
  if (data.mobile) {
    lines.push(`TEL;TYPE=CELL:${escapeVCardField(data.mobile)}`);
  }
  
  // DSN (Defense Switched Network) - as work phone
  if (data.dsn) {
    lines.push(`TEL;TYPE=WORK:${escapeVCardField(data.dsn)}`);
  }
  
  // Email
  if (data.email) {
    lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardField(data.email)}`);
  }
  
  // URL
  if (data.url) {
    lines.push(`URL:${escapeVCardField(data.url)}`);
  }
  
  // Address (ADR) - ;;Street;City;State;ZIP;Country
  if (data.street || data.city || data.state || data.zip || data.country) {
    const adr = [
      '',  // PO Box
      '',  // Extended Address
      escapeVCardField(data.street),
      escapeVCardField(data.city),
      escapeVCardField(data.state),
      escapeVCardField(data.zip),
      escapeVCardField(data.country)
    ].join(';');
    lines.push(`ADR;TYPE=WORK:${adr}`);
  }
  
  // Notes
  if (data.notes) {
    lines.push(`NOTE:${escapeVCardField(data.notes)}`);
  }
  
  // End vCard
  lines.push('END:VCARD');
  
  // Join with CRLF as per vCard spec
  return lines.join('\r\n');
}

/**
 * Generates a filename for the vCard download
 * Sanitizes filename to remove invalid characters
 */
export function generateVCardFilename(data: VCardData): string {
  const name = `${data.firstName}_${data.lastName}`
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[/\\:*?"<>|]/g, '') // Remove invalid filename characters
    .replace(/^_+|_+$/g, '');
  return name ? `${name}.vcf` : 'contact.vcf';
}
