//
(function () {
  const state = {
    operationId: 0,
    buttonsByCoordinates: {},
    row0: document.querySelector("#row-0"),
    row1: document.querySelector("#row-1"),
    row2: document.querySelector("#row-2"),
  };

  const getTokenFromOperationId = () => {
    return Number.isInteger(state.operationId / 2) ? "O" : "X";
  };

  const getWinner = (token) => {
    const { buttonsMap } = state;

    const hasSameToken = (button) => button.textContent === token;

    const buttonsByColumn = {};
    const buttonsByRow = {};
    const topLeftDiagonalButtons = [];
    const topRightDiagonalButtons = [];

    for (const entry of buttonsMap.entries()) {
      const [[rowNumber, , colNumber], button] = entry;
      const colButtons = buttonsByColumn[colNumber] || [];
      colButtons.push(button);
      buttonsByColumn[colNumber] = colButtons;

      const rowButtons = buttonsByRow[rowNumber] || [];
      rowButtons.push(button);
      buttonsByRow[rowNumber] = rowButtons;

      if (rowNumber === colNumber) {
        topLeftDiagonalButtons.push(button);
      }

      if (Number(rowNumber) + Number(colNumber)) {
        topRightDiagonalButtons.push(button);
      }
    }

    const x =
      topLeftDiagonalButtons.every(hasSameToken) ||
      topRightDiagonalButtons.every(hasSameToken);

    const a =
      Object.values(buttonsByColumn).find((v) => v.every(hasSameToken)) ||
      Object.values(buttonsByRow).find((v) => v.every(hasSameToken));

    if (x || a) {
      alert(token);
    }
  };

  function handleCellClick() {
    const token = getTokenFromOperationId();
    this.disabled = true;
    this.textContent = token;
    getWinner(token);
    state.operationId = state.operationId + 1;
  }

  const getNewGameMatrix = () => new Array(3).fill(new Array(3).fill(" "));

  const foo = () => {
    const m = new Map();
    getNewGameMatrix().forEach((row, i) => {
      const rowContainer = document.querySelector(`#row-${i}`);

      row.forEach((col, j) => {
        const btn = document.createElement("button");
        btn.addEventListener("click", handleCellClick);
        m.set(`${i}-${j}`, btn);

        rowContainer.appendChild(btn);
      });
    });

    state.buttonsMap = m;
  };

  const createButtonsFrom = (newGameMatrix) => {
    const buttons = [];

    newGameMatrix.forEach((row, rowIndex) => {
      const rowContainer = document.querySelector(`#row-${rowIndex}`);
      row.forEach((textContent, columnIndex) => {
        const button = document.createElement("button");
        button.textContent = textContent;
        button.addEventListener("click", handleCellClick);

        state.buttonsByCoordinates[`${columnIndex}-${rowIndex}`] = button;
        rowContainer.appendChild(button);
        buttons.push(button);
      });
    });

    return buttons;
  };

  // createButtonsFrom(getNewGameMatrix());
  foo();
})();
// const rowHavingSameToken = rows
//   .map(rowItems2Boolean)
//   .some((value) => value);

// // todo: redo this
// const columnWihsameToken = Object.values(
//   Object.entries(state.buttonsByCoordinates).reduce(
//     (acc, [coordinate, button]) => {
//       const columnValue = coordinate.split("-")[0];
//       const columnItems = acc[`column${columnValue}`];
//       columnItems.push(button);
//       acc[`column${columnValue}`] = columnItems;
//       return acc;
//     },
//     {
//       column0: [],
//       column1: [],
//       column2: [],
//     }
//   )
// )
//   .map((col) => col.every(hasSameToken))
//   .some((value) => value);

// const topLeftDiagonalWithSameToken =
//   rows
//     .map((row) => getRowButtons(row))
//     .filter((button, i) => button[i].textContent === token).length === 3;

// const topRightDiagonalWithSameToken =
//   rows
//     .map((row) => getRowButtons(row))
//     .toReversed()
//     .filter((button, i) => button[i].textContent === token).length === 3;
