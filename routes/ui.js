const express = require('express');
const routes = express.Router();
const ui_ctrl = require('../ctrl/ui.ctrl');

routes.get('/slider', ui_ctrl.getSlider)

module.exports = routes;
