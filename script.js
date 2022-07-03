let input1 = element("input", "");
input1.setAttribute("id", "main");
input1.setAttribute("type", "text");
input1.style.padding = "0px 100px 0px 10px";
input1.style.margin = "10px"
input1.style.float = "right";
document.body.append(input1);
let button1 = element("button", "Search");
button1.setAttribute("id", "butt");
button1.style.margin = "10px 10px 10px 0px";
button1.style.float = "right";
button1.addEventListener("click", api1);
document.body.append(button1);
function api1() {
    let highlighttext = document.getElementById("main").value;
    console.log(highlighttext);
    for (var g = 1; g <= 3; g++) {
        for (var h = 0; h <= 7; h++) {
            var rowhighlight = document.getElementById("myTable").rows[g].cells[h].innerHTML;
            var index = rowhighlight.indexOf(highlighttext);
            if (index > 0) {
                rowhighlight = rowhighlight.substring(0, index) + "<b>" + rowhighlight.substring(index, index + highlighttext.length) + "</b>" + rowhighlight.substring(index + highlighttext.length);
                //console.log(rowhighlight)
                rowhighlight.innerHTML = rowhighlight;

            }

        }
    }
}

let box = document.createElement("div");
box.className = "box";
document.body.append(box);

let container = document.createElement("div");
container.style.padding = "10px";
box.append(container);

function element(tag, res) {
    result = document.createElement(tag);
    result.innerHTML = res;
    return result;
}
var table = document.createElement("table")
table.className = "table"
table.setAttribute("id", "myTable");
table.style.border = "1px"
table.style.margin = "10px";
table.style.bordercollapse = "collapse";
var thead = document.createElement("thead")
thead.className = "thead"
var tr = document.createElement("tr")
tr.style.borderStyle = "solid";
tr.style.backgroundColor = "beige";

var th0 = element("th", "Serial No.");
th0.style.padding = "10px";
var th1 = element("th", "Name")
var th2 = element("th", "ISBN")
var th3 = element("th", "No.of Pages")
var th4 = element("th", "Author")
var th5 = element("th", "Publisher")
var th6 = element("th", "Release Date")
var th7 = element("th", "Characters")
//Header Data
tr.append(th0, th1, th2, th3, th4, th5, th6, th7);
thead.append(tr);
table.append(thead);
container.append(table);
async function datafetch() {
    try {
        for (var i = 1; i <=50; i++) {
            var empty = [];
            let res = await fetch(`https://www.anapioficeandfire.com/api/books/${i}`);
            let book = await res.json();
            var cc = "";
            for (var j = 0; j < book.authors.length; j++) {
                cc = cc + (book.authors[j]) + ",";
                //console.log(cc)

            }
            var cc1 = "";
            for (var k = 0; k < 5; k++) {
                var len = book.characters.length;
                if (len >= 5) {
                    let data4 = await fetch(`${book.characters[k]}`);
                    let data5 = await data4.json();
                    cc1 = cc1 + (data5.name) + ",";
                }
                else {
                    for (var m = 0; m < len; m++) {
                        let data6 = await fetch(`${book.characters[k]}`);
                        let data7 = await data6.json();
                        cc1 = cc1 + (data7.name) + ",";
                    }
                }

            } //characters extraction
            empty.push(i, book.name, book.isbn, book.numberOfPages, cc.slice(0, -1), book.publisher, book.released, cc1.slice(0, -1));
            row = table.insertRow(i);
            for (var p = 0; p <= 7; p++) {
                var cell = row.insertCell(p);
                cell.innerHTML = empty[p];
            } //Array output
        }
        return empty;
    } catch (error) {
    console.log(error);
    }  //Row and Column values updation
}
datafetch();