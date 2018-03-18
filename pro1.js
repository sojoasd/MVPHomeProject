const request = require('request')
const cheerio = require('cheerio')
const url = 'https://www.ae.com/men-clearance-ae-gridback-fleece-jogger-cherry-pop/web/s-prod/1229_3879_646?cm=sTW-cTWD&catId=cat6870337'

request(url, (err, res, body) => {
    const $ = cheerio.load(body);

    var brand = $('span[itemprop="name"]')[0].children[0].data;

    var bcLinks = $('.bc-link');
    var categoryCounts = bcLinks.length - 1;
    var categoryChilds = bcLinks[categoryCounts].children;
    var categories = [];
    for(let i = 0; i < categoryChilds.length; i++){
        categories.push(categoryChilds[i].data);
    }

    var description = $('meta[property="og:description"]')[0].attribs.content;

    var productID = $('meta[property="fb:app_id"]')[0].attribs.content;

    var title = $('meta[property="og:title"]')[0].attribs.content;

    var listPrice = $('#psp-regular-price')[0].attribs.content;

    var currentPrice = $('#psp-sale-price')[0].attribs.content;

    var variant_id = $('.psp-swatch-container.psp-swatch-active .psp-swatch.has-product-info')[0].attribs['data-prodid'];

    var activeColor = $('.psp-swatch-container.psp-swatch-active .psp-swatch-img')[0].attribs['alt'];

    var image_url_primary = 'https:' + $('.psp-swatch-container.psp-swatch-active .psp-swatch-img')[0].attribs['src'] + '_of?$PDP_78_Main$';

    var productSizeList = [];
    var sizeList = $('li[role="presentation"]');
    for(let i = 0; i < sizeList.length; i ++){
        let product_details = JSON.stringify({
            color: activeColor,
            size: sizeList[i].attribs['data-size'],
        });

        let resObj = {
            image_url_primary: image_url_primary,
            in_stock: Number(sizeList[i].attribs['data-stock']) === 0 ? false : true,
            price_current: currentPrice,
            price_list: listPrice,
            product_details: product_details,
            variant_id: variant_id
        };

        productSizeList.push(resObj);
    }

    var currency = $('.psp-product-sale-currency')[0].children[0].data;

    var ViewObj = {
        brand: brand,
        canonical_url: url,
        categories: categories,
        currency: currency,
        description: description,
        productSizeList: productSizeList
    };
    
    console.log(ViewObj);// result
})

