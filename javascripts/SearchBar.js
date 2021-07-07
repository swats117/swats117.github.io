var descriptionsAndCodes;
var potentialList;
var searchTerm;
var index = 0;
d3.csv("/assets/IUCR.csv").then(data =>{
    console.log(data);
    descriptionsAndCodes = data;
    potentialList = descriptionsAndCodes;
});


function updateResults() {
    let selection = d3.select("#resultsList")
        .selectAll("li")
        .data(potentialList
            .slice(index, index + 10)
            .map(x => x.description))
        .text(d => d);
    selection.enter().append("li")
        .text(d => d);
    selection
        .exit().remove();
    d3.select("#resultsList :first-child").attr("style", "background-color: cyan;");
}

d3.select("#searchBar").on("focus", () => {
    updateResults();
    d3.selectAll("#resultsList *").attr("style", "");
    d3.select("#resultsList :first-child").attr("style", "background-color: cyan;");
}).on("blur", () => {
    d3.selectAll("#resultsList *").attr("style", "display: none")
}).on("keydown", () => {
    if(d3.event.keyCode == 38){ // up
        index = Math.max(0, index - 1);
        console.log(index);
        console.log(potentialList.length);
    } else if(d3.event.keyCode == 40){ // down
        index = Math.min(potentialList.length-1, index + 1);
        console.log(index);
        console.log(potentialList.length);
    } else if(/[a-z\b]/i.test(String.fromCharCode(d3.event.keyCode))){ // alpha or backspace
        console.log("alpha");
        index=0;
    } else if(d3.event.keyCode == 13){ // enter key
        console.log(potentialList[index]);
        let iucr = potentialList[index].iucr;
        d3.select("#searchBar").property("value", potentialList[index].description);
        console.log("IUCR: " + iucr);
        fetch("/crime/" + iucr)
            .then(response => response.json())
            .then(json => {
                console.log("hello");
                console.log(json);
                updateTableData(json.tableData);
                updateMapData(json.mapData);
            })
    }
}).on("keyup", () => {
    searchTerm = d3.select("#searchBar").property("value");
    console.log(searchTerm);
    potentialList = descriptionsAndCodes.filter(x => (new RegExp(searchTerm, "i")).test(x.description));
    updateResults();
});

