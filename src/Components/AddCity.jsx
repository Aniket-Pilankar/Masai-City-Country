import axios from 'axios';
import React, { useEffect ,useState} from 'react';
import { nanoid } from 'nanoid';

const AddCity = () => {

    // Got the name of countries from the input in AddCountry Component
    const [countryName_Got, setcountryName_Got] = useState([])
    // console.log('countryName_Got:', countryName_Got)

    // get information of single list
    const [single_list, setsingle_list] = useState({})
    // console.log('single_list:', single_list)


    useEffect(() => {
        getCountryName()
    }, [])

    const getCountryName = () => {
        // axios.get(`http://localhost:3030/countries`).then((res) => {
        axios.get(`https://whispering-dawn-43845.herokuapp.com/countries`).then((res) => {

            const { data } = res
            // console.log('data:', data)
            setcountryName_Got([...data])
        })
    }

    const handle_cityName = (e) => {
        const {id,value} = e.target;
        // console.log('id,value:', id,value)
        setsingle_list({
            ...single_list,
            [id]:value,
            unique_id:nanoid()
        })
    }

    const handle_cityName_submit = (e) => {
        e.preventDefault()
        // axios.post(`http://localhost:3030/city`,single_list).then(() => {
        axios.post(`https://whispering-dawn-43845.herokuapp.com/city`,single_list).then(() => {
            alert('succcessfully Created')
        })
    }

    return (
        <div>
            <div className='w-25 p-3 mx-auto'>
                <form onSubmit={handle_cityName_submit} >
                    <div className="mb-3">
                        <label htmlFor="cityName" className="form-label">Enter city</label>
                        <input type="text" className="form-control" id="cityName" onChange={handle_cityName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="population" className="form-label">Enter Population</label>
                        <input type="number" className="form-control" id="population" onChange={handle_cityName} />
                    </div>
                    <select className="form-select" id='country' onChange={handle_cityName}>
                        <option value=''>Select Country</option>
                        {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                        {countryName_Got.map((e) => (
                            <option value={e.countryName} key={e.id} >{e.countryName}</option>
                        ))}
                    </select>
                            <br />
                    <input type="submit" className="btn btn-primary" />
                </form>
            </div>
        </div>
    )
}

export default AddCity