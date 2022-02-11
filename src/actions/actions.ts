import { url } from 'inspector';
import { Dispatch } from 'redux'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

interface arrItem {
    img: string; 
    asin: string; 
    price: string; 
    bsr_category: string; 
    link: string; 
    name: string;
}

/*export const fetchData = () => (dispatch: Dispatch) => {
    dispatch(dataFetching());
    fetch(`https://61fbc6493f1e34001792c5dd.mockapi.io/data/test`)
        .then(res => res.json())
        .then(data => {
            dispatch(dataFetched(data[0].products))
            const select: string[] = ['All products', ...new Set<string>(data[0].products.map((item: arrItem) => item.bsr_category))]
            dispatch(speciesSelect(select))
        })
        .catch(() => dispatch(dataFetchingError()))
}*/

export const dataFetching = () => {
    return {
        type: 'DATA_FETCHING'
    }
}

export const dataFetched = (data: arrItem[]) => {
    return {
        type: 'DATA_FETCHED',
        payload: data
    }
}

export const dataFetchingError = () => {
    return {
        type: 'DATA_FETCHING_ERROR'
    }
}

export const dataFiltered = (data: arrItem[]) => {
    return {
        type: 'DATA_FILTERED', 
        payload: data
    }
}

export const filteredInputValue = (inputValue: string) => {
    return {
        type: 'FILTER_VALUE',
        payload: inputValue
    }
}

export const speciesSelect = (data: string[]) => {
    return {
        type: 'SPECIES_LIST',
        payload: data
    }
}

export const changeProducts = (select: string) => {
    return {
        type: 'SELECTED_PRODUCT',
        payload: select
    }
}


