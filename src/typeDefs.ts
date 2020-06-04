import React from 'react'
import gql from 'graphql-tag'

const typeDefs =gql`
  extend type Query  {
    getSome: String
  }
  extend type Mutation {
    createCon(
            createdAt: String
            id: ID!
            name: String!
      ): Conversation
  }
`

export default typeDefs
