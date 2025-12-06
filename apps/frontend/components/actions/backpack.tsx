import { Handle, Position } from "@xyflow/react";
import { TradingMetaData } from "common/types";

export default function Backpack({ data }: { data: { metadata: TradingMetaData } }) {
  return (
    <div className="w-20 h-20 bg-white border shadow-sm rounded-xl p-3 relative hover:shadow-md transition-all flex items-center justify-center">

      {/* Icon */}
      <div className="p-2 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
        <svg width="16" height="22" viewBox="0 0 11 16" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.54201 1.25805C7.12356 1.25805 7.66905 1.33601 8.1741 1.48059C7.67963 0.328169 6.65297 0 5.51038 0C4.36555 0 3.3371 0.329459 2.84375 1.48738C3.3451 1.33771 3.88824 1.25805 4.4678 1.25805H6.54201ZM4.33478 2.41504C1.57335 2.41504 0 4.58743 0 7.2672V10.02C0 10.288 0.223858 10.5 0.5 10.5H10.5C10.7761 10.5 11 10.288 11 10.02V7.2672C11 4.58743 9.17041 2.41504 6.40899 2.41504H4.33478ZM5.49609 7.29102C6.46259 7.29102 7.24609 6.50751 7.24609 5.54102C7.24609 4.57452 6.46259 3.79102 5.49609 3.79102C4.5296 3.79102 3.74609 4.57452 3.74609 5.54102C3.74609 6.50751 4.5296 7.29102 5.49609 7.29102ZM0 12.118C0 11.8501 0.223858 11.6328 0.5 11.6328H10.5C10.7761 11.6328 11 11.8501 11 12.118V15.0293C11 15.5653 10.5523 15.9998 10 15.9998H1C0.447715 15.9998 0 15.5653 0 15.0293V12.118Z"
            fill="#E33E3F"
          />
        </svg>
      </div>

      {/* Handles */}
      <Handle
        position={Position.Right}
        type="source"
        className="bg-amber-600!"
      />
      <Handle
        position={Position.Left}
        type="target"
        className="bg-amber-600!"
      />
    </div>
  );
}
