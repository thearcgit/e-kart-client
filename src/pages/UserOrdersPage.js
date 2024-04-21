import UserOrders from "../features/user/components/UserOrders"
import Navbar from "../features/navbar/Navbar"

const UserOrdersPage = () => {
    return (
      <div>
        <Navbar>
  
          <UserOrders />
        </Navbar>
        
      </div>
    )
  }
  
  export default UserOrdersPage