const parseJson = async (req, res, next) => {

     let ingridients = req.body.ingredients;

     if (typeof req.body.ingredients === "string") {
       ingridients = JSON.parse(req.body.ingredients);
     }
    req.body.ingredients = ingridients;
    next()
};

module.exports = parseJson;
