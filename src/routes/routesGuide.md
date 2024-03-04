# Slider.Fun Routes
### routes module
#### User Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/users/new | post | userRoutes | create a new user |
|https://slider-fun.onrender.com/api/users/signin | post | userRoutes | validates user credentials and signs them in |
|https://slider-fun.onrender.com/api/users/me | get | userRoutes | get user from token |
|https://slider-fun.onrender.com/api/users/all | get | userRoutes | get all users |
|https://slider-fun.onrender.com/api/users/top25 | get | userRoutes | get top 25 users based off sliderScores |
|https://slider-fun.onrender.com/api/users/:id | get | userRoutes | get user by id |
|https://slider-fun.onrender.com/api/users/me | get | userRoutes | get user from token |
|https://slider-fun.onrender.com/api/users/username/:id | get | userRoutes | get username for given id |
|https://slider-fun.onrender.com/api/users/:id | put| userRoutes | update user by id |
|https://slider-fun.onrender.com/api/users/updateScore/:id | put| userRoutes | update slider score for user - pass in value for `count` |
|https://slider-fun.onrender.com/api/users/addPuzzleData/:id | put| userRoutes | add a user puzzle data object to the user |
|https://slider-fun.onrender.com/api/users/removePuzzleData/:id | put| userRoutes | remove a user puzzle data object from the user |
|https://slider-fun.onrender.com/api/users/addPhoto/:id | put| userRoutes | add a photo object to the user |
|https://slider-fun.onrender.com/api/users/removePhoto/:id | put| userRoutes | remove a photo object from the user |
|https://slider-fun.onrender.com/api/users/:id | delete | userRoutes | delete user by id |

#### Photo Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/photo/all | get | photoRoutes | get all photos |
|https://slider-fun.onrender.com/api/photo/allSorted | get | photoRoutes | get all photos sorted by like count in decreasing order |
|https://slider-fun.onrender.com/api/photo/getLiked/:id | get | photoRoutes | get like count for photo |
|https://slider-fun.onrender.com/api/photo/:id | get | photoRoutes | get photo by id |
|https://slider-fun.onrender.com/api/photo/new | post | photoRoutes | create photo | [Example Call](../exampleCalls/createPhoto.md) |
|https://slider-fun.onrender.com/api/photo/addProperty/:id | put | photoRoutes | add a new property to the list of photoProperties | Please provide the new property exactly how you want to have it added to the list. [Example Call](../exampleCalls/addPhotoProperty.md) |
|https://slider-fun.onrender.com/api/photo/removeProperty/:id | put | photoRoutes | delete a property from the list of photoProperties | Please only provide the property name for this request. For example, to delete the Satruation property, the request would look like `"property" : "Saturation"`. [Example Call](../exampleCalls/removePhotoProperty.md) |
|https://slider-fun.onrender.com/api/photo/:id | put | photoRoutes | update photo by id | Either can replace `imageUrl` or `photoProperties` as a whole. Please make sure you understand the difference bewtween this call and the `removeProperty/:id`/`addProperty/:id` calls before updating anything |
|https://slider-fun.onrender.com/api/photo/addLike/:id | put | photoRoutes | add the user to the "likedBy" list for the photo |
|https://slider-fun.onrender.com/api/photo/removeLike/:id | put | photoRoutes | remove the user from the "likedBy" list for the photo |
|https://slider-fun.onrender.com/api/photo/validate/:id | put | photoRoutes | validate photo|
|https://slider-fun.onrender.com/api/photo/:id | delete | photoRoutes | delete photo by id |

#### Daily Puzzle Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/dailyPuzzle/new | post | dailyPuzzle | create a new daily puzzle object |
|https://slider-fun.onrender.com/api/dailyPuzzle/all | get | dailyPuzzle | get all daily puzzle objects |
|https://slider-fun.onrender.com/api/dailyPuzzle/byDate | get | dailyPuzzle | get daily puzzle for the give date | The request field should look something like this `{"date" : "2024-01-30"}` ! |
|https://slider-fun.onrender.com/api/dailyPuzzle/:id | get | dailyPuzzle | get daily puzzle for the give id |
|https://slider-fun.onrender.com/api/dailyPuzzle/:id | put | dailyPuzzle | update daily puzzle fields |
|https://slider-fun.onrender.com/api/dailyPuzzle/:id | delete | dailyPuzzle | delete the daily puzzle object for the given id |

#### User Puzzle Data Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/userPuzzleData/new | post | userPuzzleData | create a new puzzle data object |
|https://slider-fun.onrender.com/api/userPuzzleData/all | get | userPuzzleData | get all puzzle data objects |
|https://slider-fun.onrender.com/api/userPuzzleData/:id | get | userPuzzleData | get puzzle data object for the give id |
|https://slider-fun.onrender.com/api/userPuzzleData/:id | put | userPuzzleData | update puzzle data object for the give id and fields |
|https://slider-fun.onrender.com/api/dailyPuzzle/:id | delete | userPuzzleData | delete the puzzle data object for the given id |
