/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/controller.class.js":
/*!********************************************!*\
  !*** ./src/controller/controller.class.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const View = __webpack_require__(/*! ../view/view.class */ \"./src/view/view.class.js\")\nconst Store = __webpack_require__(/*! ../model/store.class */ \"./src/model/store.class.js\")\n\nclass Controller {\n    constructor() {\n        this.store = new Store(1)\n        this.view = new View()\n    }\n\n    addProductToStore(formData) {\n        let product = {}\n\n\n        try {\n            product = this.store.addProduct(formData)\n            this.view.renderNewProduct(product)\n\n        } catch (error) {\n            this.view.renderErrorMessage(error)\n        }\n\n    }\n\n    deleteProductFromStore(prodId) {\n        let product = {}\n        product = this.store.findProduct(Number(prodId))\n        if (!product) {\n            this.view.renderErrorMessage('No hay ningun producto con id ' + prodId)\n        }\n\n        if (confirm(`Deseas borrar el producto ${product.name}, que tiene la id ${product.id}?`)) {\n            if (product.units) {\n                if (confirm(`Ese producto aun tiene ${product.units} unidades, estas seguro que quieres eliminarlo?`)) {\n\n\n                    try {\n                        product = this.store.changeProductUnits({\n                            id: product.id,\n                            units: -product.units,\n                        })\n                    } catch (error) {\n                        this.view.renderErrorMessage(error)\n                    }\n                }\n            }\n\n            try {\n                product = this.store.delProduct(prodId)\n                this.view.renderDelProduct(product.id)\n            } catch (error) {\n                this.view.renderErrorMessage(error)\n            }\n\n        }\n    }\n\n    changeProductInStore(formData) {\n       \n    }\n\n    changeProductStock(id, units) {\n        let newProd = {}\n        try {\n            newProd = this.store.changeProductUnits({\n                id: id,\n                units: Number(units),\n            })\n            this.view.renderEditProduct(newProd)\n\n        } catch (error) {\n            this.view.renderErrorMessage(error)\n\n        }\n    }\n}\n\nmodule.exports = Controller\n\n\n//# sourceURL=webpack://products/./src/controller/controller.class.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n// Aqu?? importaremos la clase del controlador e instanciaremos uno\n\nconst Controller = __webpack_require__(/*! ./controller/controller.class */ \"./src/controller/controller.class.js\")\nconst myController = new Controller();\n\n// A continuaci??n crearemos una funci??n manejadora para cada formulario\nwindow.addEventListener('load', () => {\n\n  // funci??n manejadora del formulario 'new-prod'\n  document.getElementById('new-prod').addEventListener('submit', (event) => {\n    event.preventDefault()\n\n    // Aqu?? el c??digo para obtener los datos del formulario\n    const name = document.getElementById('newprod-name').value\n    const price = document.getElementById('newprod-price').value\n\n    // Aqu?? llamamos a la funci??n del controlador que a??ade productos (addProductToStore)\n    // pas??ndole como par??metro esos datos\n    myController.addProductToStore({ name, price })\n  })\n\n  document.getElementById('del-prod').addEventListener('submit', (event) => {\n    event.preventDefault()\n\n\n    // Aqu?? el c??digo para obtener los datos del formulario\n    const productId = document.getElementById('delprod-id').value\n\n    // Aqu?? llamamos a la funci??n del controlador que borra productos\n    // (addProductToStore) pas??ndole como par??metro esos datos\n    myController.deleteProductFromStore(productId)\n  })\n\n  document.getElementById('stock-prod').addEventListener('submit', (event) => {\n    event.preventDefault()\n\n\n    myController.changeProductStock(document.getElementById('stockprod-id').value,\n                                    document.getElementById('stockprod-units').value)\n  })\n\n})\n\n\n//# sourceURL=webpack://products/./src/index.js?");

/***/ }),

/***/ "./src/model/product.class.js":
/*!************************************!*\
  !*** ./src/model/product.class.js ***!
  \************************************/
/***/ ((module) => {

eval("class Product {\n    constructor (id, name, price, units = 0) {\n        this.id = id\n        this.name = name\n        this.price = price\n        this.units = units\n    }\n\n    changeUnits(units) {\n        if (this.units + units < 0) {\n\t        throw new Error(`Quedan ${this.units} y quieres sumarle ${units}`)\n        }\n        this.units += units\n        return this\n    }\n\n    productImport() {\n        return this.price * this.units\n    }\n\n    toString() {\n        return `${this.name}: ${this.units} uds. x ${this.price.toFixed(2)} ???/u = ${this.productImport().toFixed(2)} ???` \n    }\n\n}\n\nmodule.exports = Product\n\n\n//# sourceURL=webpack://products/./src/model/product.class.js?");

/***/ }),

