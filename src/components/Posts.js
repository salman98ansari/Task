import React , {useState , useEffect} from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import Loader from './Loader';



const Posts = ({location}) => {
    const history = useHistory();
    const [postData , setpostData] =  useState([]);
    // const [userData , setuserData] = useState([location != undefined ? location.state.userdata : ""]);
    const [userData , setuserData] = useState([]);
    const[isLoading , setisLoading] = useState(true);

    const fetchPost = async ()=>{
        await axios
        .get(`https://jsonplaceholder.typicode.com/posts/?userId=` + location.state.userId)
        .then(response => {
            setpostData(response.data);
            setisLoading(false);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    // conditon to avoid direct access of page via url cause page contain specific 
    // post id to render data accordingly
    useEffect(()=>{
        if(location.state === undefined){
            history.push('/');
        }
        else{
            fetchPost();
            setuserData(location.state.userdata);
        }
    },[])

    return (
        <section className="bg-light">
        <div className="container">
        {isLoading ? <Loader /> 
        :(
            <>
            <h2 className="text-center mb-3">Posts</h2>
            <div className="row g-4">
            {postData.map(posts => (
                <div className="col-md-6">
                <div className="card text-center bg-secondary text-light" key={posts.id}>
                    <div className="card-body">
                        <div class="h1">
                              <i class="bi bi-card-heading"></i>
                        </div>
                        <h6 className='card-title'>
                        Sr No : {posts.id}
                        </h6> 
                        <h2 className="card-title">
                        {posts.userId} : {userData.name}
                        </h2>
                        <p className="card-title lead">
                        Title : {posts.title}
                        </p>
                        <p className="card-body">
                        Description : {posts.body}
                        </p>
                        <Button
                        onClick={()=> history.push('/details' , {postId:posts.id})}
                        variant="contained" color="primary"
                        >
                            See Post Comments
                        </Button>
                    </div>   
                </div>
                </div>
            ))
            }
            </div>
            </>
        )}
        </div>
        </section>
    )
}

export default Posts;
