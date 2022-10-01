import React, { useEffect, useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutForm = ({ currentID, setCurrentID }) => {
  const [workoutData, setWorkoutData] = useState({
    title: '',
    load: 0,
    reps: 0,
    km: 0,
    heartrate: 0,
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
        load: 0,
        reps: 0,
        km: 0,
        heartrate: 0,
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

  useEffect(() => {
    if (!currentID) {
      setWorkoutData({
        title: '',
        load: 0,
        reps: 0,
        km: 0,
        heartrate: 0,
      });
    }
  }, [currentID]);

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
        min={0}
        type="number"
        onChange={(e) =>
          setWorkoutData({ ...workoutData, load: e.target.value })
        }
        value={workoutData.load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label>Reps: </label>
      <input
        min={0}
        type="number"
        onChange={(e) =>
          setWorkoutData({ ...workoutData, reps: e.target.value })
        }
        value={workoutData.reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <label>Km: </label>
      <input
        min={0}
        type="number"
        onChange={(e) => setWorkoutData({ ...workoutData, km: e.target.value })}
        value={workoutData.km}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <label>Heart Rate: </label>
      <input
        min={0}
        type="number"
        onChange={(e) =>
          setWorkoutData({ ...workoutData, heartrate: e.target.value })
        }
        value={workoutData.heartrate}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <button>{!currentID ? 'Add Workout' : `Edit`}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
