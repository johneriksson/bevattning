import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LedResponse = {
  __typename?: 'LEDResponse';
  on: Scalars['Boolean'];
  id: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deletePlant: Scalars['Boolean'];
  createPlant: Plant;
  updatePlant?: Maybe<Plant>;
  waterPlant?: Maybe<Plant>;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  set: LedResponse;
};


export type MutationDeletePlantArgs = {
  id: Scalars['Int'];
};


export type MutationCreatePlantArgs = {
  input: PlantInput;
};


export type MutationUpdatePlantArgs = {
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationWaterPlantArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  username: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationSetArgs = {
  on: Scalars['Boolean'];
};

export type Plant = {
  __typename?: 'Plant';
  id: Scalars['Float'];
  title: Scalars['String'];
  readings?: Maybe<Array<Reading>>;
  creatorId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PlantInput = {
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  plant: Plant;
  plants: Array<Plant>;
  me?: Maybe<User>;
  led: LedResponse;
};


export type QueryPlantArgs = {
  id: Scalars['Int'];
};

export type Reading = {
  __typename?: 'Reading';
  id: Scalars['Float'];
  plantId: Scalars['Float'];
  value?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreatePlantMutationVariables = Exact<{
  input: PlantInput;
}>;


export type CreatePlantMutation = (
  { __typename?: 'Mutation' }
  & { createPlant: (
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'title' | 'createdAt' | 'updatedAt'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SetLedMutationVariables = Exact<{
  on: Scalars['Boolean'];
}>;


export type SetLedMutation = (
  { __typename?: 'Mutation' }
  & { set: (
    { __typename?: 'LEDResponse' }
    & Pick<LedResponse, 'id' | 'on'>
  ) }
);

export type WaterPlantMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WaterPlantMutation = (
  { __typename?: 'Mutation' }
  & { waterPlant?: Maybe<(
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'title' | 'createdAt' | 'updatedAt'>
  )> }
);

export type LedQueryVariables = Exact<{ [key: string]: never; }>;


export type LedQuery = (
  { __typename?: 'Query' }
  & { led: (
    { __typename?: 'LEDResponse' }
    & Pick<LedResponse, 'id' | 'on'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PlantQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PlantQuery = (
  { __typename?: 'Query' }
  & { plant: (
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'title' | 'createdAt' | 'updatedAt'>
    & { readings?: Maybe<Array<(
      { __typename?: 'Reading' }
      & Pick<Reading, 'id' | 'value' | 'createdAt'>
    )>> }
  ) }
);

export type PlantsQueryVariables = Exact<{ [key: string]: never; }>;


export type PlantsQuery = (
  { __typename?: 'Query' }
  & { plants: Array<(
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'title' | 'createdAt' | 'updatedAt'>
    & { readings?: Maybe<Array<(
      { __typename?: 'Reading' }
      & Pick<Reading, 'id' | 'value' | 'createdAt'>
    )>> }
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePlantDocument = gql`
    mutation CreatePlant($input: PlantInput!) {
  createPlant(input: $input) {
    id
    title
    createdAt
    updatedAt
  }
}
    `;

export function useCreatePlantMutation() {
  return Urql.useMutation<CreatePlantMutation, CreatePlantMutationVariables>(CreatePlantDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($username: String!) {
  forgotPassword(username: $username)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SetLedDocument = gql`
    mutation SetLED($on: Boolean!) {
  set(on: $on) {
    id
    on
  }
}
    `;

export function useSetLedMutation() {
  return Urql.useMutation<SetLedMutation, SetLedMutationVariables>(SetLedDocument);
};
export const WaterPlantDocument = gql`
    mutation WaterPlant($id: Int!) {
  waterPlant(id: $id) {
    id
    title
    createdAt
    updatedAt
  }
}
    `;

export function useWaterPlantMutation() {
  return Urql.useMutation<WaterPlantMutation, WaterPlantMutationVariables>(WaterPlantDocument);
};
export const LedDocument = gql`
    query LED {
  led {
    id
    on
  }
}
    `;

export function useLedQuery(options: Omit<Urql.UseQueryArgs<LedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LedQuery>({ query: LedDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PlantDocument = gql`
    query Plant($id: Int!) {
  plant(id: $id) {
    id
    title
    createdAt
    updatedAt
    readings {
      id
      value
      createdAt
    }
  }
}
    `;

export function usePlantQuery(options: Omit<Urql.UseQueryArgs<PlantQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PlantQuery>({ query: PlantDocument, ...options });
};
export const PlantsDocument = gql`
    query Plants {
  plants {
    id
    title
    createdAt
    updatedAt
    readings {
      id
      value
      createdAt
    }
  }
}
    `;

export function usePlantsQuery(options: Omit<Urql.UseQueryArgs<PlantsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PlantsQuery>({ query: PlantsDocument, ...options });
};