/***/ "./src/model/store.class.js":
/*!**********************************!*\
  !*** ./src/model/store.class.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Product = __webpack_require__(/*! ./product.class */ \"./src/model/product.class.js\")\n\nclass Store {\n    constructor (id) {\n\t    this.id = id\n    \tthis.products = []\n    }\n\n    findProduct(id) {\n        return this.products.find((prod) => prod.id === id)\n    }\n\n    addProduct(datosProd) {\n        // Comprobamos que los datos sean correctos\n        if (!datosProd.name) {\n            throw `Debes indicar el nombre del producto`\n        }\n        if (!datosProd.price) {\n            throw `Debes indicar el precio del producto`\n        }\n        if (isNaN(datosProd.price) || datosProd.price < 0) {\n            throw `El precio debe ser un n??mero positivo (${datosProd.price})`\n        }\n        if (datosProd.units && (!Number.isInteger(datosProd.units) || datosProd.units < 0 )) {\n            throw `Las unidades deben ser un n?? entero positivo (${datosProd.units})`\n        }\n\n        datosProd.id = this.lastId() + 1\n        datosProd.price = Number(datosProd.price)\n        if (datosProd.units) datosProd.units = Number(datosProd.units)\n        const newProd = new Product(\n            datosProd.id, \n            datosProd.name, \n            datosProd.price, \n            datosProd.units\n        )\n        this.products.push(newProd)\n        return newProd\n    }\n\n    delProduct(id) {\n        const prod = this.findProduct(Number(id))\n        if (!prod) {\n            throw `No existe el producto con id ${id}`\n        }\n        if (prod.units) {\n            throw `Al producto con id ${id} a??n le quedan ${prod.units} unidades`\n        }\n        this.products = this.products.filter((item) => item.id !== Number(id))\n        return prod\n    }\n\n    changeProductUnits(datosProd) {\n        // Comprobamos que los datos sean correctos\n        if (!datosProd.id) {\n            throw `Debes indicar la id del producto`\n        }\n        if (!datosProd.units) {\n            throw `Debes indicar las unidades del producto`\n        }\n        if (!Number.isInteger(datosProd.units)) {\n            throw `Las unidades deben ser un n?? entero (${datosProd.units})`\n        }\n\n        const prod = this.findProduct(Number(datosProd.id))\n        if (!prod) {\n            throw `No existe el producto con id \"${datosProd.id}\"`\n        }\n\n        try {\n            var prodChanged = prod.changeUnits(Number(datosProd.units))\n        } catch(err) {\n            throw err\n        }\n\n        return prodChanged\n    }\n\n    changeProduct(datosProd) {\n        // Comprobamos que los datos sean correctos\n        if (!datosProd.id) {\n            throw `Debes indicar la id del producto`\n        }   \n        if (datosProd.price && (isNaN(datosProd.price) || datosProd.price < 0)) {\n            throw `El precio debe ser un n??mero positivo (${datosProd.price})`\n        }\n        if (datosProd.units && (!Number.isInteger(datosProd.units) || datosProd.units < 0 )) {\n            throw `Las unidades deben ser un n?? entero positivo (${datosProd.units})`\n        }\n\n        const prod = this.findProduct(Number(datosProd.id))\n        if (!prod) {\n            throw `No existe el producto con id \"${datosProd.id}\"`\n        }\n\n        if (datosProd.name) prod.name = datosProd.name\n        if (datosProd.price != undefined) prod.price = Number(datosProd.price)\n        if (datosProd.units != undefined) prod.units = Number(datosProd.units)\n\n        return prod\n    }\n\n    totalImport() {\n        return this.products.reduce((total, prod) => total + prod.productImport(), 0)\n    }\n\n    underStock(stock) {\n        return this.products.filter((prod) => prod.units < stock)\n    }\n\n    orderByUnits() {\n        return this.products.sort((prodA, prodB) => prodB.units - prodA.units)\n    }\n\n    orderByName() {\n        return this.products.sort((prodA, prodB) => prodA.name.localeCompare(prodB.name))\n    }\n\n    toString() {\n        let cadena = `Almac??n ${this.id} => ${this.products.length} productos: ${this.totalImport().toFixed(2)} ???`\n        this.products.forEach((prod) => cadena += '\\n- ' + prod)\n        return cadena\n    }\n\n    lastId() {\n        return this.products.reduce((max, prod) => prod.id > max ? prod.id : max, 0)\n    }\n}\n\nmodule.exports = Store\n\n\n//# sourceURL=webpack://products/./src/model/store.class.js?");

/***/ }),

/***/ "./src/view/view.class.js":
/*!********************************!*\
  !*** ./src/view/view.class.js ***!
  \********************************/
/***/ ((module) => {

eval("const divMessagesUI = document.getElementById('messages');\n\nclass View {\n    renderNewProduct(product) {\n        let productBody = document.querySelector('#almacen tbody')\n        let productRow = document.createElement('tr')\n        productRow.id = 'prod-' + product.id\n        productRow.innerHTML =\n            `<td>${product.id}</td>\n             <td>${product.name}</td>\n             <td>${product.units}</td>\n             <td>${product.price}</td>\n             <td>${product.productImport().toFixed(2)} ???</td>`\n        productBody.appendChild(productRow)\n    }\n\n\n    renderEditProduct(product) {\n        let buscaProd = document.getElementById('prod-'+product.id)\n        if (buscaProd) {\n            buscaProd.innerHTML = \n            `<td>${product.id}</td>\n             <td>${product.name}</td>\n             <td>${product.units}</td>\n             <td>${product.price}</td>\n             <td>${product.productImport().toFixed(2)} ???</td>`\n        }\n    }\n\n    renderDelProduct(id) {\n        let buscaProd = document.getElementById('prod-'+id)\n        if (buscaProd){\n            buscaProd.parentElement.removeChild(buscaProd)\n        }\n    }\n\n    renderStoreImport(total) {\n\n    }\n\n    renderErrorMessage(message) {\n        const newMessageDiv = document.createElement('div')\n        newMessageDiv.className = \"col-sm-12 alert alert-danger alert-dismissible fade show\"\n        newMessageDiv.innerHTML = `\n            <span><strong>ATENCI??N: </strong>${message}</span>\n            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" onclick=\"this.parentElement.remove()\"></button>`\n\n        divMessagesUI.appendChild(newMessageDiv)\n    }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack://products/./src/view/view.class.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;