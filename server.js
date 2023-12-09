const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
// const slugify = require('slugify');
const port = process.env.PORT|| 8080;
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');


/// read json file form dev-data folder --> data.json

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');

const dataObj = JSON.parse(data);

// const slugs = dataObj.map(el => slugify(el.productName,{lower: true}));

const server = http.createServer((req,res)=>{
    const {query,pathname } = url.parse(req.url, true)



    // \\\\\\\overview page;\\\\\\\////////

    if(pathname ==='/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(output);
    }

    // product page 

    else if(pathname === '/product'){
        res.writeHead(200,{'Content-type': 'text/html'})
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

    }

    //API

    else if(pathname === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);

    }


    // not found 


    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'mv-own-header':'hello-world'
        });
        res.end('<h1>Page is not found!</h1>');
    }
});


server.listen(port,()=>{
    console.log(`hello this is server http://localhost:${port}`);

})
