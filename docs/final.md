# Yukon

## USell

## Semester: Spring 2022

<br>

# Overview
Our app, USell, is a platform for selling and buying all types of stuff. Unlike other selling/buying apps, USell is designed to specifically serve UMass students. It offers numerous features that make selling/buying easy for students at UMass. For example, users can filter listed produts by residential area or availability of shipping.

No selling/buying apps currently exist that exclusively serve UMass students, making USell a unique idea. Also, the app can potentially be extended to other college and university campuses, serving as a the only student-oriented selling/buying platform.

<br>

# Team Members:

Mustafa Almutawa: @mustafaalmutawa

Alex Rohrberg: @alexrohrberg

Tatyana Edozie: @yanaedo

Nitish Bodicharla: @nbodicharla

<br>

# User Interface
### Homepage
<img width="1437" alt="sk__rmbillede_2022-05-06_kl _13 38 50" src="https://user-images.githubusercontent.com/40669187/167196835-334d4ebc-09f8-4f32-adc2-42366cf0743b.png">
The homepage shows all the product listings. Additionally. On the left side are yhe filtering options. The navigation bar on the top has links to add a listing, login, and join.

<br>

### User Profile
<img width="1301" alt="sk__rmbillede_2022-05-06_kl _13 41 03" src="https://user-images.githubusercontent.com/40669187/167196881-778cda62-afe0-4d5c-b7e6-d1390cc95de0.png">

The user profile page shows the user's own listings as well as their rating. additionally, it allows the user to make updates to their listings, update the profile name, and delete the account.

<br>

### Product Page
![Screen Shot 2022-05-06 at 21 53 12](https://user-images.githubusercontent.com/40669187/167201012-8a0d9247-6d0b-4762-97e4-87bab0c212e6.png)

The product page shows the all the product's information. This includes product images and description as well as details like condition, preferred payment method, availavility of shipping, and so on.

<br>

### Add Listing Page
<img width="1440" alt="sk__rmbillede_2022-05-06_kl _13 39 01" src="https://user-images.githubusercontent.com/40669187/167196970-20f3e6f4-3ac5-467d-b87c-1d3f1e34602c.png">

The add listing page allows the user to create a new listing. It takes in information about the product (name, price, images, etc.) and dynamically add the product to the homepage.

<br>

### Registration Page
<img width="1440" alt="sk__rmbillede_2022-05-06_kl _13 39 20" src="https://user-images.githubusercontent.com/40669187/167197020-457bee6e-bcf2-457e-88e8-2f16980c7c67.png">
The registration page is for new users to create an account. It requires a username and password.

<br>

### Login Page
<img width="1440" alt="sk__rmbillede_2022-05-06_kl _13 39 13" src="https://user-images.githubusercontent.com/40669187/167197040-c8b70127-40f5-4eec-8465-184ecc384993.png">
The login page is for existing users to log in to their accounts.

<br>

# API
* login(username, password)
* register(username,email, password)
* createProduct(itemName,price,category,condition,description,images,location,* shipping,shippingPrice,pickup,payment)
* getUserProfile()
* getProduct()
* getUpdateListingPage()
* updateName(name)
* updateProduct(productToUpdate, itemName, price, category, condition, description, * images, location, shipping, shippingPrice, pickup, payment)
* deleteUser()

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

<br>

# URL Routes/Mappings

<strong>/product?id=</strong>
This will be used for GET requests to get the HTML product page.

<strong>/product/new</strong>
This endpoint is a POST request, which will allow the user to create a new product. The information entered in the create listing form will be turned into a JSON object and passed as a body to the request.

<strong>/product/buy</strong>
An endpoint via POST that a user will use to “buy” items. The data for checkout and the product being purchased will be contained in the JSON body of the request.

<strong>/product/update</strong>
This PUT endpoint allows the user to update an existing product listing. The updated information is sent through the body of the request as a JSON object.

<strong>/product/delete?id=1234</strong>
This endpoint uses the DELETE method to delete the product with the unique product id.

<strong>/user</strong>
This endpoint uses the GET method to retrieve the user profile HTML page for the user.

<strong>/user/new</strong>
The register request simply allows the user to create a new profile via POST. The body of the request will come from the information entered in the sign-up page.

<strong>/user/login</strong>
This endpoint is for existing users. It will work similarly to the /user/new endpoint, but it is a PUT request.

<strong>/user/delete</strong>
This endpoint uses the DELETE method to delete the user that was just created after registration.

<strong>/login</strong>
This endpoint uses the GET request to retrieve the Login HTML page

<strong>/register</strong>
This endpoint uses the GET request to retrieve the Register HTML page

<strong>/homepage</strong>
This endpoint uses the GET request to retrieve the Homepage HTML page

<strong>/listing</strong>
This endpoints uses the GET request to the Create Listing HTML page

<br>

# Authentication/Authorization
For authentication we used passport to manage registration and login flows. When a user registers, they are appended to the object in the users class. Then, user logins are checked against this. Only logged in users can access their user profile page. We intended to merge Users.js with the existing logic from Database.js so that users would be stored in MongoDB, but did not have time. 

# Division of Labor
Alex: Throughout the project I worked a lot of creating a solid starting architecture for each section we embarked on. Created the navigation bar, product page, and worked on the registration page. I personally worked on creating the architecture for the CRUD operations and creating the first route "/login". I also setup Heroku and deployed our app the first time. I added the read route to mongoDB that allows the app to retrieve a user or product. I am most proud of the work I did to add EJS into our project to dynamically render a user page or a product page based on information parsed directly from our database.

Nitish: Throughout this project I help create the html pages for the homepage, login and register page. I also helped with writing the get endpoints which will return the static html pages. I also worked on the CRUD operation seen in the Crud.js file. This is seen as I contributed in writing the login register and deleteUser crud operations along with the event listeners that correspond to them. I also contributed to part of writing the posting a product crud operation and event listener. Furthermore I also helped setup the server code along with working on authentication. I also wrote the delete user endpoint work properly with the mongo database.

Mustafa: For this milestone I first worked with Alex on setting up the MongoDB database. Then I moved on to complete the CRUD update and connect it to the database. Specifically, I added an endpoint to update a listed product as well as adding an option for a user to update their name. Throughout the project I contributed to creating the user profile page and create listing page. The latter involved dealing with the CRUD update operation. I also helped make the server file and added several endpoints. Additionally, I did most of the writing for the milestone.md files.

Tatyana: My primary focus throughout the project was the homepage. I worked on the homepage html page and wrote all the functions in Homepage.js. These functions helped with the task of adding product listings dynamically to the homepage by using the information put into the form to create a listing. I created many functions in crud.js and wrote multiple endpoints in index.html to help with getting and retrieving information from the database. I also helped work on authentication with Alex and Nitish. Additionally, I added functions to database.js, focusing on the create operations initially but added more as the project required.

<br>

# Conclusion
Overall, I am happy with what we completed on this project. Our UI looks great and our application is mostly functional. Learning to piece together the front end, with a database and deploy to Heroku was a very formative experience. If we could have done it again, it would have been useful to limit our scope as we took on a pretty signifigant sized project. I think this made it difficult to finalize all the features we initially intended to have. For example, although we wrote all the database logic, and our products dyanmically render, we didn't budget enough time to implement search from our homepage, or link auth to mongo. Overall, I am very happy with our team's hardwork and very proud of what we accomplished. Working as a team isn't always easy, and I think we did a great job combining async work with pretty regular weekly team meetups.

