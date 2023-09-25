import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Pokemon-Font': require('../../assets/fonts/Ketchum.otf'), // Substitua "nome-da-fonte-local" pelo nome do seu arquivo de fonte local
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // ou renderize algo enquanto aguarda o carregamento da fonte
  }

  return children;
};

export default FontLoader;
