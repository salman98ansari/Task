import React , {useState , useEffect} from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';



const Posts = ({location}) => {
    const history = useHistory();
    const [postData , setpostData] =  useState([]);
    // const [userData , setuserData] = useState([location != undefined ? location.state.userdata : ""]);
    const [userData , setuserData] = useState([]);

    const fetchPost = async ()=>{
        await axios
        .get(`https://jsonplaceholder.typicode.com/posts/?userId=` + location.state.userId)
        .then(response => {
            setpostData(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    // conditon to avoid direct access of page via url cause page contain specific 
    // post id to render data accordingly
    useEffect(()=>{
        if(location.state == undefined){
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
            <h2 className="text-center">Posts</h2>
            {postData.map(posts => (
                <div className="card m-3" key={posts.id}>
                    <div className="card-body">
                        <h6 className='card-title'>
                        UserId : {posts.userId}
                        </h6>
                        <h6>
                        Name : {userData.name}
                        </h6>
                        <h6 className="card-title">
                        Title : {posts.title}
                        </h6>
                        <h6 className="card-title">
                        Body : {posts.body}
                        </h6>
                        <Button
                        onClick={()=> history.push('/details' , {postId:posts.id})}
                        // onClick={()=> console.log(users.id)}
                        variant="contained" color="primary"
                        >
                            Details
                        </Button>
                    </div>   
                </div>
            ))

            }
        </div>
        </section>
    )
}

export default Posts;
