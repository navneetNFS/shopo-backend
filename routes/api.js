const express = require('express');
const route = express.Router();
const api_ctrl = require('../ctrl/api.ctrl');

route.get('/slider',api_ctrl.getSlider)
route.post('/slider',api_ctrl.postSlider)

module.exports = route;