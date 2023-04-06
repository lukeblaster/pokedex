import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Pokelist from './src/components/Pokelist';

export default function App() {
  return (
    <View style={styles.container}>
      <Pokelist style={styles.pokelist}></Pokelist>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62ace6',
    paddingTop: "15%",
    paddingLeft: 15,
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  pokelist: {
    width: "100%",
    height: "100%"
  }
});
