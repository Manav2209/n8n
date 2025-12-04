'use client'

import { Handle, Position } from "@xyflow/react"
import {  type PriceMetaData } from "common/types" 


export const PriceTrigger = ({data , isConnectable}:{
  isConnectable: boolean,
  data: {
    metadata: PriceMetaData
  }

}) => {
  return (
    <div className="p-4 border-2 rounded-lg">
      <div className="font-bold">Price Trigger</div>
      {data.metadata.asset} -
      {data.metadata.price}
      <Handle  position={Position.Right} type={"source"} />
    </div>
  )
}
