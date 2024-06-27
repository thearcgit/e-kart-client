import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";

function Protected({children}) {
    const user = useSelector(state => state.auth.loggedInUserToken)
    // const user = useSelector(selectUser)
    if(!user){
        return <Navigate to="/login" replace={true}/>
    }
    return children
}

export default Protected;