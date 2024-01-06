# Drinks list credit to https://github.com/daveturnbull/cocktails
# I just built a script to convert the text file to JSON

import json

# open the text file decode with utf-8
with open("./cocktails.txt", "r", encoding="utf-8") as f:
    # initialize variables
    cocktails = []
    current_cocktail = {}
    lines = f.readlines()
    for line in lines:
        # if the line starts with '#', it's a new cocktail
        if line[0] == '#':
            # add the current cocktail to the list of cocktails
            if current_cocktail:
                cocktails.append(current_cocktail)
            # initialize the new cocktail
            current_cocktail = {}
            # remove a;l the '#' and whitespace from the line and set it as the name of the cocktail
            
            # Sometimes these names are ending up with ElysÃ
            # I think it's because of the encoding of the text file
            # To fix this, I'm going to try to decode the string
            # I'm not sure if this will work, but I'm going to try it
            decoded_string = line[4:].strip()
            current_cocktail['name'] = decoded_string
        # if the line starts with '-', it's an ingredient
        elif line[0] == '-':
            # initialize the ingredients list if it doesn't exist yet
            if 'ingredients' not in current_cocktail:
                current_cocktail['ingredients'] = []
            # remove the leading '-' and whitespace from the line and add it to the ingredients list
            if line[2] != '-':
            		current_cocktail['ingredients'].append(line[1:].strip())
        # if the line starts with '_', it's the mix method
        elif line[0] == '_':
            # remove the leading '_' and whitespace from the line and set it as the mix method
            current_cocktail['mix_method'] = line[1:].strip().replace('_', '')
        # if the line starts with '>', it's a note
        elif line[0] == '>':
            # remove the leading '>' and whitespace from the line and set it as the note
            current_cocktail['note'] = [line[1:].strip()]
        else:
            if line.strip():
                if 'note' not in current_cocktail:
                    current_cocktail['note'] = [line.strip()]
                else:
                    current_cocktail['note'].append(line.strip())


    # add the last cocktail to the list of cocktails
    cocktails.append(current_cocktail)

# convert the list of cocktails to a JSON object
json_obj = json.dumps(cocktails)

# write the JSON object to a file
with open("cocktails.json", "w") as f:
    f.write(json_obj)
