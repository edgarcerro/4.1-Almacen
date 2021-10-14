const divMessagesUI = document.getElementById('messages');

class View {
    renderNewProduct(product) {
        let productBody = document.querySelector('#almacen tbody')
        let productRow = document.createElement('tr')
        productRow.id = 'prod-' + product.id
        productRow.innerHTML =
            `<td>${product.id}</td>
             <td>${product.name}</td>
             <td>${product.units}</td>
             <td>${product.price}</td>
             <td>${product.productImport().toFixed(2)} €</td>`
        productBody.appendChild(productRow)
    }


    renderEditProduct(product) {
        let buscaProd = document.getElementById('prod-'+product.id)
        if (buscaProd) {
            buscaProd.innerHTML = 
            `<td>${product.id}</td>
             <td>${product.name}</td>
             <td>${product.units}</td>
             <td>${product.price}</td>
             <td>${product.productImport().toFixed(2)} €</td>`
        }
    }

    renderDelProduct(id) {
        let buscaProd = document.getElementById('prod-'+id)
        if (buscaProd){
            buscaProd.parentElement.removeChild(buscaProd)
        }
    }

    renderStoreImport(total) {

    }

    renderErrorMessage(message) {
        const newMessageDiv = document.createElement('div')
        newMessageDiv.className = "col-sm-12 alert alert-danger alert-dismissible fade show"
        newMessageDiv.innerHTML = `
            <span><strong>ATENCIÓN: </strong>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="this.parentElement.remove()"></button>`

        divMessagesUI.appendChild(newMessageDiv)
    }
}

module.exports = View;
