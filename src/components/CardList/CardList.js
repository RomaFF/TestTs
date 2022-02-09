import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Routes, Route, Outlet, Link, useHistory, useParams } from 'react-router-dom';

import { fetchData } from '../../actions/actions'
import { useDataService } from '../../useDataService'
import { dataFetched, filteredInputValue, dataFiltered, changeProducts} from '../../actions/actions'

import { DataCard } from "../DataCard/DataCard"
import "./CardList.scss"
import { FilterForm } from '../FilterForm/FilterForm';

export const CardList = () => {
    const data = useSelector(state => state.defaultData.data);
    const filterValue = useSelector(state => state.filteredData.filterValue);
    const selectedProduct = useSelector(state => state.filteredData.selectedProduct)
    const productSpecies = useSelector(state => state.filteredData.productSpecies)
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    let category = searchParams.get("category")
    let productName = searchParams.get("productName")
    dispatch(filteredInputValue(category))
    dispatch(changeProducts(productName))

    let filtered = [...data]

    console.log(category);
    console.log(productName);

    if (category && category.length > 2) {
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