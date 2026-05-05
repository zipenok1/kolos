const { Feedback } = require('../models/index')
const BaseService = require('./baseService')

class FeedbackService extends BaseService{
    constructor(){
        super(Feedback, 'id_feedback', {isImg: false})
    }
}

module.exports = new FeedbackService() 