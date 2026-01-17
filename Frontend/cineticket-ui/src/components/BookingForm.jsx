import api from "../api/axios";

export default function BookingForm(){
  const book=()=>{
    api.post("/bookings",{
      movieId:1,
      customerName:"Guest",
      tickets:2
    });
    alert("Booked");
  };

  return <button onClick={book}>Book Ticket</button>;
}
