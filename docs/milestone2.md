# API Planning

## Endpoints

<strong>/product</strong>
This will be used for GET requests to get the HTML product page.

<strong>/product/new</strong>
This endpoint is a POST request, which will allow the user to create a new product. The information entered in the create listing form will be turned into a JSON object and passed as a body to the request.

<strong>/product/buy</strong>
An endpoint via POST that a user will use to “buy” items. The data for checkout and the product being purchased will be contained in the JSON body of the request.

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

# Client Interface

## Create

This is the create listing page, which  allows the user to add a new listing utilzing the CRUD create operation.

<img width="1440" alt="Screen Shot 2022-04-20 at 12 38 41 PM" src="https://user-images.githubusercontent.com/40669187/164282998-29e1559d-0423-4b96-9865-01e011ed03c2.png">


## Read

This is the homepage. It functions using the CRUD read operation to retreive and display all the products' information and images.

<img width="1440" alt="Screen Shot 2022-04-20 at 12 54 44 PM" src="https://user-images.githubusercontent.com/40669187/164283199-b9dc1c42-1e2e-4a78-be9f-95867ab2118c.png">


## Update

This is the user's page. Using the CRUD update operation, it allows the user to change their name by typing a new name and clicking update.

<img width="1440" alt="Screen Shot 2022-04-20 at 12 55 34 PM" src="https://user-images.githubusercontent.com/40669187/164283298-198a43dc-6f72-4cab-a2fc-a2492ee46146.png">


## Delete

This is also the user's page. It has a delete button, which deletes the user's account using the CRUD delete operation.

<img width="1440" alt="Screen Shot 2022-04-20 at 12 55 34 PM" src="https://user-images.githubusercontent.com/40669187/164283313-dd29c57d-2448-4c0d-9170-c8987552aea2.png">



# Breakdown of Labor    
We worked collaboratively during this phase, with each's work receiving feedback from the whole team. Below is the breakdown of what each member worked on significantly.

Nitish : I worked on creating all the GET express request so that each GET request will return a static HTML page. I also worked on the CRUD operation seen in the Crud.js file. This is seen as I contributed in writing the login register and deleteUser crud operations along with the event listeners that correspond to them. I also contributed to part of writing the posting a product crud operation and event listener. As a side point professor wanted me to say in the division of labor on how I had a wrist injury during most of this assignment which is why I might have been limited to my contributions to the team. Professor said this is fine but just mention it in this section.

Alex: First, Mustafa and I brainstormed up a basis of all endpoints we thought we might need for our app. Then, we both created the pcrud-fs.js file and coded out most the logic for each endpoint we came up with. The others added more routes as more ended up being apparent. I personally worked on creating the architecture for the CRUD operations and creating the first route "/login". This entailed creating a client.js, crud.js file and altering our existing pcrud-fs.js file to link it all up. Last, I setup Heroku and deployed our app.

Mustafa: I worked on some of the CRUD operations in crud.js as well as adding some event listners and CRUD calls in client.js. I added a few endpoints in pcrud-fs.js. I also worked on the making the homepage products clickable and redirect to the product page. Lastly, I did some of the writing inside milestone2.md.

Tatyana: Created files for the products and users to act as databases. Wrote functions to read from and write to those files. Added and updated some functions in pcrud-fs.js. Updated endpoint paths. Wrote some endpoint descriptions.

Heroku: https://cs326-final-yukon.herokuapp.com/