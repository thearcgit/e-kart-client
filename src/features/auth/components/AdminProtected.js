import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
import { selectUserInfo } from "../../user/userSlice";

function AdminProtected({children}) {
    const user = useSelector(state => state.auth.loggedInUserToken)
    const userInfo = useSelector(selectUserInfo)
    // const user = useSelector(selectUser)
    if(!user){
        return <Navigate to="/login" replace={true}/>
    }
    if(user && userInfo.role !== "admin"){
        return <Navigate to="/" replace={true}/>
    }
    return children
}

export default AdminProtected;