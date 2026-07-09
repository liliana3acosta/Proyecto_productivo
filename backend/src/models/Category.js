import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
{
    nombre:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    descripcion:{
        type:String,
        default:""
    },

    imagen:{
        type:String,
        default:""
    },

    estado:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
});

export default mongoose.model("Category",categorySchema);