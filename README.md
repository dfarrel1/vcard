# vCard Generator

A secure, client-side vCard generator with QR code support built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- **100% Client-Side Processing**: All data processing happens in your browser using the `qrcode` library. No personal information is sent to any server.
- **Split-Screen Interface**: Live QR code preview updates as you type (with 300ms debounce for performance)
- **vCard 3.0 Compliant**: Proper escaping of special characters (semicolons, commas, newlines)
- **Complete Contact Fields**:
  - Name (First, Last)
  - Professional Info (Title, Organization with "Parent; Child" support)
  - Contact Details (Mobile, DSN, Email, Website)
  - Address (Street, City, State, ZIP, Country)
  - Notes (with multi-line support)
- **QR Code Configuration**: Error correction level 'Q', 4-unit white margin, slate/white government aesthetic
- **Download Options**: Export both vCard file (.vcf) and QR code image (.png)
- **Privacy First**: Clear notice that all data stays in browser

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Technology Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **QR Generation**: qrcode library
- **Testing**: Jest with Testing Library
- **Security**: CodeQL scanning

## vCard Format

The application generates vCard 3.0 format files with proper character escaping:
- Semicolons are escaped as `\;`
- Commas are escaped as `\,`
- Newlines are escaped as `\n`
- Organizations support hierarchical format: "Parent; Child"

## Security

✅ No vulnerabilities in dependencies  
✅ CodeQL analysis passed with 0 alerts  
✅ All data processing is client-side only  
✅ Proper input sanitization for filenames  
✅ Special character escaping in vCard fields

## License

See [LICENSE](LICENSE) file for details.
