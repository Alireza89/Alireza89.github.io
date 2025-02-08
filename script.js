const EmojiGreenCheck = "&#9989";
const EmojiRedQuestion = "&#10067";
const EmojiWhiteExclm = "&#10069";

const EmojiHappy = "&#128512";
const EmojiSad = "&#128542";
const EmojiThink = "&#129300";
const EmojiNeutral = "&#128528";

const EmojiBullish = "&#128200";
const EmojiBearish = "&#128201";
const UnicodeHeavyEqual = "\u{0001f7f0}";

const noData = {
    cssClass: ".n",
    backgroundColor: "#FED8B1", 
    innerHTML: "<br>" + EmojiThink + EmojiRedQuestion
};

const success = {
    cssClass: ".s",
    backgroundColor: "#B2FFBF",
    innerHTML: "<br>" + EmojiHappy + " " +EmojiGreenCheck,
}

const failure = {
    cssClass: ".f",
    backgroundColor: "#E55B3C",
    innerHTML: "<br>" + EmojiSad + EmojiWhiteExclm,
}

const weight = {
    cssClass: ".w",
    backgroundColorNoData: "#ecb47c",
    backgroundColorHasData: "#87b8e1",

    weightIncreasedInnerHTML: EmojiBullish,
    weightDecreasedInnerHTML: EmojiBearish,
    weightEqualInnerHTML: UnicodeHeavyEqual,

    increseNumStyle: "<span style=\"color:red; font-size:16px\"><b>+",
    dereaseNumStyle: "<span style=\"color:green; font-size:16px\"><b>",
    increseEmjStyle: "<span style=\"font-size:12px\">",
    dereaseEmjStyle: "<span style=\"font-size:12px\">" ,
}

function update(e) {
    const nodeList = document.querySelectorAll(e.cssClass);
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.backgroundColor = e.backgroundColor;
        nodeList[i].innerHTML += e.innerHTML;
    }
}

function updateWeight(e) {
    const nodeList = document.querySelectorAll(e.cssClass);
    for (let i = 0; i < nodeList.length; i++) {
        if(nodeList[i].innerHTML == "") {
            nodeList[i].style.backgroundColor = e.backgroundColorNoData;
            nodeList[i].innerHTML += EmojiRedQuestion;
        } else {
            nodeList[i].style.backgroundColor = e.backgroundColorHasData;
            if(i > 0) {
                let lastWeekWgt = parseFloat(nodeList[i-1].innerHTML);
                let thisWeekWgt = parseFloat(nodeList[i].innerHTML);
                let diff = thisWeekWgt - lastWeekWgt;
                nodeList[i].innerHTML += "<br>";
                if(diff > 0) {
                    nodeList[i].innerHTML += e.increseNumStyle + diff.toFixed(1) + "</span>";
                    nodeList[i].innerHTML += e.increseEmjStyle + e.weightIncreasedInnerHTML + "</span>";
                }
                else if(diff < 0) {
                    nodeList[i].innerHTML +=  e.dereaseNumStyle + diff.toFixed(1) + "</span>";
                    nodeList[i].innerHTML +=  e.dereaseEmjStyle + e.weightDecreasedInnerHTML + "</span>";
                }
                else {
                    nodeList[i].innerHTML += diff.toFixed(1);
                    nodeList[i].innerHTML += e.weightEqualInnerHTML;
                }
            }
        }
    }
}


console.log("update begins!")

update(noData);
update(success);
update(failure);
updateWeight(weight);

console.log("update Finishes!")
