import React, { useState } from 'react';
import { useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const [currentID, setCurrentID] = useState('');
  const { workouts, dispatch, query } = useWorkoutContext();
  const {user} = useAuthContext()
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };
    if(user) {
      fetchWorkouts();

    }

  }, [dispatch, query, user]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts && 
          workouts 
            .filter((workout) => workout.title.toLowerCase().includes(query))
            .map((workout) => (
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
