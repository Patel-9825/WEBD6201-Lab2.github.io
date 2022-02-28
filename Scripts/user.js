(function(core){

    class User
    {
        // Constructor
        constructor(firstName = "", lastName = "", emailAddress = "", username = "", password = "")
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }

        // overridden methods
        toString()
        {
            return `First Name : ${this.FirstName}\nLast Name : ${this.LastName}\nEmail Address : ${this.EmailAddress}\nUsername : ${this.Username}`;
        }

        // utility methods
        toJSON()
        {
            return {
                "FirstName": this.FirstName,
                "LastName": this.LastName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username
            }
        }

        fromJSON(data)
        {
            this.FirstName = data.FirstName;
            this.LastName = data.LastName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        serialize() 
        {
            if (this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== "") 
            {
                return `${this.FirstName},${this.LastName},${this.EmailAddress}`;
            }
            console.error("One or more properties of User Object are missing or maybe empty");
            return null;
        }

        deserialize(data) 
        {
            let propertyArray = data.split(",");
            this.FirstName = propertyArray[0];
            this.LastName = propertyArray[1];
            this.EmailAddress = propertyArray[2];
            this.Username = propertyArray[3];
        }
    }

    core.User = User;
})(core || (core={}));