GLOBAL_TEMPLATES = {}

// loads templates into global variable GLOBAL_TEMPLATES
async function importTemplates(path = "templates/main.html") {
    const response = await fetch(path)
    const text = await response.text()
    let parser = new DOMParser()
    let templatesDOM = parser.parseFromString(text, "text/html")
    let templatesElements = templatesDOM.querySelectorAll("template")
    templatesElements.forEach(tem => {
        const element = tem.innerHTML
        let div = document.createElement('div')
        div.id = tem.id
        div.innerHTML = element

        GLOBAL_TEMPLATES[tem.id] = div.innerHTML
    })
    const event = new CustomEvent("templatesImported", {
        detail: {message: "All OK!"}
    })
    document.dispatchEvent(event)
}

// lists all templates, function exist so that the template list would contain HTML Elements and not string
function listTemplates() {
    const keys = Object.keys(GLOBAL_TEMPLATES)
    keys.forEach(key => {
        console.log(`%c ${key}:`, 'font-weight: bold')
        let div = document.createElement('div')
        div.innerHTML = GLOBAL_TEMPLATES[key]
        console.log(div)
    })
}

// returns ready element with inserted data YOU passed as JSON Object, you can also pass custom id
// if you are trying to get Dynamic template and don't pass data it will result in error, there is no need to pass data to static element
function getElement(tem, data={}, id) {
    let element = tem
    let ID = id ?? new Date().getTime()

    let keys = Object.keys(data)
    keys.forEach(key => {
        element = element.replace(`\$\{${key}\}`, data[key])
    })
    let index = element.indexOf("$")
    if (index != -1) {
        let name = ""
        index += 2
        do {
            name += element[index]
            index++
        } while (element[index] != "}") 
        console.error(`There is missing data argument: "${name}"`)
        return ""
    }
    
    let helpingDIV = document.createElement('div')
    helpingDIV.innerHTML = element
    let div = document.createElement('div')
    div.id = ID
    let shadowRoot = div.attachShadow({mode: "open"})
    let children = helpingDIV.children

    // for some stupid reason when appendChild is called element is poped from HTML Collection so i just do not modify "i" and always get first element
    for (let i = 0; i< children.length; i) {
        shadowRoot.appendChild(children[i])
    }
    return div
}