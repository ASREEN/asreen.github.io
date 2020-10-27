
//creat an array that holds selected items
//calculate and display total order quantity
let orderList = [];
let num = 0, x = false, index = 0;
function orderButton(orderItem, price) {
    console.log(orderItem);
    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].orderItem == orderItem) {
            x = true;
        }
    }
    console.log(x);
    if (x == false) {
        index++;
        orderList.push({ index, orderItem, price });
    }
    document.getElementById("cartCount").innerHTML = index;
}
//cart 
//display items in shopping cart
function checkCartF() {
    console.log(orderList)
     cartContainer.innerHTML = '';
    for (let i = 0; i < orderList.length; i++) {
        cartContainer.innerHTML += `<div class="dropdown-item" href="#">${orderList[i].index}) ${orderList[i].orderItem} price: ${orderList[i].price}€
        <i class="fas fa-trash-alt ml-3" onclick='removeItem("${orderList[i].orderItem}")'></i>
        </div>`;
    }
    // console.log('cartCount', cartCount)
    document.getElementById('cartCount').innerHTML = orderList.length;
}
//favorite items
let favoriteList = [];
let favTotal = 0;
let heartColor = 'red';
function addFavorite(id, title) {
    console.log('id', id, 'title', title)
    for (let i = 0; i < favoriteList.length; i++) {
        if (favoriteList[i] == title) {
            heartColor = 'white';
            document.getElementById(`favoriteButton_${id}`).style.color = "rgb(128 128 128) ";
            favoriteList.map((item, index) => {
                if (item == title) {
                    favoriteList.splice(index, 1);
                }
            })
            favTotal = favoriteList.length;
            document.getElementById("favoriteCount").innerHTML = favTotal;
        }
    }
    if (heartColor == 'red') {
        document.getElementById(`favoriteButton_${id}`).style.color = "red";
        heartColor = 'red';
        favoriteList.push(title);
        favTotal = favoriteList.length;
        document.getElementById("favoriteCount").innerHTML = favTotal;
    }
    console.log(favoriteList)

}
//display items in fav cart
function checkFavF() {
    favContainer.innerHTML = '';
    for (let i = 0; i < favoriteList.length; i++) {
        favContainer.innerHTML += `<a class="dropdown-item" href="#">${favoriteList[i]}</a>`;
    }
}
// remove item from cart
function removeItem(itemName) {
    console.log('itemName',itemName)
    orderList.map((item, index) => {
        console.log('item',item)
        if (item.orderItem == itemName) {
            console.log('found')
            orderList.splice(index, 1);
        }
    })
    console.log("item's array=",orderList)
    checkCartF();
}