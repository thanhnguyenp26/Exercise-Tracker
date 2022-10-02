import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext"



export const useLogout=() => {
    const {dispatch: workoutDispatch} = useWorkoutContext()
    const {dispatch} = useAuthContext()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch log out action
        dispatch({type: 'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUTS', payload:null})
    }
    return {logout}
}