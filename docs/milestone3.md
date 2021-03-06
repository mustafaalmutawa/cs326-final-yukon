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

Mustafa: For this milestone I first worked with Alex on setting up the MongoDB database. Then I moved on to complete the  CRUD update and connect it to the database. Specifically, I added an endpoint to update a listed product as well as adding an option for a user to update their name. This included sending requests to the server from the client, serving them in the server using the database, and then update the product. Additionally, I reconfigured existing html pages as well as adding a new html page to update the product.

Tatyana: I worked on the homepage html page and wrote all the functions in Homepage.js. These functions helped with the task of adding product listings dynamically to the homepage by using the information put into the form to create a listing. The listings on the homepage work with Alex's EJS to display a product listing's content when clicked. I created many functions in crud.js and wrote some endpoints in index.html to help with getting and retrieving information from the database. I also helped work on authentication with Alex and Nitish. Additionally, I added functions to database.js, focusing on the create operations initially but added more as the project required.
