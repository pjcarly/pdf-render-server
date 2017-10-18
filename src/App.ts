import * as express from 'express'
import * as htmlPdf from 'html-pdf-chrome';

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const html = '<p>Hello, world!</p>';
    const options: htmlPdf.CreateOptions = {
      port: 9222 // port Chrome is listening on
    };

    const router = express.Router()

    router.get('/', async (req, res) => {
      try {
        const url = req.query.url ? req.query.url : '<p>No URL provided</p>';
        console.log(`Requesting URL (${url}) for PDF generation`);

        const pdf = await htmlPdf.create(url, options);
        const base64 = pdf.toBase64();
        const pdfBuffer = new Buffer(base64, 'base64');
        
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Length': pdfBuffer.length
        });
        res.end(pdfBuffer); 

        // res.status(200).json(component);
      } catch (error) {
        // oops! something went wrong
        res.status(500).json(error);
      }
    });



    this.express.use('/', router)
  }
}

export default new App().express