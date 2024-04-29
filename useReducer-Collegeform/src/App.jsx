import React, { useReducer, useState } from "react";
import "./App.css";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: "",
      },
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  courses_offered: [],
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "UPDATE_ADDRESS_FIELD":
      return {
        ...state,
        address: { ...state.address, [action.field]: action.value },
      };

    case "UPDATE_CITY_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          city: { ...state.address.city, [action.field]: action.value },
        },
      };

    case "UPDATE_LOCALITY_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.field]: action.value,
            },
          },
        },
      };

    case "UPDATE_LATITUDE":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            latitude: action.value,
          },
        },
      };

    case "UPDATE_LONGITUDE":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            longitude: action.value,
          },
        },
      };

      case "ADD_COURSE":
        console.log("Adding course:", action.course);
        return {
          ...state,
          courses_offered: action.course,
        };
      

    case "RESET":
      return initialState;

    default:
      throw new Error("Invalid action type");
  }
};

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setSubmitted(false);
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const handleAddressChange = (field, value) => {
    setSubmitted(false);
    dispatch({ type: "UPDATE_ADDRESS_FIELD", field, value });
  };

  const handleCityChange = (field, value) => {
    setSubmitted(false);
    dispatch({ type: "UPDATE_CITY_FIELD", field, value });
  };

  const handleLocalityChange = (field, value) => {
    setSubmitted(false);
    dispatch({ type: "UPDATE_LOCALITY_FIELD", field, value });
  };
  const handleAddressLatitude = (field, value) => {
    setSubmitted(false);
    dispatch({ type: "UPDATE_LATITUDE", field, value });
  };

  const handleAddressLongitude = (field, value) => {
    setSubmitted(false);
    dispatch({ type: "UPDATE_LONGITUDE", field, value });
  };

  const handleAddCourse = (course) => {
    setSubmitted(false);
    dispatch({ type: "ADD_COURSE", course });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", state);
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setSubmitted(false);
  };

  return (
    <div className="App">
      <h1>College Form</h1>
      <form onSubmit={handleSubmit}>
        {/* College Name */}
        <input
          type="text"
          placeholder="College Name"
          value={state.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        {/* Establishment Year */}
        <input
          type="number"
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) =>
            handleInputChange("establishment_year", e.target.value)
          }
        />
        {/* Address */}
        <input
          type="text"
          placeholder="Building"
          value={state.address.building}
          onChange={(e) => handleAddressChange("building", e.target.value)}
        />
        <input
          type="text"
          placeholder="Street"
          value={state.address.street}
          onChange={(e) => handleAddressChange("street", e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={state.address.city.name}
          onChange={(e) => handleCityChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="Locality Pin Code"
          value={state.address.city.locality.pinCode}
          onChange={(e) => handleLocalityChange("pinCode", e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state.address.state}
          onChange={(e) => handleAddressChange("state", e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) => handleAddressLatitude("latitude", e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) => handleAddressLongitude("longitude", e.target.value)}
        />
        {/* Courses Offered */}
        <select
          value={state.courses_offered}
          onChange={(e) => handleAddCourse(e.target.value)}
        >
          <option value="">Select a Course</option>
          <option value="Civil">Civil</option>
          <option value="Mech">Mechanical</option>
          <option value="CSE">Computer Science</option>
          <option value="EEE">Electrical and Electronics</option>
          <option value="ECE">Electronics and Communication</option>
        </select>

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      {/* Display when no data submitted */}

      {submitted ? (
        <>
          <h5>College Name :{state.name}</h5>
          <h5>Establishment Year:{state.establishment_year}</h5>
          <h5>Address : </h5>
          <h5>
            Building:{state.address.building}, Street:{state.address.street},
          </h5>
          <h5>
            City:{state.address.city.name},Pincode:
            {state.address.city.locality.pinCode}
          </h5>
          <h5>State:{state.address.state}</h5>
          <h5>Latitude:{state.address.coordinates.latitude}</h5>
          <h5>Longitude:{state.address.coordinates.longitude}</h5>
          <h5>Courses Offered : {state.courses_offered}</h5>
        </>
      ) : (
        <div>Not Submitted Yet </div>
      )}
    </div>
  );
}

export default App;
