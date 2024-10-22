const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");


// ADD TASK
router.post("/addTask", async (req, res) => {
    try {
        const {title, body, id} = req.body;
        const existingUser = await User.findById(id);

        if(existingUser){
            const list = new List({
                title,
                body,
                user: existingUser
            });
            await list.save().then(() => res.status(200).json({list}));
            existingUser.list.push(list);
            await existingUser.save();
        }
    } catch (error) {
        console.log(error);
    }
});

// UPDATE TASK
router.put("/updateTask/:id", async (req, res) => {
    try {
        const {title, body} = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, {title, body});
        list.save().then(() => res.status(200).json({message: "Updated Successfully"}));
 
    } catch (error) {
        console.log(error);
    }
});

// DELETE TASK
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const {id} = req.body;
        const existingUser = await User.findByIdAndUpdate(
            id,
            {$pull: {list: req.params.id}});

        if(existingUser){
            const list = await List.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).json({message: "Deleted Successfully"}));
        }
    } catch (error) {
        console.log(error);
    }
});

// GET TASKS
router.get("/getTask/:id", async (req, res) => {
    try {
        const list = await List.find({user:req.params.id}).sort({createdAt:-1});
        if(list.length !== 0)
        res.status(200).json({list});
        else
        res.status(200).json({message: "No Task"});
    } catch (error) {
        console.log(error);
    }
    
})



module.exports = router;