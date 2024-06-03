export const Validation = (user) => {
  const errors = { username: "", mobileNo: "", address: "", pdfFile: "" };
  const{username, mobileNo, address, pdfFile}=user

  let regex = /^[a-zA-Z]+$/;
    if (username=='') {
        errors.username="username must not be null";
    } else if(username.length<3){
        errors.username="username must not be less than 3 characters"
    } else if(username.length>20){
        errors.username="username can not contains more than 20 characters";
    } else if(!regex.test(username)){
        errors.username="username can not contains numeric value";
    }
    if(mobileNo.length!=10){
        errors.mobileNo="mobile number must be 10 digit";
    }

  return errors;
};
