import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Función para capitalizar solo la primera letra del nombre
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const PokemonItem = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity style={styles.pokemonItem} onPress={onPress}>
      <LinearGradient
        colors={['#f9d423', '#ff4e50']}
        style={styles.gradient}
      >
        <Image source={require('../assets/pokeball.png')} style={styles.pokeball} />
        <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
        <Text style={styles.pokemonName}>{capitalizeFirstLetter(pokemon.name)}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokemonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  pokeball: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PokemonItem;
