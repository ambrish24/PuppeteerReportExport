const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.get('/', async (req, res, ) => {
  const resp = await getPdf();
  console.log('sending pdf');
  res.set({ 'Content-Type': 'application/pdf' })
  // res.set({ 'Content-Type': 'text/html', 'Content-Length': resp.length })
  res.send(resp);
});

async function getPdf() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--start-maximized'],
      defaultViewport: null
    });
    const page = await browser.newPage();
    // page.setViewport({width: , height: 768});
    await page.goto('http://10.78.103.231:8080/blueplanet-core-showcase/', {waitUntil: 'networkidle0'});
    console.log('URL Loaded - ' +'http://10.78.103.231:8080/blueplanet-core-showcase/');
    await page.focus('input.fc-username-value');
    await page.keyboard.type('administrator');
    await page.focus('input.fc-password-value');
    await page.keyboard.type('12345678');
    const loginBtn = await page.$('.fc-paltform-login-button');
    await loginBtn.click();
    await page.waitForNavigation({waitUntil: ['domcontentloaded', 'networkidle0']});
    await page.goto('http://10.78.103.231:8080/blueplanet-core-showcase/page/fc-manage-dashboards-demo/%7B%22fcIcon%22:%22ui-icon-dashboard%22,%22fcHeader%22:%22Manage%20Dashboard%22%7D', {waitUntil: 'networkidle0'});
    const treeItem1 = await page.$('#dashboardTree > p-tree > div > div > ul > p-treenode:nth-child(1) > li > div > span.ui-tree-toggler.pi.ui-unselectable-text.ng-star-inserted.pi-caret-right');
    await treeItem1.click();
    await page.waitFor(5000);
    const dashboard = await page.$('#dashboardTree > p-tree > div > div > ul > p-treenode:nth-child(1) > li > ul > p-treenode:nth-child(4) > li > div > span > span > span > span > i');
    dashboard.click();
    await page.waitFor(5000);
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
    await page.waitFor(5000);
    const html = await page.content()
    // await page.setContent(html);
    const fcDashBoardDiv = await page.$('fc-dashboard');
    await fcDashBoardDiv.evaluate( div => {
        const dashboardNode = div;
        document.body.innerHTML = ``;
        document.body.appendChild(dashboardNode);
    });
    page.emulateMediaType('screen');
    const pdf = await page.pdf({format: 'Letter', printBackground: true, headerTemplate: `<h1>Dashboard Report</h1>`}); // serialized HTML of page DOM.
    await browser.close();
    console.log('pdf generated');
    return pdf;
}

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
