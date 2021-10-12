import React from 'react'
import Select from 'react-select'
import { useDispatch } from "react-redux";
import {selectPersona} from '../../actions/selectPersona'

const SelectPersona = () => {
    const options = [
        { value: 'Olivia', label: 'Olivia' },
        { value: 'Amy', label: 'Amy' },
        { value: '', label: 'Neutral' }
    ]

    //STYLE SELECT

    const colourStyles = {
        control: styles => ({ backgroundColor: 'transparent', display: 'flex', width: '100%', position: 'relative' }),
        input: styles => ({ width: '100%' }),
        container: styles => ({ width: '100%', position: "relative" }),
        valueContainer: styles => ({ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }),
        placeholder: styles => ({ backgroundColor: 'transparent', fontSize: '0.8rem', color: '#555', fontWeight: '500', fontFamily: "Poppins", textTransform: 'uppercase', cursor: 'pointer' }),
        indicatorSeparator: styles => ({ display: "none" }),
        dropdownIndicator: styles => ({ color: 'black' }),
        singleValue: styles => ({ top: '0', width: '50%', color: '#555', fontWeight: '500', fontFamily: "Poppins" }),
        menu: styles => ({ width: '8rem', top: '2rem', left: '0', position: 'absolute', backgroundColor: 'white', borderRadius: '2px', zIndex: '99' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? '#ae5058' : 'white',
                color: isFocused ? 'white' : '#ae5058',
                fontSize: '0.8rem', fontFamily: "Poppins", margin: '1rem',
                transition: 'all 0.2s',
                cursor: 'pointer',
                width: '80%',
                textAlign: 'center',
                textTransform: "uppercase",
                fontWeight: 'bold',
                borderRadius: '2px'



            };
        },
        menuList: styles => ({ backgroundColor: 'transparent', })

    };
    const dispatch = useDispatch()

    const selectValue = (e) => {
        dispatch(selectPersona(e.value))
    }


    return (
        <Select options={options} onChange={selectValue}  styles={colourStyles} placeholder={"Persona"} />
    )

}

export default SelectPersona