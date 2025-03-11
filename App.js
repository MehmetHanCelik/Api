import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SafeAreaView, StyleSheet, StatusBar, View, Animated } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import AppLogo from "./src/components/AppLogo";

const App = () => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;


    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Provider store={store}>
            <>
                <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
                <SafeAreaView style={styles.container}>

                    <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                        <AppLogo />
                    </Animated.View>


                    <View style={styles.contentContainer}>
                        <HomeScreen />
                    </View>
                </SafeAreaView>
            </>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
});

export default App;
