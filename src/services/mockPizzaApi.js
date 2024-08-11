export const getAllPizzas = async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();
    
    // Transform the data to match our pizza structure
    const pizzas = data.recipes.map(recipe => ({
      _id: recipe.id.toString(),
      name: recipe.name,
      description: recipe.instructions.slice(0, 100) + '...',
      price: parseFloat((Math.random() * (15 - 8) + 8).toFixed(2)),
      imageUrl: recipe.image
    }));
    return pizzas;
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    throw error;
  }
};

export const getPizzaById = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`);
    const recipe = await response.json();
    
    // Transform the data to match our pizza structure
    const pizza = {
      _id: recipe.id.toString(),
      name: recipe.name,
      description: recipe.instructions.slice(0, 100) + '...',
      price: parseFloat((Math.random() * (15 - 8) + 8).toFixed(2)),
      imageUrl: recipe.image
    };
    return pizza;
  } catch (error) {
    console.error('Error fetching pizza:', error);
    throw error;
  }
};