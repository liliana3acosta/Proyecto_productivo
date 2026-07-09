import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    nombre:{
        type:String,
        required:true
    },

    apellido:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    telefono:{
        type:String
    },

    direccion:{
        type:String
    },

    rol:{
        type:String,
        enum:["cliente","admin"],
        default:"cliente"
    }

},
{
    timestamps:true
});

export default mongoose.model("User",userSchema);