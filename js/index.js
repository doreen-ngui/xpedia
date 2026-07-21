$(document).ready(()=>{
    // Define DOM elements
    const usernamefield=$("#username"),
        passwordfield=$("#password"),
        loginbutton=$("#loginuser"),
        notifications=$("#notifications"),
        inputfields=$("input")

    inputfields.on("input",()=>{
        notifications.html("")
    })

    loginbutton.on("click",function(){
        // console.log("Login button clicked")
        const username=usernamefield.val().trim(),
            password=passwordfield.val()

        // Check for blank fields
        let errors=""

        if(username==""){
            errors="Please provide username"
            usernamefield.focus()
        }else if(password==""){
            errors="Please provide password"
            passwordfield.focus()
        }

        if(errors==""){
            notifications.html("<div class='alert alert-info'>Processing. Please wait ...</div>")
            $.post(
                "controllers/useroperations.php",
                {
                    loginuser:true,
                    username,
                    password
                },
                (data)=>{
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status=="success"){
                            // Redirect to Dashboard
                            window.location.href="dashboard.php"
                        }else if(data.status=="invalid"){
                            notifications.html("<div class='alert alert-danger'>Invalid username or password</div>")
                        }
                    }else{
                        notifications.html(`<div class='alert alert-danger'>Sorry an error occured ${data}</div>`)
                    }
                }
            )
        }else{
            notifications.html(`<div class='alert alert-danger'>${errors}</div>`)
        }

    })
})