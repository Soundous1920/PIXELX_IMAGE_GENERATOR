function login(event){
    event.preventDefault();//to prevent form submission
    //show loading spinner
    document.getElementById("loader").style.display="block";
    setTimeout(function(){
        //go to main page after 4seconds
        window.location.href="../html/index.html";},4000);
    }
function ShowRegister(){
    var registerform=document.getElementById("registerForm");
    var loginForm = document.getElementById("loginForm");
    if(registerform.style.display === "none"){
        loginForm.innerHTML='';
        registerform.style.display = "block";//show register form
    }else{
        registerform.style.display ="none";//hide the register form
    }
}
function ShowLogin(){
    var registerform=document.getElementById("registerForm");
    var loginForm = document.getElementById("loginForm");
    if(registerform.style.display === "none"){
       registerform.innerHTML='';
        loginForm.style.display = "block";//show login form
    }else{
        loginForm.style.display ="none";//hide the login form
    }
}
