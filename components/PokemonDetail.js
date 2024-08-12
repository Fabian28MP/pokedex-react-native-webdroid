import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PokemonDetail = ({ pokemon }) => {
  if (!pokemon) return null;

  return (
    <LinearGradient
      colors={['#ffffff', '#e0e0e0']}
      style={styles.pokemonDetail}
    >
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.pokemonDetailImage} />
      <Text style={styles.pokemonDetailText}>Name: {pokemon.name}</Text>
      <Text style={styles.pokemonDetailText}>Type: {pokemon.types.map(type => type.type.name).join(', ')}</Text>
      <Text style={styles.pokemonDetailText}>Height: {pokemon.height}</Text>
      <Text style={styles.pokemonDetailText}>Weight: {pokemon.weight}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  pokemonDetail: {
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  pokemonDetailImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  pokemonDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PokemonDetail;
