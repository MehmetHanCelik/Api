import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, refreshPosts } from './redux/postsSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { data, page, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts(1));
    }, [dispatch]);

    const loadMore = () => {
        if (!loading) {
            dispatch(fetchPosts(page));
        }
    };

    const handleRefresh = () => {
        dispatch(refreshPosts());
        dispatch(fetchPosts(1));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Api Örneği</Text>
            <Text style={styles.subtitle}>Aşşağiya kaydirarak özelliğin çaliştiğini görebilirsiniz.</Text>


            <TouchableOpacity style={styles.button} onPress={handleRefresh}>
                <Text style={styles.buttonText}>🔄Yenile</Text>
            </TouchableOpacity>


            {loading && data.length === 0 ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text>{item.body}</Text>
                        </View>
                    )}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={loading}
                    onRefresh={handleRefresh}
                    ListFooterComponent={loading ? <ActivityIndicator size="large" color="#007bff" /> : null}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    post: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
});

export default HomeScreen;
