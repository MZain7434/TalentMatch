import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import apiList from "../../Components/lib/apiList";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    companyName: "",
    designation : "",
    bio: "",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TalentMatch_token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfileDetails(response.data);
        setPhone(response.data.contactNumber);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Error in getting the profile data");
      });
  };

  const handleUpdate = () => {
    let updatedDetails = {
      ...profileDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...profileDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...profileDetails,
        contactNumber: "",
      };
    }
    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TalentMatch_token")}`,
        },
      })
      .then((response) => {
       toast.success("Updated Succesfully.");
        getData();
      })
      .catch((err) => {
        toast.error("Error In updation.");
        console.log(err.response);
      });
  };

  return (
    <>
    <ToastContainer/>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h2">Profile</Typography>
        </Grid>
        <Grid item xs style={{width: "70%" }}>
          <Paper
            style={{
              padding: "20px",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              //   width: "60%",
            }}
          >
            <Grid container direction="column" alignItems="stretch" spacing={3}>
              <Grid item>
                <TextField
                  label="Name"
                  value={profileDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  label="Company Name"
                  value={profileDetails.companyName}
                  onChange={(event) => handleInput("companyName", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                  style={{ width: "100%" }}
                />
                <TextField
                  label="Designation"
                  value={profileDetails.designation}
                  onChange={(event) => handleInput("designation", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Bio (upto 250 words)"
                  multiline
                  rows={8}
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={profileDetails.bio}
                  onChange={(event) => {
                    if (
                      event.target.value.split(" ").filter(function (n) {
                        return n != "";
                      }).length <= 250
                    ) {
                      handleInput("bio", event.target.value);
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PhoneInput
                  country={"pk"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  style={{ width: "auto" }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "10px 50px", marginTop: "30px" }}
              onClick={() => handleUpdate()}
            >
              Update Details
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
