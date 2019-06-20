class Cell {
  constructor(x, y) {
    this.living = false;
    this.shouldToggle = false;
    this.location = [x, y];
    this.neighbors = [];
  }
}

export default Cell;
