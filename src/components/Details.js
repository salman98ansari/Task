import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Loader from "./Loader";



const Details = ({location}) => {
    const history = useHistory();
    const [details , setdetails] = useState([]);
    const [isLoading , setisLoading] = useState(true);
    const [postdata , setpostdata] = useState([]);

    const fetchDetails = async()=> {
        await axios
        .get(`https://jsonplaceholder.typicode.com/comments/?postId=` + location.state.postId)
        .then(response => {
            setdetails(response.data);
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
            fetchDetails();
            setpostdata(location.state.postdata);
        }
    },[])


    return (
        <section className="bg-light">
        <div className="container">
        {isLoading ? <Loader/>
        :(
            <>
            <h2 className="text-center mb-3">Comments</h2>
            <div className="row g-4">
            {details.map(detail => (
                <div className="col-md-8 mx-auto" key={detail.id}>
                <div className="card" >
                    <div className="card-body">
                        <h6 className='card-title text-center'>
                        Post ID : {detail.postId}
                        </h6>
                        <h6 className='card-title text-center'>
                        Post Title : {postdata.title}
                        </h6>
                        <div className="h1 text-center">
                                <i className="bi bi-card-heading"></i>
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
            </>
        )}
        </div>
        </section>
    )
}

export default Details
