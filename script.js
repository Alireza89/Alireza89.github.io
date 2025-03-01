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

const monthNames = ["Jan", "Feb", "Mar", 
                    "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", 
                    "Oct", "Nov", "Dec"];

const scrolTopOffset = -3 * 50 + 2;

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

const secondChance = {
    cssClass: ".sc",
    backgroundColor: "#f5d742", 
    innerHTML: "<br>" + "<span style=\"font-size:10px\">2nd chance</span>",
};

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

Date.prototype.getWeekNumber = function() { // https://weeknumber.com/how-to/javascript
    let date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
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

let onset = new Date(2025, 0, 13);
let today = new Date();

console.log("Onset: ", monthNames[onset.getMonth()], onset.getDate(), onset.getFullYear());
console.log("Today: ", monthNames[today.getMonth()], today.getDate(), today.getFullYear());

let table = document.getElementById("progressTable");
for (let rowIdx = 1; rowIdx < table.rows.length; rowIdx++) { // start row at 1 because of the header
    let row = table.rows[rowIdx];
    for (let cellIdx = 0; cellIdx < row.cells.length - 1; cellIdx++) { // length - 1 to exclude last coloumn
        row.cells[cellIdx].rowPos = rowIdx - 1; // - 1, so rowPos starts at 0
        row.cells[cellIdx].cellPos = cellIdx ;
        
        row.cells[cellIdx].cellDate = new Date(onset);
        row.cells[cellIdx].cellDate.setDate( onset.getDate() + 
                row.cells[cellIdx].cellPos + (7 * row.cells[cellIdx].rowPos)
        );
        
        row.cells[cellIdx].innerHTML = 
            monthNames[row.cells[cellIdx].cellDate.getMonth()] + " " + row.cells[cellIdx].cellDate.getDate();
    }
}

function scrollToDate(date) {
    console.log("scroll To Date: ", monthNames[today.getMonth()], today.getDate(), today.getFullYear(),
                "Week Number:", date.getWeekNumber());

    const tdList = document.querySelectorAll('#progressTable td');
    for (let tdIdx = 0; tdIdx < tdList.length; tdIdx++) { 
        if(tdList[tdIdx].cellDate) {
            let cellDate = tdList[tdIdx].cellDate;
            if(date.getWeekNumber() == cellDate.getWeekNumber()) {
                console.log("scroll to cellDate: ", monthNames[cellDate.getMonth()], cellDate.getDate(), cellDate.getFullYear(),
                            "Week Number:", cellDate.getWeekNumber(),
                            "offsetTop: ", tdList[tdIdx].offsetTop);
                window.scroll({
                    top: tdList[tdIdx].offsetTop + scrolTopOffset,
                    behavior: "smooth",
                    });
                
                break;
            }
        }
    }
}

function evtHandler() {
    if(this.cellDate) {
        console.log("Row:", this.rowPos, "Col:", this.cellPos, 
            "Date:", monthNames[this.cellDate.getMonth()], this.cellDate.getDate(), this.cellDate.getFullYear(),
            "ofsTop: ", this.offsetTop, "ofsLft: ", this.offsetLeft
        );
        // alert("Row: " + this.rowPos + " Col: " + this.cellPos +
        //     " Date: "+monthNames[this.cellDate.getMonth()]+" "+this.cellDate.getDate()+" "+this.cellDate.getFullYear());
        window.scroll({
            top: this.offsetTop + scrolTopOffset,
            behavior: "smooth",
          });
    }
}
const tdList = document.querySelectorAll('#progressTable td');
tdList.forEach(e => e.addEventListener("click", evtHandler));


console.log("update begins!")

update(noData);
update(success);
update(failure);
update(secondChance);
updateWeight(weight);

setTimeout(scrollToDate, 300, today);

console.log("update Finishes!")
