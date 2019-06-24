import Cell from '../../classes/Cell';
import generate from '../../lifeHelpers';

export default function reducer(state = [], action) {
  switch (action.type) {
    case 'TOOGLE_LIVING':
      return state.map(cell => {
        if (cell.identity === action.identity) {
          const newCell = new Cell(cell.identity, cell.living);
          newCell.click();
          return newCell;
        }

        return cell;
      });
    case 'GENERATE':
      return generate(state);
    default:
      throw new Error();
  }
}
