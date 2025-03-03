import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from './HomeScreen';

const App = () => {
    return (
        <Provider store={store}>
            <HomeScreen />
        </Provider>
    );
};

export default App;
