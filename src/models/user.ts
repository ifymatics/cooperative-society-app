
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema;

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    pin: string;
    tel: string;
    gender: string;
    dateOfBirth?: string | number | null;
    monthOfBirth?: string | number | null;
    yearOfBirth?: string | number | null;
    maritalStatus: string;
    countryOfOrigin?: string | null;
    stateOfOrigin?: string | null;
    localGovernmentOfOrigin?: string | null;
    cityTownOfOrigin?: string | null;
    stateRegionProvinceOfOrigin?: string | null;
    countryOfResident?: string;
    stateRegionProvinceOfResident?: string | null;
    cityTownOfResident?: string | null;
    postalCode?: string | null;
    homeAddress?: string | null;
    lastModified?: number;
    isNigeria: boolean;
    isEmailVerified?: boolean;
    isTelVerified?: boolean;
    isAdmin: boolean;
    isDev: boolean;
    isAgent: boolean;
    isEnabled: boolean;
    uid: string;
    timestamp: number;
    nairaPurseNumber: string;
    bonusPurseNumber: string;
    incomePurseNumber: string;
    esusuPurseNumber: string;
    loanPurseNumber: string;
    insurancePurseNumber: string;
    assurancePurseNumber: string;
    pensionPurseNumber: string;
    housingPurseNumber: string;
    educationPurseNumber: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;

    firstName: string;
    lastName: string;
    middleName?: string | null;
    pin: string;
    tel: string;
    gender: string;
    dateOfBirth?: string | number | null;
    monthOfBirth?: string | number | null;
    yearOfBirth?: string | number | null;
    maritalStatus: string;
    countryOfOrigin?: string | null;
    stateOfOrigin?: string | null;
    localGovernmentOfOrigin?: string | null;
    cityTownOfOrigin?: string | null;
    stateRegionProvinceOfOrigin?: string | null;
    countryOfResident?: string;
    stateRegionProvinceOfResident?: string | null;
    cityTownOfResident?: string | null;
    postalCode?: string | null;
    homeAddress?: string | null;
    lastModified?: number;
    isNigeria: boolean;
    isEmailVerified?: boolean;
    isTelVerified?: boolean;
    isAdmin: boolean;
    isDev: boolean;
    isAgent: boolean;
    isEnabled: boolean;
    uid: string;
    timestamp: number;
    nairaPurseNumber: string;
    bonusPurseNumber: string;
    incomePurseNumber: string;
    esusuPurseNumber: string;
    loanPurseNumber: string;
    insurancePurseNumber: string;
    assurancePurseNumber: string;
    pensionPurseNumber: string;
    housingPurseNumber: string;
    educationPurseNumber: string;
}

const userSchema = new UserSchema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
        },
        pin: {
            type: String,
            required: true
        },
        tel: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,

        },
        monthOfBirth: {
            type: String,

        },
        yearOfBirth: {
            type: String,

        },
        maritalStatus: {
            type: String,
            required: true
        },
        countryOfOrigin: {
            type: String,

        },
        stateOfOrigin: {
            type: String,

        },
        localGovernmentOfOrigin: {
            type: String,

        },
        cityTownOfOrigin: {
            type: String,

        },

        countryOfResident: {
            type: String,

        },
        stateRegionProvinceOfResident: {
            type: String,

        },
        cityTownOfResident: {
            type: String,

        },
        postalCode: {
            type: String,

        },
        homeAddress: {
            type: String,

        },
        lastModified: {
            type: String,

        },
        isNigeria: {
            type: Boolean,
            required: true
        },
        isEmailVerified: {
            type: Boolean,

        },
        isTelVerified: {
            type: Boolean

        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        isDev: {
            type: Boolean,
            required: true
        },
        isAgent: {
            type: Boolean,
            required: true
        },
        isEnabled: {
            type: Boolean,

        },
        uid: {
            type: String,

        },
        timestamp: {
            type: String,
            required: true
        },
        nairaPurseNumber: {
            type: String,

        },
        bonusPurseNumber: {
            type: String,

        },
        incomePurseNumber: {
            type: String,

        },
        esusuPurseNumber: {
            type: String,

        },
        loanPurseNumber: {
            type: String,

        },
        insurancePurseNumber: {
            type: String,
            required: true
        },
        assurancePurseNumber: {
            type: String,

        },
        pensionPurseNumber: {
            type: String,

        },
        housingPurseNumber: {
            type: String,

        },
        educationPurseNumber: {
            type: String,

        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },

    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);

// userSchema.pre('save', async function (done) {
//     if (this.isModified('password')) {
//         const hashed = await Encrypt.generatePassword(this.get('password'));
//         this.set('password', hashed);
//     }
//     done();
// });

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };
