import {useEffect,useState} from "react";
import api from "../api/axios";

export default function BookingList(){
  const [data,setData]=useState([]);

  useEffect(()=>{
    api.get("/bookings").then(r=>setData(r.data));
  },[]);

  return data.map(b=>(
    <div className="card" key={b.id}>
      {b.customerName} | {b.movie.title} | {b.tickets} | {b.status}
    </div>
  ));
}
