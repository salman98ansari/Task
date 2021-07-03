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
            <h2 className="text-center mb-3">Comments</h2>
            <div className="row g-4">
            {details.map(detail => (
                <div className="col-md-8 mx-auto">
                <div className="card" key={detail.id}>
                    <div className="card-body">
                        <h6 className='card-title text-center'>
                        Post ID : {detail.postId}
                        </h6>
                        <div class="h1 text-center">
                              <i class="bi bi-card-heading"></i>
                        </div>
                        <h5 className="card-title">
                        Email : {detail.email}
                        </h5>
                        <p className="lead card-body">
                        Comment : {detail.body}
                        </p>
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

export default Details
