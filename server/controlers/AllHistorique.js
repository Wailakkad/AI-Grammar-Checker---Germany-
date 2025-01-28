const Historique = require("../db/models/Historique.js");
const User = require("../db/models/User.js");


const UserSaving = async (req , res)=>{
    const { user_id } = req.body;
    try{
        const user = await User.findById(user_id);
        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        const SavingUser = await Historique.find({user_id : user_id})
        if(SavingUser.length === 0){
            return res.status(404).json({ message: "No historique records found for this user" });

        }

        return res.status(200).json({ message: "Historique fetched successfully", data: SavingUser });


    }catch(err){
        res.status(500).json({message : err})
    }

}

module.exports = UserSaving;