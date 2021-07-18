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

export type Comments = {
  __typename?: 'Comments';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  body: Scalars['String'];
  user: Users;
  upvotes: Array<UpvotesComments>;
  downvotes: Array<DownvotesComments>;
  totalVotes: Scalars['Float'];
  post: Posts;
  children: Array<Scalars['Float']>;
  parent?: Maybe<Scalars['Float']>;
  upvoted: Scalars['Boolean'];
  downvoted: Scalars['Boolean'];
  me: Scalars['Boolean'];
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

export type DownvotesComments = {
  __typename?: 'DownvotesComments';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: Users;
  comment: Comments;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegisterResponse;
  logout: Scalars['Boolean'];
  post: PostResponse;
  edit: PostResponse;
  delete: Scalars['String'];
  upvote: UpvoteResponse;
  downvote: DownvoteResponse;
  upvoteComment: UpvoteResponse;
  downvoteComment: DownvoteResponse;
  comment: CommentResponse;
  editComment: CommentResponse;
  deleteComment: Scalars['String'];
};


export type MutationRegisterArgs = {
  registerInfo: RegisterInput;
};


export type MutationPostArgs = {
  postInfo: PostInput;
};


export type MutationEditArgs = {
  postId: Scalars['Float'];
  postInfo: PostInput;
};


export type MutationDeleteArgs = {
  postId: Scalars['Float'];
};


export type MutationUpvoteArgs = {
  postId: Scalars['String'];
};


export type MutationDownvoteArgs = {
  postId: Scalars['String'];
};


export type MutationUpvoteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDownvoteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationCommentArgs = {
  commentInfo: CommentInput;
};


export type MutationEditCommentArgs = {
  commentId: Scalars['Float'];
  body: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Float'];
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
  comment: Array<Comments>;
  discussion: Scalars['Int'];
  me: Scalars['Boolean'];
  upvoted: Scalars['Boolean'];
  downvoted: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  login: RegisterResponse;
  auth: AuthResponse;
  profile: ProfileResponse;
  feed: Array<Posts>;
  getPost: Posts;
  search: Array<Posts>;
  thread: Array<Comments>;
};


export type QueryLoginArgs = {
  loginInfo: LoginInput;
};


export type QueryProfileArgs = {
  username: Scalars['String'];
};


export type QueryFeedArgs = {
  lastPostId?: Maybe<Scalars['String']>;
};


export type QueryGetPostArgs = {
  postId: Scalars['Float'];
};


export type QuerySearchArgs = {
  query: Scalars['String'];
};


export type QueryThreadArgs = {
  postId: Scalars['Float'];
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

export type UpvotesComments = {
  __typename?: 'UpvotesComments';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: Users;
  comment: Posts;
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  reputation: Scalars['Int'];
  posts: Array<Posts>;
  comments: Array<Comments>;
  upvotes: Array<Upvotes>;
  downvotes: Array<Downvotes>;
  upvotesComments: Array<UpvotesComments>;
  downvotesComments: Array<DownvotesComments>;
};

export type AuthResponse = {
  __typename?: 'authResponse';
  msg: Scalars['String'];
  user?: Maybe<Users>;
};

export type CommentInput = {
  body: Scalars['String'];
  commentId?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type CommentResponse = {
  __typename?: 'commentResponse';
  msg: Scalars['String'];
  comment?: Maybe<Comments>;
};

export type DownvoteResponse = {
  __typename?: 'downvoteResponse';
  msg: Scalars['String'];
  action?: Maybe<DownvoteAction>;
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

export type ProfileResponse = {
  __typename?: 'profileResponse';
  msg: Scalars['String'];
  me?: Maybe<Scalars['Boolean']>;
  user?: Maybe<Users>;
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

export type UpvoteResponse = {
  __typename?: 'upvoteResponse';
  msg: Scalars['String'];
  action?: Maybe<UpvoteAction>;
};

export type BasicCommentsFragment = (
  { __typename?: 'Comments' }
  & Pick<Comments, 'id' | 'body' | 'me' | 'upvoted' | 'downvoted' | 'totalVotes'>
);

export type BasicPostFragment = (
  { __typename?: 'Posts' }
  & Pick<Posts, 'id' | 'title' | 'body' | 'me' | 'upvoted' | 'downvoted' | 'totalVotes' | 'discussion'>
);

export type DownvoteResFragment = (
  { __typename?: 'downvoteResponse' }
  & Pick<DownvoteResponse, 'msg' | 'action'>
);

export type MsgAndTokenFragment = (
  { __typename?: 'registerResponse' }
  & Pick<RegisterResponse, 'msg' | 'token'>
);

export type UpvoteResFragment = (
  { __typename?: 'upvoteResponse' }
  & Pick<UpvoteResponse, 'msg' | 'action'>
);

export type CommentMutationVariables = Exact<{
  postId: Scalars['String'];
  body: Scalars['String'];
  commentId?: Maybe<Scalars['String']>;
}>;


export type CommentMutation = (
  { __typename?: 'Mutation' }
  & { comment: (
    { __typename?: 'commentResponse' }
    & Pick<CommentResponse, 'msg'>
    & { comment?: Maybe<(
      { __typename?: 'Comments' }
      & Pick<Comments, 'children' | 'parent'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'name'>
      ) }
      & BasicCommentsFragment
    )> }
  ) }
);

export type DownvoteMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DownvoteMutation = (
  { __typename?: 'Mutation' }
  & { downvote: (
    { __typename?: 'downvoteResponse' }
    & DownvoteResFragment
  ) }
);

export type DownvoteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DownvoteCommentMutation = (
  { __typename?: 'Mutation' }
  & { downvoteComment: (
    { __typename?: 'downvoteResponse' }
    & DownvoteResFragment
  ) }
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'delete'>
);

export type EditPostMutationVariables = Exact<{
  postId: Scalars['Float'];
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { edit: (
    { __typename?: 'postResponse' }
    & Pick<PostResponse, 'msg'>
    & { post?: Maybe<(
      { __typename?: 'Posts' }
      & Pick<Posts, 'title' | 'body'>
    )> }
  ) }
);

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['Float'];
  body: Scalars['String'];
}>;


export type EditCommentMutation = (
  { __typename?: 'Mutation' }
  & { editComment: (
    { __typename?: 'commentResponse' }
    & Pick<CommentResponse, 'msg'>
    & { comment?: Maybe<(
      { __typename?: 'Comments' }
      & Pick<Comments, 'body'>
    )> }
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Float'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
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
    & UpvoteResFragment
  ) }
);

export type UpvoteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type UpvoteCommentMutation = (
  { __typename?: 'Mutation' }
  & { upvoteComment: (
    { __typename?: 'upvoteResponse' }
    & UpvoteResFragment
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
      & Pick<Users, 'id' | 'name' | 'reputation'>
    )> }
  ) }
);

