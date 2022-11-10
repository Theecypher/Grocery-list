const addItemsAction = document.querySelector(".addItems-action"),
submit = document.querySelector(".addItems-submit"),
input = document.querySelector(".addItems-input"),
list = document.querySelector(".grocery-list"),
displayItemsAction = document.querySelector(".displayItems-action"),
clear = document.querySelector(".displayItems-clear");

submit.addEventListener("click", addItems);
document.addEventListener("DOMContentLoaded", displayStorage);
clear.addEventListener("click", removeItems);
list.addEventListener("click", removeSingleItem);

function addItems(e) {  
    e.preventDefault();
    let value = input.value;
    if (value === "") {
        showAction(addItemsAction, "Please an item to the list", false);
    }
    else {
        input.value = "";
        showAction(addItemsAction, `${value} has been added to the list`, true);
        createItem(value);
        updateStorage(value);
    }
}

function showAction (element, text, value) {
    if (value === true) {
        element.classList.add("success");
        element.innerText = text;
        input.value = "";
        setTimeout(function(e) {
            element.classList.remove("success");
        }, 3000)
    } else {
        element.classList.add("alert");
        element.innerText = text;
        input.value = "";
        setTimeout(function() {
            element.classList.remove("alert");
        }, 3000)
    }
}

function createItem(value) {
    let parent = document.createElement("div");
    parent.classList.add("grocery-item");

    parent.innerHTML = `
    <h4 class="grocery-item__title">${value}</h4>
    <a href="#" class="grocery-item__link">
        <img width="20px" src="images/delete.svg.PNG" alt="">
    </a>
    `

    list.appendChild(parent);
}

function updateStorage(value) {
    let groceryList;

    groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : [];

    groceryList.push(value);
    localStorage.setItem('groceryList', JSON.stringify(groceryList))
}
function displayStorage() {
    let exists = localStorage.getItem('groceryList');

    if (exists) {
        let storageItems = JSON.parse(localStorage.getItem('groceryList'));
        storageItems.forEach(function(element) {
            createItem(element);
        })
    }
}

function removeItems() {
    localStorage.removeItem('groceryList');
    let items = document.querySelectorAll(".grocery-item");

    if (items.length > 0) {
        showAction(displayItemsAction, "All items has been delete", false);
        items.forEach(function(item) {
            list.removeChild(item);
        })
    } else {
        showAction(displayItemsAction, "No items to delete", false);
    }
}

function removeSingleItem (e) {
    e.preventDefault();
    let link = e.target.parentElement;

    if (link.classList.contains("grocery-item__link")) {
        let text = link.previousElementSibling.innerHTML;
        let groceryItem = e.target.parentElement.parentElement;

        list.removeChild(groceryItem);
        JSON.parse(localStorage.getItem('groceryList'));
        showAction(displayItemsAction, `${text} has been deleted`, true);
    }
}