import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

const HomePage = () => {

      // Got the name of countries from the input in AddCountry Component
      const [countryName_Got, setcountryName_Got] = useState([])
      // console.log('countryName_Got:', countryName_Got)

  


  useEffect(() => {
    getCity_alldetails()
    getCountryName()
  }, [])

  const [updateList_modal, setupdateList_modal] = useState({});
  const [editDetail_index, seteditDetail_index] = useState(null)

  //  the whole list got from invidual input from Addcity that we post in db in the from of array
  const [list, setlist] = useState([])
  console.log('list:', list)
// -----------------------------------
  const getCountryName = () => {
    // axios.get(`http://localhost:3030/countries`).then((res) => {
    axios.get(`https://whispering-dawn-43845.herokuapp.com/countries`).then((res) => {

        const { data } = res
        // console.log('data:', data)
        setcountryName_Got([...data])
    })
}
// ----------------------------------

  const deleteOne = (single_item_id) => {
    // By using Filter
    // let new_arr = list.filter((elem) => {
    //   return elem.unique_id !== single_item_id;
    // })
    // setlist([...new_arr])

    // axios.delete(`http://localhost:3030/city/${single_item_id}`).then(() => {
    axios.delete(`https://whispering-dawn-43845.herokuapp.com/city/${single_item_id}`).then(() => {
      getCity_alldetails()
    })

  }

  const getCity_alldetails = () => {
    // axios.get(`http://localhost:3030/city`).then(({ data }) => {
    axios.get(`https://whispering-dawn-43845.herokuapp.com/city`).then(({ data }) => {
      console.log('data:', data)
      setlist([...data])
    })
  }

  // Modal changes 

  const edit_details = (id) => {
    // console.log('id:', id)
    seteditDetail_index(id)
  }


  const handle_modal_change = (e) => {
    const { value, name } = e.target;
    setupdateList_modal({
      ...updateList_modal,
      [name]: value
    })
  }

  const handle_modal_submit = (e) => {
    e.preventDefault();
    console.log('editDetail_index:', editDetail_index)
    console.log('updateList_modal:', updateList_modal)

    // axios.patch(`http://localhost:3030/city/${editDetail_index}`, updateList_modal).then(() => {
    axios.patch(`https://whispering-dawn-43845.herokuapp.com/city/${editDetail_index}`, updateList_modal).then(() => {
      getCity_alldetails()
    })

  }

  const sortpopulation = (e) => {
    const { value } = e.target
    // console.log('value:', value)
    if (value === 'Ascending') {
      list.sort((a, b) => {
        return a.population - b.population;
      })
      setlist([...list])
    } else if (value === 'Descending') {
      list.sort((a, b) => {
        return b.population - a.population;
      })
      setlist([...list])
    }
  }

  const filterCity = (e) => {
    const { value } = e.target
    console.log('value:', value)
    let newlist = list.filter((el) => {
      return el.country === value
    })
    setlist([...newlist])
    
  }


  return (
    <div>
      <h2>Welcome to HomePage</h2>
      <br />
      <div id="sort" style={{ width: '50%', display: 'inline-flex', justifyContent: 'space-between' }}>
        <select className="form-select" aria-label="Default select example" style={{ width: '250px' }} onChange={sortpopulation} >
          <option value={''} >Sort By Population</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>

        </select>
        {/* <select className="form-select" aria-label="Default select example" style={{width:'250px'}}>
        <option >Filter by Country</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select> */}
        <select className="form-select" id='country' style={{width:'250px'}} onChange={filterCity}>
        
          <option value=''>Select Country</option>
          {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
          {countryName_Got.map((e) => (
            <option value={e.countryName} key={e.id} >{e.countryName}</option>
          ))}
        </select>
      </div>
      <br />
      <table className="table .table-striped" style={{ width: '60%', margin: 'auto', marginTop: '50px' }}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">Population</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
 */}
          {list.map((e, i) =>
          (
            <tr key={e.id}>
              <td>{i + 1}</td>
              <td>{e.country}</td>
              <td>{e.cityName}</td>
              <td>{e.population}</td>
              <td><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { edit_details(e.id) }}>Edit</button></td>
              <td><button type="button" className="btn btn-danger" onClick={() => { deleteOne(e.id) }} >Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* -------------------- */}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handle_modal_submit}  >

              <div className="modal-body">

                <div className="mb-3">
                  <label htmlFor="updateCity" className="form-label">Update City</label>
                  <input type="text" className="form-control" name="cityName" aria-describedby="emailHelp" required onChange={handle_modal_change} />
                </div>
                <div className="mb-3">
                  <label htmlFor="updateCity" className="form-label">Update Population</label>
                  <input type="number" className="form-control" name="population" aria-describedby="emailHelp" required onChange={handle_modal_change} />
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Close</button>
                <input type="submit" className="btn btn-primary" value={'Submit'} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage