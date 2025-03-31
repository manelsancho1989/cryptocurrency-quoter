import React, { useMemo } from 'react'
import { useCryptoStore } from '../store'
import Spiner from './Spiner'

export default function CryptoPriceDisplay() {

    const result = useCryptoStore((state) => state.result)
    const loading = useCryptoStore((state) => state.loading)

    const hasResult = useMemo(() => !Object.values(result).includes(''), [result])
    console.log(hasResult);
    console.log(result);

    return (
        <div className='result-wraper'>
            {loading ? <Spiner /> : hasResult && (
                <>
                    <h2>Quote</h2>
                    <div className='result'>
                        <img src={`https://www.cryptocompare.com/${result.IMAGEURL}`} alt="" />
                        <div>
                            <p>Price: <span>{result.PRICE}</span></p>
                            <p>High Day: <span>{result.HIGHDAY}</span></p>
                            <p>Low Day: <span>{result.LOWDAY}</span></p>
                            <p>Change 24 Hour: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Last Update: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}
