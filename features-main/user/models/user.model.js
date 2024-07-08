const crypto = require("crypto");
const mongoose = require("mongoose");
//const {isEmail} = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MainSchema = require("./../../../shared/models/main.model");

const userSchema = new mongoose.Schema(
    {
        // If the staff have operator
        person: {
            type: mongoose.Schema.ObjectId,
            ref: "person",
        },
        picture: String,

        cover: String,
        display: Object,

        completedProfile:String,

        //user account
        username: {
            type: String,
            require: true,
            minlength: 4,
            maxlength: 200,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },

        anceintEmailTemp: {
            type: String,
            default: ""
        },
        //information temporaire lors du changement de mot de passe
        codeEmail: {
            type:String,
            default:""
        },
        emailTemp:  {
            type:String,
            default:""
        },
        confirmCodeValidationEmail:  {
            type:String,
            default:""
        },

        password: {
            type: String,
            require: true,
            minlength: 2,
            maxlength: 1024,
            trim: true,
            required: true,
            select: false,
        },

        typeAccount: {
            type: String,
            enum: ["Particulier", "Pro", "Admin", "Root"],
            default: "Particulier",
        },

        role :{
            type: String,
            enum: ["Utilisateur", "Administrateur", "Admnistrateur Root"],
            default: "Utilisateur",
        },

        budgetGoldSettings: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "budget-gold",
            default: null,
          },

        isActive: Boolean,
        phone: String,

        location: {
            // GeoJSON Point
            type: {
                type: String,
                enum: ["Point"],
            },
            coordinates: {
                type: [Number],
                index: "2dsphere",
            },
            formattedAddress: String,
            street: String,
            city: {
                type: mongoose.Schema.ObjectId,
                ref: "city",
            },
            state: String,
            zipcode: String,
            country: String,
            lng: String,
            lat: String,
        },
        activation: {
            status: {
                type: Boolean,
                default: false,
            },
            code: {
                type: Number,
                minlength: 5,
                maxlength: 5,
            },
            dateSending: {
                type: Date,
                default: Date.now,
            },
            dateActive: {
                type: Date,
            },
        },
        connexion: {
            firstConnexion: {
                type: Date,
                default: Date.now,
            },
            lastConnexion: {
                type: Date,
                default: Date.now,
            },
            lastSession: {
                os: {
                    platform: {
                        type: String,
                    },
                    version: {
                        type: String,
                    },
                },
                device: {
                    type: String,
                },
                ip: {
                    type: String,
                },
                isMobile: {
                    type: String,
                },
                isTablet: {
                    type: String,
                },
                isDesktop: {
                    type: String,
                },
                all: {
                    type: JSON,
                },
            },
            network: {
                type: JSON,
            },
            completeAddress: {
                type: JSON,
            },
            completeLocation: {
                type: JSON,
            },
        },

        emergencyInformation: [
            {
                emergencyContact: String,
                emergencyPhone: String,
            }
        ],


        security: {
            doubleFactor: Boolean,
            smsAuthentication: Boolean,
            reCAPTCHA: Boolean,

            phone: String,
            email: String,

            emailTemp: {
                type: String,
                default: ""
            },

            codeValidationEmail: {
                type: String,
                default: ""
            },
            codeValidationSMS: {
                type: String,
                default: ""
            },

            verifyEmail: Boolean,
            verifySMS: Boolean,

            phoneVerifies: [String],
            emailVerifies: [String],

        },
        createBy: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },

        token: String,
        tokenMinus: String,

        titleUser: {
            label: String,
            data: Object,
        },

        permissions: [Object],
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const UserModel = mongoose.model("user", userSchema);

userSchema.add(MainSchema);
module.exports = UserModel;
