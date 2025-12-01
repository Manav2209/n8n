'use client'

import { Handle, Position } from "@xyflow/react"

export type PriceMetaData = {
  asset : string,
  price : number
}
export const PriceTrigger = ({data , isConnectable}:{
  isConnectable: boolean,
  data: {
    metadata: PriceMetaData
  }

}) => {
  return (
    <div className="p-4 border">
      {data.metadata.asset} -
      {data.metadata.price}
      <Handle  position={Position.Right} type={"source"} />
    </div>
  )
}
