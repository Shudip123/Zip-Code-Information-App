import React, { Component } from 'react';
import './location.css'
import video from  "./Earth.mp4"

class LocationInfo extends Component {

  constructor() {
    super();
    this.state = {
      postalCode: '',
      locationInfo: null,
      error : null
    };
  }

  handleInputChange = (e) => {
    this.setState({ postalCode: e.target.value });
  };

  fetchLocationInfo = () => {
    fetch(`https://api.zippopotam.us/in/${this.state.postalCode}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error ('Invalid postal code');
        }
        return response.json();
      })

      .then((data) => {
        this.setState({ locationInfo: data,error:null });
      })
      .catch((error) => {
        this.setState({ locationInfo: null ,error: error.message });
      });
  };

  clearData = () => {
    this.setState({
      postalCode: '',
      locationInfo: null,
      error: null,
    });
  };

  render() {
    return (
      <>      
      
      <div className='imglogo'>
      <img src="	https://leadschool.in/wp-content/uploads/2021/06/logo.svg" alt="Lead logo" className='logo' />
      </div>

      <video src={video}  autoPlay loop muted  />
      

        <div className='content'>
          <h3>Zip Code Information App</h3>
         </div>

        {this.state.error && (
          <div className="error-message">
            {this.state.error}
          </div>
        )}

        <div className="inputtext ">
        <input className='form ' 
          type="text"
          placeholder="  Enter Postal Code"
          value={this.state.postalCode}
          onChange={this.handleInputChange}
        />
        </div>

        
        <button type="button" className="btn btn-light bg-transparent searchbtn " onClick={this.fetchLocationInfo}>Search</button>

       

        <button type="button" className="btn btn-light bg-transparent clearbtn" onClick={this.clearData} >clear</button>

        
        
        
        {this.state.locationInfo && (
          <div className='divtable'>
            <table className="table table-bordered transparent-table" >
                <thead>
                  <tr >
                    <th>Country</th>
                    <th>State</th>
                    <th>Place Name</th>
                    <th>State Abbreviation</th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                  </tr>
                </thead>

                <tbody>
                {this.state.locationInfo.places.map((place, index) => (
                  <tr key={index}>
                    <td>{this.state.locationInfo['country'] }</td>
                    <td>{place.state}</td>
                    <td>{place['place name']}</td>
                    <td>{place['state abbreviation']}</td>
                    <td>{place.longitude}</td>
                    <td>{place.latitude}</td>
                  </tr>
                ))}
              </tbody>
              </table>
              </div>
          
        )}

        
        
        <footer>
          <div className="foot-panel">
          © Copyright Leadership Boulevard Private Limited 2023. All rights reserved.
          </div>
        </footer>
        
      
      </>

    );
  }
}

export default LocationInfo;
