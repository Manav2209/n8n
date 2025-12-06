'use client'

import { Handle, Position } from "@xyflow/react"
import { TimerMetaData } from "common/types"
import { Clock } from "lucide-react"

export const Timer = ({
  data,
  isConnectable
}: {
  isConnectable: boolean,
  data: { metadata: TimerMetaData }
}) => {
  return (
    <div className="w-40 bg-white shadow-sm border rounded-xl p-4 flex items-center gap-3 transition-all hover:shadow-md">
      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
        <Clock size={18} />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold">Timer</span>
        <span className="text-xs text-gray-500">{data.metadata?.time ?? "—"} sec</span>
      </div>

      <Handle
        position={Position.Right}
        type="source"
        isConnectable={isConnectable}
        className="bg-blue-500!"
      />
    </div>
  )
}
