const mongoose = require('mongoose');
const Bid = require('../models/bid');
const DishRequest = require('../models/dishrequest');
const Foodlover = require("../models/foodlover");
const FoodProvider = require("../models/foodprovider");

mongoose
    .connect('mongodb://heroku_htzmm00n:80p82k7j9t7m09jh49r3e7vid1@ds159563.mlab.com:59563/heroku_htzmm00n', { useNewUrlParser: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));


const foodproviders =

    [
        {
            "email": "food@provider.nl",
            "password": "$2b$10$wS1mds6fNDH272r9jf9kLOxP6EeCuU2l1DkMJlXImtxgDDC9mLh6C",
        },
        {
            "email": "food@nl.nl",
            "password": "$2b$10$7vinklWLeEgzF7JC.Sw37uyg5otjBBusjJ8U/TY49ekDaSIOKfFfy",
        },
        {
            "email": "kfc@kfc.nl",
            "password": "$2b$10$aX1aSYk2L/ZGmVApOH5zr.oJk.wIq4BV2Pq0uB.tPmDBd8lQbQfVq",
        },
        {
            "email": "wat@wat.nl",
            "password": "$2b$10$vTk59xYzGAFyrCHRP1rNtu9.BDNM6CBmKHBBYMxEaji74qGHxH3D2",
        },
        {
            "email": "wie@wie.nl",
            "password": "$2b$10$RehqynB1943lCMdWcKUWseIqN83eXj4VEI/BiM0G7aGdNm9Uy1RRC",
            "city": "Lutjebroek",
            "companyName": "wie anders?",
            "houseNumber": "2",
            "postalCode": "1092 KL",
            "street": "wienogmeerstraat"
        },
        {
            "email": "mc@donalds.nl",
            "password": "$2b$10$Tu9iBreuBl9kJatPD6Mie.ZbvQlh27bnQN0L/jjQt.VMIma5THsnu",
            "city": "Amsterdan",
            "companyName": "McDonalds",
            "houseNumber": "1",
            "postalCode": "0000 AB",
            "street": "hamburgerstreet"
        },
        {
            "email": "martin@martin.nl",
            "password": "$2b$10$.Kft9sMdHGY1pHdzDCRj/um3qbsBD8eeL3kjUexvzYh0eDlQFqJVa",
            "city": "Nijmegen",
            "companyName": "Martin",
            "houseNumber": "1",
            "postalCode": "0000 AB",
            "street": "martinstreet"
        },
        {
            "email": "stefano@stefano.nl",
            "password": "$2b$10$aTIMaxGmIGCxoc8pOVj3t.eDuBMaqFHo9./Xk/q6E7vyNYrmD0YSC",
            "city": "Milaan",
            "companyName": "stefano",
            "houseNumber": "1",
            "postalCode": "0000 AB",
            "street": "stefanostreet"
        },
        {
            "email": "izly@izly.nl",
            "password": "$2b$10$yWAN2WUuRwyMLF7NVAsLMuqMo2SXMEKklO4zC3KrcicMZVjPqmV66",
            "city": "Amstelveen",
            "companyName": "izly pizza",
            "houseNumber": "69",
            "postalCode": "1234 AB",
            "street": "pizzastreet"
        },
        {
            "email": "cookie@monster.nl",
            "password": "$2b$10$TelxkK.V8qlYsLFS9dNs1eu5eTW2GeE3onMqfwX1B3j8Mk38JsQCq",
            "city": "Degenter",
            "companyName": "cookiemonster",
            "houseNumber": "5",
            "postalCode": "5432 LK",
            "street": "kooekjesstraat"
        }
    ];




// FoodProvider.remove({}, () => {
//     for (foodprovider of foodproviders) {
//         FoodProvider.create(foodprovider);
//         console.log('done!');
//     }
// })



