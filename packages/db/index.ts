import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema ({
    username :{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true
    }
})

const EdgeSchema = new Schema({
    source:{
        type: String,
        required:true
    },
    target:{
        type: String,
        required:true
    },
    id:{
        type: String,
        required:true
    }

},{
    _id: false
})

const PositionSchema = new Schema({
    x:{
        type: Number,
        required:true
    },
    y:{
        type: Number,
        required:true
    }

},{
    _id: false
})
const NodeDataSchema= new Schema({

    metaData:Schema.Types.Mixed,
    kind:{
        type:String , enum:["ACTION", "TRIGGER"]
    }
},{
    _id: false
})

const workflowNodeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    position : PositionSchema,
    nodeId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'Nodes'
    },
    data:NodeDataSchema,
    credientials:Schema.Types.Mixed
},{
    _id: false
})

const workflowSchema = new Schema ({
    userId :{
        type:mongoose.Types.ObjectId,
        required: true,
        ref:'Users'
    },
    nodes:[workflowNodeSchema],
    edges:[EdgeSchema] 
})

const credentialsTypeSchema = new Schema({
    title:{type: String, required: true},
    required:{type: Boolean, required: true}
    
})
const nodeSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    type:{
        type:String,
        enum:["ACTION","TRIGGER"], 
        required:true
    },
    credentialsType: [credentialsTypeSchema]
})

const executionSchema = new Schema({
    workflowId :{
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'Worflows'
    },
    status:{
        type:String,
        enum:["SUCCESS","PENDING","FAILURE"],
        required: true
    },
    startTime:{
        type:Date,
        default:Date.now(),
        required: true
    },
    endTime:{
        type:Date
    }
})

export const ExecutionModel = mongoose.model('Executions',executionSchema)
export const NodesModel = mongoose.model('Nodes', nodeSchema)
export const UserModel = mongoose.model('Users', userSchema); 
export const WorkflowModel = mongoose.model('Workflows',workflowSchema);