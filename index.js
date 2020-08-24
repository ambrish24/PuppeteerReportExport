
const { PDFDocument } = require('pdf-lib');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.get('/', async (req, res, ) => {


  const cron = require('node-cron');

    // schedule tasks to be run on the server
    //This will run every 10 seconds
    cron.schedule("*/10 * * * * *", () => {
        //code to be executed
    })

  //const resp = await getPdf(req, res);


  /*console.log('opening pdf');
  res.set({ 'Content-Type': 'application/pdf' })
  // res.set({ 'Content-Type': 'text/html', 'Content-Length': resp.length })
  res.send(resp);*/

    /*const axios = require("axios")

    axios.post("http://localhost:8080/blueplanet-core-showcase-rest/login", {
        username: "administrator",
        password: "12345678"
    }, {
        headers: {
            'X-DR-SYSTEMID': `4`,
            'X-BP-USERNAME': `administrator`,
            'X-DR-SESSIONCONTEXT-PLANID': `-101`,
            'X-DR-L10N': `FcCore`
        }
    }).then(function(response) {
        console.log(response.data)
    }).catch(function(error) {
        console.log(error)
    })*/

});


async function getPdf(req, res) {
    const fs = require('fs');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--start-maximized'],
        defaultViewport: null
    });
    const page = await browser.newPage();
    page.setViewport({width: 800, height: 800, deviceScaleFactor: 2});

    await page.goto('http://localhost:4200/', {waitUntil: 'networkidle0'});
    console.log('URL Loaded - ' +'http://localhost:4200/');

    /*await page.goto('http://10.78.103.231:8080/blueplanet-core-showcase/', {waitUntil: 'networkidle0'});
    console.log('URL Loaded - ' +'http://10.78.103.231:8080/blueplanet-core-showcase/');
    await page.goto('http://localhost:4000/blueplanet-core-showcase/', {waitUntil: 'networkidle0'});
    console.log('URL Loaded - ' +'http://localhost:4000/blueplanet-core-showcase/');
    await page.focus('input.fc-username-value');
    await page.keyboard.type('administrator');
    await page.focus('input.fc-password-value');
    await page.keyboard.type('12345678');
    const loginBtn = await page.$('.fc-paltform-login-button');
    await loginBtn.click();
    await page.waitForNavigation({waitUntil: ['domcontentloaded', 'networkidle0']});
    //await page.goto('http://10.78.103.231:8080/blueplanet-core-showcase/page/fc-manage-dashboards-demo/%7B%22fcIcon%22:%22ui-icon-dashboard%22,%22fcHeader%22:%22Manage%20Dashboard%22%7D', {waitUntil: 'networkidle0'});
    await page.goto('http://localhost:4000/blueplanet-core-showcase/page/fc-manage-dashboards-demo/%7B%22fcIcon%22:%22ui-icon-dashboard%22,%22fcHeader%22:%22Manage%20Dashboard%22%7D', {waitUntil: 'networkidle0'});
    const treeItem1 = await page.$('#dashboardTree > p-tree > div > div > ul > p-treenode:nth-child(1) > li > div > span.ui-tree-toggler.pi.ui-unselectable-text.ng-star-inserted.pi-caret-right');
    await treeItem1.click();
    await page.waitFor(10000);

    const dashboard = await page.$('#dashboardTree > p-tree > div > div > ul > p-treenode:nth-child(1) > li > ul > p-treenode:nth-child(4) > li > div > span > span > span > span > i');
    dashboard.click();
    await page.waitFor(20000);
    await page.addStyleTag({
        content: `
           #ui-tabpanel-0 > div {
                 height: 100% !important;
           }
           #ui-tabpanel-0 > div > fc-manage-dashboards-demo > fc-documentation > div > div:nth-child(4) > div:nth-child(1) {
             height: 2000px !important;
           }
      `
    });
    await page.emulateMediaType('screen');
    const html = await page.content()
    // await page.setContent(html);
    const fcDashBoardDiv = await page.$('fc-dashboard');
    await fcDashBoardDiv.evaluate( div => {
        const dashboardNode = div;
        document.body.innerHTML = ``;
        document.body.appendChild(dashboardNode);
    });
    await page.waitFor(20000);*/
    await page.waitFor(10000);
    const pdfDoc = await PDFDocument.create();
    const pdf = await page.pdf({format: 'A4', printBackground: true ,headerTemplate: `<h1>Dashboard Report</h1>`}); // serialized HTML of page DOM.

    const devicePdf = await PDFDocument.load(fs.readFileSync('Devices.pdf'));
    const chartPdf = await PDFDocument.load(pdf);

    // Add Chart pages
    const chartPages = await pdfDoc.copyPages(chartPdf, chartPdf.getPageIndices());
    for (const page of chartPages) {
        pdfDoc.addPage(page);
    }
    console.log('chart pdf generated');

    // Add Device pages
    const devicePages = await pdfDoc.copyPages(devicePdf, devicePdf.getPageIndices());
    for (const page of devicePages) {
        pdfDoc.addPage(page);
    }
    console.log('device pdf generated');

    // Write the PDF to a file
    fs.writeFileSync('Report.pdf', await pdfDoc.save());
    console.log('writing final PDF to File - Report.pdf');
    const pdfBytes = await PDFDocument.load(fs.readFileSync('Report.pdf'));


    /*const devicePdfBytes = await PDFDocument.load(fs.readFileSync('Devices.pdf'));
    const [devicePdf] = await pdfDoc.embedPdf(devicePdfBytes);
    console.log('device pdf embedded');
    const [chartPdf] = await pdfDoc.embedPdf(pdf);
    console.log('chart pdf embedded');
    // Add a blank page to the document
    const pdfPage = pdfDoc.addPage();
    pdfPage.drawPage(devicePdf);
    pdfPage.drawPage(chartPdf);
    // Write the PDF to a file
    fs.writeFileSync('Report.pdf', await pdfDoc.save());
    const pdfBytes = await PDFDocument.load(fs.readFileSync('Report.pdf'));*/
    await browser.close();
    console.log('pdf generated');
    const file = `${__dirname}/Report.pdf`;
    console.log('  Path is -------> ' + file);
    //res.sendFile(file);
    res.download(file, 'Report.pdf');
    //return pdfBytes;
}
app.listen(4400, () => {
    console.log('Example app listening on port 4400!')
});
