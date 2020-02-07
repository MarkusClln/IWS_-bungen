
# Create Containers
## Run MongoDB
`$ docker run --name some-mongo -d mongo:latest`
## Create Marketing Image
`$ docker build . -t marketing-image`
## Run Marketing Container
Use inspect on MongoDB container to get the IP
`$ docker inspect some-mongo`<br/>
`$ docker run -e DB_IP=change_me -p 3000:3000 --name marketing-container marketing-image`

# API

**Get All Campaigns**
----
  Returns json data about all campaigns.

* **URL**

  /

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{
                          "_id": "5df62fff55d78800128a6067",
                          "product_id": "someID",
                          "date_from": "2019-09-07T14:50:00.000Z",
                          "date_to": "2019-09-08T14:50:00.000Z",
                          "discount": 30,
                          "__v": 0
                      },
                      {
                          "_id": "5df6301c55d78800128a6068",
                          "product_id": "someID2",
                          "date_from": "2019-09-07T14:50:00.000Z",
                          "date_to": "2019-09-08T14:50:00.000Z",
                          "discount": 30,
                          "__v": 0
                      }
                  ]`

**Post Campaign**
  ----
    Saves campaign.

  * **URL**

    /

  * **Method:**

    `POST`

  * **Data Params**
    **Required:**
    `product_id=[String]`
    `discount=[double]`
    `date_from=[Date]`
    `date_to=[Date]`

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `"message": "campaign created"`

  * **Sample Call:**

    ``` 
         {
           	"product_id": "someID2",
           	"discount": 30,
           	"date_from": "2019-09-07T15:50+01:00",
           	"date_to": "2019-09-08T15:50+01:00"
         }
    ```
    
**Delete Campaign**
  ----
    Delete campaign by given ID.

  * **URL**

    /:id

  * **Method:**

    `DELETE`

  * **Success Response:**

    * **Code:** 200 <br />
      **Content:** `"message": "successfully deleted"`

**Get Campaign**
  ----
    Get campaign by given product ID.

  * **URL**

    /product/:id

  * **Method:**

    `GET`


