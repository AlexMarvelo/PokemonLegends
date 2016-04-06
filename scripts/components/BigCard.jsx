import React from 'react';

const BigCard = React.createClass({
  render: function() {
    var rows = [];
    var pokemon = this.props.pokemon;
    var image = pokemon.image.src;
    var str = ' ';
    for (var i = 0; i < pokemon.types.length; i++) {
      str = str.concat(this.beautifyText(pokemon.types[i]) + ' ');
    }
    for (var variable in pokemon) {
      if (pokemon.hasOwnProperty(variable) && variable != 'id' && variable != 'name' && variable != 'image' && variable != 'types') {
        rows.push(
          <tr key={this.beautifyText(variable)} className="card__tableTr">
            <td className="card__tableTd">
              {this.beautifyText(variable)}
            </td>
            <td className="card__tableTd">
              {pokemon[variable]}
            </td>
          </tr>
        )
      }
    }
    return (
      <div className="card card_big">
        <div className="card__imgCont">
          <img
            src={image}
            alt={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            className="card__img"/>
        </div>
        <h3 className="card__title">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <div className="card__body">
          <table className="card__table">
            <thead className="card__tableHead">
              <tr className="card__tableTr">
                <th className="card__tableTh">Type</th>
                <th className="card__tableTh">Value</th>
              </tr>
            </thead>
            <tbody className="card__tableBody">
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  beautifyText: function(str) {
    switch (str) {
      case 'attack':
        return 'Attack';
        break;
      case 'defense':
        return 'Defense';
        break;
      case 'hp':
        return 'HP';
        break;
      case 'spAttack':
        return 'SP Attack';
        break;
      case 'spDefense':
        return 'SP Defense';
        break;
      case 'speed':
        return 'Speed';
        break;
      case 'weight':
        return 'Weight';
        break;
      case 'totalMoves':
        return 'Total moves';
      default:
        return str.charAt(0).toUpperCase() + str.slice(1);
        break;
    }
  }
});
export default BigCard;
