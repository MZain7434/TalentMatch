import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import { SetPopupContext } from "../../App.js";
import apiList from "../../Components/lib/apiList.js";
import {  ToastContainer, toast } from 'react-toastify';
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

const CreateJobs = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    minEducation: "",
    minExperience: "",
    maxExperience: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    location: "",
    duration: 0,
    salary: 0,
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    if (
      jobDetails.title === "" ||
      jobDetails.company === "" ||
      jobDetails.minEducation === "" ||
      jobDetails.minExperience === "" ||
      jobDetails.maxExperience === "" ||
      jobDetails.skillsets === "" ||
      jobDetails.location === ""
    ) {
      toast.error("Fill all the required fields");
      return;
    }
    
    axios
      .post(apiList.jobs, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TalentMatch_token")}`,
        },
      })
      .then((response) => {
        toast.success("Job added succesfully");
        setJobDetails({
          title: "",
          company: "",
          minEducation: "",
          minExperience: "",
          maxExperience: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          location: "",
          salary: 0,
        });
      })
      .catch((err) => {
        toast.error("Job posting failed");
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
        style={{ padding: "30px", minHeight: "93vh", width: "" }}
      >
        <Grid item>
          <Typography variant="h2">Post Job</Typography>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <Paper
              style={{
                padding: "20px",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item>
                  <TextField required
                    label="Title"
                    value={jobDetails.title}
                    onChange={(event) =>
                      handleInput("title", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField required
                    label="Company"
                    value={jobDetails.company}
                    onChange={(event) =>
                      handleInput("company", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <ChipInput required
                    className={classes.inputBox}
                    label="Skills"
                    variant="outlined"
                    helperText="Press enter to add skills"
                    value={jobDetails.skillsets}
                    onAdd={(chip) =>
                      setJobDetails({
                        ...jobDetails,
                        skillsets: [...jobDetails.skillsets, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      let skillsets = jobDetails.skillsets;
                      skillsets.splice(index, 1);
                      setJobDetails({
                        ...jobDetails,
                        skillsets: skillsets,
                      });
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField required
                    label="Min. Education"
                    value={jobDetails.minEducation}
                    onChange={(event) =>
                      handleInput("minEducation", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Job Type"
                    variant="outlined"
                    value={jobDetails.jobType}
                    onChange={(event) => {
                      handleInput("jobType", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Work From Home">Work From Home</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField required
                    select 
                    label="Min. Experience"
                    variant="outlined"
                    value={jobDetails.minExperience}
                    onChange={(event) => {
                      handleInput("minExperience", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="Less than 1 Year">
                      Less than 1 Year
                    </MenuItem>
                    <MenuItem value="1-2 years">1-2 years</MenuItem>
                    <MenuItem value="2-4 years">2-4 years</MenuItem>
                    <MenuItem value="4-6 years">4-6 years</MenuItem>
                    <MenuItem value="6-8 years">6-8 years</MenuItem>
                    <MenuItem value="8-10 years">8-10 years</MenuItem>
                    <MenuItem value="10+ years">10+ years</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField required
                    select
                    label="Max. Experience"
                    variant="outlined"
                    value={jobDetails.maxExperience}
                    onChange={(event) => {
                      handleInput("maxExperience", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="Less than 1 Year">
                      Less than 1 Year
                    </MenuItem>
                    <MenuItem value="1-2 years">1-2 years</MenuItem>
                    <MenuItem value="2-4 years">2-4 years</MenuItem>
                    <MenuItem value="4-6 years">4-6 years</MenuItem>
                    <MenuItem value="6-8 years">6-8 years</MenuItem>
                    <MenuItem value="8-10 years">8-10 years</MenuItem>
                    <MenuItem value="10+ years">10+ years</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField required
                    label="Location"
                    value={jobDetails.location}
                    onChange={(event) =>
                      handleInput("location", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField required
                    label="Salary"
                    type="number"
                    variant="outlined"
                    value={jobDetails.salary}
                    onChange={(event) => {
                      handleInput("salary", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Application Deadline"
                    type="datetime-local"
                    value={jobDetails.deadline}
                    onChange={(event) => {
                      handleInput("deadline", event.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Maximum Number Of Applicants"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxApplicants}
                    onChange={(event) => {
                      handleInput("maxApplicants", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Positions Available"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxPositions}
                    onChange={(event) => {
                      handleInput("maxPositions", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px", marginTop: "30px" }}
                onClick={() => handleUpdate()}
              >
                Create Job
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateJobs;
