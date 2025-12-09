import { lighterExecute } from "./nodes/lighter";

export type NodeType = {
    id: string 
    nodeId : string
    data: {
        metaData: any;
        kind?: "ACTION" | "TRIGGER" | null | undefined;
    } ;
    credentials?: any;
    type: string

}

export type EdgeDocument = {
    source: string 
    target : string
}


export async function execute(nodes : NodeType[], edges: EdgeDocument[]) {
    const trigger = nodes.find(x =>x?.data.kind === "TRIGGER");
    if(!trigger){
        return;
    }
    await executeRecursive(trigger?.id , nodes , edges);
} 

export async function executeRecursive(sourceId : string , nodes : NodeType[] , edges : EdgeDocument[]){
    const nodesToExecute = edges.filter(({source , target}) => source === sourceId).map(({target}) => target); 
    
    await Promise.all(nodesToExecute.map(async (nodeClientId)=>{
        const node = nodes.find(({id}) => id === nodeClientId);
        if(!node){
            return
        }
        
        switch(node.type){
            case "lighter":
                await lighterExecute(node.data.metaData.asset , node.data.metaData.qty , node.data.metaData.type, node.credentials.API_KEY)
        }
    }))

    await Promise.all(nodesToExecute.map(id => executeRecursive(id , nodes , edges)))
}