const Cell = function (cellNumber, living = false) {
  this.identity = cellNumber;
  this.living = living;
  this.shouldToggle = false;
  this.location = null;
}

Cell.prototype.click = function () {
  this.living = !this.living;
};

Cell.prototype.setLocation = function (bounds) {
  this.location = bounds;
};

export default Cell;
