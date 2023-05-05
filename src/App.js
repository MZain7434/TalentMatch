import axios from "axios";
import React from "react";


import GlobalStyles from "./styles/GlobalStyles.js";
import { Route, Routes, Switch } from "react-router-dom";

import AgencyLandingPage from "../src/Pages/Landing/AgencyLandingPage.js";

import { css } from "styled-components/macro"; //eslint-disable-line
import Login from "./Pages/login/Login.js";
import Signup from "./Pages/Signup/Signup.js";
import PrivacyPolicy from "./Pages/TOS_PrivacyPolicy/PrivacyPolicy.js";
import TermsOfService from "./Pages/TOS_PrivacyPolicy/TermsOfService.js";

const App = () => {
  return (
    <>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<AgencyLandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/tos" element={<TermsOfService />} />
        </Routes>
    </>
  );
};

export default App;

// class App extends React.Component {

//   state = { details : [], }

//   componentDidMount(){

//     let data;
//     axios.get('http://localhost:8000')
//       .then(res => {
//         data = res.data;
//         this.setState({
//           details:data
//         });
//       })
//       .catch(err => {  })
//   }

//   render(){
//     return (
//       <div>
//          <header>Data Generated from Django</header>
//          <hr></hr>
//          {this.state.details.map((output, id) => (
//           <div key={id}>
//             <div>
//               <h2>{output.employee}</h2>
//               <h3>{output.department}</h3>
//             </div>
//           </div>
//          ))}
//       </div>
//     )
//   }
// }

// export default App;
