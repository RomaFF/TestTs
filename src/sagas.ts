import { useCallback } from 'react';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

interface arrItem {
    img: string; 
    asin: string; 
    price: string; 
    bsr_category: string; 
    link: string; 
    name: string;
}

interface dataInt {
    products: arrItem[];
    id: string;
}

   const request = async () => {
        try {
            const url = `https://61fbc6493f1e34001792c5dd.mockapi.io/data/test`
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const [data]: dataInt[] = await response.json();            
            
            return {data};
        } catch(e) {
            throw e;
        }
    };

function* fetchUser():Generator<any> {
   try {
        const {data}: any = yield call(request);
        
        yield put({type: 'DATA_FETCHED', payload: data.products});
        const select: string[] = ['All products', ...new Set<string>(data.products.map((item: arrItem) => item.bsr_category))]
        
        yield put({ type: 'SPECIES_LIST', payload: select });
   } catch (e: any) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;