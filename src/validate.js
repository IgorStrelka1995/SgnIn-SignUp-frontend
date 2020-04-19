
class Validate  {

    validName(name) {
        if(name.length === 0) {
            return {'name': 'Field name should not be blank'};
        } else if (name.length > 50) {
            return {'name': 'Field name should not be longer than 50 characters'};
        }
    }

    validSurname(surname) {
        if(surname.length === 0) {
            return {'surname': 'Field surname should not be blank'};
        } else if (surname.length > 50) {
            return {'surname': 'Field surname should not be longer than 50 characters'};
        }
    }

    validEmail(email) {
        if(!email) {
            return {'email': 'Field email should not be blank'};
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return {'email': 'Field email is not valid'};
        }
        
    }

    validPassword(password) {
        if(!password) {
            return {'password': 'Field password should not be blank'};
        } 
    }

    validUpPassword(password)
    {
        if(password.length === 0) {
            return {'password': 'Field password should not be blank'};
        } else if(password.length < 6) {
            return {'password': 'Field password should not be less than 6 characters'};
        } else if(password.length > 100) {
            return {'password': 'Field password should not be longer than 100 characters'};
        } else if(!/(?=.*[a-zA-Z])/.test(password)) {
            return {'password': 'Field password should has a letters'};
        } else if(!/(?=.*[0-9])/.test(password)) {
            return {'password': 'Field password should has a numbers'};
        } else if(!/(?=.*[!@#$%^&*])/.test(password)) {
            return {'password': 'Field password should has special symbols (!@#$%^&*)'};
        }
    }

    validCountry(country) {
        if(country.length === 0) {
            return {'country': 'Field country should not be blank'};
        } else if (country.length > 50) {
            return {'country': 'Field country should not be longer than 50 characters'};
        }
    }

    validCity(city) {
        if(city.length === 0) {
            return {'city': 'Field city should not be blank'};
        } else if (city.length > 50) {
            return {'city': 'Field city should not be longer than 50 characters'};
        }
    }

    validGender(gender) {
        if(gender.length === 0) {
            return {'gender': 'Field gender should not be blank'};
        }
    }

    validImage(image) {
        if(!image) {
            return {'image': 'Choose image'};
        } else if(image.type.substr(6) != "png" && image.type.substr(6) != "jpg" && image.type.substr(6) != "gif" && image.type.substr(6) != "jpeg") {
            return {'image': 'File format is not valid'};
        }
    }

}

export default Validate;