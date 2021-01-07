const input = require("./input");
const colors = require("colors");

const containsRegex = /\(contains .+\)/;

const assessAllergens = (input, first = true) => {
    const allIngredients = {};
    const associatedIngredients = {};
    const allergensDict = input.reduce((acc, cur) => {
        const [containsString] = cur.match(containsRegex);
        const allergensArray = containsString.slice(10, containsString.length - 1).split(", ");
        const ingredientsArray = cur.replace(containsRegex, "").trim().split(" ");
        ingredientsArray.forEach((ingredient) => {
            allIngredients[ingredient] = allIngredients[ingredient] + 1 || 1;
        });
        allergensArray.forEach((allergen) => {
            if (!acc[allergen]) {
                acc[allergen] = {};
            }
            ingredientsArray.forEach((ingredient) => {
                acc[allergen][ingredient] = acc[allergen][ingredient] + 1 || 1;
            });
        });
        return acc;
    }, {});

    let changeMade = true;
    while (changeMade) {
        changeMade = false;
        const activeAllergens = Object.keys(allergensDict).filter((allergen) => !associatedIngredients[allergen]);
        activeAllergens.forEach((allergen) => {
            let max = -Infinity;
            let ingredientName = null;
            let onlyMax = false;
            const ingredients = Object.keys(allergensDict[allergen]);
            for (let i = 0; i < ingredients.length; i++) {
                if (allergensDict[allergen][ingredients[i]] > max) {
                    max = allergensDict[allergen][ingredients[i]];
                    ingredientName = ingredients[i];
                    onlyMax = true;
                } else if (allergensDict[allergen][ingredients[i]] === max) {
                    onlyMax = false;
                }
            }
            if (onlyMax && ingredientName !== "") {
                associatedIngredients[allergen] = ingredientName;
                Object.keys(allergensDict).forEach((allAllergen) => {
                    if (allergensDict[allAllergen][ingredientName]) {
                        delete allergensDict[allAllergen][ingredientName];
                    }
                });
                delete allIngredients[ingredientName];
                changeMade = true;
            }
        });
    }

    if (first) {
        return Object.keys(allIngredients).reduce((acc, cur) => {
            return acc + allIngredients[cur];
        }, 0);
    }

    return Object.keys(associatedIngredients)
        .sort()
        .map((key) => associatedIngredients[key])
        .join(",");
};

console.log("--- Day 21: Allergen Assessment ---".bold.bgGreen + "\n");
console.log("PART 1:".yellow.bold);

console.log("ANSWER\n".bold + assessAllergens(input).toString().cyan + "\n");

console.log("PART 2:".yellow.bold);

console.log("ANSWER\n".bold + assessAllergens(input, false).toString().cyan + "\n");
