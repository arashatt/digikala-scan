// https://download-chromium.appspot.com/dl/Linux_x64?type=snapshots
// https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
// https://nodejs.org/dist/v20.12.2/node-v20.12.2-linux-x64.tar.xz
// https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04
// https://stackoverflow.com/questions/63312642/how-to-install-node-tar-xz-file-in-linux
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import dotenv from 'dotenv'
import {scrollPageToBottom} from 'puppeteer-autoscroll-down';
//import scrollPageToBottom from 'puppeteer-autoscroll-down';
import { v4 as uuidv4} from 'uuid';
	dotenv.config();
const myBooleanVar = process.env.HEADLESS;
// Convert the string value to a boolean
const headless = myBooleanVar && myBooleanVar === 'true';
async function digikala (productID, searchQuery, browser) {

  let url = "https://www.digikala.com";
  // Launch the browser and open a new blank page
  const page = await browser.newPage();
//await page.setViewport({ width: 1280, height: 800 }); //added for test
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
//  await page.waitForNetworkIdle({waitUntil: 'networkidle0'});
console.log("سرچ تموم شده و دنبال محصول هستم");
  //here I want to express something more elaborate and difficult.
  //I want to get the node of an element which contains my desired href
  await page.waitForSelector(`a[href*="${productID}"]`);
//  const href = await page.evaluate(
//	  (productID) => {
//		  console.log(`a[href*="${productID}"]`)
//    let elements = document.querySelectorAll(`a[href*="${productID}"]`);
//      if (elements.length > 0){
//         return   Array.from(elements).map(element => element.getAttribute('href'));
//      }},
//	productID
//);
	
  const product = await page.$(`a[href*="${productID}"]`);
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
//await newPage.waitForNetworkIdle({waitUntil: 'newtworkidle0'});
await newPage.waitForNetworkIdle({waitUntil: 'load'});
await newPage.waitForNetworkIdle({waitUntil: 'newtworkidle2'});
console.log("new page loaded successfuly");
//https://byby.dev/js-wait-n-seconds
//if(false){
if(Math.random() > 0.5){
await scrollPageToBottom(newPage, {
  size: 500,
  delay: 250
});

//}else if(true)
}else if(Math.random() > 0.5)
{
    console.log("add to cart");
    await newPage.waitForSelector('button[data-testid="add-to-cart"]');
    await newPage.click('button[data-testid="add-to-cart"]');
    await newPage.waitForSelector('a[href*="/checkout/cart"]');
await newPage.waitForSelector('div[id="base_layout_mobile_footer"]');
await newPage.waitForNetworkIdle({waitUntil: 'newtworkidle2'});
console.log("successfully added to cart");
	}else{
  await newPage.waitForSelector('picture');
  await newPage.click('picture');
  await newPage.waitForNetworkIdle('load');



  }
//await newPage.screenshot({path: "logs/" + uuidv4() + ".png"});
console.log("picture saved");
await page.close();
await newPage.close();
console.log("I reached the end of function");
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
  console.log("auto scroll finished");
}


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function main(){
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

/*forEach doesn't wait for asynchronous operations to complete before moving on
 *to the next iteration. Instead, you can use a for...of loop with async/await 
 *to achieve the desired behavior.
  */
const lines = file.split(/\r?\n/);
    for (const line of lines) {
        console.log("I am parsing a new line", line);
        if (line !== '') {
            const splitAt = line.indexOf(' ');
            const link = line.substring(0, splitAt);
            const query = line.substring(splitAt + 1, line.length);

  	   const browser = await puppeteer.launch({headless: headless, executablePath: "chrome-linux/chrome", args: ["--no-sandbox"]});
try{

	    
            await digikala(link, query, browser);
}catch(e){
console.log(e);
}    


await browser.close();
    }else {
	break;
	}
    }


//file.split(/\r?\n/).forEach(async (line) =>{
//  console.log("I am parsing a new line", line);
//if(line != ''){
//	let splitAt = line.indexOf(' ');
//let link = line.substring(0, splitAt);
//let query = line.substring( splitAt + 1, line.lenght );
//await (async () =>{ await digikala(link, query);})();
//
//}
//});
console.log("reached end of main");
process.exit();

}
