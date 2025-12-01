import React , {useContext} from 'react'
import type { FilterValue, FilterContextType } from '../types'


const FilterContext = React.createContext<FilterContextType | undefined> (undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode}>= ({children,}) => {

    const [searchValue,setSearchValue] = React.useState<string>("")
    const [sortValue,setSortValue] = React.useState<FilterValue| null>(null)
    const [activeCategoryIndex,setActiveCategoryIndex] = React.useState<number>(0)

    const value: FilterContextType = {
        searchValue,setSearchValue,sortValue,setSortValue,activeCategoryIndex,setActiveCategoryIndex
    }

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => {
    const context = useContext(FilterContext)
    if (!context)  throw new Error("useFilter must be used with in a FilterProvider");
    return context
}