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
import { Input } from "@/components/ui/input"
import { SupportedAssets, TradingMetaData } from "common/types";


export const SupportedAction = [
    {
        id: "backpack",
        title: "backpack",
        description:"Place the trade using backpack"
    },
    {
        id: "lighter",
        title: "lighter",
        description:"Place the trade using lighter"
    },
    {
        id: "hyperliquid",
        title: "hyperliquid",
        description :"Place the trade using hyperliquid"
    },
];



export const ActionSheet = ({
    onSelect,
}: {
    onSelect: (kind: NodeKind, metadata: TradingMetaData) => void;
}) => {
    
    const [metadata, setMetadata] = useState<TradingMetaData>({ qty: 0, type: "LONG", symbol: "SOL" });
    const [selectedAction, setSelectedAction] = useState<string | undefined>();
    
    return ( 
        <Sheet open={true}>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Edit Action</SheetTitle>
                    <SheetDescription>
                        {selectedAction}
                        <Select onValueChange={(value) => setSelectedAction(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Trigger" />
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

                        {(selectedAction === "backpack" || selectedAction === "lighter" || selectedAction === "hyperliquid") && (
                            <>
                                
                                    Qty: 
                            
                                <Input
                                    type="text"
                                    value={metadata.qty}
                                    onChange={(e) =>
                                        setMetadata((prev) => ({
                                            ...prev,
                                            qty: Number(e.target.value),
                                        }))
                                    }
                                />

                                Asset:
                                <Select
                                    value={metadata.symbol}
                                    onValueChange={(value) =>
                                        setMetadata((prev) => ({
                                            ...prev,
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
                                Type:
                                <Select
                                    value={metadata.type}
                                    onValueChange={(value) =>
                                        setMetadata((prev) => ({
                                            ...prev,
                                            type: value as "LONG" | "SHORT",
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Side which you want" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value={"LONG"}>
                                                LONG
                                            </SelectItem>
                                            <SelectItem value={"SHORT"}>
                                                SHORT
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </>
                        )}
                    </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                    <Button onClick={() => {
                        if (selectedAction) {
                            onSelect(selectedAction as NodeKind, metadata);
                        }
                    }} variant="secondary" type="submit">Create Trigger</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
