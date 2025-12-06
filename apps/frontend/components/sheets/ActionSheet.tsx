"use client";
import { NodeKind, NodeMetadata } from "@/app/create-workflow/page";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { SupportedAssets, TradingMetaData } from "common/types";

export const SupportedAction = [
  { id: "backpack", title: "Backpack", description: "Place the trade using Backpack" },
  { id: "lighter", title: "Lighter", description: "Place the trade using Lighter" },
  { id: "hyperliquid", title: "HyperLiquid", description: "Place the trade using HyperLiquid" },
];

export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: TradingMetaData) => void;
}) => {
  const [metadata, setMetadata] = useState<TradingMetaData>({
    qty: 0,
    type: "LONG",
    symbol: "SOL",
  });
  const [selectedAction, setSelectedAction] = useState<string | undefined>();

  return (
    <Sheet open={true}>
      <SheetContent className="max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Action</SheetTitle>
          <SheetDescription className="space-y-4 mt-2">

            {/* Action Select */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Select Action</label>
              <Select onValueChange={setSelectedAction}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SupportedAction.map(({ id, title }) => (
                      <SelectItem key={id} value={id}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Metadata Inputs */}
            {selectedAction && (
              <div className="flex flex-col gap-4 mt-4">

                {/* Quantity */}
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm">Quantity</label>
                  <Input
                    type="number"
                    value={metadata.qty}
                    onChange={(e) =>
                      setMetadata((prev) => ({ ...prev, qty: Number(e.target.value) }))
                    }
                  />
                </div>

                {/* Asset */}
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm">Asset</label>
                  <Select
                    value={metadata.symbol}
                    onValueChange={(value) =>
                      setMetadata((prev) => ({ ...prev, symbol: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SupportedAssets.map((id) => (
                          <SelectItem key={id} value={id}>
                            {id}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm">Type</label>
                  <Select
                    value={metadata.type}
                    onValueChange={(value) =>
                      setMetadata((prev) => ({ ...prev, type: value as "LONG" | "SHORT" }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="LONG">LONG</SelectItem>
                        <SelectItem value="SHORT">SHORT</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

              </div>
            )}
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button
            variant="default"
            className="w-full"
            onClick={() => selectedAction && onSelect(selectedAction as NodeKind, metadata)}
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
