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

export type ActionCredentialSchema ={
    
}

export type TradingCredentialSchema = {
    API_KEY : string
}