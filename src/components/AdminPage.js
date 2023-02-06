import React, { useEffect, useState} from "react";

const AdminPage = () => {
    const [password, setPassword] = useState('');
    useEffect(() => {
        if(password !== "admin"){
            setPassword(prompt("Password: "));
            console.log(password.current);
        }
    },[])
  return (            
        password === "admin" ? (<div>from admin page</div>) : (<div>invalid password {password}</div>)
    );
};

export default AdminPage;
