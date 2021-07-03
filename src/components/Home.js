import React , {useState , useEffect} from 'react'
import { Button } from '@material-ui/core';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Avatar from "../img/img_avatar.png";

const Home = () => {

    const history = useHistory();
    const [userData, setuserData] = useState([]);

    const userFetching = async() => {
        console.log("run on useEffect");
        await axios
        .get(`https://jsonplaceholder.typicode.com/users`)
        .then((response)=>{
            setuserData(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        userFetching();
    },[])

    console.log(userData);

    return (
        <section className="bg-light">
        <div className="container">
            <h3 className="text-center">All Users</h3>
            <div className="row g-4">
            {userData.map(users => (    
                <div className="col-md-6 col-lg-4">
                <div className="card bg-dark text-light" key={users.id}>
                    <div className="card-body text-center">
                        <img src={Avatar}
                            style={{width:100}}  class="rounded-circle mb-3" alt=""></img>
                        <h3 className="card-title">
                        {users.name}
                        </h3>
                        <h5 className="card-title">
                        Username : {users.username}
                        </h5>
                        <p className="card-text">
                        Email : {users.email}
                        </p>
                        <Button
                        onClick={()=> history.push('/posts' , {userId:users.id , userdata : users})}
                        variant="contained" color="primary"
                        >
                            Users Post
                        </Button>
                    </div>   
                </div>
                </div>
                
            ))
            }
        </div>
            
        </div>
        </section>
    )
}

export default Home;
