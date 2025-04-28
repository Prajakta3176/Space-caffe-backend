
import Order from "../models/order.js";
import User from "../models/user.js";

  export const placeOrder = async (req, res) => {
    try {
      const userid = req.headers["id"];
      const user = await User.findById(userid).populate("cart.food");
  
      if (!user || user.cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty or user not found" });
      }
  
      const orderItems = user.cart.map(item => ({
        food: item.food._id,
        quantity: item.quantity,
      }));
  
      const newOrder = new Order({
        user: userid,
        items: orderItems,
      });
  
      const savedOrder = await newOrder.save();
  
      // Clear cart after placing order
      user.cart = [];
      await user.save();
  
      res.status(200).json({ message: "Order placed successfully", orderId: savedOrder._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const getAllOrders = async(req,res)=>{
    try{

        const allOrders = await Order.find({}).populate('items.food', "id name price image category").populate('user',"fullname number email address id").sort({createdAt : -1});

        if(!allOrders){
            res.status(300).json({ message: "Failed to fetch orders" });
        }
        
        if(allOrders.length === 0){
            res.status(200).json({ message: "No orders yet" });
        }

        res.status(200).json(allOrders);

    }catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  export const viewEachOrder = async(req,res)=>{
    try{

        const orderid = req.headers['orderid'];
        const order = await Order.findById(orderid).populate('items.food', "id name price image category").populate('user',"fullname number email address id");

        if(!order){
            return res.status(400).json({message : "Order not found"})
        }

        res.status(200).json(order);
       
    }catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  export const updateOrderStatus = async(req,res)=>{
    try{

        const orderid = req.headers['orderid'];
        const {status} = req.body;
       
        if(!status){
            return res.status(400).json({ message: "Provide valid status" });
        }

        const updatedOrder =await Order.findByIdAndUpdate(orderid, {status : status}, {new: true})
        if(!updatedOrder){
            res.status(400).json({message : "Failed to update status"})
        }
        
        res.status(200).json({message : "Status updated successfully"})
       
    }catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  export const getOrderHistory = async(req,res)=>{
    try{

        const userid = req.headers['id'];

        if(!userid){
            res.status(400).json({ message: "user not found" });
        }

        // const history = await Order.filter((item) => item.user === userid)
        const history = await Order.find({user : userid}).populate('items.food').sort({createdAt : -1})
        if(!history){
            res.status(500).json({ message: "You haven' placed any order" });
        }
        console.log(history);
        res.status(200).json(history)
        
       
    }catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }