// jQuery - JS Library 
$(document).ready(function(){
    const userprivilegestable=$("#userprivilegestable"),
        useridfield=$("#userid"),
        usernamefield=$("#username"),
        firstnamefield=$("#firstname"),
        lastnamefield=$("#lastname"),
        passwordfield=$("#password"),
        confirmpasswordfield=$("#confirmpassword"),
        systemadminfield=$("#systemadmin"),
        mobilefield=$("#mobile"),
        emailaddressfield=$("#emailaddress"),
        changepasswordonlogonfield=$("#changepasswordonlogin"),
        saveuserbutton=$("#saveuser"),
        notifications=$("#notifications")


    // get existing objects
    getobjectsastable()

    function getobjectsastable(){
        $.getJSON(
            "controllers/useroperations.php",
            {
                getobjects:true
            }
        ).done(function(data){
            let results=""
            data.forEach(function(privilege){
                results+=`
                <tr>
                    <td><input type='checkbox' id='${privilege.objectid}'>  ${privilege.objectname}</td>
                </tr>
                `
            })
            userprivilegestable.find("tbody").html(results)
        }).fail(function(response,status,errors){

        })
    }

    // Save user
    saveuserbutton.on("click",function(){
        const userid=useridfield.val(),
            username=usernamefield.val(),
            password=passwordfield.val(),
            confirmpassword=confirmpasswordfield.val(),
            firstname=firstnamefield.val(),
            lastname=lastnamefield.val(),
            mobile=mobilefield.val(),
            emailaddress=emailaddressfield.val(),
            systemadmin=systemadminfield.val()

        let userprivileges=[]

        let errors=""
        // check for blank fields
        if(username==""){
            errors="Please provide username"
            usernamefield.focus()
        }else if(password==""){
            errors="Please provide a password"
            passwordfield.focus()
        }else if(password!=confirmpassword){
            errors="Password entries should match"
        }else if(firstname==""){
            errors="Please provide firstname "
            firstnamefield.focus()
        }else if(lastname==""){
            errors=="Please provide last name"
            lastnamefield.focus()
        }

        console.log(errors)

        if(errors==""){
            notifications.html("Processing. Please wait ...")
            userprivilegestable.find("tbody").find("input[type='checkbox']").each(function(){
                currentcheckbox=$(this)
                const objectid=currentcheckbox.prop("id"),
                    valid=currentcheckbox.prop("checked")?1:0
                userprivileges.push({"objectid":objectid,"valid":valid})
            })
            // Convert to a JSON string
            userprivileges=JSON.stringify(userprivileges)
            // Save user
            $.post(
                "controllers/useroperations.php",
                {
                    saveuser:true,
                    userid,
                    username,
                    firstname,
                    lastname,
                    systemadmin,
                    password,
                    mobile,
                    emailaddress,
                    userprivileges
                },
                function(data){
                    console.log(data)
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status=="success"){
                            notifications.html("The user was saved successully")
                        }else if(data.status=="exists"){
                            notifications.html("Sorry username already in use")
                        }
                    }else{
                        notifications.html(`Sorry an error occured ${data}`)
                    }
                }
            )
        }else{
            notifications.html(errors)
        }
    })
})