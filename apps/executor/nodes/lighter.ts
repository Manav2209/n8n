
export async function lighterExecute(asset: "SOL" |"BTC" | "ETH" ,qty: number , type: "LONG" | "SHORT", apiKey :string){

    //write the logic for trade
    console.log("Executing trade on Lighter")
    console.log(`${asset} , ${qty} , ${type}, ${apiKey}`)

}