import puppeteer from "puppeteer";
import fs from 'fs';

const testPage = async (page: any, testName: string) => {
  await page.goto('http://localhost:3000');
  let totalFirstPaintTime = 0;
  let totalRenderingTime = 0;
  let totalMemoryUsage = 0;
  let totalLoadTime = 0;
  let totalActionResult = 0;

  for (let i = 0; i < 10; i++) {

    await page.goto('http://localhost:3000/');
    const loadTime = await page.evaluate(() => performance.now());
    await page.waitForSelector('#home-element');
    const loadTimeResult = `Время загрузки страницы: ${loadTime} ms`;
    totalLoadTime += loadTime

    const firstPaintTime = await page.evaluate(() => {
      const performanceTiming = performance.timing;
      return performanceTiming.responseStart - performanceTiming.navigationStart;
    });
    const performanceTimingResult = `Время первой отрисовки: ${firstPaintTime} ms`;
    totalFirstPaintTime += firstPaintTime

    const renderingTime = await page.evaluate(() => {
      const performanceTiming = performance.timing;
      return performanceTiming.loadEventEnd - performanceTiming.responseStart;
    });
    const renderingTimeResult = `Время рендеринга: ${renderingTime} ms`
    totalRenderingTime += renderingTime

    const memoryUsage = await page.evaluate(() => {
      if ('memory' in window.performance) {
        return (window.performance as any).memory.usedJSHeapSize / (1024 * 1024);

      } else {
        console.error('Браузер не поддерживает свойство memory в объекте Performance.');
      }
    });

    const memoryUsageResult = `Потребление памяти: ${memoryUsage} MB`
    totalMemoryUsage += memoryUsage

    const startActions = Date.now();
    await page.click("#post-link");
    await page.waitForSelector('#posts #post:nth-child(10)');
    await page.click('#posts #post:nth-child(10)');
    await page.waitForSelector('#post-body');
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#home-element');
    await page.click("#photo-link");
    await page.waitForSelector("#photo10");
    await page.click("#photo10");
    await page.waitForSelector('#real-photo');
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#home-element');
    await page.goto('http://localhost:3000/post');
    await page.waitForSelector('#posts #post:nth-child(10)');
    await page.goto('http://localhost:3000/photo');
    await page.waitForSelector("#photo10");
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#home-element');
    const endActions = Date.now();
    const actionsResult = `Время выполнения различных действий на сайте: ${endActions - startActions} мс`;
    totalActionResult += endActions - startActions


    const testResults = {
      url: 'http://localhost:3000/',
      name: testName,
      loadTimeResult,
      performanceTimingResult,
      renderingTimeResult,
      memoryUsageResult,
      actionsResult,
    };
    fs.appendFileSync('testResults.json', JSON.stringify(testResults) + ',\n');
  }


  const averageFirstPaintTime = totalFirstPaintTime / 10;
  const averageRenderingTime = totalRenderingTime / 10;
  const averageTotalMemoryUsage = totalMemoryUsage / 10;
  const averageTotalLoadTime = totalLoadTime / 10;
  const averageActionsResult = totalActionResult / 10;

  console.log(testName)
  console.log(`Среднее время первой отрисовки: ${averageFirstPaintTime} ms`);
  console.log(`Среднее время рендеринга: ${averageRenderingTime} ms`);
  console.log(`Среднее время потребление памяти: ${averageTotalMemoryUsage} ms`);
  console.log(`Среднее время загрузки страницы: ${averageTotalLoadTime} ms`);
  console.log(`Среднее время выполнения различных действий на сайте: ${averageActionsResult} ms`);

};

let content = fs.readFileSync('testResults.json', 'utf-8');
if (content.length === 0) {
  fs.appendFileSync('testResults.json', '[\n');
} else {
  content = content.slice(0, -2);
  fs.writeFileSync('testResults.json', content + ',\n', 'utf-8');
}


describe("App.tsx", () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("Тест todo context", async () => {
    await testPage(page, 'Тест React')
    expect(true).toBe(true);
  }, 120_000);

  afterAll(() => browser.close());
});
