let mongoose = require('mongoose');

// create a model class
let incidentModel = mongoose.Schema({
    uid: {type: String, required: true},
    status: {type: String, enum: ["new", "inProgress", "dispatched", "closed"], default: "new"},
    description: {type: String, required: true},
    priority: {type: String, enum: ["prio1", "prio2", "prio3"], default: "prio1"},
    customerInfo: {
        displayName: {type: String, required: true},
        email: {type: String, required: true},
    },
    narrative: {type: String, required: true},
    resolution: {type: String}
},
{
    collection: "incidents",
    timestamps: true
});

module.exports = mongoose.model('Incident', incidentModel);
