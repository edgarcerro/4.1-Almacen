const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller {
    constructor() {
        this.store = new Store(1)
        this.view = new View()
    }

    addProductToStore(formData) {
        let product = {}


        try {
            product = this.store.addProduct(formData)
            this.view.renderNewProduct(product)

        } catch (error) {
            this.view.renderErrorMessage(error)
        }

    }

    deleteProductFromStore(prodId) {
        let product = {}
        product = this.store.findProduct(Number(prodId))
        if (!product) {
            this.view.renderErrorMessage('No hay ningun producto con id ' + prodId)
        }

        if (confirm(`Deseas borrar el producto ${product.name}, que tiene la id ${product.id}?`)) {
            if (product.units) {
                if (confirm(`Ese producto aun tiene ${product.units} unidades, estas seguro que quieres eliminarlo?`)) {


                    try {
                        product = this.store.changeProductUnits({
                            id: product.id,
                            units: -product.units,
                        })
                    } catch (error) {
                        this.view.renderErrorMessage(error)
                    }
                }
            }

            try {
                product = this.store.delProduct(prodId)
                this.view.renderDelProduct(product.id)
            } catch (error) {
                this.view.renderErrorMessage(error)
            }

        }
    }

    changeProductInStore(formData) {
       
    }

    changeProductStock(id, units) {
        let newProd = {}
        try {
            newProd = this.store.changeProductUnits({
                id: id,
                units: Number(units),
            })
            this.view.renderEditProduct(newProd)

        } catch (error) {
            this.view.renderErrorMessage(error)

        }
    }
}

module.exports = Controller
