# BoardComponent
 
 Класть в квадратный контейнер с фиксированными сторонами. В качестве пропсов передавать: 
 * `chess` - объект Chess
 * `view` - "white" / "black" / "bserver": кто смотрит на доску (нужно для доступа к фигурам)
 * `lobbyID` - понятно, надо для POST запроса на зменение доски

 ```html
<div className='conatainer'>
    <BoardComponent chess={*} view={*} libbyID={*}/>
</div>
 ```

 ```css
.container {
    width: 500px;
    height: 500px;
}
 ```