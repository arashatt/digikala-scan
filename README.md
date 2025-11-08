Please follow me and ⭐ this project. Thanks!
## project description
This project is created to make fake views on digikala using Puppeteer headless Chrome.
![Screenshot from 2024-03-28 17-17-24](https://github.com/arashatt/digikala-scan/assets/55944526/53780061-9fc0-4f1f-a179-15988a91544d)

## how to run the code
Please create an input file where each line contains one Digikala product, along with the search query with which you can find the product.

- ``` dkp-11551746``` ``` تمییزکنده داخلی موتور ef حجم ۳۰۰ میلی‌لیتر```<br />
- ```dkp-14591367``` ```لپ تاب ماکروسافت```<br />
(Please note that the beginning of each line shouldn't start with a space)<br />
Save this line in input.txt and then run:<br />
```$node digikala.js input.txt```
However, in this case, you can run the review only once. If you want to have the code scrape data repeatedly, please read the next section.
## primary.js, PM2

- primary.js<br />
  primary.js uses Node.js cluster feature to rerun the code on exit or error. It also fetches the number of CPUs on your machine and runs multiple instances of the program simultaneously. 
- PM2<br />
[PM2](https://pm2.keymetrics.io/docs/usage/quick-start/) is a daemon process manager that will help you manage and keep your application online.
You have to configure it in a way that restarts the program on exit or error.

## environment variable
There are some environmental variables defined in this project.
1. **HEADLESS**: Puppeteer can be run in two different modes, which are Chrome (with GUI) and headless mode(the main use of this project is with headless mode, where you can run it on a server).
2. **CHROME_PATH**: define the path of the Chromium executable.
## dependencies
### nodejs package dependencies
- puppeteer-core at pptr.dev
- dotenv

# other dependencies
You need to have chromium executable, you can download it from the link below (STATUS CODE 403 with 🇮🇷 IP)<br />
https://download-chromium.appspot.com/dl/Linux_x64?type=snapshots


If you have not installed Chromium or Google on your machine, you may lack some shared libraries in order to execute the code, so I find it very useful to install the Chrome package beside the Chromium browser. However, this is a very lazy way to solve the problem.<br />
https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

## A word to Developers
Any suggestion is welcome. You can open an issue or submit a PR.

