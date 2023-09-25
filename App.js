import { StyleSheet, View} from 'react-native';
import Pokelist from './src/components/Pokelist';
import FontLoader from './src/components/FontLoader';


export default function App() {
  return (
    <FontLoader>
      <View style={styles.container}>
            <Pokelist style={styles.pokelist}></Pokelist>
      </View>
    </FontLoader> 
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
