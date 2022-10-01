import { useWorkoutContext } from '../hooks/useWorkoutContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout, setCurrentID }) => {
  const handleClickTitle = () => {
    setCurrentID(workout._id)
  }
  const { dispatch } = useWorkoutContext();
  const handleClick = async () => {
    setCurrentID('')
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };
  return (
    <div className="workout-details">
      <div onClick={handleClickTitle}>
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kq): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          <strong>Km: </strong>
          {workout.km}
        </p>
        <p>
          <strong>Heartrate: </strong>
          {workout.heartrate}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
