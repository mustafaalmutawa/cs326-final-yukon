# Yukon

## USell

## Semester: Spring 2022

# Overview
Our app, USell, is platform for selling and buying all types of stuff. Unlike other selling/buying apps, USell is designed to specifically serve UMass students. It offers numerous features that make selling/buying easy for students at UMass. For example, users can filter listed produts by residential area or availability of shipping.

No selling/buying apps currently exist that exclusively serve UMass students, making USell a unique idea. Also, the app can potentially be extended to other college and university campuses, serving as a the only student-oriented selling/buying platform.

# Team Members:

Mustafa Almutawa: @mustafaalmutawa

Alex Rohrberg: @alexrohrberg

Tatyana Edozie: @yanaedo

Nitish Bodicharla: @nbodicharla

# User Interface

# API

# URL Routes/Mappings

<strong>/product</strong>
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

# Authentication/Authorization

# Division of Labor

# Conclusion