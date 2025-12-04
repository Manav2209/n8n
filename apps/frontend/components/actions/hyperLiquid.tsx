import { Handle, Position } from "@xyflow/react";
import { TradingMetaData } from "./lighter";


export default function HyperLiquid({data} : {
    data: {
        metadata: TradingMetaData
    }
}){

    return(
        <div className="border p-4 rounded-lg">
           <div className="font-bold">HyperLiquid Trade</div>
            <div className="flex gap-1">
                <div>{data.metadata.type} </div>
                <div>{data.metadata.qty}</div> 
                <div>{data.metadata.symbol}</div>
            </div>
            <Handle  position={Position.Right} type={"source"} />
            <Handle  position={Position.Left} type={"target"} />
        </div>
    )
}