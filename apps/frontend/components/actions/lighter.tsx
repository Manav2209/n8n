import { Handle, Position } from "@xyflow/react";

import { TradingMetaData } from "common/types";


export default function Lighter ({data}:{
    data:{
        metadata : TradingMetaData
    }
}){

    return(
        <div className="p-4 border-2 rounded-lg">
            <div className="font-bold">Lighter Trade</div>
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