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
                for(let i = 0; i < 300; i++) {
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
                            coordinates: [
                            cities[random1000].longitude,
                            cities[random1000].latitude,
                            
                            ]
                        },
                        images:[
                            {
                                url: 'https://res.cloudinary.com/decgp7cjk/image/upload/v1638301249/YelpCamp/o6rms3y4oizpdvb9icid.jpg',
                                filename: 'YelpCamp/o6rms3y4oizpdvb9icid'
                            },
                            {
                                url: 'https://res.cloudinary.com/decgp7cjk/image/upload/v1638301249/YelpCamp/o6rms3y4oizpdvb9icid.jpg',
                                filename: 'YelpCamp/o6rms3y4oizpdvb9icid'
                            }
                        ]
                    })
                    await camp.save()
                }
            }
          
    seedDB().then(() => {
        mongoose.connection.close();
    })