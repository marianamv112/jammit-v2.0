const mongoose = require('mongoose');
const User = require('./models/user');

mongoose
  .connect('mongodb://localhost:27017/jammit-v2-tests', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error('Error connecting to mongo', err));

  const users = [
    {
        "username": "johndoe",
        "email": "example@example.com",
        "password": "$2a$10$d1HCYG1cCT3MigSSU5/QIulsNcAz1aW/X5X2TqSbI5cTPxdjGO4HW",
        "status": "Pending",
        "confirmationCode": "validationCode"
    }
  ];

  const jam_sessions = [
    {
    business_status: "OPERATIONAL",
    formatted_address: "Praça da Alegria 48, 1250-004 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.7181498,
    lng: -9.1457154
    },
    viewport: {
    northeast: {
    lat: 38.71946147989272,
    lng: -9.144331920107279
    },
    southwest: {
    lat: 38.71676182010728,
    lng: -9.147031579892722
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    name: "Hot Club of Portugal",
    photos: [
    {
    height: 3456,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/113081005441972755868">Thiago Holanda Cavalcante</a>"
    ],
    photo_reference: "ATtYBwJwtrt_T5tVsR7SGrJUJVcvF2tLzm68CdQm30OIz4aj_N-1vzwQiy2cLTelGbC05q9ya8VUbcc0WtY6ttv8ZvBmRTd2T_r8ZXbpbksnf0QN2yjjJw2HjfDjuK529xPeT_B_BDR30E0VNLCZkM5hCoTzlmmhVhxOsFplFSmihTvP-mrt",
    width: 4608
    }
    ],
    place_id: "ChIJ-SEzq3gzGQ0ROiygfA58uec",
    plus_code: {
    compound_code: "PV93+7P Lisbon",
    global_code: "8CCGPV93+7P"
    },
    price_level: 2,
    rating: 4.7,
    reference: "ChIJ-SEzq3gzGQ0ROiygfA58uec",
    types: [
    "night_club",
    "bar",
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 558
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "R. do Alecrim 21, 1200-014 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.7073563,
    lng: -9.1435333
    },
    viewport: {
    northeast: {
    lat: 38.70867987989271,
    lng: -9.142435820107277
    },
    southwest: {
    lat: 38.70598022010727,
    lng: -9.145135479892721
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    name: "O Bom O Mau e O Vilão",
    opening_hours: {
    open_now: false
    },
    photos: [
    {
    height: 1333,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/110873007373108829116">A Google User</a>"
    ],
    photo_reference: "ATtYBwIfyvHXfdJfO8wYRiq_BePS4PNYaR8xywqmI_B6WaBka1d-IIYRPTO0pp_in3n3whgL3GRQTNT1or2X2DvjY-aJhtUjCkepwl8QWxK1Gvh42ckawqx4rlIlBV_k2JRNPWnJql0KnglbOWpy-mAylDokPkYF49lhIkXJG3Nc3fkVFSzk",
    width: 2000
    }
    ],
    place_id: "ChIJe0uL0H00GQ0RAMXacHY1Oa0",
    plus_code: {
    compound_code: "PV44+WH Lisbon",
    global_code: "8CCGPV44+WH"
    },
    price_level: 2,
    rating: 4.4,
    reference: "ChIJe0uL0H00GQ0RAMXacHY1Oa0",
    types: [
    "bar",
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 794
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "Tv. Inglesinhos 49, 1200-223 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.7126972,
    lng: -9.1462224
    },
    viewport: {
    northeast: {
    lat: 38.71409512989272,
    lng: -9.144845970107276
    },
    southwest: {
    lat: 38.71139547010728,
    lng: -9.14754562989272
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    name: "Jam Club",
    opening_hours: {
    open_now: true
    },
    photos: [
    {
    height: 960,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/105544892146925754657">A Google User</a>"
    ],
    photo_reference: "ATtYBwLYVxb5b_iDdfnM-yNG2bI3MI1Bt6PBOH9EWoAesSWY8Wq5_1SOktuyDxsOkHPgbgnwck1XnwwzZl6-OH4Yw_BrIb2J9SltEM6BiNKrWZOLO0vrulTNyoFwHZUkAGFu-BX0IEVAwHOXZaAPbKESeEUz8RQLCzg8n4H6ay7XGVleEreN",
    width: 720
    }
    ],
    place_id: "ChIJzee3AoA0GQ0RZU7M0-t8p3c",
    plus_code: {
    compound_code: "PV73+3G Lisbon",
    global_code: "8CCGPV73+3G"
    },
    price_level: 1,
    rating: 4.8,
    reference: "ChIJzee3AoA0GQ0RZU7M0-t8p3c",
    types: [
    "restaurant",
    "food",
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 494
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "Rua de Arroios 100, 1150-285 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.7303417,
    lng: -9.135982799999999
    },
    viewport: {
    northeast: {
    lat: 38.73165562989271,
    lng: -9.134693470107278
    },
    southwest: {
    lat: 38.72895597010727,
    lng: -9.137393129892722
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    name: "RA 100 Arroios",
    opening_hours: {
    open_now: false
    },
    photos: [
    {
    height: 3024,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/104918270495196332086">Carlos Madruga</a>"
    ],
    photo_reference: "ATtYBwKB31rJMWebmuVjRNfsNhjoo3DvfqKJ1LsAJzRfuiNp0CRcSXq4gdpPf2NZ05j1dKjyOZXPEvqTmxINs6nZ6EU71zIpZ-48cz45LAti6SiID-mNxWX-fjVEEosUdrwaByVF379FcjB4luMKKRrgDrA52TZMi1GKbT8mbOT4L_C1vgjM",
    width: 4032
    }
    ],
    place_id: "ChIJd6YnlZkzGQ0RyldNdhWwwA8",
    plus_code: {
    compound_code: "PVJ7+4J Lisbon",
    global_code: "8CCGPVJ7+4J"
    },
    rating: 4.2,
    reference: "ChIJd6YnlZkzGQ0RyldNdhWwwA8",
    types: [
    "art_gallery",
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 75
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "Regueirão Anjos 70, 1150-020 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.7253844,
    lng: -9.1358406
    },
    viewport: {
    northeast: {
    lat: 38.72671022989272,
    lng: -9.134519220107277
    },
    southwest: {
    lat: 38.72401057010727,
    lng: -9.137218879892721
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    name: "Anjos 70 - Núcleo Criativo do Regueirão",
    opening_hours: {
    open_now: true
    },
    photos: [
    {
    height: 1365,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/111449996863297602046">Feira das Almas</a>"
    ],
    photo_reference: "ATtYBwJk1lce0aS1Stnuxoa29CIkoOIAatsRbd-INmpaLpF1wzL9tjeJ1XACkDNfaz_stUM46azWE5YQJYL0SAcJChQ9wfOhTRAfT15qkVxRRp5BQarjjx7GwcntUMyPkRcOJS5pyglj7JeZQ8kgT-mhtIeTxaXVdx6pCBy7lb7B09B716Tc",
    width: 2048
    }
    ],
    place_id: "ChIJ32JqlZozGQ0RS6TOgie0JW0",
    plus_code: {
    compound_code: "PVG7+5M Lisbon",
    global_code: "8CCGPVG7+5M"
    },
    rating: 4.4,
    reference: "ChIJ32JqlZozGQ0RS6TOgie0JW0",
    types: [
    "tourist_attraction",
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 1484
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "Cais do Gás, R. da Cintura do Porto de Lisboa, 1200-109 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.7054666,
    lng: -9.146746199999999
    },
    viewport: {
    northeast: {
    lat: 38.70683317989272,
    lng: -9.145391820107276
    },
    southwest: {
    lat: 38.70413352010728,
    lng: -9.14809147989272
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    name: "Titanic Sur Mer",
    opening_hours: {
    open_now: false
    },
    photos: [
    {
    height: 786,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/114247032184063224295">Mike Hiwaymann</a>"
    ],
    photo_reference: "ATtYBwKUPCAU5YjpHY-7ueH_di16VtpHUfeRWk_4JB0fWLRHsxgkXi88nQ-Sl_hhnsfGo-dNjkzH_H4qeoFvj1qA1xrbRSv7MSnXUKSY9P-td60hJZ7kCLV-xxHmhy2UqXWRkdYpyMiYZ1ZEmGAquZpyVzlaiZ3mEZVY9oNGzEpGzTgbwfZc",
    width: 1068
    }
    ],
    place_id: "ChIJa_1gcoc0GQ0RUtEx71nryPU",
    plus_code: {
    compound_code: "PV43+58 Lisbon",
    global_code: "8CCGPV43+58"
    },
    price_level: 2,
    rating: 4.3,
    reference: "ChIJa_1gcoc0GQ0RUtEx71nryPU",
    types: [
    "bar",
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 1151
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "R. Maria 73, 1170-287 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.724819,
    lng: -9.133211
    },
    viewport: {
    northeast: {
    lat: 38.72616507989272,
    lng: -9.131801470107277
    },
    southwest: {
    lat: 38.72346542010728,
    lng: -9.13450112989272
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    name: "BUS Association - Cultural stop",
    opening_hours: {
    open_now: false
    },
    photos: [
    {
    height: 1088,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/108838889717741489825">José Taborda</a>"
    ],
    photo_reference: "ATtYBwKZLr4nkW-7rxiH_nyVgSgZnlmX80kZKrP8RST8syMxCo5DLIYQoP6_FeO77y91UrQt-6zdqLmS7pVu88ychBv7y1Alh2qeeMTA3JEHFVCvxblFLKkBHOY_-6xJF7uGM2NLK7M5ip_J22FoCw4dNVwqt3QjREO-Q-qiHrzkmrBjrgut",
    width: 1920
    }
    ],
    place_id: "ChIJeckRGJAzGQ0R3PKda0KyVxA",
    plus_code: {
    compound_code: "PVF8+WP Lisbon",
    global_code: "8CCGPVF8+WP"
    },
    rating: 4.5,
    reference: "ChIJeckRGJAzGQ0R3PKda0KyVxA",
    types: [
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 71
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "R. Andrade 8A, 1170-014 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.7226065,
    lng: -9.1332114
    },
    viewport: {
    northeast: {
    lat: 38.72394342989272,
    lng: -9.13191772010728
    },
    southwest: {
    lat: 38.72124377010728,
    lng: -9.134617379892724
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    name: "Crew Hassan - Cultural Cooperative C. L. R.",
    opening_hours: {
    open_now: false
    },
    photos: [
    {
    height: 2448,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/106838491534498683278">Inês Graça</a>"
    ],
    photo_reference: "ATtYBwLMSskqxuss-HFArqT9h7IZ8y-bOVnD88QZQgA9xUYIdnUIWRS7vYTilwfCX0_CZSPpodmdzIPgCNKqS6401R_Zu2Edj-QkqrlHSeZUeS_yrbA7yc3adROm5ZngsN-bKDXIoRizazLoXFCH6B8a0VAudcC3XwMSxM97yNKYXr2xY9aZ",
    width: 3264
    }
    ],
    place_id: "ChIJV6Q6aoEzGQ0R1xz9uxl_LE4",
    plus_code: {
    compound_code: "PVF8+2P Lisbon",
    global_code: "8CCGPVF8+2P"
    },
    price_level: 1,
    rating: 4.4,
    reference: "ChIJV6Q6aoEzGQ0R1xz9uxl_LE4",
    types: [
    "bar",
    "electronics_store",
    "home_goods_store",
    "point_of_interest",
    "clothing_store",
    "store",
    "establishment"
    ],
    user_ratings_total: 1201
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "R. Nova do Carvalho 40-42, 1200-000 Lisboa, Portugal",
    geometry: {
    location: {
    lat: 38.7072892,
    lng: -9.143735999999999
    },
    viewport: {
    northeast: {
    lat: 38.70865217989271,
    lng: -9.142534170107275
    },
    southwest: {
    lat: 38.70595252010727,
    lng: -9.14523382989272
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    name: "Bookstore Bar Girl and Girl",
    opening_hours: {
    open_now: true
    },
    photos: [
    {
    height: 3036,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/118431169628578124319">Samuel Hughes</a>"
    ],
    photo_reference: "ATtYBwIPL6hMYzxGTJA1yWf3uG-z4f0mOaP9r4sQVHH8m2OTw2k1AathSj7Kv2FFAFM9zyB3BNAT2rKuUVPUYlg-kQSJcdmvlK9SMg3ndzDsvUjfvC_XVYzuXxc9qnNCanMS-Q6JU1AadoWR3P-9hWlgjMQx-uw38lgVbPya0jLvFdQojvzK",
    width: 4048
    }
    ],
    place_id: "ChIJ8RAX2300GQ0RcPBjj_t-iac",
    plus_code: {
    compound_code: "PV44+WG Lisbon",
    global_code: "8CCGPV44+WG"
    },
    price_level: 2,
    rating: 4.3,
    reference: "ChIJ8RAX2300GQ0RcPBjj_t-iac",
    types: [
    "bar",
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 290
    },
    {
    business_status: "OPERATIONAL",
    formatted_address: "Rua de Sâo Pedro 14, Sâo João das Covas, 2640-312 Mafra, Portugal",
    geometry: {
    location: {
    lat: 38.8891809,
    lng: -9.2870323
    },
    viewport: {
    northeast: {
    lat: 38.89052252989272,
    lng: -9.285668520107276
    },
    southwest: {
    lat: 38.88782287010728,
    lng: -9.28836817989272
    }
    }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    name: "The Groove House",
    opening_hours: {
    open_now: false
    },
    photos: [
    {
    height: 1333,
    html_attributions: [
    "<a href="https://maps.google.com/maps/contrib/111400287042868250845">The Groove House</a>"
    ],
    photo_reference: "ATtYBwJOLXHuGmMyVzGmnaRKDdqepzXVNJ5jIk_9oPVwLmQNYzl_AozUPU-QF79Iwi12ppZweJXY-84kLO0DLBDWELXYdGD0yWxEliVOtFrY9m0u-hmkXUgaLgqL2Krgj_J3eRw_23sg1MfavIFVEtnZDbd4pIwFcoT1kQ_C01rnwWaPO_39",
    width: 2000
    }
    ],
    place_id: "ChIJtUb5ZpjWHg0RCFqjto85e-8",
    plus_code: {
    compound_code: "VPQ7+M5 Mafra",
    global_code: "8CCGVPQ7+M5"
    },
    rating: 4.7,
    reference: "ChIJtUb5ZpjWHg0RCFqjto85e-8",
    types: [
    "lodging",
    "point_of_interest",
    "establishment"
    ],
    user_ratings_total: 21
    }
    ],

  User.create(users)
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} users`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating users from the DB: ${err}`));