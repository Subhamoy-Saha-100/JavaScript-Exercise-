// Write a function to change the text of a button on the click event.
function changeButtonText() {
    const button = document.querySelector("button");

    if(button.textContent === "Click Me!") {
        button.textContent = "Clicked!";
    }else {
        button.textContent = "Click Me!";
    }
}

const button = document.querySelector("button");
button.addEventListener("click", changeButtonText);

// Write a function to add a CSS class to an element on the mouseover event.

function addClassOnMouseOver(elementID, className){
    const element = document.getElementById(elementID);
    element.addEventListener("mouseover", ()=>{
        console.log(element);
        element.classList.add(className);
    });
}

addClassOnMouseOver("button", "active");

// Write a function to remove a CSS class from an element on scroll event.

function removeClassOnMouseOver(elementID, clasName){
    const element = document.getElementById(elementID);
    element.addEventListener("scroll", ()=>{
        element.classList.remove(clasName);
    });
}

removeClassOnMouseOver("button", "active");