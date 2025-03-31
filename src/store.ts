import { create } from 'zustand'
import axios from 'axios'
import { CryptoCurrenciesResponseSchema } from './schemas/crypto-schema'
import { CryptoCurrency, CryptoPrice, Pair } from './types'
import { devtools } from 'zustand/middleware'
import { getCryptos, fetchCurrentCryptoPair } from './services/CryptoService'

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}


export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({

    cryptocurrencies: [],
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: '',
    },

    loading: false,

    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()

        set(() => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        const result = await fetchCurrentCryptoPair(pair)
        set(() => ({
            loading: true
        }))
        set(() => ({
            result,
            loading: false
        }))
    }
})))

