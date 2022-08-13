import './app2.css'
import $ from "jquery"

const $tabBar = $('#app2 .tabBar')
const $tabContent = $('#app2 .tabContent')

$tabBar.on('click', 'li', (e) => {
    const $li = $(e.currentTarget)
    $li
        .addClass("selected")
        .siblings()
        .removeClass("selected")
    const index = $li.index()
    $tabContent
        .children()
        .eq(index).addClass('active')
        .siblings().removeClass('active')
})

$tabBar.children().eq(0).trigger('click')