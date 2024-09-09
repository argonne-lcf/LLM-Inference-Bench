function downloadSVG() {
    const svg = document.querySelector('svg');

    // CSS must be explicitly embedded
    const style = createStyleElementFromCSS();
    svg.insertBefore(style, svg.firstChild);

    const data = (new XMLSerializer()).serializeToString(svg);
    const svgBlob = new Blob([data], {
        type: 'image/svg+xml;charset=utf-8'
    });

    // convert the blob object to a dedicated URL
    const url = URL.createObjectURL(svgBlob);

    const a = document.createElement('a');
    a.download = 'image.svg';
    document.body.appendChild(a);
    a.href = url;
    a.click();
    a.remove();


    // const img = new Image();
    // img.crossOrigin = 'Anonymous';
    // img.addEventListener('load', () => {
    //     // draw the image on an ad-hoc canvas
    //     const bbox = svg.getBBox();

    //     const canvas = document.createElement('canvas');
    //     canvas.width = bbox.width;
    //     canvas.height = bbox.height;

    //     const context = canvas.getContext('2d');
    //     context.drawImage(img, 0, 0, bbox.width, bbox.height);

    //     URL.revokeObjectURL(url);
    //     var png = canvas.toDataURL("image/png");

    //     // trigger a synthetic download operation with a temporary link
    //     const a = document.createElement('a');
    //     a.download = 'image.png';
    //     document.body.appendChild(a);
    //     a.href = png;
    //     a.click();
    //     a.remove();
    // });
    // img.src = url;

    // // svgToPdf(svg);

}

const createStyleElementFromCSS = () => {
    const styleRules = [];
    try {
        for (let sheetIndex = 0; sheetIndex < document.styleSheets.length; sheetIndex++) {
            const sheet = document.styleSheets[sheetIndex];
            // if(sheet.href.includes("http://localhost:")){
                for (let i = 0; i < sheet.cssRules.length; i++)
                    styleRules.push(sheet.cssRules.item(i).cssText); 
            // }
        }
    }
    catch(err) {    
    }
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(styleRules.join(' ')))
    return style;
};


const svgToPdf = (svg) => {
    const doc = new window.PDFDocument();
    const chunks = [];
    const stream = doc.pipe({
      // writable stream implementation
      write: (chunk) => chunks.push(chunk),
      end: () => {
        const pdfBlob = new Blob(chunks, {
          type: 'application/octet-stream'
        });
        var blobUrl = URL.createObjectURL(pdfBlob);
        window.open(blobUrl);
      },
      // readable streaaam stub iplementation
      on: (event, action) => {},
      once: (...args) => {},
      emit: (...args) => {},
    });
  
    window.SVGtoPDF(doc, svg, 0, 0);
  
    doc.end();
};
  