import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum DownvoteAction {
  Downvote = 'DOWNVOTE',
  Undownvote = 'UNDOWNVOTE'
}

export type Downvotes = {
  __typename?: 'Downvotes';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: Users;
  post: Posts;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegisterResponse;
  logout: Scalars['Boolean'];
  post: PostResponse;
  upvote: UpvoteResponse;
  downvote: DownvoteResponse;
};


export type MutationRegisterArgs = {
  registerInfo: RegisterInput;
};


export type MutationPostArgs = {
  postInfo: PostInput;
};


export type MutationUpvoteArgs = {
  postId: Scalars['String'];
};


export type MutationDownvoteArgs = {
  postId: Scalars['String'];
};

export type Posts = {
  __typename?: 'Posts';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
  user: Users;
  upvotes: Array<Upvotes>;
  downvotes: Array<Downvotes>;
  totalVotes: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  login: RegisterResponse;
  auth: AuthResponse;
  feed: Array<FeedResponse>;
};


export type QueryLoginArgs = {
  loginInfo: LoginInput;
};


export type QueryFeedArgs = {
  lastPostId?: Maybe<Scalars['String']>;
};

export enum UpvoteAction {
  Upvote = 'UPVOTE',
  Unupvote = 'UNUPVOTE'
}

export type Upvotes = {
  __typename?: 'Upvotes';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: Users;
  post: Posts;
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  posts: Array<Posts>;
  upvotes: Array<Upvotes>;
  downvotes: Array<Downvotes>;
};

export type AuthResponse = {
  __typename?: 'authResponse';
  msg: Scalars['String'];
  user?: Maybe<Users>;
};

export type DownvoteResponse = {
  __typename?: 'downvoteResponse';
  msg: Scalars['String'];
  action?: Maybe<DownvoteAction>;
};

export type FeedResponse = {
  __typename?: 'feedResponse';
  upvoted: Scalars['Boolean'];
  downvoted: Scalars['Boolean'];
  post: Posts;
};

export type LoginInput = {
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'postResponse';
  msg: Scalars['String'];
  post?: Maybe<Posts>;
};

export type RegisterInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'registerResponse';
  msg: Scalars['String'];
};

export type UpvoteResponse = {
  __typename?: 'upvoteResponse';
  msg: Scalars['String'];
  action?: Maybe<UpvoteAction>;
};

export type MsgAndTokenFragment = (
  { __typename?: 'registerResponse' }
  & Pick<RegisterResponse, 'msg'>
);

export type DownvoteMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DownvoteMutation = (
  { __typename?: 'Mutation' }
  & { downvote: (
    { __typename?: 'downvoteResponse' }
    & Pick<DownvoteResponse, 'msg' | 'action'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type PostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type PostMutation = (
  { __typename?: 'Mutation' }
  & { post: (
    { __typename?: 'postResponse' }
    & Pick<PostResponse, 'msg'>
    & { post?: Maybe<(
      { __typename?: 'Posts' }
      & Pick<Posts, 'title' | 'body'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'registerResponse' }
    & MsgAndTokenFragment
  ) }
);

export type UpvoteMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type UpvoteMutation = (
  { __typename?: 'Mutation' }
  & { upvote: (
    { __typename?: 'upvoteResponse' }
    & Pick<UpvoteResponse, 'msg' | 'action'>
  ) }
);

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = (
  { __typename?: 'Query' }
  & { auth: (
    { __typename?: 'authResponse' }
    & Pick<AuthResponse, 'msg'>
    & { user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'name'>
    )> }
  ) }
);

export type FeedQueryVariables = Exact<{
  lastPostId?: Maybe<Scalars['String']>;
}>;


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed: Array<(
    { __typename?: 'feedResponse' }
    & Pick<FeedResponse, 'upvoted' | 'downvoted'>
    & { post: (
      { __typename?: 'Posts' }
      & Pick<Posts, 'id' | 'title' | 'body' | 'totalVotes'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'name'>
      ) }
    ) }
  )> }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LoginQueryVariables = Exact<{
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'registerResponse' }
    & MsgAndTokenFragment
  ) }
);

export const MsgAndTokenFragmentDoc = gql`
    fragment msgAndToken on registerResponse {
  msg
}
    `;
export const DownvoteDocument = gql`
    mutation downvote($postId: String!) {
  downvote(postId: $postId) {
    msg
    action
  }
}
    `;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export const PostDocument = gql`
    mutation post($title: String!, $body: String!) {
  post(postInfo: {title: $title, body: $body}) {
    post {
      title
      body
    }
    msg
  }
}
    `;
export const RegisterDocument = gql`
    mutation register($name: String!, $email: String!, $password: String!) {
  register(registerInfo: {name: $name, email: $email, password: $password}) {
    ...msgAndToken
  }
}
    ${MsgAndTokenFragmentDoc}`;
export const UpvoteDocument = gql`
    mutation upvote($postId: String!) {
  upvote(postId: $postId) {
    msg
    action
  }
}
    `;
export const AuthDocument = gql`
    query auth {
  auth {
    msg
    user {
      id
      name
    }
  }
}
    `;
export const FeedDocument = gql`
    query feed($lastPostId: String) {
  feed(lastPostId: $lastPostId) {
    upvoted
    downvoted
    post {
      id
      title
      body
      totalVotes
      user {
        name
      }
    }
  }
}
    `;
export const HelloDocument = gql`
    query hello {
  hello
}
    `;
export const LoginDocument = gql`
    query login($nameOrEmail: String!, $password: String!) {
  login(loginInfo: {nameOrEmail: $nameOrEmail, password: $password}) {
    ...msgAndToken
  }
}
    ${MsgAndTokenFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    downvote(variables: DownvoteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DownvoteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DownvoteMutation>(DownvoteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'downvote');
    },
    logout(variables?: LogoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutMutation>(LogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logout');
    },
    post(variables: PostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostMutation>(PostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'post');
    },
    register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'register');
    },
    upvote(variables: UpvoteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpvoteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpvoteMutation>(UpvoteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upvote');
    },
    auth(variables?: AuthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthQuery>(AuthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'auth');
    },
    feed(variables?: FeedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FeedQuery>(FeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'feed');
    },
    hello(variables?: HelloQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HelloQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HelloQuery>(HelloDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'hello');
    },
    login(variables: LoginQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginQuery>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;