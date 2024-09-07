## Template Importer

#### I know, i know, you can just write template in your main html file, but this is neither aesthetic nor ergonomic. 
#### So i decided to complcate it for myself now to make it easier in the future.

### How to use

#### Import file into your head element, call function "importTemplates(path)", default part is "templates/main.html"
#### And then just use append(GLOBAL_TEMPLATES.YOUR_ID) where is YOUR_ID is id You assigned to template element.
#### You can specify even styles that will stay local within template scope.

## Have fun using