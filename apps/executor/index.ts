import { WorkflowModel , ExecutionModel} from "db/client";
import { execute } from "./execute";
import mongoose from "mongoose"

async function main (){

    await mongoose.connect(process.env.MONGO_URL!)


    while(1){
        const workflows = await WorkflowModel.find({});
        workflows.map(async workflow =>{
            const trigger = workflow.nodes.find(x=> x.data?.kind === "TRIGGER" );

            if(!trigger){
                return;
            }
            switch(trigger?.type){
                case "timer" :
                    const timeInS = trigger.data?.metaData.time as number;
                    const execution = await  ExecutionModel.findOne({
                        workflowId : workflow.id
                    }).sort({
                        startTime: "desc"
                    })
                

                    if(!execution|| new Date(execution?.startTime).getTime() < Date.now() - (timeInS*1000)){
                        const execution = await ExecutionModel.create({
                            workflowId : workflow.id,
                            status: "PENDING",
                            startTime: new Date()
                        })
                        await execute(workflow.nodes, workflow.edges)

                        execution.endTime = new Date()
                        await execution.save()
                    }
            } 
        })
        await new Promise(x=> setTimeout(x,2000))
    }
}

main()