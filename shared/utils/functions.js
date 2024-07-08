
const UserModel = require("../../features-main/user/models/user.model");

const StoryModel = require("../../features-main/story/models/story.model");
const PersonModel = require("../../features-main/person/models/person.model");
const AddressModel = require("../../features-main/address/models/address.model");
const generateUniqueId = require("generate-unique-id");

class AllFunctions extends Error {

    getDisplay(label, data) {
        let display = {};
        switch (label) {
            case "user" :
                display.enterprise = data.enterprise?.label
                display.createdBy = data.createdBy?.person?.label;
                break;
            case "person" :
                display.adress = data.address?.address;
                display.createdBy = data.createdBy?.person?.label;
                break;
         
        }

        return display;
    }

    async compositePerson(data) {
        let person = {};
        person.address = data.address;
        person.label = data.firstName + " " + data.name;
        person.birthdayDate = data.birthdayDate;
        person.gender = data.gender;
        person.email = data.email;
        person.phone = data.phone;
        person.image = data.image;
        person.picture = data.picture
        person.cover = data.cover
        person.picture = data.picture;
        person.address = await this.compositeAddress(data);
        return PersonModel.create(person);
    }

    async compositeAddress(data) {
        let address = {};
        address.address = data.address;
        address.addressSuite = data.addressSuite;
        address.codePostal = data.codePostal;
        address.city = data.city;
        address.country = data.country;
        address.region = data.region;
        address.codeObject = this.makeObjectCode("address");
        return AddressModel.create(address);
    }

    getDayEnglish(label)  {
        let day =""
        switch (label) {
            case "Lundi" : day = "Monday"; break;
            case "Mardi" : day = "Tuesday"; break;
            case "Mercredi" : day = "Wednesday"; break;
            case "Jeudi" : day = "Thursday"; break;
            case "Vendredi" : day = "Friday"; break;
            case "Samedi" : day = "Saturday"; break;
            case "Dimanche" : day = "Sunday"; break;
        }
        return day
    }
   

    /**
     * transform date yyyy-mm-dd
     * @param date
     * @returns {string}
     */
    formatDate(date) {
        let d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    /**
     * get date french english
     * @param date
     * @returns {string}
     */
    getDateFrenchByEnglish(date) {
        let d = date.split("-");
        return d[2] + "-" + d[1] + "-" + d[0];
    }

    /**
     * get user connected
     * @param req
     */
    async getUserConnect(req) {
        let token;
        token = req.headers.authorization.split(" ")[1];
        token = token.replace('"', "");
        token = token.replace('"', "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return UserModel.findById(decoded.id);
    }

    /**
     * Save data in story
     * @param user
     * @param action
     * @param typeObject
     * @param initialObject
     * @param updatedObject
     * @returns {Document}
     */
    async saveStory(
        user,
        action,
        typeObject = "Utilisateur",
        initialObject,
        updatedObject
    ) {
        let story = new StoryModel();

       // story.positionUser = await this.getInfoConnection();

        story.typeObject = typeObject;
        story.initialObject = initialObject;
        story.updatedObject = updatedObject;

        story.action = action;
        story.user = user;
        story.date = new AllFunctions().formatDate(new Date());
        await story.save();
        return story;
    }



    /**
     * Reference trip folder
     * @param label
     */
    makeObjectCode(label) {
        //User > US-1324524
        let length = 6;
        let prefix = "";
        switch (label) {
            case "user":
                prefix = "USR";
                break;
            case "action":
                prefix = "ACT";
                break;
            case "year":
                prefix = "YEA";
                break;
    
            case "periods":
                prefix = "PER";
                break;
    
            case "bank":
                prefix = "BAN";
                break;
    
            //main
            case "country":
                prefix = "COU";
                break;

                default:
                    prefix="DEF"
        }

        let result = "";
        let characters = "1234567890";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return prefix + result;
    }

    generateCodeValidation() {
        //User > US-1324524
        return generateUniqueId({
            length: 6,
            excludeSymbols: [
                "a",
                "z",
                "e",
                "r",
                "t",
                "y",
                "u",
                "i",
                "o",
                "p",
                "q",
                "s",
                "d",
                "f",
                "g",
                "h",
                "j",
                "k",
                "l",
                "m",
                "w",
                "x",
                "c",
                "v",
                "b",
                "n",
            ],
        });
    }

   


    generateCode(length) {
        let result = "";
        let characters = "0123456789abcdefghijklmnopqrstuvwxyz";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


}

module.exports = AllFunctions;
