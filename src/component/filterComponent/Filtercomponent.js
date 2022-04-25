import React,{useState} from 'react';
import './filter.css'
//import { useSelector } from 'react-redux';

const Filtercomponent = (props) => {
    const {handelInput,handelSelectVal,placeholder} = props
    const [inputVal,setInputVal] = useState('')
    const [selectVal,setSelectVal] = useState('')

    const handelInputChange = (e) => {
        const res = e.target.value;
        setInputVal(res)
        handelInput(res)
    }
const handelSelect = (e) => {
     const res = e.target.value;
     setSelectVal(res)
     handelSelectVal(res)
   

}
return (
    <>
          <div className="w-50">
            <form className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                value={inputVal}
                onChange={handelInputChange}
              />
              {"  "}
              <select
                className="form-select"
                aria-label="Disabled select example"
                value={selectVal}
                onChange={handelSelect}
              >
                <option value="" >Filter</option>
                <option value="A-Z">A to Z</option>
                <option value="Z-A">Z to A</option>
              </select>
            </form>
          </div>
    </>
)
}

export default Filtercomponent;