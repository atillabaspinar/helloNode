const fs = require('fs');
const path = require('path');

const products = [];
module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    static get path() { 
        return path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
    }

    save() {
        products.push(this);
        
        fs.readFile(Product.path, (err, fileContent) => {
            let products = [];
           if (!err) {
               products = JSON.parse(fileContent);
           } 
           products.push(this);
           fs.writeFile(Product.path, JSON.stringify(products), err => {
               console.log(err);
           });
        });
    }



    static fetchAll(cb) {
        fs.readFile(Product.path, (err, fileContent) => {
            if (err) {
                cb([]);
                return;
            }
            cb(JSON.parse(fileContent));
        });        
    }

};
