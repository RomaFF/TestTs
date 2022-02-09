import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';
import { filteredInputValue, changeProducts, dataFiltered} from '../../actions/actions'

export const FilterForm = () => {
    const data = useSelector(state => state.defaultData.data);
    const filterValue = useSelector(state => state.filteredData.filterValue);
    const speciesList = useSelector(state => state.filteredData.speciesList)
    const selectedProduct = useSelector(state => state.filteredData.selectedProduct)
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <Formik
                initialValues = {{
                    filterInput: filterValue,
                    species: selectedProduct
                }}
                validationSchema = {Yup.object({
                    filterInput: Yup.string()
                        .min(2, 'Минимум 2 символа для заполнения')
                        .required('Обязательное поле!')
                })}
                >
                {(values) => (<Form className='form'>
                    <label htmlFor="filterInput">Наименование товара</label>
                    <Field
                        id="filterInput"
                        name="filterInput"
                        value={values.filterInput}
                        onChange={(e) => {
                            /*setInputValue(e.target.value)*/
                            setSearchParams(`category=${e.target.value}&productName=${selectedProduct ? selectedProduct : 'All products'}`)
                            dispatch(filteredInputValue(e.target.value))
                        }}
                    />
                    <ErrorMessage component="div" className="error" name="filterInput"/>

                    <Field 
                        as="select" 
                        name="species" 
                        value={values.species} 
                        onChange={(e) => {
                            setSearchParams(`category=${filterValue ? filterValue : '#'}&productName=${e.target.value}`)
                            dispatch(changeProducts(e.target.value))
                        }}
                    >
                        {speciesList.map((item) => {
                            return <option value={item} key={item}>{item}</option>
                        })}
                    </Field>
                </Form>)}
            </Formik>
        </>
    )
}