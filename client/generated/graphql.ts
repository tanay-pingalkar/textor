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

export type Mutation = {
  __typename?: 'Mutation';
  register: RegisterResponse;
  post: PostResponse;
};


export type MutationRegisterArgs = {
  registerInfo: RegisterInput;
};


export type MutationPostArgs = {
  postInfo: PostInput;
};

export type Posts = {
  __typename?: 'Posts';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
  user: Users;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getAllUsers: Array<Users>;
  login: RegisterResponse;
  auth: AuthResponse;
  feed: Array<Posts>;
};


export type QueryLoginArgs = {
  loginInfo: LoginInput;
};


export type QueryAuthArgs = {
  token: Scalars['String'];
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
};

export type AuthResponse = {
  __typename?: 'authResponse';
  msg: Scalars['String'];
  user?: Maybe<Users>;
};

export type LoginInput = {
  nameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  userId: Scalars['String'];
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
  token?: Maybe<Scalars['String']>;
};

export type MsgAndTokenFragment = (
  { __typename?: 'registerResponse' }
  & Pick<RegisterResponse, 'msg' | 'token'>
);

export type PostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  userId: Scalars['String'];
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

export type AuthQueryVariables = Exact<{
  token: Scalars['String'];
}>;


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

export type FeedQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed: Array<(
    { __typename?: 'Posts' }
    & Pick<Posts, 'title' | 'body'>
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'name'>
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
  token
}
    `;
export const PostDocument = gql`
    mutation post($title: String!, $body: String!, $userId: String!) {
  post(postInfo: {title: $title, body: $body, userId: $userId}) {
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
export const AuthDocument = gql`
    query auth($token: String!) {
  auth(token: $token) {
    msg
    user {
      id
      name
    }
  }
}
    `;
export const FeedDocument = gql`
    query feed {
  feed {
    title
    body
    user {
      name
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
    post(variables: PostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostMutation>(PostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'post');
    },
    register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterMutation>(RegisterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'register');
    },
    auth(variables: AuthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthQuery> {
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