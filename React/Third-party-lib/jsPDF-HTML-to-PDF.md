[jsPDF-HTML-to-PDF](#top)

- [General](#general)
- [Adding the markup](#adding-the-markup)
- [limitations of jsPDF](#limitations-of-jspdf)
- [Capture styled components with html2canvas](#capture-styled-components-with-html2canvas)
- [Generate paginated tables with jspdf-autotable](#generate-paginated-tables-with-jspdf-autotable)
- [Encrypt and password‑protect your PDF (built‑in)](#encrypt-and-passwordprotect-your-pdf-builtin)
- [Add metadata to your PDF](#add-metadata-to-your-pdf)


## General

- `new jsPDF()`: Initialize a new instance
- `doc.html()`: convert HTML to PDF, It takes two arguments
  - the HTML elementm, use `useRef()` to get HTML reference
  - a callback function
- `doc.save()`: download the PDF file

```ts
// Initialize a new instance of `jsPDF`:
const doc = new jsPDF();
// customise 

const doc = new jsPDF({
  orientation: 'landscape', // or "portrait"
  unit: 'px', // "mm", "cm", "in" also supported
  format: [4, 2], // array like [width, height]
});
doc.html(html_element, {
  async callback(doc) {
    await doc.save('pdf_name');
  },
});
```

[⬆ back to top](#top)

## Adding the markup

```ts
//ReportTemplate.jsx
const styles = { img: { width: '100%' }, h1: { marginBottom: '1rem' } };
import SalesChart from './sales-chart.png';

export default function ReportTemplate() {
  return (
    <div
      style={{
        padding: '40px',
        background: 'white',
        color: 'black',
      }}
    >
      <h1 style={styles.h1}>Sales Report 2025</h1>
      <img src={SalesChart} style={styles.img} alt="Sales chart" />
    </div>
  );
}
// App.jsx
import { useRef } from 'react';
import jsPDF from 'jspdf';
import ReportTemplate from './ReportTemplate';

function App() {
   // import the useRef hook and the reference to the HTML element template
  const reportTemplateRef = useRef(null);
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px',
    });
    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal');
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save('document');
      },
    });
  };
  return (
    <div>
      <button className="button" onClick={handleGeneratePdf}>
        Generate PDF
      </button>
      // click button and generate PDF
      <div ref={reportTemplateRef}> 
        <ReportTemplate />
      </div>
    </div>
  );
}
export default App;
```

[⬆ back to top](#top)

## limitations of jsPDF

|Limitation| Workaround|
|---|---|
|External CSS is not automatically loaded|Apply styles via inline CSS or imported stylesheets at build-time, or ensure styles are rendered in the DOM before calling html()|
|Custom fonts require manual conversion|Use jsPDF’s font converter tool to generate font files compatible with jsPDF and embed them manually|
|Large or complex HTML content may overflow or get cut off|Manually implement pagination logic, or split content into smaller sections before rendering to PDF|
|Sparse official documentation|Rely on community examples and GitHub issues, or inspect jsPDF source code for advanced use cases|

[⬆ back to top](#top)

## Capture styled components with html2canvas

```ts
// src/utils/pdfHelpers.js
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
/**
 * Generates an A4 PDF snapshot of a DOM node with full CSS support.
 * @param {HTMLElement} node – the element to capture
 * @param {string} filename – optional, defaults to "styled.pdf"
 */
export async function downloadStyledPdf(node, filename = 'styled.pdf') {
  const canvas = await html2canvas(node, { useCORS: true, scale: 2 }); // higher scale = crisper output
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ unit: 'px', format: 'a4' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
  pdf.save(filename); // → defaults to styled.pdf
}
// use the helper in component
import { useRef } from 'react';
import { downloadStyledPdf } from './utils/pdfHelpers';
import ReportTemplate from './ReportTemplate';
export default function App() {
  const reportRef = useRef(null);
  const handleStyledExport = async () => {
    if (reportRef.current) {
      await downloadStyledPdf(reportRef.current); // saves styled.pdf
    }
  };
  return (
    <>
      <button onClick={handleStyledExport}>Export Styled PDF</button>
      <div ref={reportRef}>
        <ReportTemplate />
      </div>
    </>
  );
}
```

[⬆ back to top](#top)

## Generate paginated tables with jspdf-autotable

```ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
export default function App() {
  // 1. Build your rows (array-of-arrays)
  const dataArray = [
    ['Ada Lovelace', 'ada@example.com', 'UK'],
    ['Grace Hopper', 'grace@navy.mil', 'USA'],
    ['Alan Turing', 'alan@bletchley.gov', 'UK'],
  ];

  const pdf = new jsPDF();
  autoTable(pdf, {
    head: [['Name', 'Email', 'Country']],
    body: dataArray,
    styles: { fontSize: 10 },
  });
  pdf.save('table.pdf');
}
```

[⬆ back to top](#top)

## Encrypt and password‑protect your PDF (built‑in)

```ts
import { jsPDF } from 'jspdf';
const doc = new jsPDF({
  encryption: {
    userPassword: 'user123', // required to open the file
    ownerPassword: 'admin456', // controls editing rights
    permissions: [
      'print',
      'modify',
      'copy',
      'annot-forms', // allowed actions
    ],
  },
});
doc.text('Top‑secret numbers', 20, 20);
doc.save('protected.pdf');
```

[⬆ back to top](#top)

## Add metadata to your PDF

```ts
import { useRef } from 'react';
import jsPDF from 'jspdf';
import ReportTemplate from './ReportTemplate';

export default function App() {
  const reportRef = useRef(null);

  const handleExport = async () => {
    if (reportRef.current) {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      await pdf.html(reportRef.current, {
        async callback(doc) {
          // Set PDF metadata properties.
          doc.setProperties({
            title: 'Sales report 2025',
            subject: 'Quarterly numbers',
            author: 'ACME Corp',
            keywords: 'react, pdf, sales',
            creator: 'React app',
          });
          doc.save('report.pdf');
        },
      });
    }
  };
  return (
    <>
      <button onClick={handleExport}>Export PDF</button>
      <div ref={reportRef}>
        <ReportTemplate />
      </div>
    </>
  );
}
```

[⬆ back to top](#top)

> [Generate PDFs from HTML in React with jsPDF](https://www.nutrient.io/blog/how-to-convert-html-to-pdf-using-react/)
