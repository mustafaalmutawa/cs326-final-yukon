# API Planning

## Endpoints

<strong>/product?pid</strong>

<strong>/product/new</strong>
This endpoint is a POST request, which will allow the user to create a new product. The information entered in the crete listing form will be turned into a JSON object and passed as a body to the request.

<strong>/register</strong>
The register request simply allows the user to create a new profile via POST. The body of the request will come from the information entered in the sign-up page.

<strong>/login</strong>
This endpoint is for existing users. It will work similarly to the /register endpoint, but it is a PUT request.

<strong>/buy</strong>