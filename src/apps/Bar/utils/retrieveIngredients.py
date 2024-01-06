import json

# open the JSON file
with open("cocktails.json", "r") as f:
    # load the JSON object from the file
    cocktails = json.load(f)

# initialize the list of ingredients
ingredients = []

# iterate through the cocktails
for cocktail in cocktails:
    # iterate through the ingredients in the cocktail
    for ingredient in cocktail['ingredients']:
        # split the ingredient by the first space character to separate the measurement from the name
        measurement, name = ingredient.split(' ', 1)
        # add the name of the ingredient to the list of ingredients if it's not already in the list
        if name not in ingredients:
            ingredients.append(name)

# convert the list of ingredients to a JSON object
ingredients_json = json.dumps(ingredients)

# write the JSON object to a file
with open("ingredients.json", "w") as f:
    f.write(ingredients_json)