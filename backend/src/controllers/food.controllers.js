const foodModel = require("../models/food.model")
const storageService = require('../services/storage.service')
const likeModel = require("../models/likes.model")
const { v4: uuid} = require("uuid")
const saveModel = require("../models/save.model")

async function createFood(req,res){ 
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)

    const fileUploadResult = await storageService.uploadFile(req.file , uuid()) 

    const foodItem = await foodModel.create({
        name : req.body.name,
        description : req.body.description,
        video : fileUploadResult.url,
        foodPartner : req.foodPartner._id
    })

    console.log(fileUploadResult)

   res.status(201).json({
    message : "food created successfully",
    food : foodItem
   })


}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message : "Food items fetched successfully",
        foodItems
    })
}

async function likeFood(req,res){
    const {foodId} = req.body
    const user = req.user

    const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId 
        })

    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(
            foodId,
           { $inc : {likeCount : -1 }}
        );

        return res.status(200).json({
            message : "food unliked successfully"
    })
}

const like = await likeModel.create({
    user : user._id,
    food : foodId
})

 await foodModel.findByIdAndUpdate(
    foodId,
    { $inc: { likeCount: 1 } }
  );

res.status(201).json({
    message : "food likes successfully",
    like
})

}

async function saveFood(req,res){
    const {foodId} = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if(isAlreadySaved){
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(
            foodId,
           { $inc : {savesCount : -1 }}
        );

        return res.status(200).json({
            message : "food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(
            foodId,
           { $inc : {savesCount :1 }}
        );
    
    res.status(201).json({
        message : "food saved successfully",
        save
    })
}

async function getSavedFoodItems(req,res){
    const user = req.user;
    const savedFoods = await saveModel.find({user:user._id}).populate('food');
    if(!savedFoods || savedFoods.length ===0){
        return res.status(200).json({
  message: "No saved food items found",
  savedFoods: []
});

    }
    res.status(200).json({
        message : "Saved food items fetched successfully",
        savedFoods
    })
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFoodItems
}