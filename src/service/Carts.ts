import Cart from './Cart'

class Carts {

list:Cart[]

    constructor() {
        this.list = []
    }

addCart(cart:Cart) {
    this.list.push(cart)
}

getCart(userId:number) {
    return this.list.find(cart => cart.id === userId)
}

}

export default Carts