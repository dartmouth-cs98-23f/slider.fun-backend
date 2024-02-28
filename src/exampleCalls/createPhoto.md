### EXAMPLE CALL FOR CREATING A PHOTO

URL to use: `https://slider-fun.onrender.com/api/photo/new`

```
{
  "imageUrl": "https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/images%2F4.jpg?alt=media&token=4910492b-1934-4014-b1c1-dea6a0365b51&_gl=1*5klvjs*_ga*MTI5MTQyNzc4OS4xNjk4MjUzOTEz*_ga_CW55HF8NVT*MTY5ODYzMzU1Mi44LjEuMTY5ODYzNzgzOS42MC4wLjA",
  "authorId" : "1234",
  "title" : "Photo Title",
  "photoProperties": [
		{
			"name": "Brightness",
			"property": "brightness",
			"value": 150,
			"range": {
				"min": 0,
				"max": 200
			},
			"unit": "%",
			"status": true
		},
		{
			"name": "Contrast",
			"property": "contrast",
			"value": 100,
			"range": {
				"min": 0,
				"max": 200
			},
			"unit": "%",
			"status": true
		},
		{
			"name": "Saturation",
			"property": "saturate",
			"value": 123,
			"range": {
				"min": 0,
				"max": 200
			},
			"unit": "%",
			"status": true
		},
		{
			"name": "Grayscale",
			"property": "grayscale",
			"value": 4,
			"range": {
				"min": 0,
				"max": 100
			},
			"unit": "%",
			"status": true
		},
		{
			"name": "Sepia",
			"property": "sepia",
			"value": 23,
			"range": {
				"min": 0,
				"max": 100
			},
			"unit": "%",
			"status": true
		},
		{
			"name": "Hue Rotate",
			"property": "hue-rotate",
			"value": 0,
			"range": {
				"min": 0,
				"max": 360
			},
			"unit": "deg",
			"status": true
		},
		{
			"name": "Blur",
			"property": "blur",
			"value": 0,
			"range": {
				"min": 0,
				"max": 20
			},
			"unit": "px",
			"status": true
		}
  ]
}

```