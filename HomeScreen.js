import React from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './redux/postsSlice';
import { Linking } from 'react-native';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.posts);

    return (
        <View style={styles.container}>
            {/* Başlık ve Açıklama */}
            <Text style={styles.title}>Merhaba! Hoş Geldiniz 🎮</Text>
            <Text style={styles.description}>
                Aşağıdaki butonu kullanarak Steam ana sayfasına gidebilir veya verileri yenileyebilirsiniz.
            </Text>

            {/* Steam'e Git Butonu */}
            <Button title="Steam'e Git" color="green" onPress={() => Linking.openURL('https://store.steampowered.com')} />

            {/* Verileri Yenile Butonu */}
            <Button title="Verileri Yenile" color="blue" onPress={() => dispatch(fetchPosts())} />

            {/* Yükleniyor Göstergesi */}
            {loading && <ActivityIndicator size="large" color="blue" />}

            {/* Hata Mesajı */}
            {error && <Text style={styles.error}>{error}</Text>}

            {/* API'den Gelen Verileri Listele */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text>{item.body}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    item: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    postTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default HomeScreen;
