# IdoSell API client

API created as part of a recruitment assignment. 

It allows to download a list of orders and information about specific order.

## Created with

Server created with **Node.js** and **Express.js**.

## Running the application 

1. **Clone Repository**

```shell script
git clone https://github.com/wych0/idomods-be.git
cd idomods-be
```

2. **Build Application**

```shell script
npm install
```

3. **Configure Application**

Create .env file with:
- IDOSELL_API_KEY,
- IDOSELL_API_URL,
- BASIC_AUTH_USER,
- BASIC_AUTH_PASSWORD,
- PORT (optional).

4. **Run Application**

```shell script
npm start
```

## How to use?

### List orders

- **Method:** `GET`
- **Path:** `/order`
- **Query Params:**
  - `minWorth` - min value of order
  - `maxWorth` - max value of order

#### Example request:

```shell script
GET http://localhost:3000/order?minWorth=51&maxWorth=58
```

#### Example response:

```csv
orderID,products,orderWorth
gehow78272-1,[],54.03
it@zooart.com.pl-182,[productID:26544,quantity:1],52.52
it@zooart.com.pl-211,[productID:4150,quantity:1],56.3
it@zooart.com.pl-224,[productID:77091,quantity:3;productID:77091,quantity:1],54
it@zooart.com.pl-239,[productID:77199,quantity:3],52.5
it@zooart.com.pl-246,[productID:77200,quantity:3],57
it@zooart.com.pl-263,[productID:2,quantity:1;productID:2,quantity:2;productID:6465,quantity:1;productID:17040,quantity:1],51
it@zooart.com.pl-285,[productID:25033,quantity:1],57
it@zooart.com.pl-299,[productID:2,quantity:2;productID:17040,quantity:2],52
it@zooart.com.pl-395,[productID:77249,quantity:1],57.2
it@zooart.com.pl-403,[productID:198718,quantity:1;productID:76082,quantity:1],52.56
it@zooart.com.pl-404,[productID:198718,quantity:1;productID:76082,quantity:1],52.56
it@zooart.com.pl-423,[productID:85457,quantity:1;productID:4303,quantity:1;productID:6465,quantity:1],53.21
krystyna.ovdeichuk@brandsmanago.pl-20,[productID:198304,quantity:1],57.5
krystyna.ovdeichuk@brandsmanago.pl-21,[productID:198306,quantity:1],57.5
pgaca-17,[productID:2,quantity:1;productID:5453,quantity:1;productID:5453,quantity:1;productID:17040,quantity:1;productID:17041,quantity:1;productID:10014,quantity:1],53.96
tetete0211211204-3,[productID:6459,quantity:1],56.55
tetete150124141852-1,[productID:25033,quantity:1],52.25
```

#### Example response (error):

```json
{
    "success": false,
    "message": "minWorth cannot be greater than maxWorth"
}
```

### Order details

- **Method:** `GET`
- **Path:** `/order/${id}`
- **Params:**
  - `id` - order id

#### Example request:

```shell script
GET http://localhost:3000/order/aaaa@aa.aa-1
```

#### Example response:

```json
{
    "orderID": "aaaa@aa.aa-1",
    "products": [
        {
            "productID": 2,
            "quantity": 12
        }
    ],
    "orderWorth": 0.96
}
```

#### Example response (error):

```json
{
    "success": false,
    "message": "Couldn't find order"
}
```

