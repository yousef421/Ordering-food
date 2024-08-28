const menuArray =  [
{
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    price: 14,
    emoji: "🍕",
    id: 0,
    quntity: 0,
},
{
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    emoji: "🍔",
    id: 1,
    quntity: 0,
},
    {
    name: "Coffee",
    ingredients: ["coffee, water, suger, cream"],
    price: 12,
    emoji: "☕",
    id: 2,
    quntity: 0,
}
]
name
let orderArray = [];
const orderList = document.getElementById("order-list")
const totalOrderPrice = document.getElementById("total-order-price")
const menuBoard = document.getElementById("menu-board")

function renderMenu() {
    let menuHtml = ""
    menuArray.map((item)=>{
        menuHtml += `
                <div class="item">
                    <h1 class="icon">${item.emoji}</h1>
                    <div class="text">
                        <h2 class="name">${item.name}</h2>
                        <p class="ingradents">${item.ingredients}</p>
                        <p class="price">${item.price}$</p>
                    </div>
                    <p class="quntity">${item.quntity}</p>
                    <button class="add-button" id="add-btn" data-add=${item.id}>+</button>
                </div>
        `
    })
    menuBoard.innerHTML = menuHtml
}

function addToCart(e) {
    let menuObj;
    if(e.target.dataset.add) {
         menuObj = menuArray.filter((item)=>{  
                return item.id === +e.target.dataset.add && item.quntity++
        })
    }
        renderMenu()
        renderOrder()   

}

document.addEventListener("click", function(e){
    if(e.target.dataset.remove) {
        remove(e.target.dataset.remove)
    }
})

function order() {
    for(let item of menuArray) {
        if(item.quntity > 0 && !orderArray.includes(item)) {
            orderArray.push(item)
        }
    }
    return orderArray
}

function renderOrder() {
    order()
    let orderHtml = "";
    let priceOrder = 0;
    if(orderArray.length > 0) {
        for(let order of orderArray) {
            if(order.quntity > 0) {
                orderHtml += `
                <div class="order" id="order">
                    <div class="order-det">
                        <h2><span class="quntity-order">${order.quntity}</span> ${order.name}</h2>
                        <button id="remove-order-btn" data-remove=${order.id}>remove</button>
                    </div> 
                    <h3 class="order-price" id="total-item-price">${order.price * order.quntity}$</h3>
                </div>
                `
            }
            priceOrder += order.price * order.quntity
        }    
    }
     document.getElementById("order-board").style.display = "flex";
     orderList.innerHTML = orderHtml
     totalOrderPrice.innerText = priceOrder + "$"
}

function remove(num) {
    const elm = orderArray.filter((item)=>{
        return item.id === +num
    })
    elm[0].quntity = 0
}


document.getElementById("order-btn").addEventListener("click", ()=>{
document.getElementById("personal-info").style.display = "flex"
})
    
document.getElementById("pay-btn").addEventListener("click", completeOrder)

function completeOrder(e) {
    e.preventDefault()
    const name = document.getElementById("name").value
    const cvv = document.getElementById("cvv").value
    const cardNum = document.getElementById("card-num").value
    if(name && cvv && cardNum) {
    document.getElementById("order-board").innerHTML = `
        <h3 class="finle-message">Your order is on the way mr. ${name.toUpperCase()}</h3>
    `
    document.getElementById("personal-info").style.display = "none"   
    
    } else {
    document.getElementById("worn").style.display = "block"
    document.getElementById("worn").textContent = "please fill the hole form"
    }
}

document.addEventListener("click", addToCart)

renderMenu()
  
// function reomveToCart(e) {
//     let menuObj;
//     if(e.target.dataset.remove) {
//          menuObj = menuArray.filter((item)=>{
//             return item.id === +e.target.dataset.remove
//         })
//     }
//     menuObj[0].quntity--
//     renderMenu()
// }
// menuBoard.addEventListener("click", reomveToCart)


// <h2>Your order</h2>
// <div class="order-list">
//     <div class="order">
//         <div class="order-det">
//             <h2>pizza</h2>
//             <button>remove</button>
//         </div>
//         <h3 class="order-price">15$</h3>
//     </div>
// </div>
// <div class="total-price">
//     <h2>Total Price:</h2>
//     <h3>15$</h3>
// </div>
// <button class="order-btn">Complete Order</button> 


// orderArray.forEach((order)=>{
//     totalprice = order.price * order.quntity
//     orderHtml += `
            // <h2>Your order</h2>
            // <div class="order-list">
            //     <div class="order">
            //         <div class="order-det">
            //             <h2>${order.name}</h2>
            //             <button>remove</button>
            //         </div>
            //         <h3 class="order-price">${order.price}$</h3>
            //     </div>
            // </div>
            // <div class="total-price">
            //     <h2>Total Price:</h2>
            //     <h3>${totalprice}$</h3>
            // </div>
            // <button class="order-btn" id="order-btn">Complete Order</button>
//     `
// })