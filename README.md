# Markup starter kit with sass

The starter kit without `node-sass` [here](https://github.com/fivemru/start-markup-scss).


## Demo

https://fivemru.github.io/start-markup-sass/

## Concept

### Paths

* PUG

    The path has resolved in __`./src`  folder__.

    ```pug
    require('blocks/item/file.ext')
    ```

* SASS

    The path has resolved in __current folder__ of `__ITEM__` in `(layouts|pages|blocks)`.

    ```pug
    require('./file.ext')
    ```
---

### Images

Put all image files in `(layouts|pages|blocks)/__ITEM__/(`__images__`/)?*.(png|jpe?g)`

---

### PNG sprite

Put files in `(layouts|pages|blocks)/__ITEM__/`__sprite__`/sprite-1.png`

* SASS

    ```sass
    .icon-tw
        +sprite($sprite-1)
    ```
---

### SVG

#### SVG sprite

Put files in `(layouts|pages|blocks)/__ITEM__/`__sprite__`/*.svg`
* Pug

    ```pug
    //- +svg-sprite(file, width, height, fill, stroke)
    +svg-sprite(require('blocks/menu/sprite/file.svg'), 20, 20)
    ```

#### Inline, into html

Put files in `(layouts|pages|blocks)/__ITEM__/`__inline__`/*.svg`

* Pug

    ```pug
    //- svg-inline(content, width, height, fill, stroke)
    +svg-inline(require('blocks/menu/inline/file.svg'), 20, 20)
    ```

#### External files

Put files in `(layouts|pages|blocks)/__ITEM__/(`__images__`/)?*.svg`

* Pug

    ```pug
    img(src=require('blocks/logo/logo.svg')
    img(src=require('blocks/logo/images/logo.svg')
    ```
* SASS

    ```pug
    background-image: url('./logo.svg')
    background-image: url('./images/logo.svg')
    ```