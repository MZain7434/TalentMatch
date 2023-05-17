import {  useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../../Components/lib/FileUploadInput.js";
import DescriptionIcon from "@material-ui/icons/Description";

import { SetPopupContext } from "../../App";

import apiList from "../../Components/lib/apiList.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const MultifieldEducation = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={6}>
            <TextField
              label={`Degree Code #${key + 1}`}
              value={education[key].degreeCode}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].degreeCode = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setEducation([
              ...education,
              {
                degreeCode: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another degree details
        </Button>
      </Grid>
    </>
  );
};
const MultifieldCerticate = (props) => {
  const classes = useStyles();
  const { certificate, setCertificate } = props;

  return (
    <>
      {certificate.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={9}>
            <TextField
              label={`Certificate Title #${key + 1}`}
              value={certificate[key].certificateTitle}
              onChange={(event) => {
                const newCert = [...certificate];
                newCert[key].certificateTitle = event.target.value;
                setCertificate(newCert);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Duration in months"
              value={certificate[key].certificateDuration}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newCert = [...certificate];
                newCert[key].certificateDuration = event.target.value;
                setCertificate(newCert);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setCertificate([
              ...certificate,
              {
                certificateTitle: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another Certificate
        </Button>
      </Grid>
    </>
  );
};
const MultifieldProject = (props) => {
  const classes = useStyles();
  const { project, setProject } = props;

  return (
    <>
      {project.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={9}>
            <TextField
              label={`Project Title #${key + 1}`}
              value={project[key].projectTitle}
              onChange={(event) => {
                const newProj = [...project];
                newProj[key].projectTitle = event.target.value;
                setProject(newProj);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Tech Stack"
              value={obj.projectStack}
              variant="outlined"
              type="text"
              onChange={(event) => {
                const newProj = [...project];
                newProj[key].projectStack = event.target.value;
                setProject(newProj);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setProject([
              ...project,
              {
                projectTitle: "",
                projectStack: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another Project
        </Button>
      </Grid>
    </>
  );
};

const MultifieldExperience = (props) => {
  const classes = useStyles();
  const { experience, setExperience } = props;

  return (
    <>
      {experience.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={9}>
            <TextField
              label={`Position Title E.g Inter, Junior Android Developer etc. #${
                key + 1
              }`}
              value={experience[key].positionTitle}
              onChange={(event) => {
                const newExp = [...experience];
                newExp[key].positionTitle = event.target.value;
                setExperience(newExp);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Duration in months"
              value={obj.expTenure}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newExp = [...experience];
                newExp[key].expTenure = event.target.value;
                setExperience(newExp);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setExperience([
              ...experience,
              {
                positionTitle: "",
                expTenure: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another Job Experience
        </Button>
      </Grid>
    </>
  );
};

const Profile = (props) => {
  const classes = useStyles();
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    certificate: [],
    project: [],
    experience: [],
    skills: [],
    resume: "",
  });

  const [education, setEducation] = useState([
    {
      degreeCode: "",
      startYear: "",
      endYear: "",
    },
  ]);
  const [certificate, setCertificate] = useState([
    {
      certificateTitle: "",
      certificateDuration: "",
    },
  ]);

  const [project, setProject] = useState([
    {
      projectTitle: "",
      projectStack: "",
    },
  ]);
  const [experience, setExperience] = useState([
    {
      positionTitle: "",
      expTenure: "",
    },
  ]);

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
        setProfileDetails(response.data);
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              degreeCode: edu.degreeCode ? edu.degreeCode : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        }
        if (response.data.certificate.length > 0) {
          setCertificate(
            response.data.certificate.map((cert) => ({
              certificateTitle: cert.certificateTitle
                ? cert.certificateTitle
                : "",
              certificateDuration: cert.certificateDuration
                ? cert.certificateDuration
                : "",
            }))
          );
        }
        if (response.data.project.length > 0) {
          setProject(
            response.data.project.map((proj) => ({
              projectTitle: proj.projectTitle ? proj.projectTitle : "",
              projectStack: proj.projectStack ? proj.projectStack : "",
            }))
          );
        }
        if (response.data.experience.length > 0) {
          setExperience(
            response.data.experience.map((exp) => ({
              positionTitle: exp.positionTitle ? exp.positionTitle : "",
              expTenure: exp.expTenure ? exp.expTenure : "",
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("Set Profile Details Error.");
      });
  };

  const handleUpdate = () => {
    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.degreeCode.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
      certificate: certificate.filter(
        (obj) => obj.certificateTitle.trim() !== ""
      ),
      project: project.filter((obj) => obj.projectTitle.trim() !== ""),
      experience: experience.filter((obj) => obj.positionTitle.trim() !== ""),
    };

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TalentMatch_token")}`,
        },
      })
      .then((response) => {
        toast.success("Updated Successfully");
        getData();
      })
      .catch((err) => {
        toast.error("Error in updation");
      });
  };

  return (
    <>
      <ToastContainer />
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
        <Grid item xs>
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
            <Grid container direction="column" alignItems="stretch" spacing={3}>
              <Grid item>
                <TextField
                  label="Name"
                  value={profileDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <MultifieldEducation
                education={education}
                setEducation={setEducation}
              />
              <MultifieldCerticate
                certificate={certificate}
                setCertificate={setCertificate}
              />
              <MultifieldProject project={project} setProject={setProject} />
              <MultifieldExperience
                experience={experience}
                setExperience={setExperience}
              />
              <Grid item>
                <ChipInput
                  className={classes.inputBox}
                  label="Skills"
                  variant="outlined"
                  helperText="Press enter to add skills"
                  value={profileDetails.skills}
                  onAdd={(chip) =>
                    setProfileDetails({
                      ...profileDetails,
                      skills: [...profileDetails.skills, chip],
                    })
                  }
                  onDelete={(chip, index) => {
                    let skills = profileDetails.skills;
                    skills.splice(index, 1);
                    setProfileDetails({
                      ...profileDetails,
                      skills: skills,
                    });
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <FileUploadInput
                  className={classes.inputBox}
                  label="Resume (.pdf)"
                  icon={<DescriptionIcon />}
                  uploadTo={apiList.uploadResume}
                  handleInput={handleInput}
                  identifier={"resume"}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "10px 50px", marginTop: "30px" }}
              onClick={() => handleUpdate()}
            >
              Save
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
