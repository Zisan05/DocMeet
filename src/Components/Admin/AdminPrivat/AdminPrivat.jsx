import { Navigate } from "react-router-dom";

const AdminPrivat = ({children}) => {

    const Atoken = localStorage.getItem('Doctor Access token');

    if(Atoken === null ){
        return <Navigate state={location.pathname} to = {'/doctor-panel-side-access-login'}></Navigate>;
     }

     if(Atoken){
        return children;
     }


    return (
        <div>
            
        </div>
    );
};

export default AdminPrivat;