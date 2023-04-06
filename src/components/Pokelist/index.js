import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, Image, TextInput, ScrollView } from "react-native"
import styles from "./style";

export default function Pokelist() {

    const primeiro = Math.floor(Math.random() * (1000 - 1 + 1)) + 1

    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [randomPokemonId, setRandomPokemonId] = useState(primeiro)
    const [guess, setGuess] = useState("")

    const getRandomInt = () => {
        const pokemonId = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

        setRandomPokemonId(pokemonId)
        console.log("randomInt: " + randomPokemonId)
    }

    useEffect(() => {
        getPokemonData()
    }, [])

    const getPokemonData = () => {
        getRandomInt()
        const target = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`
        
        fetch(target)
            .then(response => response.json())
            .then(json => {
                const pokemon = {
                    name: json.name,
                    img: json.sprites.other["official-artwork"].front_default,
                    weight: json.weight,
                }

                setSelectedPokemon(pokemon)

                console.log(pokemon)
            })
            .catch(() => {
                Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon')
            });
    }

    const playPokemon = (PG) => {
        const playerGuess = PG;

        if(playerGuess == selectedPokemon.name) {
            Alert.alert('Ganhador', 'Parabéns! Você acertou!')
            getPokemonData()
            setGuess("")
        } else {
            Alert.alert('Tente novamente', 'Você errou!')
            setGuess("")
        }
    }
    
    return (
        <View style={styles.pokemonContainer}>
            <ScrollView>
                <Text style={styles.mainText}>Pokedex</Text>
                <Text style={styles.mainText}>Quem é esse Pokemon?</Text>
                <View style={styles.infos}>
                    { selectedPokemon != null && (
                        <View style={styles.imgContainer}>
                            <Image resizeMode="stretch" source={{uri:selectedPokemon.img}} style={{width: 250, height: 250}}/>
                        </View>
                    )}
                </View>
                
                <View style={styles.pokeSearch}>
                    <Text style={styles.mainText}>Palpite:</Text>
                        <TextInput
                        style={styles.inputPokemon}
                        onChangeText={setGuess}
                        value={guess}
                        autoCapitalize="none"
                        placeholderTextColor="#5a5a73"
                        />
                    <Button title="Enviar" onPress={() => playPokemon(guess)}/>
                </View>    
            </ScrollView>                
        </View>
    )
}