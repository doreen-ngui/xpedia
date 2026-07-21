$(document).ready(()=>{
    //    Define DOM elements
    const countriestable=$("#countriestable"),
        countynotfications=$("#countynotifications"),
        addnewcountybutton=$("#addnewcountry"),
        countrydetailsmodal=$("#countrydetailsmodal"),
        countrydetailsnotifications=$("#countrydetailsnotifications"),
        countryidfield=$("#countryid"),
        countrynamefield=$("#countryname"),
        savecountrybutton=$("#savecountry"),
        inputfield=$("input")

    // Clear errors when input fields are typed into
    inputfield.on("input",()=>{
        countrydetailsnotifications.html("")
    })

    // get us existing countries
    getcountries()

    // fetch and display countries
    function getcountries(){
        $.getJSON(
            "controllers/countryoperations.php",
            {
                getcountries:true
            }
        ).done((data)=>{
            let results=""
            data.forEach((country,i)=>{
                results+=`<tr data-id=${country.countryid}>
                    <td>${i+1}</td>
                    <td>${country.countryname}</td>
                    <td>${country.dateadded}</td>
                    <td>${country.addedbyname}</td>
                    <td><a href="#" class="edit"><i class='fas fa-edit fa-lg fa-fw'></i></a></td>
                    <td><a href="#" class="delete"><i class='fas fa-trash fa-lg fa-fw'></i></a></td>
                </tr>
                `
            })
            countriestable.find("tbody").html(results)
        }).fail((response,status,error)=>{
            countynotfications.html(`<div class='alert alert-danger'>An error occured: ${response.responseText}</div>`)
        })
    }

    // Show country details modal
    addnewcountybutton.on("click",()=>{
        countrydetailsmodal.modal("show")
    })

    // Save Country
    savecountrybutton.on("click",function(){
        const countryid=countryidfield.val(),
            countryname=countrynamefield.val().trim().replace("'","''")
        // check for blank fields
        let errors=""
        if(countryname==""){
            errors="Please enter country name"
            countrynamefield.focus()
            countrydetailsnotifications.html(`<div class='alert alert-info'>${errors}</div>`)
        }else{
            countrydetailsnotifications.html(`<div class='alert alert-info'>Processing. Please wait ...</div>`)
            $.post(
                "controllers/countryoperations.php",
                {
                    savecountry:true,
                    countryid,
                    countryname
                },
                (data)=>{
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status=="success"){
                            countrydetailsnotifications.html(`<div class='alert alert-success'>Country saved successfully</div>`)
                            // Update countries table
                            getcountries()
                            // Clear fields for a new entry
                            clearcountryfields()
                        }else if(data.status=="exists"){
                            countrydetailsnotifications.html(`<div class='alert alert-info'>Sorry country already exists</div>`)
                        }
                    }else{
                        countrydetailsnotifications.html(`<div class='alert alert-danger'>Sorry an error occured ${data}</div>`)
                    }
                }
            )
        }
    })

    // Clear country fields
    function clearcountryfields(){
        countryidfield.val("0")
        countrynamefield.val("").focus()
    }
    // Edit an existing country
    countriestable.on("click",".edit",function(){
        const countryid=$(this).closest("tr").data("id")
        // fetch the details of the country
        $.getJSON(
            "controllers/countryoperations.php",
            {
                getcountrydetails:true,
                countryid
            }
        ).done((data)=>{
            data=data[0]
            countryidfield.val(data.countryid)
            countrynamefield.val(data.countryname)  
            // Load on the modal
            countrydetailsmodal.modal("show")
        }).fail((response,status,error)=>{
            countynotfications.html(`<div class='alert alert-danger'>An error occured: ${response.responseText}</div>`)
        })
    })

})