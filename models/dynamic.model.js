module.exports = function(mongoose){
    return [{
    name: {type: String, required: true},
    description: {type: String},
    uniqueId: { type: String, required: true, index: true, unique: true},
    email: {type: String},
    authorSite: {type: String},
    authorImg: {type: String},
    banner: {type: String},
    authorTag: {type: String},
    location: {type: String},
    slug: {type: String},
    socialLinks: {type: Object},
    isApplicationUser: {type: Boolean, default: false},
    status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']},
    appUserDetails: {
        id: {type: mongoose.Schema.Types.ObjectId},
        email: {type: String}
    }
}, {
    timestamps: true,
    createdby: true,
    updatedby: true
}]
};