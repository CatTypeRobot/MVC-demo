import './app2.css'
import $ from "jquery"

const eventBus = $(window)
const localKey = 'app2.index'

const m = {
    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    // create() {},
    // delete() {},
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('index', m.data.index)
    },
    // get() {}
}

const v = {
    el: null,
    html: (index) => {
        return `
        <div>
            <ol class="tabBar">
                <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>111</span></li>
                <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>222</span></li>
            </ol>
            <ol class="tabContent">
                <li class="${index === 0 ? 'active' : ''}"><span>内容1</span></li>
                <li class="${index === 1 ? 'active' : ''}"><span>内容2</span></li>
            </ol>
        </div>
`
    },
    init(container) {
        v.el = $(container)
    },
    render(index) {
        if (v.el.children.length !== 0) v.el.empty()
        $(v.html(index)).appendTo(v.el)
    }
}

const c = {
    init(container) {
        v.init(container)
        v.render(m.data.index)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.index)
        })
    },
    events : {
        'click .tabBar li': 'change',
    },
    change(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index: index})
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            v.el.on(part1, part2, value)
        }
    }
}

export default c