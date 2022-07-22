# Skins for Chess Pieces
* Добавлять новые паки скинов в таком формате:
    ```
    static
    │   README.md   
    │
    └───default
    │   │
    │   └───black
    │   |   │   bishop.svg
    │   |   │   king.svg
    │   |   │   ...
    │   └───white
    │       │   bishop.svg
    │       │   king.svg
    │       │   ...
    │
    └───*your skin pack name*
        │
        └───black
        |   │   bishop.svg
        |   │   king.svg
        |   │   ...
        │ 
        └───white
            │   bishop.svg
            │   king.svg
            │   ...
    ```
* По поводу отдельных скинов:
    Если вы пользуетесь [Inkscape](https://inkscape.org/ru/) (а лучше пользуйтесь именно им), то каждая ваша фигура должна помещаться в прямоугольник в центре и относильно него ее координаты должны быть 0 по X и по Y:
    ![](https://imgur.com/HABhlpL.png)
    Сохранять в формате Optimized SVG:
    ![](https://imgur.com/AQpt2eY.png)