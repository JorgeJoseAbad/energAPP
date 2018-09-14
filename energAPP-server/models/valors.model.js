const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;


const ValorsSchema = new Schema({
  archivename:{
    type: String,
  },
  averages:{
    type: Object,
  },
  increments:{
    type: Object,
  },
  maxmin:{
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now
  },

  /*_author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  date: {
    type: Date,
    default: Date.now
  },*/
});

const Valor = mongoose.model('Valor', ValorsSchema);
module.exports = Valor;
