interface stateIn {
    filteredData: { img: string, asin: string, price: string, bsr_category: string, link: string }[],
    filterValue: string,
    speciesList: string[],
    selectedProduct: string
}

interface actionIn {
    type: string;
    payload: string;
}

const initialState: stateIn = {
    filteredData: [],
    filterValue: "",
    speciesList: [],
    selectedProduct: "All products"
}

const filteredData = (state = initialState, action: actionIn) => {
    switch (action.type) {
        case 'DATA_FILTERED':
            return {
                ...state,
                filteredData: action.payload
            }
        case 'FILTER_VALUE':
        return {
            ...state,
            filterValue: action.payload
        }
        case 'SPECIES_LIST':
            return {
                ...state,
                speciesList: action.payload
            }
        case 'SELECTED_PRODUCT':
            return {
                ...state,
                selectedProduct: action.payload
            }
        default: return state
    }
}

export default filteredData