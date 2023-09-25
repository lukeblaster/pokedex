import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, Image, TextInput, ScrollView } from "react-native"
import styles from "./style";
import * as Font from 'expo-font';
import { StyleSheet } from "react-native"

async function loadFonts() {
    await Font.loadAsync({
        'Pokemon-Font': require('../../../assets/fonts/Ketchum.otf'),
    });
}

export default function Pokelist() {

    // Carrega as fontes
    useEffect(() => {
        loadFonts();
    }, []);
    
    // Define as principais variáveis da aplicação com useState
    const primeiro = Math.floor(Math.random() * (578 - 1 + 1)) + 1
    const [points, setPoints] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [randomPokemonId, setRandomPokemonId] = useState(primeiro)
    const [guess, setGuess] = useState("")

    // Funções das regras de jogo
    const getRandomInt = () => {
        const pokemonId = Math.floor(Math.random() * (578 - 1 + 1)) + 1;

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
                }

                setSelectedPokemon(pokemon)

                console.log(pokemon)
            })
            .catch(() => {
                Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon')
            });
    };

    // Função que inicia o game
    const playPokemon = (PG) => {
        const playerGuess = PG;

        if(playerGuess !== selectedPokemon.name) {
            endGame()
        } else {
            increasePoints()
        }
        
        setGuess("")
        getPokemonData()
    }

    const increasePoints = () => {
        setPoints(points + 1)
    }

    const endGame = () => {
        // Verificar e atualizar o recorde, se necessário
        if (points + 1> highScore) {
            setHighScore(points);
        }

        Alert.alert(
          'Fim do jogo!',
          `Você marcou ${points} pontos.\n`
        );
        
        // Reinicia o jogo
        setPoints(0);
    };

    return (
        <View style={styles.pokemonContainer}>
            <ScrollView>
                <View style={styles.infos}>
                    <Image style={styles.logo} source={require('../../images/logo.png')} />
                        <Text style={styles_text_font.recordText}>Recorde: {highScore}</Text>
                        <Text style={styles_text_font.pointsText}>Pontuação: {points}</Text>
                        <Text style={styles_text_font.fontText}>Quem é esse Pokemon?</Text>
                    {selectedPokemon != null && (
                        <View style={styles.imgContainer}>
                            <Image resizeMode="stretch" source={{ uri: selectedPokemon.img }} style={{ width: 250, height: 250 }} />
                        </View>
                    )}
                </View>

                <View style={styles.pokeSearch}>
                    <Text style={styles_text_font.fontText}>Palpite</Text>
                    <TextInput
                        style={styles.inputPokemon}
                        onChangeText={setGuess}
                        value={guess}
                        autoCapitalize="none"
                        placeholderTextColor="#5a5a73"
                    />
                    <Button title="Enviar" fontFamily style={styles_text_font.button} onPress={() => playPokemon(guess)} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles_text_font = StyleSheet.create({
    fontText: {
        textAlign: "center",
        fontSize: 28,
        color: "#fff",
        padding: 15,
        paddingTop: 25,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontFamily: 'Pokemon-Font'
    },
    pointsText: {
        textAlign: "center",
        fontSize: 25,
        color: "#3B4CCA",
        paddingTop: 10,
        textShadowColor: 'rgba(255, 255, 255, 0.30)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontFamily: 'Pokemon-Font'
    },
    recordText: {
        textAlign: "center",
        fontSize: 25,
        color: "#FFDE00",
        textShadowColor: 'rgba(255, 255, 255, 0.30)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontFamily: 'Pokemon-Font'
    }
  });
