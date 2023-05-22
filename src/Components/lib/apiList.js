export const server = "http://localhost:4444";

const apiList = {
  login: `${server}/auth/login`,
  forgotpassword: `${server}/auth/forgotpassword`,
  resetpassword: `${server}/auth/resetpassword`,
  signup: `${server}/auth/signup/`,
  uploadResume: `${server}/upload/resume`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
};

export default apiList;
