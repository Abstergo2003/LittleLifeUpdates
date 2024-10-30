## Template Importer
##### by Abstergo##
#

#### I know, i know, you can just write template in your main html file, but this is neither aesthetic nor ergonomic. 
#### So i decided to complcate it for myself for now to make it easier in the future.

### How to use

#### 
1. Import file into your head element, call function "importTemplates(path)", default part is "templates/main.html" You can do this part in header code

```js
    // default path
    importTemplates()

    //custom path
    importTemplates("your/custom/path.html")

    //from text
    importTemplatesText("<template><img src='media/icon.ico'></template>")
```
2. Get elements using "getElement()" function
2.1 If You need template to build page as it loads, you need to wrap building in event litener, and the use getElemenetFunction, there is no need to pass custom ID in neither cases. 

When using "getElement()" method, your defined styles will not be applied, only global styles will have effect. To eneable local styles use "getIsolatedElement()".

```js
    document.addEventListener("templatesImported", () => {
        const dynamicElement = getElement(
            GLOBAL_TEMPLATES.standardDynamicTitle, 
            {title: "Title", desc: "Lorem, lorem, lorem"}, 
            "myCustomID"
        )

        const staticElement = getElement(GLOBAL_TEMPLATES.standardStaticTitle)

        document.body.append(dynamicElement)
        document.body.append(staticElement)
    })
```

2.2 Ore you can just pass it to the function and map function to button click

```html
    <button onclick="getStaticTitle()">Click Me!</button>
```
```js
    function getStaticTitle() {
        const element = getElement(GLOBAL_TEMPLATES.standardStaticTitle)
        document.body.append(element)
    }
```
3. There is special command to list all availible templates
```js
    listTemplates()
```

### How to create templates
1. In your project create dir: "templates\\main.html"
2. Inside "main.html" write normal html code like shown below:

2.1 Dynamic Template

```html
    <template id="yourCustomID">
        <style>
            h1 {
                color: blue;
            }
        </style>
        <h1>@@{title}</h1>
        <p>@@{desc}</p>
        <script>
            console.log(document.querySelector("#@@{TID}"))
            // by putting @@{TID} it will be replaced by id that
            // template parent element will receive
            // you can also specify src of the script tag
        </script>
    </template>
```

2.2 Static template

```html
    <template id="yourCustomID">
        <style>
            h1 {
                color: brown;
            }
        </style>
        <h1>Static Title</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, veritatis. Nam fugiat assumenda, recusandae nesciunt, eveniet repellendus, voluptate consequatur soluta vel eaque enim unde reprehenderit eius. Quidem sequi dicta eum.</p>
    </template>
```
2.3 Framework doesn't really diffrentiate beetwen static and dynamic element, so you can mix them thogether, nor does it diffrentiate beetwen isolated or global element.

2.4 Please not that two templates can't have the same ID, and you will access templates by ID, but when appended to page they will gain custom id to eneable multiple instances loaded into one page.

## Have fun using
