import type { SupportedAssets } from ".."

export type TradingMetaData = {
    type: "LONG" | "SHORT",
    qty: number,
    symbol: typeof SupportedAssets[0]
    
}

export type PriceMetaData = {
    asset : string,
    price : number
}

export type TimerMetaData = {
    time:number
}