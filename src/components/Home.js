import React , {useState , useEffect} from 'react'
import { Button } from '@material-ui/core';
import axios from "axios";
import { useHistory } from "react-router-dom";

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
            <h2 className="text-center">All Users</h2>
            {userData.map(users => (
                <div className="card m-3" key={users.id}>
                    <div className="card-body">
                        <h6 className="card-title">
                        Name : {users.name}
                        </h6>
                        <h6 className="card-title">
                        Username : {users.username}
                        </h6>
                        <h6 className="card-title">
                        Emails : {users.email}
                        </h6>
                        <Button
                        onClick={()=> history.push('/posts' , {userId:users.id , userdata : users})}
                        // onClick={()=> console.log(users.id)}
                        variant="contained" color="primary"
                        >
                            Users Post
                        </Button>
                    </div>   
                </div>   
            ))
            }
            
        </div>
        </section>
    )
}

export default Home;
