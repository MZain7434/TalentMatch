const isAuth = () => {
  return localStorage.getItem("TalentMatch_token");
};

export const userType = () => {
  return localStorage.getItem("TalentMatch_type");
};

export default isAuth;
