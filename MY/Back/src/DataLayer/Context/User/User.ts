import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import uniqueString from 'unique-string';
import { IUserAttrs } from './IUserAttr';
import { IUserDoc } from './iUserDock';
import { IUserModel } from './IUserModel'

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, require: false },
    email: { type: String, defult: null },
    gender: { type: Number, require: true },
    isAdmin: { type: Boolean, require: true, default: false },
    isActive: { type: Boolean, default: false },
    nationalId: { type: String },
    poster: { type: String },
    confirmEmail: { type: Boolean, default: false },
    towFactorEnabled: { type: Boolean, default: false },
    avatar: { type: String },
    userRole: {
        type: Schema.Types.ObjectId,
        ref: 'UserRole',
    },
    birthDate: { type: Date },
    locked: { type: Boolean, default: false },
    lockedDate: { type: Date, default: null },
    accountFail: { type: Number, default: 0 },
    password: { type: String, require: true },
    securityStamp: { type: String },
}, {
    toJSON: { virtuals: true },
})

// UserSchema.plugin(BaseSchema);

UserSchema.pre('updateOne', function () {
    this.set({ securityStamp: uniqueString() });
});


UserSchema.statics.build = (attrs: IUserAttrs) => {
    return new UserEntite(attrs);
}

UserSchema.virtual("travelRequestId", {
    foreignField: "travelRequestId",
    ref: "TravelRequest",
    localField: "travelRequestId"
})

const UserEntite = mongoose.model<IUserDoc, IUserModel>("User", UserSchema);

export { UserEntite }