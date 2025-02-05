const noData = {
    cssClass: ".n",
    backgroundColor: "#FED8B1", 
    innerHTML: "<br>&#129300 &#10067"
};

const success = {
    cssClass: ".s",
    backgroundColor: "#B2FFBF",
    innerHTML: "<br>&#128512 &#9989",
}

const failure = {
    cssClass: ".f",
    backgroundColor: "#E55B3C",
    innerHTML: "<br>&#128542 &#10069",
}

function update(e) {
    const nodeList = document.querySelectorAll(e.cssClass);
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.backgroundColor = e.backgroundColor;
        nodeList[i].innerHTML += e.innerHTML;
    }
}

console.log("update begins!")

update(noData);
update(success);
update(failure);

console.log("update Finishes!")
