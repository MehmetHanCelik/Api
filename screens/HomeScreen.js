import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, resetPosts } from "../redux/postsSlice";
import i18n, { setLanguage } from '../i18n';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const { data, page, loading, error } = useSelector((state) => state.posts);

    const [currentLang, setCurrentLang] = useState(i18n.locale);

    useEffect(() => {
        dispatch(fetchPosts(1));
    }, [dispatch]);

    const loadMore = () => {
        if (!loading) {
            dispatch(fetchPosts(page));
        }
    };

    const handleRefresh = () => {
        dispatch(resetPosts());
        dispatch(fetchPosts(1));
    };

    const changeLanguage = (language) => {
        setLanguage(language);
        setCurrentLang(language);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{i18n.t("Hoşgeldiniz")}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage("tr")}>
                    <Text style={styles.buttonText}>Türkçe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage("en")}>
                    <Text style={styles.buttonText}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.langButton} onPress={() => changeLanguage("de")}>
                    <Text style={styles.buttonText}>German</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                <Text style={styles.buttonText}>{i18n.t("fetch_data")}</Text>
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
                    ListFooterComponent={loading ? <ActivityIndicator size="large" color="#007bff" /> : null}
                />
            )}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    langButton: {
        backgroundColor: "#28a745",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    refreshButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    post: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 10,
    },
});

export default HomeScreen;
