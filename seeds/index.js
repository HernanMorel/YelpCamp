const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => {
        console.log("Mongo Connection Error!")
        console.log(err)
    });

    const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
     await Campground.deleteMany({});
        for(let i = 0; i < 50; i++){
         const random1000 = Math.floor(Math.random() * 1000);
         const price = Math.floor(Math.random() *20) + 10;
            const camp= new Campground({
                author: '6195794e80b8796f4eeada98',
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                image: 'https://source.unsplash.com/collection/483251',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veniam in nobis nemo nihil placeat? Non possimus fuga nemo consequuntur expedita quas incidunt aut, eum debitis corrupti. Nostrum, harum repellat.',
                price: price
            })
            await camp.save()
        }
    }

    seedDB().then(() => {
        mongoose.connection.close();
    })