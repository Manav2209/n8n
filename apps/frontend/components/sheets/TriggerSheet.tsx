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

import { useState } from "react";
import { Input } from "../ui/input";
import { PriceMetaData } from "../trigger/PriceTrigger";
import { TimerMetaData } from "../trigger/Timer";

export const SupportedTrigger = [
  {
    id: "timer",
    title: "timer",
    description: "Run Triggers every x seconds/minutes",
  },
  {
    id: "price-trigger",
    title: "price-trigger",
    description: "Trigger when an asset hits a certain price",
  },
];

export const SupportedAssets = ["SOL", "ETH", "BTC"];

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: PriceMetaData | TimerMetaData) => void;
}) => {
  const [metadata, setMetadata] = useState<PriceMetaData | TimerMetaData>({
    time: 3600,
  });
  const [selectedTrigger, setSelectedTrigger] = useState<string | undefined>();
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
            {selectedTrigger}
            <Select onValueChange={(value) => setSelectedTrigger(value)}>
              <SelectTrigger className="w-full pt-2">
                <SelectValue placeholder="Select Trigger" />
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
            {selectedTrigger === "timer" && (
              
                <>
                  Number of seconds so the trigger runs:
                <Input
                  type="text"
                  value={(metadata as TimerMetaData).time || ""}
                  onChange={(e) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      time: Number(e.target.value),
                    }))
                  }
                />
                </>

              
            )}
            {selectedTrigger === "price-trigger" && (
              <>
                Price:
                <Input
                  type="text"
                  value={(metadata as PriceMetaData).price || ""}
                  onChange={(e) =>
                    setMetadata((metadata) => ({
                      ...metadata,
                      price: Number(e.target.value),
                    }))
                  }
                />
                Asset:
                <Select
                  value={(metadata as PriceMetaData).asset}
                  onValueChange={(value) =>
                    setMetadata((metadata) => ({
                      ...metadata,
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
              </>
            )}
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button
            onClick={() => {
              if (selectedTrigger) {
                onSelect(selectedTrigger as NodeKind, metadata);
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