export type FeedQueryVariables = Exact<{
  lastPostId?: Maybe<Scalars['String']>;
}>;


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed: Array<(
    { __typename?: 'Posts' }
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'name'>
    ) }
    & BasicPostFragment
  )> }
);

export type GetPostQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Posts' }
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'name'>
    ), comment: Array<(
      { __typename?: 'Comments' }
      & Pick<Comments, 'children' | 'parent'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'name'>
      ) }
      & BasicCommentsFragment
    )> }
    & BasicPostFragment
  ) }
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

export type ProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { profile: (
    { __typename?: 'profileResponse' }
    & Pick<ProfileResponse, 'msg' | 'me'>
    & { user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'name' | 'reputation' | 'email'>
      & { posts: Array<(
        { __typename?: 'Posts' }
        & BasicPostFragment
      )> }
    )> }
  ) }
);

export type ProfileWithCommentsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type ProfileWithCommentsQuery = (
  { __typename?: 'Query' }
  & { profile: (
    { __typename?: 'profileResponse' }
    & Pick<ProfileResponse, 'msg' | 'me'>
    & { user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'name' | 'reputation' | 'email'>
      & { comments: Array<(
        { __typename?: 'Comments' }
        & { post: (
          { __typename?: 'Posts' }
          & Pick<Posts, 'id'>
        ) }
        & BasicCommentsFragment
      )> }
    )> }
  ) }
);

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { search: Array<(
    { __typename?: 'Posts' }
    & { user: (
      { __typename?: 'Users' }
      & Pick<Users, 'name'>
    ) }
    & BasicPostFragment
  )> }
);

export const BasicCommentsFragmentDoc = gql`
    fragment basicComments on Comments {
  id
  body
  me
  upvoted
  downvoted
  totalVotes
}
    `;
export const BasicPostFragmentDoc = gql`
    fragment basicPost on Posts {
  id
  title
  body
  me
  upvoted
  downvoted
  totalVotes
  discussion
}
    `;
export const DownvoteResFragmentDoc = gql`
    fragment downvoteRes on downvoteResponse {
  msg
  action
}
    `;
export const MsgAndTokenFragmentDoc = gql`
    fragment msgAndToken on registerResponse {
  msg
  token
}
    `;
export const UpvoteResFragmentDoc = gql`
    fragment upvoteRes on upvoteResponse {
  msg
  action
}
    `;
