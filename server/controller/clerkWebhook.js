import { use } from "react";
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async()=>{
    try {
        // Creer une instance Svix avec clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
        // recuperer les headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };
        // verifier les heades
        await whook.verify(JSON.stringify(req.body), headers);

        // recuperer les données depuis le body de la requete
        const {data, type} = req.body;
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first-name + " " + data.last_name,
            Image: data.profile_image_url,
        }
        
        // switch pour traiter les différents types d'événements
        switch (type) {
            case "user.created":{
                await User.create(userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
        res.json({success:true, message:"Webhook Recieved"}) 

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

export default clerkWebhooks;