    import puppeteer from 'puppeteer-core';

async function digikala (searchQuery, alt) {
  let url = "https://www.digikala.com";
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false, executablePath: "/home/arash/chrome-selenimu/chrome-linux64/chrome"});
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(20000);
  // Navigate the page to a URL
  await page.goto(url);
  await 
  await Promise.race([
    page.waitForNetworkIdle({ waitUntil: 'networkidle0' }),
    await page.waitForSelector(".text-neutral-500")
    ]);
  
  
	//click on Digikala search DOM
  console.log("waiting for element");
  const element = await page.$('.text-neutral-500');
	if (element!= null)
	{
		await element.click();
	}
  await page.waitForSelector("input[name='search-input']");
  const searchInput = await page.$("input[name='search-input']");
  if (searchInput != null){
    await searchInput.type(searchQuery);
    await page.keyboard.press("Enter");
  }
  await page.waitForNetworkIdle({waitUntil: 'networkidle2'});
console.log("سرچ تموم شده و دنبال محصول هستم");
  //here I want to express something more elaborate and dificult.
  //I want to get the node of an element which contains my desired href
  const href = await page.evaluate(() => {
    let elements = document.querySelectorAll('a[href*="dkp-11551746"]');
      if (elements.length > 0){
         return   Array.from(elements).map(element => element.getAttribute('href'));
      }
});
  console.log(href);
  const product = await page.$(`a[href="${href}"]`);
  if (product != null) {
    console.log("محصول پیدا شد");
    console.log(product);
    let clickreturn = await product.click();
console.log( (product));
  }
 // https://stackoverflow.com/questions/59124950/how-to-handle-new-page-on-button-click-in-pupeteer
 const pageTarget = page.target();
  const newPagePromise = await browser.waitForTarget(target => 
  target.type() === 'page' &&  target.opener() === pageTarget);
const newPage = await newPagePromise.page();
console.log(newPage.url());
await newPage.waitForNetworkIdle({waitUntil: 'networkidle2'});
//https://byby.dev/js-wait-n-seconds
await autoScroll(newPage);
await newPage.screenshot({path:"page.png"});
await page.close();
await newPage.close();
  await browser.close();
}


digikala("تمییز کننده داخلی موتور", "تمیزکننده داخلی موتور و موتورشوی گات مدل EF حجم 300 میلی لیتر");

//https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore
async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}