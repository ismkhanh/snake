import "react-native-gesture-handler";
import Game from './src/components/Game';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Game />
      </GestureHandlerRootView>
    </SafeAreaProvider>
    
  );
};

export default App;
