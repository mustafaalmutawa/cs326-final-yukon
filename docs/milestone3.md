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