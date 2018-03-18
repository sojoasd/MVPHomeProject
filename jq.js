const request = require('request')
const url = 'https://www.ae.com/men-clearance-ae-gridback-fleece-jogger-cherry-pop/web/s-prod/1229_3879_646?cm=sTW-cTWD&catId=cat6870337'
var jsdom;
  try {
    jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
  } catch (e) {
    jsdom = require("jsdom"); // jsdom <= 9.x
  }

request(url, (err, res, body) => {
  jsdom.env({
    url: url,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, window) {
      var $ = window.$;
      console.log($('body'));
      // $($('.psp-swatch.has-product-info')[0]).trigger('click');
      // console.log($('.psp-swatch.has-product-info')[0]);
      // console.log($('.psp-product-txt.psp-product-color > span').html());
    }
  });
});
