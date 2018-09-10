# start-markup

## Live
https://fivemru.github.io/start-markup/

## Concept

---

### Paths

* __PUG__
The path has resolved in __`./src`  folder__.

    ```pug
    require('blocks/item/file.ext')
    ```

* __SASS__
The path has resolved in __current folder__.

    ```pug
    require('./file.ext')
    ```
---

### Sprites

#### PNG

Put files in `(layouts|pages|blocks)/__ITEM__/`__sprite__`/sprite-1.png`

* __SASS:__

    ```sass
    .icon-tw
        +sprite($sprite-1)
    ```

#### SVG

Put files in `(layouts|pages|blocks)/__ITEM__/`__sprite__`/*.svg`

* __Pug:__

    ```pug
    //- +svg-sprite(file, width, height, fill, stroke)
    +svg-sprite(require('blocks/menu/sprite/file.svg'), 20, 20)
    ```

##### Inline, into html

Put files in `(layouts|pages|blocks)/__ITEM__/`__inline__`/*.svg`

* __Pug:__

    ```pug
    //- svg-inline(content, width, height, fill, stroke)
    +svg-inline(require('blocks/menu/inline/file.svg'), 20, 20)
    ```

##### External files

Put files in `(layouts|pages|blocks)/__ITEM__/(`__images__`/)?*.svg`

* __Pug:__

    ```pug
    img(src=require('blocks/logo/logo.svg')
    img(src=require('blocks/logo/images/logo.svg')
    ```
* __SASS:__

    ```pug
    background-image: url('./logo.svg')
    background-image: url('./images/logo.svg')
    ```