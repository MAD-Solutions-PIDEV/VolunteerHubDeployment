const News = require("../models/news");
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const { query } = require("express-validator");
const { validationResult } = require('express-validator');




const addNews = async (req, res, next) => {
    try {
        const { filename } = req.file;
        const { title,
            description,
        } = req.body;
        const news = new News({ title, description, imageNews: filename });
        const addedNews = await news.save();
        res.status(200).json(addedNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateNews = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { filename } = req.file || {};
        const { title,
            description,
            author } = req.body;
        const checkIfNewsExists = await News.findById(id);
        if (!checkIfNewsExists) {
            throw new Error("news not found !");
        }
        const updatedNews = await News.findByIdAndUpdate(id, {
            $set: {
                title,
                description,
                imageNews: filename
            }
        }, { new: true })

        res.status(200).json(updatedNews);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params;
        const checkIfNewsExists = await News.findById(id);
        if (!checkIfNewsExists) {
            throw new Error("news not found !");
        }
        await checkIfNewsExists.remove();
        res.status(200).json("news deleted succefully")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNews = async (req, res, next) => {
    try {
        const news = await News.find();
        if (!news || news.length === 0) {
            throw new Error("news not found !");
        }

        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNewsUnitedNations = async (req, res, next) => {
    try {
        const response = await axios.get('https://news.un.org/en/news/topic/sdgs');
        const $ = cheerio.load(response.data);
        let articles = [];
        $('div.views-row').each(async (i, el) => {
            const title = $(el).find('span.field--name-title').text().trim();
            const description = $(el).find('div.field--name-field-news-story-lead').text().trim();
            const imageNews =  $(el).find('img').attr('src');
            const date = $(el).find('span.field--name-field-news-date').text().trim();
//            const sdg = $(el).find('span.badge ').text().trim();
            const datetime = $(el).find('time').attr('datetime');

            const author = "United nations"
            let isExisted = false
            articles.push({ title, description, imageNews, author, datetime });
            if (title) {
                newsByTitle = await News.find({ title: { $regex: new RegExp(title, "i") } }); // search for news by title using regex
                if (newsByTitle.length !== 0) {
                    isExisted = true
                }
            }
            if (!isExisted && title && description && imageNews && title.length < 150) {
                const news = new News({ title, description, imageNews, author});
                await news.save();
                //  res.status(200).json(addedNews);
            }
        });
        //res.status(200).json(articles);
        await res.send(articles);
        //await res.send("News added success message");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching news');
    }
};

const getNewsBBcAfrica = async (req, res, next) => {
    try {
        const response = await axios.get('https://www.bbc.com/news/world/africa');
        const $ = cheerio.load(response.data);
        let articles = [];

        const dateSysthme = new Date();


        $('div.gs-c-promo').each(async (i, el) => {
            const title = $(el).find('h3.gs-c-promo-heading__title').text().trim();
            const description = $(el).find('p.gs-c-promo-summary').text().trim();
            let ImageUrl = $(el).find('img').attr('data-src');

            if (typeof ImageUrl !== 'undefined') {
                var imageNews = ImageUrl.replace("{width}", 240);
                // rest of your code
            }

            const datetime = $(el).find('time.qa-status-date').attr('datetime');

            const author = "BBC"
            let isExisted = false
            let isExistedInTable = false
            const article = articles.find(a => a.title === title);
            if (article) {
                isExistedInTable = true
            } else {
                articles.push({ title, description, imageNews, author, datetime });
            }



            if (title) {
                newsByTitle = await News.find({ title: { $regex: new RegExp(title, "i") } }); // search for news by title using regex
                if (newsByTitle.length !== 0) {
                    isExisted = true
                }
            }


            const dateNews = new Date(datetime);



            // Get the number of milliseconds for each date
            const time1 = dateSysthme.getTime();
            const time2 = dateNews.getTime();

            // Calculate the difference in milliseconds between the two dates
            const diffInMs = time1 - time2;

            // Convert the difference to days
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

            //  if (!isExistedInTable && !isExisted && title && description && imageNews ) {

            if (!isExistedInTable && !isExisted && title && description && imageNews && diffInDays <= 1) {
                const news = new News({ title, description, imageNews, author });
                await news.save();
                //  res.status(200).json(addedNews);
            }
        });
        //res.status(200).json(articles);
        await res.send(articles);
        //await res.send("News added success message");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching news');
    }
};


const getSingleNews = async (req, res, next) => {
    try {
        const { id } = req.params;

        const news = await News.findById(id);

        if (!news) {
            throw new Error("news not found !");
        }

        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getNewsPagination = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const skip = (page - 1) * limit;
    
        const news = await News.find().skip(skip).limit(limit);
        const total = await News.countDocuments();
        res.json({ news, total });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
}




module.exports = {
    addNews,
    updateNews,
    deleteNews,
    getSingleNews,
    getNews,
    getNewsUnitedNations,
    getNewsBBcAfrica,
    getNewsPagination
}
