import { Handle, Position } from "@xyflow/react";
import { TradingMetaData } from "common/types";

export default function HyperLiquid({ data }: { data: { metadata: TradingMetaData } }) {
  return (
    <div className="w-20 h-20 bg-white border shadow-sm rounded-xl p-3 relative hover:shadow-md transition-all flex items-center justify-center">

      {/* Icon */}
      <div className="p-2 bg-blue-100 rounded-full flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
            fill="#3b82f6"
          />
        </svg>
      </div>

      {/* Handles */}
      <Handle
        position={Position.Right}
        type="source"
        className="bg-blue-500!"
      />
      <Handle
        position={Position.Left}
        type="target"
        className="bg-blue-500!"
      />
    </div>
  );
}
