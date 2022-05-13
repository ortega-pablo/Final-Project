import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store