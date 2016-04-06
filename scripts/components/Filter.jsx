import React from 'react';

const Filter = React.createClass({
  render: function() {
    var types = this.props.types;
    var options = [];
    for (var typeIndex in types) {
      options.push(
        <option value={types[typeIndex]} key={typeIndex}>
          {types[typeIndex].charAt(0).toUpperCase() + types[typeIndex].slice(1)}
        </option>
      )
    }

    return (
      <form id='filter' method='post' action='#' className='filter hidden'>
        <div className='col-md-2'>
          <div className='input-field filter__activateBtn'>
            <input type='checkbox' id='activateFilter' className='filled-in'/>
            <label htmlFor='activateFilter'>Use filter</label>
          </div>
        </div>
        <div className='col-md-8'>
          <div className='input-field filter__inputField_hiddenOnUnactive'>
            <select id='filterSelect' multiple='multiple'>
              <option value='All Types' disabled='disabled' defaultSelected='true' >Choose types</option>
              {options}
            </select>
          </div>
        </div>
        <div className='col-md-2'>
          <div className='input-field filter__inputField_hiddenOnUnactive'>
            <button type='submit' name='submitFilter' className='btn waves-effect waves-light'>Filter cards</button>
          </div>
        </div>
      </form>
    );
  }
});
export default Filter;
