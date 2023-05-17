import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";

import { SetPopupContext } from "../../App.js";

import apiList from "../../Components/lib/apiList.js";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const appliedOn = new Date(application.applicationApplyDate);
  //const joinedOn = new Date(application.dateOfJoining);
  console.log(application);
   const colorSet = {
     applied: "#3454D1",
     shortlisted: "#DC851F",
     accepted: "#09BC8A",
     rejected: "#D1345B",
     deleted: "#B49A67",
     cancelled: "#FF8484",
     finished: "#4EA5D9",
   };

  return (
     <Paper className={classes.jobTileOuter} elevation={3}>
       <Grid container>
         <Grid container item xs={9} spacing={1} direction="column">
           <Grid item>
             <Typography variant="h5">{application.jobTitle}</Typography>
           </Grid>
           <Grid item>Company : {application.jobCompany}</Grid>
           <Grid item>Location : {application.jobLocation}</Grid>
           <Grid item>Salary : &#8360; {application.jobSalary} per month</Grid>
          <Grid item>
             {application.jobSkill.map((skill) => (
               <Chip label={skill} style={{ marginRight: "2px" }} />
             ))}
           </Grid>
           <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
           {application.status === "accepted" ||
           application.status === "finished" ? (
              <Grid item>Joined On: </Grid>
            ) : null}
          </Grid>
         <Grid item container direction="column" xs={3}>
           <Grid item xs>
             <Paper
               className={classes.statusBlock}
               style={{
                 background: colorSet[application.applicationStatus],
                 color: "#ffffff",
               }}
             >
               {application.applicationStatus}
             </Paper>
           </Grid>
         </Grid>
       </Grid>
     </Paper>
   );
};

const Applications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TalentMatch_token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data.applications.status);
        setApplications(response.data.jobs);
        console.log(applications.length);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Applications</Typography>
      </Grid>
      <Grid
        container
        item
        xs
        direction="column"
        style={{ width: "100%" }}
        alignItems="stretch"
        justify="center"
      >
        {applications.length > 0 ? (
         applications.map((obj) => {
             return <ApplicationTile application={obj} />;
          })
        ) : (
          <Typography variant="h5" style={{ textAlign: "center" }}>
            No Applications Found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Applications;
