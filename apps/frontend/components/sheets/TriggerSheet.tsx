"use client";
import { NodeKind } from "@/app/create-workflow/page";
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
import { Input } from "../ui/input";
import { ActionCredentialSchema, PriceMetaData, SupportedAssets, TimerMetaData } from "common/types";
import { useState } from "react";

export const SupportedTrigger = [
  { id: "timer", title: "Timer", description: "Run trigger every x seconds/minutes" },
  { id: "price-trigger", title: "Price Trigger", description: "Trigger when an asset hits a certain price" },
];

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metaData: PriceMetaData | TimerMetaData , credentials: ActionCredentialSchema) => void;
}) => {
  const [metaData, setMetaData] = useState<PriceMetaData | TimerMetaData>({ time: 3600 });
  const [selectedTrigger, setSelectedTrigger] = useState<string | undefined>();
  const [cred , setCred] = useState<ActionCredentialSchema>(
    {

    }
  )

  return (
    <Sheet open={true}>
      <SheetContent className="max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Trigger</SheetTitle>
          <SheetDescription className="space-y-4 mt-2">

            {/* Trigger Select */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Select Trigger</label>
              <Select onValueChange={setSelectedTrigger}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SupportedTrigger.map(({ id, title }) => (
                      <SelectItem key={id} value={id}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Timer Metadata */}
            {selectedTrigger === "timer" && (
              <div className="flex flex-col gap-2 mt-4">
                <label className="font-medium text-sm">Number of seconds</label>
                <Input
                  type="number"
                  value={(metaData as TimerMetaData).time || ""}
                  onChange={(e) =>
                    setMetaData((metaData) => ({
                      ...metaData,
                      time: Number(e.target.value),
                    }))
                  }
                />
              </div>
            )}

            {/* Price Trigger Metadata */}
            {selectedTrigger === "price-trigger" && (
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm">Price</label>
                  <Input
                    type="text"
                    value={(metaData as PriceMetaData).price || ""}
                    onChange={(e) =>
                      setMetaData((metaData) => ({
                        ...metaData,
                        price: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm">Asset</label>
                  <Select
                    value={(metaData as PriceMetaData).asset}
                    onValueChange={(value) =>
                      setMetaData((metaData) => ({
                        ...metaData,
                        asset: value,
                      }))
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
              </div>
            )}

          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              if (selectedTrigger) {
                onSelect(selectedTrigger as NodeKind, metaData , cred);
              }
            }}
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
