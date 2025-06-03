import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for the menu item'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price must be a positive number']
  },
  image: String,
  category: {
    type: String,
    required: [true, 'Please provide a category']
  },
  options: [{
    name: {
      type: String,
      required: true
    },
    choices: [{
      name: String,
      price: {
        type: Number,
        default: 0
      }
    }],
    required: {
      type: Boolean,
      default: false
    },
    multiSelect: {
      type: Boolean,
      default: false
    }
  }],
  tags: [String],
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  spicyLevel: {
    type: Number,
    min: 0,
    max: 3,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  preparationTime: {
    type: Number,
    default: 15
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    allergens: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;