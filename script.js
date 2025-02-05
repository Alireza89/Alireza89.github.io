const noData = {
    backgroundColor: "#FED8B1", 
    innerHTML: "<br>&#129300 &#10067"
};

const success = {
    backgroundColor: "#B2FFBF",
    innerHTML: "<br>&#128512 &#9989",
}

const failure = {
    backgroundColor: "#E55B3C",
    innerHTML: "<br>&#128542 &#10069",
}

const nodeListN = document.querySelectorAll(".n");
for (let i = 0; i < nodeListN.length; i++) {
    nodeListN[i].style.backgroundColor = noData.backgroundColor;
    nodeListN[i].innerHTML += noData.innerHTML;
}

const nodeListS = document.querySelectorAll(".s");
for (let i = 0; i < nodeListS.length; i++) {
    nodeListS[i].style.backgroundColor = success.backgroundColor;
    nodeListS[i].innerHTML += success.innerHTML;
}

const nodeListF = document.querySelectorAll(".f");
for (let i = 0; i < nodeListF.length; i++) {
    nodeListF[i].style.backgroundColor = failure.backgroundColor;
    nodeListF[i].innerHTML += failure.innerHTML;
}
