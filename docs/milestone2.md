# API Planning

## Endpoints

<strong>/product?pid</strong>
This will be used for GET requests to get the HTML page for a product specified by its unique product id. This will be leveraged anytime a user clicks on a product preview tile.

<strong>/product/new</strong>
This endpoint is a POST request, which will allow the user to create a new product. The information entered in the crete listing form will be turned into a JSON object and passed as a body to the request.

<strong>/register</strong>
The register request simply allows the user to create a new profile via POST. The body of the request will come from the information entered in the sign-up page.

<strong>/login</strong>
This endpoint is for existing users. It will work similarly to the /register endpoint, but it is a PUT request.

<strong>/buy</strong>
An endpoint via POST that a user will use to “buy” items. The data for checkout and the product being purchased will be contained in the JSON body of the request.

<strong>/profile?uid</strong>
This endpoint uses a GET request to retrieve the user profile HTML page for the user with the unique user id.

