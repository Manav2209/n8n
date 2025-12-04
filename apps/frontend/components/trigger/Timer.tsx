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
    <div className="p-4 border-2 rounded-lg">
      <div className="mx-auto font-bold">Timer</div>
      Every {data.metadata.time} second
      <Handle  position={Position.Right} type={"source"} />
    </div>
  )
}
