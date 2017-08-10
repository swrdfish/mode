import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'



export const actionTypes = {
  DRAWER_TOGGLE: 'DRAWER_TOGGLE'
};


const defaultInitialState = {
  drawer_open: false
};


// REDUCERS
export const reducer = (state = defaultInitialState, action) => {
	switch (action.type) {
		case actionTypes.DRAWER_TOGGLE:
			return Object.assign({}, state, { drawer_open: !state.drawer_open})
		default: return state
	}
}


// ACTIONS
export const toggleDrawer = () => dispatch => {
	return dispatch({ type: actionTypes.DRAWER_TOGGLE})
}



export const initStore = (initialState = defaultInitialState) => {
	return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}