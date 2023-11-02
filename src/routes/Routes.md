# Slider.Fun Routes
### routes module
#### User Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/users/new | post | userRoutes | create a new user |
|https://slider-fun.onrender.com/api/users/all | get | userRoutes | get all users
|https://slider-fun.onrender.com/api/users/:id | get | userRoutes | get user by id
|https://slider-fun.onrender.com/api/users/:id | put| userRoutes | update user by id |
|https://slider-fun.onrender.com/api/users/:id | delete | userRoutes | delete user by id
#### Photo Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/photo/all | get | photoRoutes | get all photos
|https://slider-fun.onrender.com/api/photo/new | post | photoRoutes | create photo
|https://slider-fun.onrender.com/api/photo/addProperty/:id | put | photoRoutes | add a new property to the list of photoProperties | Please provide the new property exactly how you want to have it added to the list
|https://slider-fun.onrender.com/api/photo/removeProperty/:id | delete | photoRoutes | delete a property to the list of photoProperties | Please only provide the property name for this request. For example, to delete the Satruation property, the request would look like `"property" : "Saturation"`
|https://slider-fun.onrender.com/api/photo/:id | put | photoRoutes | update photo by id
|https://slider-fun.onrender.com/api/photo/:id | get | photoRoutes | get photo by id |
|https://slider-fun.onrender.com/api/photo/:id | delete | photoRoutes | delete photo by id
#### Level Routes
| Route | HTTP Request | Module | Description | Note |
| -------- | -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/levels/new | post | levelRoutes | create new level
|https://slider-fun.onrender.com/api/levels/all | get | levelRoutes | get all levels
|https://slider-fun.onrender.com/api/levelByNumber/:number | get | levelRoutes | get level by level number |
|https://slider-fun.onrender.com/api/levels/:id | put | levelRoutes | update level by id
|https://slider-fun.onrender.com/api/levels/:id | get | levelRoutes | get level by id |
|https://slider-fun.onrender.com/api/levels/:id | delete | levelRoutes | delete level by id

