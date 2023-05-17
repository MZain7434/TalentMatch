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
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

// import { SetPopupContext } from "../../App.js";

import apiList from "../../Components/lib/apiList.js";
import { userType } from "../../Components/lib/isAuth.js";
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
}));

const JobTile = (props) => {
  const classes = useStyles();
  const { job } = props;

  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const handleApply = () => {
    console.log(job._id);
    console.log(sop);
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        {
          sop: sop,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TalentMatch_token")}`,
          },
        }
      )
      .then((response) => {
        //
        toast.success("Job application submitted");
        handleClose();
      })
      .catch((err) => {
toast.error(err.response.data.message);
        handleClose();
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
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              setOpen(true);
            }}
            disabled={userType() === "recruiter" || userType() === null}
          >
            Apply
          </Button>
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
            minWidth: "50%",
            alignItems: "center",
          }}
        >
          <TextField
            label="Write SOP (upto 250 words)"
            multiline
            rows={8}
            style={{ width: "100%", marginBottom: "30px" }}
            variant="outlined"
            value={sop}
            onChange={(event) => {
              if (
                event.target.value.split(" ").filter(function (n) {
                  return n != "";
                }).length <= 250
              ) {
                setSop(event.target.value);
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            onClick={() => handleApply()}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

const ListOfJobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const token = localStorage.getItem("TalentMatch_token") || null;
    let type = localStorage.getItem("TalentMatch_type") || null;
    if (type == "recruiter") {
      type = null;
    }
    axios
      .get(apiList.jobs, {
        headers: {
          Authorization: `Bearer ${token}`,
          Type: type,
        },
      })
      .then((response) => {
        setJobs(
          response.data.filter((obj) => {
            const today = new Date();
            const deadline = new Date(obj.deadline);
            return deadline > today;
          })
        );
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
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Typography variant="h2">Jobs</Typography>
          </Grid>
        </Grid>

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
              return <JobTile job={job} />;
            })
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No jobs found
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Pagination count={10} color="primary" />
        </Grid>
      </Grid>
    </>
  );
};

export default ListOfJobs;
