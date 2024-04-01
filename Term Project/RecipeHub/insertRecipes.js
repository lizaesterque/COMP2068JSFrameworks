const mongoose = require('mongoose');
const Recipe = require('./models/recipe'); // Adjust the path as per your project structure






const recipesToAdd = [
    {
        title: "Lemon-Glazed Carrots",
        ingredients: ["Carrots", "Butter", "Brown sugar","Lemon juice", "Salt", "Black pepper"],
        instructions: "Place carrots into a large pot and cover with water; bring to a boil. Reduce heat to medium-low and simmer until carrots are tender, about 8 minutes. Drain.Heat butter in a skillet over medium heat; cook and stir carrots, brown sugar, and lemon juice in the melted butter, stirring often, until sugar has dissolved, 2 minutes.",
        imageUrl: "https://thewholecook.com/wp-content/uploads/2018/03/Lemon-Thyme-Roasted-Carrots-by-The-Whole-Cook-vertical.jpg",
    },
    {
        title: "Crockpot Italian Chicken",
        ingredients: ["Italian dressing", "Parmesan cheese","chicken breasts"],
        instructions: "Stir Italian dressing and Parmesan cheese together in a bowl.Place chicken in a slow cooker, and pour dressing mixture over chicken. Cover and cook on Low until chicken is tender, no longer pink in the center, and the juices run clear, about 8 hours.  spaghetti until al dente. In a separate pan, fry bacon until crispy. Mix cooked spaghetti with beaten eggs, grated Parmesan cheese, and crispy bacon. Serve hot.",
        imageUrl: "https://www.the-girl-who-ate-everything.com/wp-content/uploads/2009/07/crockpot-italian-chicken-11-1152x1536.jpg",
    },
    {
        title: "Cheesy Hamburger Rice Casserole",
        ingredients: ["ground beef", "mushroom soup", "Tomatoes", "Rice", "Mozzarella","Salt", "pepper"],
        instructions: "Crumble the ground beef into a skillet over medium-high heat. Cook and stir until evenly browned. Drain off grease, and stir in the cream of mushroom soup, tomatoes, and uncooked rice. Cover, and simmer over low heat, stirring occasionally, until rice is cooked, about 15 minutes, preheat the oven's broiler. When the rice is done cooking, transfer the contents of the skillet to a casserole dish. Cover with a layer of cheese, Broil until the cheese is melted and toasty. Season with salt and pepper to taste, and enjoy!  spaghetti until al dente. In a separate pan, fry bacon until crispy. Mix cooked spaghetti with beaten eggs, grated Parmesan cheese, and crispy bacon. Serve hot.",
        imageUrl: "https://www.berlyskitchen.com/wp-content/uploads/2023/08/Cheesy-Hamburger-Rice-Casserole-2-13-1.jpg",
    },
    {
        title: "Buttered Noodles",
        ingredients: ["Noodles", "Butter", "Parmesan", "Salt", "Pepper"],
        instructions: "Boil the fettuccine in lightly salted water until it's tender, yet still firm. Drain the pasta in a colander, then return it to the pot. Mix butter, cheese, salt, and pepper into the cooked noodles until all the ingredients are evenly combined. ",
        imageUrl: "https://www.allrecipes.com/thmb/_-fntqlbxLl8Nx3Ll5apxQFGF9Q=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/244458-buttered-noodles-DDMFS-4x3-b9931662efa64b37883c0f73b296b124.jpg",
    },


    {
        title: "Pasta Carbonara",
        ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan Cheese", "Black Pepper"],
        instructions: "Cook spaghetti until al dente. In a separate pan, fry bacon until crispy. Mix cooked spaghetti with beaten eggs, grated Parmesan cheese, and crispy bacon. Serve hot.",
        imageUrl: "https://www.simplyrecipes.com/thmb/SebeiYFLjCD0TivmMJj_HRUC7zg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Spaghetti-Carbonara-LEAD-6-b3880a6eb49f4158be6f13885c797ded.jpg",
    },


    
];

// Add recipes to the database
Recipe.insertMany(recipesToAdd)
    .then(() => {
        console.log('Recipes added successfully');
        mongoose.connection.close(); // Close the connection after adding recipes
    })
    .catch((err) => {
        console.error('Error adding recipes:', err);
        mongoose.connection.close(); // Close the connection in case of error
    });

