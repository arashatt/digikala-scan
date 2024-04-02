// https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import dotenv from 'dotenv'
	dotenv.config();
const myBooleanVar = process.env.HEADLESS;
// Convert the string value to a boolean
const headless = myBooleanVar && myBooleanVar === 'true';
async function digikala (productID, searchQuery) {
  let url = "https://www.digikala.com";
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: headless, executablePath: "chrome-linux/chrome"});
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
  console.log("waiting for search input element");
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
  const href = await page.evaluate(
	  (productID) => {
		  console.log(`a[href*="${productID}"]`)
    let elements = document.querySelectorAll(`a[href*="${productID}"]`);
      if (elements.length > 0){
         return   Array.from(elements).map(element => element.getAttribute('href'));
      }},
	productID
);
	
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


//digikala("تمییز کننده داخلی موتور", "تمیزکننده داخلی موتور و موتورشوی گات مدل EF حجم 300 میلی لیتر");
main();

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



function main(){
if (process.argv.length <= 2){
	console.log("Please provide a file path");
	return;
}
let filePath = process.argv[2];
try {
	fs.accessSync(filePath, fs.constants.F_OK);
} catch (err) {
	console.error('File does not exist');
	return; // Return from the main function
}
const file = fs.readFileSync(filePath, 'utf-8');
file.split(/\r?\n/).forEach(line =>{
if(line != ''){
	let splitAt = line.indexOf(' ');
let link = line.substring(0, splitAt);
let query = line.substring( splitAt + 1, line.lenght ) ;
console.log(link);
console.log(query);
digikala(link, query);


}
});

}
