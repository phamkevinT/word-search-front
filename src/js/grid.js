export class Grid {
  renderGrid(gridSize, wordgrid) {
    // get the reference for the grid-area
    var gridArea = document.getElementsByClassName("grid-area")[0];

    if (gridArea.lastChild) {
      gridArea.removeChild(gridArea.lastChild);
    }

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    let index = 0;
    // creating all cells
    for (var i = 0; i < gridSize; i++) {
      // creates a table row
      var row = document.createElement("tr");

      for (var j = 0; j < gridSize; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(wordgrid[index++]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    gridArea.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
  }
}
