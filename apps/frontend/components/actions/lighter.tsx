import { Handle, Position } from "@xyflow/react";
import { TradingMetaData } from "common/types";
import Image from "next/image";

export default function Lighter({ data }: { data: { metadata: TradingMetaData } }) {
  return (
    <div className="w-20 h-20 bg-white border shadow-sm rounded-xl p-3 relative hover:shadow-md transition-all flex items-center justify-center">

      {/* Icon */}
      <div className="p-2 bg-neutral-100 rounded-full flex items-center justify-center">
        <Image
          src="/assets/Lighter.jpeg"
          alt="Lighter"
          width={22}
          height={22}
          className="rounded-full"
        />
      </div>

      {/* Handles */}
      <Handle
        position={Position.Right}
        type="source"
        className="bg-black!"
      />
      <Handle
        position={Position.Left}
        type="target"
        className="bg-black!"
      />
    </div>
  );
}
