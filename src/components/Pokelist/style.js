import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    pokemonContainer: {
        width: "100%",
        height: "100%",
        flex: 1
    },
    pokeSearch: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: 10
    },
    inputPokemon: {
        width: "90%",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#cdcde6",
        padding: 8,
        marginBottom: 25
    },
    infos: {
        alignItems: "center",
    },
    imgContainer: {
        margin: 0,
        flex: 1
    },
    logo: {
        marginTop: 20,
        height: 120,
        width: 340
    }
})

export default styles