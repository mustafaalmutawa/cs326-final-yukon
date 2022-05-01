# MongoDB Documentation

##### product document

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
    payment: [String] // Preferred  payment methods
}
```


##### user document

```js
{
  _id: ObjectId,
  email: String, // User's email
  password: String // User's password
}
```

# Breakdown of Labor
