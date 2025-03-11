import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const AppLogo = React.memo(() => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.5,
        height: height * 0.2,
        resizeMode: 'contain',
    },
});

export default AppLogo;