export const CommentDocument = gql`
    mutation comment($postId: String!, $body: String!, $commentId: String) {
  comment(commentInfo: {postId: $postId, body: $body, commentId: $commentId}) {
    msg
    comment {
      ...basicComments
      children
      parent
      user {
        name
      }
    }
  }
}
    ${BasicCommentsFragmentDoc}`;
export const DownvoteDocument = gql`
    mutation downvote($postId: String!) {
  downvote(postId: $postId) {
    ...downvoteRes
  }
}
    ${DownvoteResFragmentDoc}`;
export const DownvoteCommentDocument = gql`
    mutation downvoteComment($commentId: String!) {
  downvoteComment(commentId: $commentId) {
    ...downvoteRes
  }
}
    ${DownvoteResFragmentDoc}`;
export const DeletePostDocument = gql`
    mutation deletePost($postId: Float!) {
  delete(postId: $postId)
}
    `;
export const EditPostDocument = gql`
    mutation editPost($postId: Float!, $title: String!, $body: String!) {
  edit(postId: $postId, postInfo: {title: $title, body: $body}) {
    msg
    post {
      title
      body
    }
  }
}
    `;
export const EditCommentDocument = gql`
    mutation editComment($commentId: Float!, $body: String!) {
  editComment(commentId: $commentId, body: $body) {
    msg
    comment {
      body
    }
  }
}
    `;
export const DeleteCommentDocument = gql`
    mutation deleteComment($commentId: Float!) {
  deleteComment(commentId: $commentId)
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
    ...upvoteRes
  }
}
    ${UpvoteResFragmentDoc}`;
export const UpvoteCommentDocument = gql`
    mutation upvoteComment($commentId: String!) {
  upvoteComment(commentId: $commentId) {
    ...upvoteRes
  }
}
    ${UpvoteResFragmentDoc}`;
export const AuthDocument = gql`
    query auth {
  auth {
    msg
    user {
      id
      name
      reputation
    }
  }
}
    `;
export const FeedDocument = gql`
    query feed($lastPostId: String) {
  feed(lastPostId: $lastPostId) {
    ...basicPost
    user {
      name
    }
  }
}
    ${BasicPostFragmentDoc}`;
export const GetPostDocument = gql`
    query getPost($postId: Float!) {
  getPost(postId: $postId) {
    ...basicPost
    user {
      name
    }
    comment {
      ...basicComments
      user {
        name
      }
      children
      parent
    }
  }
}
    ${BasicPostFragmentDoc}
${BasicCommentsFragmentDoc}`;
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
export const ProfileDocument = gql`
    query profile($username: String!) {
  profile(username: $username) {
    msg
    me
    user {
      name
      reputation
      email
      posts {
        ...basicPost
      }
    }
  }
}
    ${BasicPostFragmentDoc}`;
export const ProfileWithCommentsDocument = gql`
    query profileWithComments($username: String!) {
  profile(username: $username) {
    msg
    me
    user {
      name
      reputation
      email
      comments {
        ...basicComments
        post {
          id
        }
      }
    }
  }
}
    ${BasicCommentsFragmentDoc}`;
export const SearchDocument = gql`
    query search($query: String!) {
  search(query: $query) {
    ...basicPost
    user {
      name
    }
  }
}
    ${BasicPostFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    comment(variables: CommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CommentMutation>(CommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'comment');
    },
    downvote(variables: DownvoteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DownvoteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DownvoteMutation>(DownvoteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'downvote');
    },
    downvoteComment(variables: DownvoteCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DownvoteCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DownvoteCommentMutation>(DownvoteCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'downvoteComment');
    },
    deletePost(variables: DeletePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePostMutation>(DeletePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deletePost');
    },
    editPost(variables: EditPostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditPostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditPostMutation>(EditPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editPost');
    },
    editComment(variables: EditCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EditCommentMutation>(EditCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editComment');
    },
    deleteComment(variables: DeleteCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCommentMutation>(DeleteCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteComment');
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
    upvoteComment(variables: UpvoteCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpvoteCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpvoteCommentMutation>(UpvoteCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upvoteComment');
    },
    auth(variables?: AuthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthQuery>(AuthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'auth');
    },
    feed(variables?: FeedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FeedQuery>(FeedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'feed');
    },
    getPost(variables: GetPostQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostQuery>(GetPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPost');
    },
    hello(variables?: HelloQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HelloQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HelloQuery>(HelloDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'hello');
    },
    login(variables: LoginQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginQuery>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login');
    },
    profile(variables: ProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProfileQuery>(ProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'profile');
    },
    profileWithComments(variables: ProfileWithCommentsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProfileWithCommentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProfileWithCommentsQuery>(ProfileWithCommentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'profileWithComments');
    },
    search(variables: SearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchQuery>(SearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'search');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;