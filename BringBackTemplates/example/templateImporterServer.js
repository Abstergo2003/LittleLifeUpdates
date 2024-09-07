GLOBAL_TEMPLATES = {}

async function importTemplates(path = "templates/main.html") {
    const response = await fetch(path)
    const text = await response.text()
    let parser = new DOMParser()
    let templatesDOM = await parser.parseFromString(text, "text/html")
    let templatesElements = await templatesDOM.querySelectorAll("template")
    templatesElements.forEach(tem => {
        const element = tem.content.cloneNode(true)
        let div = document.createElement('div')
        div.id = tem.id
        let shadowRoot = div.attachShadow({mode: "open"})
        shadowRoot.appendChild(element)

        GLOBAL_TEMPLATES[tem.id] = div
    })
}
function listTemplates() {
    const keys = Object.keys(GLOBAL_TEMPLATES)
    keys.forEach(key => {
        console.log(`%c ${key}:`, 'font-weight: bold')
        console.log(GLOBAL_TEMPLATES[key])
    })
}