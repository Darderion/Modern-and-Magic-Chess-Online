# BoardComponent
 
 Класть в квадратный контейнер с фиксированными сторонами. **При каждом изменении объекта `chess` необходимо вызывать ререндер всего компонента!** В качестве пропсов передавать: 
 * `chess` - объект Chess
 * `view` - "white" / "black" / "observer": кто смотрит на доску (нужно для доступа к фигурам)
 * `skins` - словарь вида
    ```js
    {
        black: {
            bishop: 'go',
            king: 'br',
            knight: 'br',
            queen: 'br',
            pawn: 'default',
            rook: 'go',
        },
        white: {
            bishop: 'go',
            king: 'br',
            knight: 'br',
            queen: 'br',
            pawn: 'default',
            rook: 'go',
        },
    }
    ```
Внутри использует `ConnectorContext` и при ходе делает:
```js
sendMessage({
				'type': "myStep",
				"data":
				{"move":{"from":from, "to":to}}
			})
```
## JSX
 ```html
<div className='conatainer'>
    <BoardComponent chess={*} view={*} skins={*}/>
</div>
 ```
## CSS
 ```css
.container {
    width: 500px;
    height: 500px;
}
 ```