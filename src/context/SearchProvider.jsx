import React, { createContext, useState } from 'react'

export const searchContext = createContext()

const SearchProvider = ({children}) => {
    const [searchKey, setsearchKey] = useState('')

    const searchHandler = (key) => {
        setsearchKey(key)
    }

    const value = {
        searchKey,
        searchHandler
    }

  return (
    <searchContext.Provider value={value}>
        {children}
    </searchContext.Provider>
  )
}

export default SearchProvider