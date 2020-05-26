import mongoose from "mongoose";
const EnterpriseSchema = mongoose.Schema;

interface EnterpriseMemberDoc extends mongoose.Document {
    enterpriseName: string;
    euid: string;
    uuid: string;
    csl: string; //CSL = "MEGA" | "SUPER" | "MERCHANT" | "AREA" | "MOBILE";
    ety: string; //"COOPERATIVE-ENTERPRISE";
    userEmail: string;
    position: string; //'PRESIDENT'|'VICE PRECIDENT'|'SECRETARY'|'TREASURER'|'DIRECTOR'|'MEMBER'
    tel: string;
    level: number;
    status: boolean;
    timestamp: number;
    lastModified?: number;
}
interface EnterpriseAttrs {
    enterpriseName: string;
    euid: string;
    uuid: string;
    csl: string; //CSL = "MEGA" | "SUPER" | "MERCHANT" | "AREA" | "MOBILE";
    ety: string; //"COOPERATIVE-ENTERPRISE";
    userEmail: string;
    position: string; //'PRESIDENT'|'VICE PRECIDENT'|'SECRETARY'|'TREASURER'|'DIRECTOR'|'MEMBER'
    tel: string;
    level: number;
    status: boolean;
    timestamp: number;
    lastModified?: number;
}

interface EnterpriseModel extends mongoose.Model<EnterpriseMemberDoc> {
    build(attrs: EnterpriseAttrs): EnterpriseMemberDoc;
}
const enterpriseSchema = new EnterpriseSchema({
    enterpriseName: {
        type: String,
        required: true
    },
    euid: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    csl: {
        type: String,
        required: true
    },
    ety: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    lastModified: {
        type: Number,

    },

},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.pin;
                delete ret.__v;
            }
        }
    }
);
enterpriseSchema.statics.build = (attrs: EnterpriseAttrs) => {

    return new Enterprise(attrs);
}
const Enterprise = mongoose.model<EnterpriseMemberDoc, EnterpriseModel>('Enterprise', enterpriseSchema)
export { Enterprise };















