// Dependencied
import 'intersection-observer'
import 'blocks/menu/menu'

//
import './header.sass'

document.addEventListener('DOMContentLoaded', main)
// elements
const page = document.querySelector('.page')
const headerContainer = document.querySelector('.header__container')
const menuWrapper = document.querySelector('.header__menu-wrapper')
const menu = menuWrapper.querySelector('.menu')
const btn = document.querySelector('.header__menu-btn')
const subMenuItems = menuWrapper.querySelectorAll('.sub-menu')
// class names
const openedClass = 'page--modal-opened'
const closedClass = 'page--modal-closed'
const fixedClass = 'header__container--fixed'
const menuItemOpenedClass = 'menu__item--opened'
const menuItemActiveClass = 'menu__item--active'

function main() {
    // Burger btn click
    btn.addEventListener('click', toggleModal)
    // remove closedClass
    menu.addEventListener('transitionend', e => {
        if (e.target !== menu) return
        const isClosed = page.classList.contains(closedClass)
        if (isClosed) page.classList.remove(closedClass)
    })
    // Sticky header menu
    stickyMenu()

    // The max-height animation for sub-menu
    ;[...subMenuItems].forEach(sub => {
        const li = sub.parentElement
        const link = li.querySelector(' [class*="__link"]')
        // Toogle sub-menu
        link.addEventListener('click', () => {
            sub.style.maxHeight = !sub.style.maxHeight
                ? `${sub.scrollHeight}px`
                : null
            li.classList.toggle(menuItemOpenedClass)
        })
        // Open sub-menu on __item--active
        // TODO: handle sub-menu__item
        if (li.classList.contains(menuItemActiveClass))
            link.dispatchEvent(new CustomEvent('click'))
    })

    // If native scroll is visible
    setOffset(menuWrapper)
}

function stickyMenu() {
    //
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 1],
    }

    const handleIntersect = entries => {
        const isOpened = page.classList.contains(openedClass)
        const ratio = entries[0].intersectionRatio
        if (!isOpened && ratio == 1) {
            headerContainer.classList.remove(fixedClass)
        } else if (!isOpened) {
            headerContainer.classList.add(fixedClass)
        }
    }

    const observer = new IntersectionObserver(handleIntersect, options)
    observer.observe(headerContainer.parentElement)
}

function toggleModal(e) {
    if (e) e.preventDefault()

    const scrollPos = window.pageYOffset
    const prevScrollPos = page.dataset.scrollPos
    page.classList.toggle(openedClass)
    const isOpened = page.classList.contains(openedClass)

    // Save and restore scroll position of y
    if (isOpened) {
        page.setAttribute('data-scroll-pos', scrollPos)
        window.scrollTo(0, 0)
        page.scrollTop = scrollPos
    } else if (prevScrollPos !== undefined) {
        window.scrollTo(0, prevScrollPos)
    }

    // Exit animation
    page.classList.toggle(closedClass, !isOpened)

    // Close modal when press of escape key or outside click
    if (isOpened) {
        window.addEventListener('click', handleClick)
        window.addEventListener('keydown', handleEscape)
    } else {
        window.removeEventListener('click', handleClick)
        window.removeEventListener('keydown', handleEscape)
    }
    setOffset(menuWrapper)
}

function handleClick(e) {
    if (e.defaultPrevented) return
    if (e.pageY > menu.scrollHeight + menu.offsetTop) toggleModal()
}

function handleEscape(e) {
    if (e.defaultPrevented) return
    const isModalOpened = document.querySelector(`.${openedClass}`)
    if (isModalOpened && event.keyCode === 27) toggleModal()
}

function setOffset(el) {
    const scrollBarWidth = document.body.offsetWidth - window.innerWidth
    el.style.marginRight = scrollBarWidth < 0 ? `${scrollBarWidth}px` : 0
}
