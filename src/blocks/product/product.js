import './product.sass'

// Block code

document.addEventListener('DOMContentLoaded', main)

function main() {
    const products = document.querySelectorAll('.product')
    Array.from(products).forEach(product => {
        const container = product.querySelector('.product__container')
        const checkbox = product.querySelector('.product__checkbox')
        const link = product.querySelector('.product__footer-link')

        const change = e => {
            e.preventDefault()
            const isChecked = product.hasAttribute('data-checked')
            const isDisabled = product.hasAttribute('data-disabled')
            if (isChecked || isDisabled) {
                product.removeAttribute('data-checked')
                checkbox.checked = false
            } else {
                if (e.target !== link)
                    product.setAttribute('data-mouseleave', '')
                product.setAttribute('data-checked', '')
                checkbox.checked = true
            }
        }

        const removeLeaveAttr = () => {
            product.removeAttribute('data-mouseleave')
        }

        container.addEventListener('mouseleave', removeLeaveAttr)
        container.addEventListener('click', change)
        checkbox.addEventListener('change', change)
        link.addEventListener('click', change)
    })
}
