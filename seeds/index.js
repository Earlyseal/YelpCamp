const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

const dbUrl = process.env.DB_URL;
// mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
    console.log("MONGO CONNECTION OPEN");
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '652d72f3eb62ba28548e2290',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Recusandae, maxime corporis ullam possimus qui provident, blanditiis quo repellat expedita rem eaque quae voluptatibus obcaecati temporibus dolore voluptatem quos alias iusto!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/da9qjcuq2/image/upload/v1697651844/YelpCamp/znrsd5et7akh8jfbpmzj.jpg',
                    filename: 'YelpCamp/znrsd5et7akh8jfbpmzj'

                },
                {
                    url: 'https://res.cloudinary.com/da9qjcuq2/image/upload/v1697651844/YelpCamp/ghuwqiu7fvydrem8pxxc.jpg',
                    filename: 'YelpCamp/ghuwqiu7fvydrem8pxxc'

                }

            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});