import React, { useEffect, useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutForm = ({ currentID, setCurrentID }) => {
  const [workoutData, setWorkoutData] = useState({
    title: '',
    load: '',
    reps: ''
  });
  const { workouts, dispatch } = useWorkoutContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const workout = currentID
    ? workouts.find((workout) => workout._id === currentID)
    : null;

    useEffect(() => {
      if (workout) {
        setWorkoutData(workout);
      }
    }, [workout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { ...workoutData };
    let response = null;
    if (!currentID) {
      response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      response = await fetch('/api/workouts/' + currentID, {
        method: 'PATCH',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setWorkoutData({
        title: '',
        load: '',
        reps: '',
      });
      setError(null);
      if (!currentID) {
        dispatch({ type: 'CREATE_WORKOUT', payload: json });
        console.log('new workout added', json);
      } else {
        setCurrentID(null);
        console.log(workouts);
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      }
    }
  };



  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{!currentID ? 'Add a New Workout' : `Edit ${workoutData.title}`}</h3>
      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(e) =>
          setWorkoutData({ ...workoutData, title: e.target.value })
        }
        value={workoutData.title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={(e) =>
          setWorkoutData({ ...workoutData, load: e.target.value })
        }
        value={workoutData.load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) =>
          setWorkoutData({ ...workoutData, reps: e.target.value })
        }
        value={workoutData.reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <button>
        {!currentID ? 'Add Workout' : `Edit`}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
