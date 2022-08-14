import './app2.css'
import $ from "jquery"

const html = `
    <section id="app2">
        <ol class="tabBar">
            <li>111</li>
            <li>222</li>
        </ol>
        <ol class="tabContent">
            <li><span>内容1</span></li>
            <li><span>内容2</span></li>
        </ol>
    </section>
`

const $element = $(html).appendTo($('body>.page'))

const $tabBar = $('#app2 .tabBar')
const $tabContent = $('#app2 .tabContent')
const localKey = 'app2.index'
const index = localStorage.getItem(localKey) ?? 0

$tabBar.on('click', 'li', (e) => {
    const $li = $(e.currentTarget)
    $li
        .addClass("selected")
        .siblings()
        .removeClass("selected")
    const index = $li.index()
    localStorage.setItem(localKey, index)
    $tabContent
        .children()
        .eq(index).addClass('active')
        .siblings().removeClass('active')
})

$tabBar.children().eq(index).trigger('click')