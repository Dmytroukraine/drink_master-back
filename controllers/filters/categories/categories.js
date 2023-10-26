

const getAllCategories = async (req, res) => {
    
    const categories = await Cocktail.distinct("category"); 
}