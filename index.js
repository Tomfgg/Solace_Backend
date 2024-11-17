const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors')

let theUser = {
    "firstName": "Zaria",
    "fatherName": "Edward",
    "grandfatherName": "Ernest",
    "familyName": "Willie",
    "localizedName": {
        "firstName": "صفوان",
        "fatherName": "حمدان",
        "grandfatherName": "هشام",
        "familyName": "عباس"
    },
    "nationalId": {
        "idNumber": "1c1f3fde-0581-4afb-8c7e-abacf3bc5875",
        "expiryDate": "2024-07-24T22:45:29.864Z"
    },
    "nationalities": [
        {
            "country": {
                "id": "1016",
                "name": "Bolivia"
            },
            "countryId": 1016
        },
        {
            "country": {
                "id": "1117",
                "name": "Latvia"
            },
            "countryId": 1117
        },
        {
            "country": {
                "id": "1225",
                "name": "Virgin Islands, U.S."
            },
            "countryId": 1225
        }
    ],
    "maritalStatus": {
        "id": "27",
        "name": "Divorced"
    },
    "dependants": 60
}

// Define schema
const schema = buildSchema(`
    type User {
  firstName: String
  fatherName: String
  grandfatherName: String
  familyName: String
  localizedName: LocalizedName
  nationalId: NationalId
  nationalities: [Nationality!]!
  maritalStatus: MaritalStatus
  dependants: Int
}
input UserInput{
  firstName: String
  fatherName: String
  grandfatherName: String
  familyName: String
  localizedName: LocalizedNameInput
  nationalId: NationalIdInput
  nationalities: [NationalityInput!]!
  maritalStatus: MaritalStatusInput
  dependants: Int
  }

type LocalizedName {
  firstName: String
  fatherName: String
  grandfatherName: String
  familyName: String
}
input LocalizedNameInput {
  firstName: String
  fatherName: String
  grandfatherName: String
  familyName: String
}

type NationalId {
  idNumber: String
  expiryDate: String
}
input NationalIdInput {
  idNumber: String
  expiryDate: String
}

type Nationality {
  country: Country
  countryId: Int
}
input NationalityInput {
  country: CountryInput
  countryId: Int
}

type Country {
  id: Int
  name: String
}
input CountryInput {
  id: Int
  name: String
}

type MaritalStatus {
  id: Int
  name: String
}
input MaritalStatusInput {
  id: Int
  name: String
}

type Query {
  user(id: Int!): User
}
type Mutation {
updateUser(data: UserInput!): String
}
 
`);

// Define resolvers
const resolvers = {
    user: ({ id }) => {
        console.log("data");
        return theUser
    },

    updateUser: ({ data }) => {
        console.log("Received data:", data);
        theUser = { ...data }
        return 'updated successfully';
    },

};

// Initialize Express app
const app = express();
app.use(cors());


app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log('GraphQL server running at http://localhost:4000/graphql');
});
