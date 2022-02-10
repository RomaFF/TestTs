import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Routes, Route, Outlet, Link, useParams } from 'react-router-dom';

import { fetchData } from '../../actions/actions'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { dataFetched, filteredInputValue, dataFiltered, changeProducts} from '../../actions/actions'

import { DataCard } from "../DataCard/DataCard"
import "./CardList.scss"
import { FilterForm } from '../FilterForm/FilterForm';

export const CardList = () => {
    const data = useAppSelector(( state ) => state.defaultData.data);
    const filterValue = useAppSelector(( state ) => state.filteredData.filterValue);
    const selectedProduct = useAppSelector(( state ) => state.filteredData.selectedProduct)
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    let category: string  = !searchParams.get("category") ? '#' : searchParams.get("category") as string
    let productName: string = !searchParams.get("productName") ? 'All products' : searchParams.get("productName") as string
    
    dispatch(filteredInputValue(category))
    dispatch(changeProducts(productName))

    let filtered = [...data]

    console.log(category);
    console.log(productName);

    if (category && category.length > 2 && category !== null) {
        filtered = data.filter((item) => item.name.toLowerCase().includes(category.toLowerCase()))
        if (productName && productName !== 'All products' ) {
            filtered = filtered.filter((item) => item.bsr_category.includes(productName))
        }
    } else {
        if (productName && productName !== 'All products') {
            filtered = data.filter((item) => item.bsr_category.includes(productName))
        }
    }
    
    return (
        <div className="cardList__border">
            <FilterForm/>
            <div  className="cardList__wrapper">
                {
                    filtered.map((item) => 
                        <DataCard {...item} key={item.asin}/>
                    ) 
                }
            </div>
        </div>
    )
}