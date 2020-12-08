const {Schema, model, SchemaTypes} = require("mongoose");

const Role = new Schema({
    value: {
        type: SchemaTypes.String,
        unique: true,
        default: "USER"
    }
});

module.exports = model("Role", Role);