const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
// const User = require("./user.js");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    }, 
    description : {
        type : String
    },
    image : {
        url : String,
        filename : String,
    },
    price : {
        type : Number,
    },
    location : {
        type : String
    },
    country : {
        type : String
    },
    reviews:[
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
});


//This is MiddleWare
//This is used to delete all the reviews associated with the listing while it is deleted
//Whenever Listing.findByIdAndDelete will call in the delete Route 
//then, this will trigger...
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({_id : {$in:listing.reviews}});
    }
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;