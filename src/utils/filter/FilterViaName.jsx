import { TableCell, TableHead, TableRow } from '@mui/material';
import { BsSearch } from 'react-icons/bs';
import './filter.css';

const FilterViaName = ({ handleChange, name, title = 'Enter Name...' }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="tableCell x">
          <label
            htmlFor="filter"
            style={{
              color: 'gray',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Filter via name
          </label>
          <div className="input_container">
            <input
              className="input_container-value"
              id="filter"
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              name="name"
              value={name}
              placeholder={title}
            />
            <BsSearch className="input_container-icon" />
          </div>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default FilterViaName;
