const express = require("express");
const app = express();
app.use(express.json());

let roomStatus = [];
let customers = [];
let cusAdditional = [];

app.get("/", (req, res) => {

    const htmlContent =
        `
    <h1>NODE JS HALL BOOKING TASK</h1>
    <h4>1)API ENDPOINT TO CREATE NEW ROOM ==> "/create/room"</h4>
    <p>SCHEMA:
    {
        "room_id":"101",
        "no_of_seats":50,
        "amenities":"AC",
        "price/hr":"500-rs"
    }
    </p>
    <h4>2)API ENDPOINT TO BOOK A ROOM ==> "/book/room"</h4>
    <P>SCHEMA:
    {
        "customer_name":"veera",
        "date":"12-12-2023",
        "start_time":"10.00AM",
        "end_time":"5.00PM",
        "room_id":"101"
    }
    </p>
    <h4>3)API ENDPOINT TO LIST ALL THE ROOM WITH BOOKED DATE ==> "/rooms"</h4>
    <h4>4)API ENDPOINT TO LIST ALL CUSTOMERS ==> "/customers"</h4>
    <h4>5)API ENDPOINT TO LIST ALL THE CUSTOMERS WITH EXTRA INFO ==> "/customers/extra"</h4>
    `
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
});


app.post("/create/room", (req, res) => {
    const room = req.body;
    room.booking_status = "available";
    roomStatus.push(room);
    res.send(`New room with room id of ${room.room_id}=>${room.amenities} is created`);
});

app.post("/book/room", (req, res) => {
  
    const customer = {...req.body};
    (function(){
        let result = customers.find((cus)=>cus.room_id == customer.room_id && cus.date == customer.date);
        if(result == undefined){
            customers.push(customer);
            let extraDetail = {...req.body};
            extraDetail.booking_id = cusAdditional.length + 1;
        
            const currentDate = new Date();
            extraDetail.booking_date = currentDate;
        
            extraDetail.booking_status = "success";
        
            cusAdditional.push(extraDetail);
        
            res.send(`your booking of room no ${customer.room_id} is booked for ${customer.customer_name} on ${customer.date}`);
        }
        else{
            res.send("room is booked already")
        }
    })();
    

    (function(){
        let id = customer.room_id;
        let index = roomStatus.findIndex((room)=>room.room_id==id);
        if(index >= 0){
            roomStatus[index].booking_status="NOT AVAILABLE";
        }
    })();

});

app.get("/rooms", (req, res) => {
    res.json(roomStatus);
});

app.get("/customers", (req, res) => {
    res.json(customers);
});

app.get("/customers/extra", (req, res) => {
    res.json(cusAdditional);
});

app.listen(4005);