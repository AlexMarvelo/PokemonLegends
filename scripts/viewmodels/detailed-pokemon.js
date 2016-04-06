export default class DetailedPokemon {
  constructor(id, name, image, types, attack, defense, hp, spAttack, spDefense, speed, weight, totalMoves) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.types = types;
    this.attack = attack;
    this.defense = defense;
    this.hp = hp;
    this.spAttack = spAttack;
    this.spDefense = spDefense;
    this.speed = speed;
    this.weight = weight;
    this.totalMoves = totalMoves;
  }
}
