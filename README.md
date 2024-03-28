
## project description
This project is created to make fake views on digikala using puppeteer headless chrome.
![Screenshot from 2024-03-28 17-17-24](https://github.com/arashatt/digikala-scan/assets/55944526/53780061-9fc0-4f1f-a179-15988a91544d)

## how to run the code
please create an input file where each line contains one digikala product along with the search query which you can find it.

- ``` dkp-11551746``` ``` تمییزکنده داخلی موتور ef حجم ۳۰۰ میلی‌لیتر```<br />
- ```dkp-14591367``` ```لپ تاب ماکروسافت```<br />
(please note that the beginning of each line should'nt start with space)<br />
save this line in input.txt and then run:<br />
```$node digikala.js input.txt```

term 
: definition
## dependencies
You need to have chromium executable, you can download it from the link below (STATUS CODE 403 with 🇮🇷 IP)<br />
https://download-chromium.appspot.com/dl/Linux_x64?type=snapshots


If you have not installed chromium or google-chrome installed on your machine, you may lack some shared libraries in order to execute the code, So I find it very usefull to install chrome package beside the chromium browser. However this is a very lazy way to solve the problem.<br />
https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

## A world to Develoers
Any suggestion is welcomed. you can open an issue or submit PR.
## A word to Digikala
Please don't sue me!
