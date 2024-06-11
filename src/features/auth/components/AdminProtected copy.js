import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";

function AdminProtected({children}) {
    const user = useSelector(state => state.auth.loggedInUser)
    // const user = useSelector(selectUser)
    if(!user){
        return <Navigate to="/login" replace={true}/>
    }
    if(user && user.role !== "admin"){
        return <Navigate to="/" replace={true}/>
    }
    return children
}

export default AdminProtected;