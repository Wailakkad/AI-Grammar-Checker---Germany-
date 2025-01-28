const Historique = require("../db/models/Historique.js");
const User = require("../db/models/User.js");



const FetchCount = async(req , res)=> {
      const {user_id} = req.params;
      try{
        const user = await User.findById(user_id);
        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        const CountCorrection = await Historique.find({user_id : user_id}).countDocuments();
        if(!CountCorrection){
            return res.status(404).json({message : "No correction found"});
        }
        res.status(200).json({CountCorrection : CountCorrection});

      }catch(error){
        res.status(500).json({message : "Error fetching count" })
      }
}


const EditInfo = async (req, res)=>{
    const {user_id} = req.params;
    const userData = req.body;
    try{
        const user = await User.findByIdAndUpdate(user_id, userData, { new: true });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });

    }catch(err){
        res.status(500).json({message : "Error fetching user" })
    }

}

module.exports = {FetchCount , EditInfo};