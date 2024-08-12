import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, Image } from 'react-native';
import PokemonItem from './components/PokemonItem';
import PokemonDetail from './components/PokemonDetail';
import { fetchPokemonList, fetchPokemonDetails } from './api';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const { results, next } = await fetchPokemonList(20, offset);
    const detailedPokemons = await Promise.all(
      results.map(async (pokemon) => {
        const details = await fetchPokemonDetails(pokemon.url);
        return {
          id: details.id.toString(),
          name: details.name,
          image: details.sprites.front_default,
          types: details.types.map((type) => type.type.name).join(', '),
          height: details.height,
          weight: details.weight,
          url: pokemon.url,
        };
      })
    );
    setPokemonList(prevList => [...prevList, ...detailedPokemons]);
    setOffset(prevOffset => prevOffset + 20);
    setLoadingMore(false);
    setHasMore(!!next);
    setLoading(false);
  };

  const handleSelectPokemon = async (pokemon) => {
    const details = await fetchPokemonDetails(pokemon.url);
    setSelectedPokemon(details);
  };

  const filteredPokemons = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Image source={require('./assets/pokemon_logo.png')} style={styles.logo} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokémon"
        value={search}
        onChangeText={text => setSearch(text)}
        placeholderTextColor="#999"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredPokemons}
          renderItem={({ item }) => (
            <PokemonItem pokemon={item} onPress={() => handleSelectPokemon(item)} />
          )}
          keyExtractor={(item) => item.id}
          onEndReached={loadPokemon}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
          style={styles.list}
        />
      )}
      <PokemonDetail pokemon={selectedPokemon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Softer background color
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 45,
    borderColor: '#b0bec5',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    color: '#333',
    fontSize: 16,
  },
  list: {
    marginBottom: 20,
  },
});
