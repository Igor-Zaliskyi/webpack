const getTodoHTML = (item, index, callbacks) => {
    const { changeStatus, removeTodo, updateTextLabel } = callbacks
    const li = document.createElement('li')
    const input = document.createElement('input')
    const label = document.createElement('label')
    const button = document.createElement('button')
    const id = `todo${index}`

    if (item.isChecked) {
        li.className = 'active'
        input.setAttribute('checked', 'checked')
    }
    input.setAttribute('type', 'checkbox')
    // input.setAttribute('id', id)
    input.onchange = () => changeStatus(item.id, !item.isChecked)
    // label.setAttribute('for', id)
    label.innerText = item.value
    label.setAttribute('contenteditable', 'true')
    // @todo I. Z. do it!
    label.onblur = () => updateTextLabel(item.id, label.textContent)

    button.onclick = () => removeTodo(item.id)
    button.innerText = 'X'
    li.appendChild(input)
    li.appendChild(label)
    li.appendChild(button)

    return li
}

const getCountElement = descriptionText => {
    const wrapper = document.createElement('p')
    const count = document.createElement('span')
    const description = document.createTextNode(`${descriptionText} - `)
    wrapper.appendChild(description)
    wrapper.appendChild(count)
    return { wrapper, count }
}

const getForm = addTodo => {
    const form = document.createElement('form')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Enter name new todo')
    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Add todo')

    form.appendChild(input)
    form.appendChild(submit)
    form.onsubmit = event => {
        event.preventDefault()
        addTodo(input.value)
    }

    return form
}

export {
    getTodoHTML,
    getCountElement,
    getForm
}
