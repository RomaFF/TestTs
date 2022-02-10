interface stateIn {
    data: { img: string, asin: string, price: string, name: string, bsr_category: string, link: string }[];
    dataLoadingStatus: string;
}

interface actionIn {
    type: string;
    payload: /*string | { img: string, asin: string, price: string, bsr_category: string, link: string }[]*/any;
}

const initialState: stateIn = {
    data : [],
    dataLoadingStatus: 'fetched'
}

const defaultData = (state = initialState, action: actionIn): stateIn => {
    switch (action.type) {
        case 'DATA_FETCHING':
            return {
                ...state,
                dataLoadingStatus: 'fetching'
            }
        case 'DATA_FETCHED':
            return {
                ...state,
                data: action.payload,
                dataLoadingStatus: 'fetched'
            }
        case 'DATA_FETCHING_ERROR':
            return {
                ...state,
                dataLoadingStatus: 'error'
            }
        default: return state
    }
}

export default defaultData