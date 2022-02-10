import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { filteredInputValue, changeProducts} from '../../actions/actions'
import { useAppDispatch, useAppSelector } from '../../store/store'
import type { RootState, AppDispatch } from '../../store/store'

export const FilterForm = () => {
    const data = useAppSelector((state) => state.defaultData.data);
    const filterValue = useAppSelector<string>((state) => state.filteredData.filterValue);
    const speciesList = useAppSelector((state) => state.filteredData.speciesList)
    const selectedProduct = useAppSelector((state) => state.filteredData.selectedProduct)
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    interface MyFormValues {
        filterInput: string;
        species: string;
    }

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
                onSubmit={() => { console.log("submit!"); }}
                validator={() => ({})}
                >
                {(values: MyFormValues) => (<Form className='form'>
                    <label htmlFor="filterInput">Наименование товара</label>
                    <Field
                        id="filterInput"
                        name="filterInput"
                        value={values.filterInput}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            /*setInputValue(e.target.value)*/
                            setSearchParams(`category=${e.currentTarget.value}&productName=${selectedProduct ? selectedProduct : 'All products'}`)
                            dispatch(filteredInputValue(e.currentTarget.value))
                        }}
                    />
                    <ErrorMessage component="div" className="error" name="filterInput"/>

                    <Field 
                        as="select" 
                        name="species" 
                        value={values.species} 
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setSearchParams(`category=${filterValue ? filterValue : '#'}&productName=${e.currentTarget.value}`)
                            dispatch(changeProducts(e.currentTarget.value))
                        }}
                    >
                        {speciesList.map((item: string) => {
                            return <option value={item} key={item}>{item}</option>
                        })}
                    </Field>
                </Form>)}
            </Formik>
        </>
    )
}