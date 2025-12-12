import express from 'express';
import mongoose from "mongoose"
import { ExecutionModel, NodesModel, UserModel, WorkflowModel } from 'db/client';
import { CreateWorkflowSchema, SignupSchema, UpdateWorkflowSchema } from 'common/types';
import bcrypt from "bcryptjs"
import cors from "cors"
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middleware';


mongoose.connect(process.env.MONGO_URL!);
const JWT_SECRET = process.env.JWT_SECRET!;

const app = express();
app.use(express.json());
app.use(cors())


app.post('/signup', async (req , res) => {
    const {success , data } = SignupSchema.safeParse(req.body);
    if(!success){
        return res.status(403).json("Incorret Inputs")
    }
    try{
        const hashPassword =  await bcrypt.hash(data.password , 10)
        const user = await UserModel.create({
            username: data.username,
            password: hashPassword
        })
        res.json({
            id: user._id
        })
    }catch(e){
        res.status(411).json({
            message:"Username already exists"
        })
    }
})

app.post('/signin', async (req , res) => {
    const { success , data} =  SignupSchema.safeParse(req.body);
    if(!success){
        return res.status(403).json("Incorret Inputs")
    }
    try{
        const user = await UserModel.findOne({
            username: data.username
        })
        if(!user){
            return res.status(400).json("User not found")
        }
        const isPasswordCorrect = await bcrypt.compare (data.password, user.password);

        if(isPasswordCorrect== false){
            return res.status(402).json("Wrong password")
        }

        const token = jwt.sign({id : user._id}, JWT_SECRET)

        res.json({
            id: user._id,
            token
        })
    }catch(e){
        res.status(411).json({
            message:"Please check the db"
        })
    }

})

app.get('/me' , authMiddleware, async(req , res)=> {

    const userId  = req.userId;

    if(!userId){
        return res
        .status(401)
        .json({ message: "Unauthorized", error: "User ID not found in token" });
    }

    const user = await UserModel.findOne({_id: userId })

        if(!user){
        return res.status(400).json("User not found in db")
        }

    res.status(201).json({
        userId : user.id,
        username : user.username
    })

})

app.post("/upload-workflow",authMiddleware, async (req , res) => {
    const userId = req.userId;
    const {success , data} = CreateWorkflowSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json("Wrong inputs please check it")
    }
    try{
        const workflow = await WorkflowModel.create({
            userId,
            nodes:data.nodes,
            edges:data.edges
        })
        res.json({
            id: workflow._id
        })
    }catch(e){
        return res.status(407).json({
            message:"Failed to create a workflow"
        })
    }
})

app.put("/workflow/:workflowId", authMiddleware, async (req ,res) => {
    
    const {success , data }= UpdateWorkflowSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json("Wrong inputs please check")
    }

    try{
        const workflow = await WorkflowModel.findByIdAndUpdate(req.params.workflowId , data ,{new:true});

        if(!workflow){
            return res.status(404).json({
                "message":"Workflow not found"
            })
        }

        res.json({
            id:workflow._id
        })
    }catch(e){
        return res.status(411).json({
            "message":"Failed to create a workflow"
        })
    }
})

app.get("/workflow/:workflowId", authMiddleware , async (req ,res) => {
    const workflow = await WorkflowModel.findById(req.params.workflowId);
    if(!workflow){
        return res.status(404).json({
            "message": "workflow not found"
        })
    }
    res.json({
        workflow
    })

})

app.get("/workflows" , authMiddleware , async (req , res)=>{
    const workflows = await WorkflowModel.find({userId: req.userId});
    res.json(workflows)
})

app.get("/workflow/executions/:workflowId", authMiddleware ,async(req , res) => {
    const executions = await ExecutionModel.find({workflowId: req.params.workflowId})
    res.json(
        executions
    )
})

app.get("/nodes" , async (req ,res)=> {
    const nodes = await NodesModel.find();
    res.json(nodes)
})
app.listen(process.env.PORT || 5000 , () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})

