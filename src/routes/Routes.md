# Slider.Fun Routes
### routes module
#### User Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/new | post | userRoutes | create a new user |
|https://slider-fun.onrender.com/api/all | get | userRoutes | get all users
|https://slider-fun.onrender.com/api/:id | get | userRoutes | get user by id
|https://slider-fun.onrender.com/api/:id | put| userRoutes | update user by id |
|https://slider-fun.onrender.com/api/:id | delete | userRoutes | delete user by id
#### Photo Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/all | get | photoRoutes | get all photos
| https://slider-fun.onrender.com/api/new | post | photoRoutes | create photo
|https://slider-fun.onrender.com/api/:id | put | photoRoutes | update photo by id
|https://slider-fun.onrender.com/api/:id | get | photoRoutes | get photo by id |
|https://slider-fun.onrender.com/api/:id | delete | photoRoutes | delete photo by id
#### Photo Property Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/new | post | photoPropertiesRoutes | create new photo properties
|https://slider-fun.onrender.com/api/all | get | photoPropertiesRoutes | get all photo properties
|https://slider-fun.onrender.com/api/:id | put | photoPropertiesRoutes | update photo properties by id |
|https://slider-fun.onrender.com/api/:id | get | photoPropertiesRoutes | update photo properties by id |
|https://slider-fun.onrender.com/api/:id | delete | photoPropertiesRoutes | delete photo properties
#### Level Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/new | post | levelRoutes | create new level
|https://slider-fun.onrender.com/api/all | get | levelRoutes | get all levels
|https://slider-fun.onrender.com/api/levelByNumber/:number | get | levelRoutes | get level by level number |
|https://slider-fun.onrender.com/api/:id | put | levelRoutes | update level by id
|https://slider-fun.onrender.com/api/:id | get | levelRoutes | get level by id |
|https://slider-fun.onrender.com/api/:id | delete | levelRoutes | delete level by id
#### Property Routes
| Route | HTTP Request | Module | Description |
| -------- | -------- | -------- | -------- |
|https://slider-fun.onrender.com/api/new | post | propertyRoutes | create new property |
|https://slider-fun.onrender.com/api/all | get | propertyRoutes | get all properties |
|https://slider-fun.onrender.com/api/:id | put | propertyRoutes | update property | 
|https://slider-fun.onrender.com/api/:id | get | propertyRoutes | get property info | 
|https://slider-fun.onrender.com/api/:id | delete | propertyRoutes | delete property by id |
