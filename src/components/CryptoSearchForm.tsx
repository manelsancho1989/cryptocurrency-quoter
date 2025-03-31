import { useCryptoStore } from "../store"
import { currencies } from "../data"
import { useState } from "react"
import { Pair } from "../types"
import { object } from "zod"
import ErrorMessage from "./ErrorMessage"

export default function CryptoSearchForm() {

    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)


    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptoCurrency: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(pair).includes('')) {
            setError("All fields are required")
            return
        }
        setError('')
        fetchData(pair)

    }

    return (
        <form
            className="form"
            onSubmit={handleSubmit}
        >
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="field">
                <label htmlFor="currency">Currency</label>
                <select
                    name="currency"
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                >
                    <option value="">-- Select--</option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="cryptoCurrency">CryptoCurrency</label>
                <select
                    name="cryptoCurrency"
                    id="cryptoCurrency"
                    onChange={handleChange}
                    value={pair.cryptoCurrency}

                >
                    <option value="">-- Select--</option>
                    {cryptocurrencies.map(crypto => (
                        <option key={crypto.SYMBOL} id={crypto.SYMBOL} value={crypto.SYMBOL}>{crypto.URI}</option>
                    ))}
                </select>
            </div>

            <input type="submit" value="Quote" />

        </form>
    )
}
