export class Grid {
  constructor() {
    this.wordSelectMode = false;
    this.selectedItems = [];
    this.firstSelectedItem;
    this.gridArea = null;
  }

  getCellsInRange(firstLetter, currentLetter) {
    let cellsInRange = [];
    console.log(firstLetter, currentLetter);
    if (firstLetter.y === currentLetter.y) {
      if (firstLetter.x > currentLetter.x) {
        [currentLetter, firstLetter] = [firstLetter, currentLetter];
      }
      for (let i = firstLetter.x; i <= currentLetter.x; i++) {
        console.log(
          this.gridArea.querySelector(
            `td[data-x="${i}"][data-y="${currentLetter.y}"]`
          )
        );
        cellsInRange.push(
          this.gridArea.querySelector(
            `td[data-x="${i}"][data-y="${currentLetter.y}"]`
          )
        );
      }
    }
    return cellsInRange;
  }

  renderGrid(gridSize, wordgrid) {
    // get the reference for the grid-area
    var gridArea = document.getElementsByClassName("grid-area")[0];

    if (gridArea.lastChild) {
      gridArea.removeChild(gridArea.lastChild);
    }
    
    this.gridArea = gridArea;
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
        let letter = wordgrid[index++];
        var cellText = document.createTextNode(letter);
        cell.appendChild(cellText);
        cell.setAttribute("data-x", i);
        cell.setAttribute("data-y", j);
        cell.setAttribute("data-letter", letter);
        row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    gridArea.appendChild(tbl);

    // Click Handlers
    gridArea.addEventListener("mousedown", (event) => {
      this.wordSelectMode = true;
      const cell = event.target;
      let x = +cell.getAttribute("data-x");
      let y = +cell.getAttribute("data-y");
      let letter = cell.getAttribute("data-letter");
      this.firstSelectedItem = {
        x,
        y
      };
    });

    gridArea.addEventListener("mousemove", (event) => {
      if (this.wordSelectMode) {
        const cell = event.target;
        // cell.classList.add("selected");
        let x = +cell.getAttribute("data-x");
        let y = +cell.getAttribute("data-y");
        let letter = cell.getAttribute("data-letter");

        // if (this.selectedItems.length) {
        //   const lastSelectedItem =
        //     this.selectedItems[this.selectedItems.length - 1];
        //   if (lastSelectedItem.x === x && lastSelectedItem.y === y) return;
        // }

        // this.selectedItems.push({
        //   x,
        //   y,
        //   letter,
        //   cell,
        // });

        this.getCellsInRange(this.firstSelectedItem, { x, y }).forEach((cell) =>
          cell.classList.add("selected")
        );
      }
    });

    gridArea.addEventListener("mouseup", (event) => {
      this.wordSelectMode = false;
      this.selectedItems.forEach((item) =>
        item.cell.classList.remove("selected")
      );
    });
  }
}