const foodlovers =

    [
        {
            "username": "hans",
            "email": "pans",
            "password": "$2b$10$.C/7B1jeOhFmehUYZ6bCteiOpX48B00EwRv/f91O4Iapx14mTkmlW",
        },
        {
            "username": "kido",
            "email": "kido@jung.nl",
            "password": "$2b$10$8A7dhAq05R0ngfH8P0kzh.t6H8f/SXYyF9tybyqI2ywhaj8Bxwo6.",
        },
        {
            "username": "jan",
            "email": "pieter@test.nl",
            "password": "$2b$10$jf0pWx3/tj3VAtLYkhTzU.lJrRPsP8KqCygl.IIpRfjKnu/7.7jiO",
        },
        {
            "email": "dessy_lidyasari@yahoo.com",
            "password": "$2b$10$JR9qCbWzJc/k3kVNcGWrm.ZqX3uylE5Wmhk6DDmXn8nboStntI5VC",
        },
        {
            "email": "newresto@resto.nl",
            "password": "$2b$10$HBm1dKRSdJkISW4ruYIT5OcKeJK.G8l7GYFHEx0KwNIo3iyndsPfW",
        },
        {
            "email": "rest@rest.nl",
            "password": "$2b$10$Ndskw9PSodpWLah9mUhfgOWik8ZVCeCGe3cpDHSlWAITNpeMFNiQC",
        },
        {
            "email": "f@l.nl",
            "password": "$2b$10$yAUdK6w0HI3LlZUaUDk6POVuk1aqKdPVv3P5Q6TFNp0YZFzOMFHrO",
        },
        {
            "email": "food@hater.nl",
            "password": "$2b$10$ap/Pr8NezY.zo0cyx6G24ugmJ7snG5Q7QkOZI4aJNmrFpZkCV.Bb2",
        },
        {
            "email": "lovah@lovah.nl",
            "password": "$2b$10$Er848a2nz8cWAFIRXyUgne9K/.pIdRtuBmj6FhOfqDTLQAsKTJEzi",
        },
        {
            "email": "no@no.nl",
            "password": "$2b$10$9ShXK7ODT9gI01pRP8oGE.Td9YuFNOcZTp9ck6VXKZVaatcGbZLnS",
        },
        {
            "email": "constant@in.nl",
            "password": "$2b$10$a7s7.4onRkOUCA/LfozakOJfHMuinUXYHIQU45KYL14SK4mClpDI6",
            "firstName": "Jek",
            "houseNumber": " 40",
            "lastName": "Lidyasari",
            "postalCode": "1091AH",
            "street": "Camperstraat",
            "city": "Amstelveen"
        },
        {
            "email": "arthur@arthur.nl",
            "password": "$2b$10$IUJgpJyjjOMCDNCtaCuS1OrCnp/aEe41cN5Sm/TM3rAOERHNJD1p2",
            "city": "amsterdam",
            "firstName": "arthur",
            "houseNumber": "2",
            "lastName": "arthur",
            "postalCode": "1111 ab",
            "street": "strawinskylann"
        },
        {
            "email": "martin@martin.nl",
            "password": "$2b$10$rXVVErR21/khvYDesf.yIOjbRijid9Kxl.ZDK5r9h5owGTub3Apua",
            "city": "Nijmegen",
            "firstName": "M",
            "houseNumber": "1",
            "lastName": "artin",
            "postalCode": "0000 AB",
            "street": "martinstreet"
        },
        {
            "email": "stefan@griesel.nl",
            "password": "$2b$10$e.dNEllFjCpLOh4h1kht7.l3bFkg9lIS90Ujkv0DO6eYW.INbftBC",
            "city": "Timboektoe",
            "firstName": "Stefan",
            "houseNumber": "2",
            "lastName": "Griesel",
            "postalCode": "1234 QW",
            "street": "grieselstraat"
        },
        {
            "email": "dessy@dessy.nl",
            "password": "$2b$10$SU5upSh77BR09JGpzrT0meC5mIsUvoZrzQXFRNZL.pTfrhbbThOQW",
            "city": "AMSTERDAM",
            "firstName": "Dessy",
            "houseNumber": "Camperstraat 40, 4",
            "lastName": "Lidyasari",
            "postalCode": "1091AH",
            "street": "Camperstraat"
        }
    ];


// Foodlover.remove({}, () => {
//     for (foodlover of foodlovers) {
//         Foodlover.create(foodlover);
//         console.log('done!');
//     }
// })






