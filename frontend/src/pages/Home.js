import React, { useState } from 'react';
import { useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const [currentID, setCurrentID] = useState('')
  const { workouts, dispatch } = useWorkoutContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              setCurrentID={setCurrentID}
            ></WorkoutDetails>
          ))}
      </div>
      <WorkoutForm currentID={currentID} setCurrentID={setCurrentID} />
    </div>
  );
};

export default Home;
