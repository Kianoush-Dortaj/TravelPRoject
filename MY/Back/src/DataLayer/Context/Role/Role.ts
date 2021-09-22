import mongoose from 'mongoose';
import uniqueString from 'unique-string';
// import { BaseSchema } from './BaseSchema';
import { Schema } from 'mongoose';
import { IRoleAttrs } from './IRoleAttrs';
import { IRoleDoc } from './IRoleDoc';
import { IRoleModel } from './IRoleModel';

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rolePermissionId: {
        type:[
        {
            type: Schema.Types.ObjectId,
            ref: 'RolePermission',
        }],
        required: false
    },
    securityStamp: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
})

// RoleSchema.plugin(BaseSchema);

RoleSchema.pre('save', function () {
    this.set({ securityStamp: uniqueString() });
});

RoleSchema.pre('updateOne', function () {
    this.set({ securityStamp: uniqueString() });
});


RoleSchema.statics.build = (attrs: IRoleAttrs) => {
    return new RoleEntitie(attrs);
}


const RoleEntitie = mongoose.model<IRoleDoc, IRoleModel>("Role", RoleSchema);

export { RoleEntitie }