import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from "../../../store/actions/cartActions";
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import {useNavigate} from 'react-router-dom'
import { Country, State } from 'country-state-city';
import { HomeOutlined } from '@mui/icons-material';
import {useAlert} from 'react-alert'
import './shipping.scss';
import CheckoutSteps from '../Cart/CheckoutSteps';
const Shipping = () => {
  const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit = (e) => {
    e.preventDefault();
    if(phoneNo.length < 10 || phoneNo.length > 10){
      alert.error("Phone number should be 10 digit Long");
      return;
    }
    dispatch(
      saveShippingInfo({address,city,country,state,pinCode,phoneNo})
    );
      history("/order/confirm");

  }
  return (
    <>
      <section className="shipping">
      <CheckoutSteps activeStep={0} />
        <div className="heading">
          <h2>Shippnig Details</h2>
        </div>
        <div className="formContainer">
          <form action="" encType='multipart/form-data' onSubmit={shippingSubmit}>
            <div>
              <HomeOutlined />
              <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <LocationCityIcon />
              <input type="text" placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <PinDropIcon />
              <input type="number" placeholder='Pin Code' required value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
            </div>
            <div>
              <LocalPhoneIcon />
              <input type="number" placeholder='Phone Number' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            </div>
            <div>
              <PublicIcon />
              <select placeholder='Select Country' required value={country} onChange={(e) => setCountry(e.target.value)} >
                <option value="">Country</option>
                {Country && Country.getAllCountries().map((item, i) => (
                  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))}
              </select>
            </div>
            {
              country && (
                <div>
                  <TransferWithinAStationIcon />
                  <select
                    required
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="" >State</option>
                    {State && State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    ))}
                  </select>
                </div>
              )
            }
            <input type="submit" value="Continue" className='shippingBtn' disabled={state ? false:true} />
          </form>
        </div>
      </section>
    </>
  )
}

export default Shipping