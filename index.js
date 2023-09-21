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
    const { row0, row1, row2 } = state;

    const hasSameToken = (button) => button.textContent === token;
    const getRowButtons = (row) => Array.from(row.children);
    const rowItems2Boolean = (row) => getRowButtons(row).every(hasSameToken);

    const rows = [row0, row1, row2];

    const rowHavingSameToken = rows
      .map(rowItems2Boolean)
      .some((value) => value);

    // todo: redo this
    const columnWihsameToken = Object.values(
      Object.entries(state.buttonsByCoordinates).reduce(
        (acc, [coordinate, button]) => {
          const columnValue = coordinate.split("-")[0];
          const columnItems = acc[`column${columnValue}`];
          columnItems.push(button);
          acc[`column${columnValue}`] = columnItems;
          return acc;
        },
        {
          column0: [],
          column1: [],
          column2: [],
        }
      )
    )
      .map((col) => col.every(hasSameToken))
      .some((value) => value);

    const topLeftDiagonalWithSameToken =
      rows
        .map((row) => getRowButtons(row))
        .filter((button, i) => button[i].textContent === token).length === 3;

    const topRightDiagonalWithSameToken =
      rows
        .map((row) => getRowButtons(row))
        .toReversed()
        .filter((button, i) => button[i].textContent === token).length === 3;

    if (
      rowHavingSameToken ||
      columnWihsameToken ||
      topLeftDiagonalWithSameToken ||
      topRightDiagonalWithSameToken
    ) {
      alert(`The winner is ${token}`);
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

  createButtonsFrom(getNewGameMatrix());
})();
