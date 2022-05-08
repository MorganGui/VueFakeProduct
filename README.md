# UpdateDOM

This branch have useless code. The search functions allow to modify the displayed lists but the DOM is not updated.

## Configuration
Dans le fichier ShowProducts.vue, aux lignes 28 et 31, il est possible de modifier les produits affichés au-dessus.
```
let nbShow = 10 // 10 produits serront affichés.
```
```
let txtSearch = 'Mens' // Seuls les produits contenants "mens" dans leur titre seront affichés.
```
### Les inputs qui permettent de modifier les listes qui sont affiché dans le DOM fonctionnent mais le DOM ne s'actualise malheureusement pas pour le moment.