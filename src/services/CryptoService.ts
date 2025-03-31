import axios from "axios"
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schemas/crypto-schema"
import { Pair } from "../types"

export async function getCryptos() {
    const url = "https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=20"
    const { data: { Data: { LIST } } } = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(LIST)
    if (result.success) {
        return result.data
    }
}

export async function fetchCurrentCryptoPair(pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptoCurrency}&tsyms=${pair.currency}`
    console.log(url)
    const { data: { DISPLAY } } = await axios(url)
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptoCurrency][pair.currency])
    if (result.success) {
        return result.data
    }
}