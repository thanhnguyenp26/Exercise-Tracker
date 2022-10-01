import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        ...state, workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        ...state, workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        ...state, workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    case 'UPDATE_WORKOUT':
      return {
        ...state, workouts: state.workouts.map(
          (workout) => workout._id !== action.payload._id? workout: action.payload
        ),
      };
    case 'SEARCH_WORKOUT':
      return {...state, query: action.payload}
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  // dynamic state
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
    query: null
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
