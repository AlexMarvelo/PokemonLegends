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
          <tr key={this.beautifyText(variable)}>
            <td className='mdl-data-table__cell--non-numeric'>
              {this.beautifyText(variable)}
            </td>
            <td>
              {pokemon[variable]}
            </td>
          </tr>
        )
      }
    }
    return (
      <div className='mdl-card mdl-shadow--4dp bigCard'>
        <div className='mdl-card__title'>
          <img src={image} alt='Pokemon' className='bigCard__img'/>
        </div>
        <h2 className='mdl-card__title-text'>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h2>
        <div className='mdl-card__supporting-text'>
          <table className='mdl-data-table mdl-js-data-table'>
            <thead>
              <tr>
                <th className='mdl-data-table__cell--non-numeric'>Type</th>
                <th className='mdl-data-table__cell--non-numeric'>Value</th>
              </tr>
            </thead>
            <tbody>
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
