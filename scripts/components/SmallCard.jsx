import React from 'react';
import BigCard from './BigCard.jsx';
import ReactDOM from 'react-dom';

const SmallCard = React.createClass({
  showBigCard: function(event){
    event.preventDefault();
    var pokemon = this.props.pokemon;
    ReactDOM.render(
      <BigCard pokemon={pokemon}/>, document.getElementById('bigCard__container')
    );
  },

  render: function() {
    var types = [];
    var pokemon = this.props.pokemon;
    var image = pokemon.image.src;
    for (var i = 0; i < pokemon.types.length; i++) {
      types.push(
        <li className="card__lable" key={pokemon.types[i]}>
          {pokemon.types[i].charAt(0).toUpperCase() + pokemon.types[i].slice(1)}
        </li>
      );
    }
    return (
      <li className="col-sm-4">
        <div className="card card_small" onClick={this.showBigCard}>
          <div className="card__imgCont">
            <img
              src={image}
              className="card__img"
              alt={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}/>
          </div>
          <h3 className="card__title">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h3>
          <ul className="card__lables">
            {types}
          </ul>
        </div>
      </li>
    );
  }
});
export default SmallCard;
