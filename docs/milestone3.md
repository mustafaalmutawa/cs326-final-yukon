# MongoDB Documentation

##### Document in products collection

```js
{
    _id: ObjectId,
    itemName: String,  // The name of the item
    price: Double,  // Item's price
    category : String, // Item's categoruy
    condition : String, // Item's condition
    description : String, // Item's description
    images : [Binary], // Images for item page
    location: String, // Location of item
    shipping: boolean, // availability of shipping
    shippingPrice: double, // price of shipping
    pickup: boolean, // availability of pickup
    payment: [String], // Preferred  payment methods
    brand: String
}
```


##### Document in users collection

```js
{
  _id: ObjectId,
  username: String, // User's username
  password: String // User's password
}
```
# Division of Labor
 Nitish: I helped setup the server code along with working on authentication. I also wrote the delete user endpoint work properly with the mongo database. While also helping refactor certain parts of the code. 

Alex:  Mustafa and I created the MongoDB database, and used the code from lecture to link it into our application. We all then wrote one of the CRUD routes to connect our app to the database. I added the read route to mongoDB that allows the app to retrieve a user or product. Then, I helped Nitish/Taytana debug the authentication so that a user could login and be successfully redirected to a protected page. Finally, I worked to add EJS into our project to dynamically render a user page or a product page based on information parsed directly from our database. The front end homepage Tatyana wrote submits a GET request to my EJS product page like /product?id=1234 and the page is automatically rendered. Similarly, after a user logs in, EJS renders there name on the user profile. 