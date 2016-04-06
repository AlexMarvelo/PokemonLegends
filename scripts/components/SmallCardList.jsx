import React from 'react';
import SmallCard from './SmallCard.jsx';

const SmallCardList = React.createClass({
  render: function() {
    var smallCardsList = [];
    var pokemons = this.props.pokemons;
    for (var i = 0; i < pokemons.length; i++) {
      smallCardsList.push(<SmallCard pokemon={pokemons[i]} key={pokemons[i].id}/>);
    }
    return (<div>{smallCardsList}</div>);
  }
});
export default SmallCardList;
