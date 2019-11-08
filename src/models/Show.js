import mongoose from 'mongoose';
import Item from './Item';

Item.discriminator('Show', new mongoose.Schema({
  season: { type: Number, required: true },
}),
);

module.exports = mongoose.model('Show');
