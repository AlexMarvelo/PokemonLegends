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
      <form id="filter" method="post" action="#" className="filter">
        <div className="filter__checkboxCont">
          <input type="checkbox" id="activateFilter" className="filter__checkbox"/>
          <label htmlFor="activateFilter" className="filter__checkboxLabel">Filter</label>
        </div>
        <div className="row filter__hideCont filter__hideCont_overflowHidden">
          <div className="col-sm-8">
            <div className="filter__selectCont">
              <select multiple="multiple" className="filter__select">
                {options}
              </select>
            </div>
          </div>
          <div className="col-sm-4">
            <button type="button" name="submitFilter" className="button button_gradient">Filter cards</button>
          </div>
        </div>
      </form>
    );
  }
});
export default Filter;
