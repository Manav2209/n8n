'use client'

import { Handle, Position } from "@xyflow/react"

export type TimerMetaData = {
  time:number
}
export const Timer = ({data , isConnectable}:{
  isConnectable: boolean,
  data: {
    metadata: TimerMetaData
  }

}) => {
  return (
    <div className="p-4 border">
      Every {data.metadata.time /3600} second
      <Handle  position={Position.Right} type={"source"} />
    </div>
  )
}
