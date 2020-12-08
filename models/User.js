const {Schema, model, SchemaTypes} = require("mongoose");

const User = new Schema({
    username: {
        type: SchemaTypes.String,
        unique: true,
        required: true
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    },
    roles: [{type: SchemaTypes.String, ref: "Role"}]
});

module.exports = model("User", User);