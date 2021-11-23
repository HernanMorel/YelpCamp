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
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veniam in nobis nemo nihil placeat? Non possimus fuga nemo consequuntur expedita quas incidunt aut, eum debitis corrupti. Nostrum, harum repellat.',
                price: price,
                geometry:{
                    type: "Point",
                    coordinates: [-113.1331, 47.0202]
                },
                images:[
                    {
                        url: 'https://res.cloudinary.com/decgp7cjk/image/upload/v1637355158/YelpCamp/mdivlqcu5m0ov1tn5kpi.jpg',
                        filename: 'YelpCamp/mdivlqcu5m0ov1tn5kpi'
                    },
                    {
                        url: 'https://res.cloudinary.com/decgp7cjk/image/upload/v1637355163/YelpCamp/wtvcyoluyojb8psbymy6.jpg',
                        filename: 'YelpCamp/wtvcyoluyojb8psbymy6'
                    }
                ]
            })
            await camp.save()
        }
    }

    seedDB().then(() => {
        mongoose.connection.close();
    })