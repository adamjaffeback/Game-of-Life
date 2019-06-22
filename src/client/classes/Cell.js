const Cell = function (cellNumber, living = false, location = null) {
  this.identity = cellNumber;
  this.living = living;
  this.shouldToggle = false;
  this.location = location;
}

Cell.prototype.click = function () {
  this.living = !this.living;
};

Cell.prototype.setLocation = function (bounds) {
  console.log('bounds',bounds);
  this.location = bounds;
};

export default Cell;
