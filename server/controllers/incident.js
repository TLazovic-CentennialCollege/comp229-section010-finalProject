let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Incident = require('../models/incident');

module.exports.getIncidents = (req, res, next) => {
    Incident.find((err, incidents) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            let incs = [];
            for (let i = 0 ; i < incidents.length; i++){
                let incident = incidents[i];
                incs.push({
                    id: incident._id.toString(),
                    uid: incident.uid,
                    status: incident.status,
                    description: incident.description,
                    priority: incident.priority,
                    customerInfo: {
                        displayName: incident.customerInfo.displayName,
                        email: incident.customerInfo.email
                    },
                    narrative: incident.narrative,
                    resolution: incident.resolution,
                    updatedAt: incident.updatedAt
                })
            }

            res.json(incs);
        }
    });
}

module.exports.create = (req, res, next) => {
    let newIncident = new Incident({
        uid: req.body.uid,
        status: req.body.status,
        description: req.body.description,
        priority: req.body.priority,
        customerInfo: {
            displayName: req.body.customerInfo.displayName,
            email: req.body.customerInfo.email
        },
        narrative: req.body.narrative,
        resolution: req.body.resolution
    });

    Incident.create(newIncident, (err, incident) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             res.json({success: true, msg: 'Successfully Added New Book', incident: {
                    id: incident._id.toString(),
                    uid: incident.uid,
                    status: incident.status,
                    description: incident.description,
                    priority: incident.priority,
                    customerInfo: {
                        displayName: incident.customerInfo.displayName,
                        email: incident.customerInfo.email
                    },
                    narrative: incident.narrative,
                    resolution: incident.resolution,
                    updatedAt: incident.updatedAt
                }
            });
        }
    });
}

module.exports.update = (req, res, next) => {
    let toUpdate = {
        uid: req.body.uid,
        status: req.body.status,
        description: req.body.description,
        priority: req.body.priority,
        customerInfo: {
            displayName: req.body.customerInfo.displayName,
            email: req.body.customerInfo.email
        },
        narrative: req.body.narrative,
        resolution: req.body.resolution
    }

    let options = { upsert: false, new: true };
    Incident.findByIdAndUpdate(req.body.id, { $set: toUpdate }, options, (err, incident) => {
        if(err)
        {
            console.log("Error: Updating User");
            return res.status(404).json({error: {errorCode: 1}});
        }
        else
        {
            return res.json({success: true, msg: 'Incident Updated Successfully!', incident: {
                    id: incident._id.toString(),
                    uid: incident.uid,
                    status: incident.status,
                    description: incident.description,
                    priority: incident.priority,
                    customerInfo: {
                        displayName: incident.customerInfo.displayName,
                        email: incident.customerInfo.email
                    },
                    narrative: incident.narrative,
                    resolution: incident.resolution,
                    updatedAt: incident.updatedAt
                }
            });
        }
    });
}
