import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";



const Details = ({location}) => {
    const history = useHistory();
    console.log(location.state);
    const [details , setdetails] = useState([]);

    const fetchDetails = async()=> {
        await axios
        .get(`https://jsonplaceholder.typicode.com/comments/?postId=` + location.state.postId)
        .then(response => {
            console.log(response.data);
            setdetails(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        if(location.state == undefined){
            history.push('/');
        }
        else{
            fetchDetails();
        }
    },[])

    return (
        <section className="bg-light">
        <div className="container">
            <h2 className="text-center">Comments</h2>
            {details.map(detail => (
                <div className="card m-3" key={detail.id}>
                    <div className="card-body">
                        <h6 className='card-title'>
                        Post ID : {detail.postId}
                        </h6>
                        <h6>
                        Name : {detail.name}
                        </h6>
                        <h6 className="card-title">
                        Email : {detail.email}
                        </h6>
                        <h6 className="card-title">
                        Comment : {detail.body}
                        </h6>
                        {/* <Button
                        // onClick={()=> history.push('/details' , {postId:posts.id})}
                        // onClick={()=> console.log(users.id)}
                        variant="contained" color="primary"
                        >
                            Details
                        </Button> */}
                    </div>   
                </div>
            ))

            }

        </div>
        </section>
    )
}

export default Details
