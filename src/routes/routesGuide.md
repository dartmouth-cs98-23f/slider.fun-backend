# Slider.Fun Routes
### routes module
#### User Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/users/new | post | userRoutes | create a new user |
|https://slider-fun.onrender.com/api/users/all | get | userRoutes | get all users |
|https://slider-fun.onrender.com/api/users/:id | get | userRoutes | get user by id |
|https://slider-fun.onrender.com/api/users/me | get | userRoutes | get user from token |
|https://slider-fun.onrender.com/api/users/:id | put| userRoutes | update user by id |
|https://slider-fun.onrender.com/api/users/addPuzzleData/:id | put| userRoutes | add a user puzzle data object to the user |
|https://slider-fun.onrender.com/api/users/removePuzzleData/:id | put| userRoutes | remove a user puzzle data object from the user |
|https://slider-fun.onrender.com/api/users/:id | delete | userRoutes | delete user by id |
#### Photo Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/photo/all | get | photoRoutes | get all photos |
|https://slider-fun.onrender.com/api/photo/:id | get | photoRoutes | get photo by id |
|https://slider-fun.onrender.com/api/photo/new | post | photoRoutes | create photo | [Example Call](../exampleCalls/createPhoto.md) |
|https://slider-fun.onrender.com/api/photo/addProperty/:id | put | photoRoutes | add a new property to the list of photoProperties | Please provide the new property exactly how you want to have it added to the list. [Example Call](../exampleCalls/addPhotoProperty.md) |
|https://slider-fun.onrender.com/api/photo/removeProperty/:id | delete | photoRoutes | delete a property from the list of photoProperties | Please only provide the property name for this request. For example, to delete the Satruation property, the request would look like `"property" : "Saturation"`. [Example Call](../exampleCalls/removePhotoProperty.md) |
|https://slider-fun.onrender.com/api/photo/:id | put | photoRoutes | update photo by id | Either can replace `imageUrl` or `photoProperties` as a whole. Please make sure you understand the difference bewtween this call and the `removeProperty/:id`/`addProperty/:id` calls before updating anything |
|https://slider-fun.onrender.com/api/photo/:id | delete | photoRoutes | delete photo by id |

