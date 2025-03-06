import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";


const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <HomeScreen />
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
