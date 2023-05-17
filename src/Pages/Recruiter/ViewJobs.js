import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  MenuItem,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import apiList from "../../Components/lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  button: {
    width: "100%",
    height: "100%",
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
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
}));

const JobTile = (props) => {
  const classes = useStyles();
  const { job, getData } = props;

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);


  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    console.log(job._id);
    axios
      .delete(`${apiList.jobs}/${job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TalentMatch_token")}`,
        },
      })
      .then((response) => {
        toast.success("Job post deleted successfully.");
        getData();
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Error in job deletion.");
        handleClose();
      });
  };

  const handleJobUpdate = () => {
    console.log(jobDetails);
    axios
      .put(`${apiList.jobs}/${job._id}`, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TalentMatch_token")}`,
        },
      })
      .then((response) => {
        toast.success("Job Updated");
        getData();
        handleCloseUpdate();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Error in job updation.");
        handleCloseUpdate();
      });
  };

  const postedOn = new Date(job.dateOfPosting);
  const deadline = new Date(job.deadline).toLocaleDateString();

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
      <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">{job.title}</Typography>
          </Grid>
          <Grid item>Company : {job.company}</Grid>
          <Grid item>Role : {job.jobType}</Grid>
          <Grid item>Salary : &#8360; {job.salary} per month</Grid>
          <Grid item>Min. Education :{job.minEducation}</Grid>
          <Grid item>Min. Experience :{job.minExperience}</Grid>
          <Grid item>Location :{job.location}</Grid>
          <Grid item>Date Of Posting: {postedOn.toLocaleDateString()}</Grid>
          <Grid item>Application Deadline : {deadline}</Grid>
          <Grid item>
            Remaining Number of Positions:{" "}
            {job.maxPositions - job.acceptedCandidates}
          </Grid>
          <Grid item>
            {job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={3} spacing={2}>
  <Grid item>
    <Button
      variant="contained"
      className={classes.statusBlock}
      onClick={() => {
        setOpenUpdate(true);
      }}
      style={{
        background: "#FC7A1E",
        color: "#fff",
        width: "100%", // Adjust the width as needed
      }}
    >
      Update Details
    </Button>
  </Grid>
  <Grid item>
    <Button
      variant="contained"
      color="secondary"
      className={classes.statusBlock}
      onClick={() => {
        setOpen(true);
      }}
      style={{
        width: "100%", // Adjust the width as needed
      }}
    >
      Delete Job
    </Button>
  </Grid>
</Grid>

      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Are you sure?
          </Typography>
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        className={classes.popupDialog}
      >
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "80%",
            alignItems: "center",
            maxHeight: "100vh",
            overflow: "auto",
          }}
        >
           <div style={{ minWidth: "100%", maxHeight: "90%", overflowY: "auto", overflowX: "hidden",
           display: "flex", // Change the display property to flex
           flexWrap: "wrap", // Wrap the fields within the container
           }}>

          <Typography variant="h4" style={{ marginBottom: "10px", textAlign: "center", }}>
            Update Details
          </Typography>
          <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
                style={{margin: "10px"}}
              >
                <Grid item>
                  <TextField
                    required
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
                  <TextField
                    required
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
                  <ChipInput
                    required
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
                  <TextField
                    required
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
                <Grid item container className={classes.inputBox}>
                  <Grid item xs={9}>
                    <TextField
                      required
                      label="Min. Experience Title"
                      value={jobDetails.minExperience}
                      onChange={(event) =>
                        handleInput("minExperience", event.target.value)
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      required
                      label="Duration in Month"
                      value={jobDetails.minExperienceDuration}
                      type="number"
                      onChange={(event) =>
                        handleInput("minExperienceDuration", event.target.value)
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <TextField
                    required
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
                  <TextField
                    required
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
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleJobUpdate()}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleCloseUpdate()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          </div>
        
        </Paper>
      </Modal>
    </Paper>
  );
};

const MyJobs = (props) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const token = localStorage.getItem("TalentMatch_token") || null;
const type = localStorage.getItem("TalentMatch_type") || null;
    axios
      .get(apiList.jobs , {
        headers: {
          Authorization: `Bearer ${token}`,
          Type: type,
        },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        // //
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

        <Grid
          container
          item
          xs
          direction="column"
          alignItems="stretch"
          justify="center"
        >
          {jobs.length > 0 ? (
            jobs.map((job) => {
              return <JobTile job={job} getData={getData} />;
            })
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No jobs found
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MyJobs;
