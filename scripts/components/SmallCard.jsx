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
        <div className='chip chip_padded' key={pokemon.types[i]}>
          {pokemon.types[i].charAt(0).toUpperCase() + pokemon.types[i].slice(1)}
        </div>
      );
    }
    return (
      <div className="col-sm-4 {display}">
        <a href = "#" onClick={this.showBigCard}>
          <div className='mdl-card mdl-shadow--4dp mdl-card_sized'>
            <div className='mdl-card__media mdl-card__media_background-white'>
              <img src={image} alt='Pokemon' className='card_image'/>
            </div>
            <div className='mdl-card__title mdl-card__title_centered'>
              <h2 className='mdl-card__title-text'>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
            </div>
            <div className='card_labels'>
              {types}
            </div>
          </div>
        </a>
      </div>
    );
  }
});
export default SmallCard;
