import { gql } from "graphql-request";

export const POST = gql`
  mutation post($title: String!, $body: String!, userId:String!) {
    post(postInfo:{title:$$title, body:$body, userId:$userId}) {
      post {
        title
        body
      }
      msg
    }
  }
`;
