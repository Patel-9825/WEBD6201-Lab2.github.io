// IIFE - Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{
    /**
     *This method uses AJAX to open a connection to the url and returns data to the callback function
     *
     * @param {*} method
     * @param {*} url
     * @param {*} callback
     */
    function AjaxRequest(method, url, callback)
    {
        //Step - 1 instantiate an XHR object
        let XHR = new XMLHttpRequest();

        //Step - 2 Create an event listener
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                callback(XHR.responseText);
            }
        });

        //Step - 3 open a connection tot the server
        XHR.open(method, url);

        //Step - 4 send the request to the server
        XHR.send();
    }

    /**
     *This function loads the navbar from the header file and injects it into the page
     *
     * @param {*} data
     */
    function LoadHeader(data)
    {
        $("header").html(data); //data payload
        $(`li>a:contains(${document.title})`).addClass("active");   // add a class of 'active'
        CheckLogin();
    }


    function DisplayAboutPage()
    {
        console.log("About Us Page");
    }

    function DisplayProductsPage()
    {
        console.log("Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    function DisplayHomePage()
    {

        console.log("Home Page");

        AjaxRequest("GET", "header.html", LoadHeader);

        // old way
        //let AboutUsButton = document.getElementById("AboutUsButton");
        // AboutUsButton.addEventListener("click", function()
        // {
        //     // redirect to about page
        //     location.href = "about.html";
        // });

        // JQuery way - returns all elements that contain an id of AboutUsButton - attach the "click" event to each of them
        $("#AboutUsButton").on("click", function()
        {
            location.href = "about.html";
        });

        // Javascript way
        // document.querySelectorAll("#AboutUsButton").forEach(function(element)
        // {
        //     element.addEventListener("click", function()
        //     {
        //         location.href = "about.html";
        //     })
        // });

        
        //step 1 get a reference to an entry point(s)
        // let MainContent = document.getElementsByTagName("main")[0];
        // let DocumentBody = document.body;

        //step 2 create an element
        // let MainParagraph = document.createElement("p");
        // let Article = document.createElement("article");
        // let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>`;

        //step 3 configure new element
        // MainParagraph.setAttribute("id", "MainParagraph");
        // MainParagraph.setAttribute("class", "mt-3");
        // MainParagraph.textContent = "This is the main Paragraph";
        // Article.setAttribute("class", "container");

        //step 4 add/insert new element
        //MainContent.appendChild(MainParagraph);
        $("main").append(`<p id="MainParagraph" class="mt-3"> This is the main paragraph </p>`);
        //Article.innerHTML = ArticleParagraph;
        //DocumentBody.appendChild(Article);
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3"> This is the Article paragraph </p> 
        </article>`);

        // Deletion example
        // document.getElementById("ArticleParagraph").remove();

        // let NewH1 = document.createElement("h1");
        // NewH1.setAttribute("class", "display-1");

        // MainContent.before(NewH1);

        // NewH1.textContent = "Hello, World!";

    }

    /**
     * Adds a contact object to localStorage
     * 
     * @param {string} fullName 
     * @param {string} contactNumber 
     * @param {string} emailAddress 
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This method validates an input text field in the form and displays
     * an error in the message area in the field
     *
     * @param {string} input_field_ID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(input_field_ID, regular_expression, error_message)
    {
        let messageArea = $("#messageArea").hide();

        $("#" + input_field_ID).on("blur", function()
        {
            let input_text_field = $(this).val(); 
            if(!regular_expression.test(input_text_field))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*$/, "Please enter a valid Full Name. This include at least a capitalized first name followed by Capitalized Last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/, "Please enter a valid Contact Number. Example: 999-999-9999.");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }

    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckBox");

        // localStorage.setItem("1", "Dhruv");
        // console.log(localStorage.getItem("1"));
        // localStorage.removeItem("1");
        // console.log(localStorage.length);

        sendButton.addEventListener("click", function()
        {
            //event.preventDefault(); // for Debugging
            if(subscribeCheckBox.checked)
            {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact List Page");

        if(localStorage.length > 0) // check if localStorage has soemthing in it
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;

            //for every key in the keys collection loop
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // retrieve contact data from localstorage

                let contact = new core.Contact(); // creates an empty Contact object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                

                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click",function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }
                
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);
        
        switch (page) 
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        
                        // Add Contact
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);

                        //Refresh the contact-list page
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }    
                break;
            
            default:
                {
                    // get the cointact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // when Edit is pressed - update the record
                    $("#editButton").on("click", (event)=>
                    {
                        event.preventDefault();

                        // get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        // replace the item in localstorage
                        localStorage.setItem(page, contact.serialize());

                        // return to the contact-list
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                    
                }
                break;
        }
    }

    function DisplayLoginPage()
    {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;

            //create an empty user object
            let newUser = new core.User();

            // use jQuery shortcut to load the user.json file
            $.get("./Data/users.json", function(data)
            {
                // for every user in the users.json file, loop
                for (const user of data.users)
                {
                    // check if the username and password entered matches the user data
                    if(username.value == user.Username && password.value == user.Password)
                    {
                        // get the user data and assign it to our empty user object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                // if username and password matches..success! -> perform the login sequence
                if(success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());

                    //hide any error message
                    messageArea.removeAttr("class").hide();

                    // redirect the user to the secure area of the site - contact-list.html
                    location.href = "contact-list.html";
                }
                else
                {
                    // display an error message
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                }
            });

            
        });

        $("#cancelButton").on("click", function()
        {
            // clear the login form
            document.forms[0].reset();

            // return to the home page
            location.href = "home page";
        });
    }

    function CheckLogin()
    {
        // if user id logged in, then...
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for logout
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>`
            );

            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                //redirect back to login page
                location.href = "login.html";
            });
        }
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page");
    }

    // named function
    function Start()
    {
        console.log("App Started!!");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch (document.title) {
          case "Home":
            DisplayHomePage();
            break;
          case "Contact Us":
            DisplayContactPage();
            break;
          case "Contact-List":
            DisplayContactListPage();
            break;
          case "About Us":
            DisplayAboutPage();
            break;
          case "Our Products":
            DisplayProductsPage();
            break;
          case "Our Services":
            DisplayServicesPage();
            break;
          case "Edit":
            DisplayEditPage();
            break;
          case "Login":
            DisplayLoginPage();
            break;
          case "Register":
            DisplayRegisterPage();
            break;
        }

        
    }
    window.addEventListener("load", Start);
})();