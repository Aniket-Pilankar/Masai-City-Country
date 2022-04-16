import axios from 'axios'
import React, { useState } from 'react'

const AddCountry = () => {

    const [countryName, setcountryName] = useState({})

    const handle_CountryName = (e) => {
        const {value,id} = e.target
        // console.log('value,id:', value,id)
        setcountryName({
            ...countryName,
            [id]:value
        })
    }

    const handle_countryName_submit =  (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3030/countries`,countryName).then(() => {
            // console.log(countryName);
        })
    }

    return (
        <div>

            <div className='w-25 p-3 mx-auto'>
                <form onSubmit={handle_countryName_submit} >
                    <div className="mb-3">
                        <label htmlFor="countryName" className="form-label">Enter Country</label>
                        <input type="text" className="form-control" id="countryName" aria-describedby="emailHelp" onChange={handle_CountryName} />
                    </div>


                    <input type="submit" className="btn btn-primary"  />
                </form>
            </div>
        </div>
    )
}

export default AddCountry