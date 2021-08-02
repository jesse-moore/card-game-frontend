import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum Action {
  Hit = 'hit',
  Stand = 'stand'
}

export type Card = {
  __typename?: 'Card';
  suit: Scalars['String'];
  number: Scalars['Int'];
  faceCard?: Maybe<Scalars['String']>;
};

export type GameStatus = {
  __typename?: 'GameStatus';
  id: Scalars['String'];
  dealer: Player;
  player: Player;
  isStarted: Scalars['Boolean'];
  isWaiting: Scalars['Boolean'];
  isFinished: Scalars['Boolean'];
  reshuffled: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<Scalars['String']>;
  newGame: GameStatus;
  startNewRound: GameStatus;
  removeGame?: Maybe<Scalars['String']>;
  gameAction: GameStatus;
  test?: Maybe<Scalars['String']>;
  restoreBalance: Scalars['Int'];
};


export type MutationNewGameArgs = {
  playerId?: Maybe<Scalars['String']>;
  bet: Scalars['Int'];
};


export type MutationStartNewRoundArgs = {
  id: Scalars['String'];
  playerId?: Maybe<Scalars['String']>;
  bet: Scalars['Int'];
};


export type MutationRemoveGameArgs = {
  id: Scalars['String'];
  playerId?: Maybe<Scalars['String']>;
};


export type MutationGameActionArgs = {
  id: Scalars['String'];
  playerId?: Maybe<Scalars['String']>;
  action: Scalars['String'];
};


export type MutationRestoreBalanceArgs = {
  id: Scalars['String'];
  playerId?: Maybe<Scalars['String']>;
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['String'];
  cards: Array<Maybe<Card>>;
  count: Scalars['Int'];
  status: Scalars['Int'];
  winLose: Scalars['Int'];
  cash: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  test?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  getUser: User;
};


export type QueryStatusArgs = {
  id?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  cash: Scalars['Int'];
};

export type StatusFragment = (
  { __typename?: 'GameStatus' }
  & Pick<GameStatus, 'id' | 'isStarted' | 'isWaiting' | 'isFinished' | 'reshuffled'>
  & { dealer: (
    { __typename?: 'Player' }
    & PlayerFragment
  ), player: (
    { __typename?: 'Player' }
    & PlayerFragment
  ) }
);

export type PlayerFragment = (
  { __typename?: 'Player' }
  & Pick<Player, 'id' | 'count' | 'status' | 'cash' | 'winLose'>
  & { cards: Array<Maybe<(
    { __typename?: 'Card' }
    & CardFragment
  )>> }
);

export type CardFragment = (
  { __typename?: 'Card' }
  & Pick<Card, 'suit' | 'number' | 'faceCard'>
);

export type StartGameMutationVariables = Exact<{
  playerId: Scalars['String'];
  bet: Scalars['Int'];
}>;


export type StartGameMutation = (
  { __typename?: 'Mutation' }
  & { newGame: (
    { __typename?: 'GameStatus' }
    & StatusFragment
  ) }
);

export type StartRoundMutationVariables = Exact<{
  id: Scalars['String'];
  bet: Scalars['Int'];
  playerId?: Maybe<Scalars['String']>;
}>;


export type StartRoundMutation = (
  { __typename?: 'Mutation' }
  & { startNewRound: (
    { __typename?: 'GameStatus' }
    & StatusFragment
  ) }
);

export type GameActionMutationVariables = Exact<{
  id: Scalars['String'];
  action: Scalars['String'];
  playerId?: Maybe<Scalars['String']>;
}>;


export type GameActionMutation = (
  { __typename?: 'Mutation' }
  & { gameAction: (
    { __typename?: 'GameStatus' }
    & StatusFragment
  ) }
);

export type RestoreBalanceMutationVariables = Exact<{
  id: Scalars['String'];
  playerId?: Maybe<Scalars['String']>;
}>;


export type RestoreBalanceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'restoreBalance'>
);

export type RemoveGameMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveGameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeGame'>
);

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'test'>
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'cash'>
  ) }
);

export type CreateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUser'>
);

export const CardFragmentDoc = gql`
    fragment card on Card {
  suit
  number
  faceCard
}
    `;
export const PlayerFragmentDoc = gql`
    fragment player on Player {
  id
  cards {
    ...card
  }
  count
  status
  cash
  winLose
}
    ${CardFragmentDoc}`;
export const StatusFragmentDoc = gql`
    fragment status on GameStatus {
  id
  dealer {
    ...player
  }
  player {
    ...player
  }
  isStarted
  isWaiting
  isFinished
  reshuffled
}
    ${PlayerFragmentDoc}`;
export const StartGameDocument = gql`
    mutation StartGame($playerId: String!, $bet: Int!) {
  newGame(playerId: $playerId, bet: $bet) {
    ...status
  }
}
    ${StatusFragmentDoc}`;
export type StartGameMutationFn = Apollo.MutationFunction<StartGameMutation, StartGameMutationVariables>;

/**
 * __useStartGameMutation__
 *
 * To run a mutation, you first call `useStartGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startGameMutation, { data, loading, error }] = useStartGameMutation({
 *   variables: {
 *      playerId: // value for 'playerId'
 *      bet: // value for 'bet'
 *   },
 * });
 */
export function useStartGameMutation(baseOptions?: Apollo.MutationHookOptions<StartGameMutation, StartGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartGameMutation, StartGameMutationVariables>(StartGameDocument, options);
      }
export type StartGameMutationHookResult = ReturnType<typeof useStartGameMutation>;
export type StartGameMutationResult = Apollo.MutationResult<StartGameMutation>;
export type StartGameMutationOptions = Apollo.BaseMutationOptions<StartGameMutation, StartGameMutationVariables>;
export const StartRoundDocument = gql`
    mutation StartRound($id: String!, $bet: Int!, $playerId: String) {
  startNewRound(id: $id, bet: $bet, playerId: $playerId) {
    ...status
  }
}
    ${StatusFragmentDoc}`;
export type StartRoundMutationFn = Apollo.MutationFunction<StartRoundMutation, StartRoundMutationVariables>;

/**
 * __useStartRoundMutation__
 *
 * To run a mutation, you first call `useStartRoundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartRoundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startRoundMutation, { data, loading, error }] = useStartRoundMutation({
 *   variables: {
 *      id: // value for 'id'
 *      bet: // value for 'bet'
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useStartRoundMutation(baseOptions?: Apollo.MutationHookOptions<StartRoundMutation, StartRoundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartRoundMutation, StartRoundMutationVariables>(StartRoundDocument, options);
      }
export type StartRoundMutationHookResult = ReturnType<typeof useStartRoundMutation>;
export type StartRoundMutationResult = Apollo.MutationResult<StartRoundMutation>;
export type StartRoundMutationOptions = Apollo.BaseMutationOptions<StartRoundMutation, StartRoundMutationVariables>;
export const GameActionDocument = gql`
    mutation GameAction($id: String!, $action: String!, $playerId: String) {
  gameAction(id: $id, action: $action, playerId: $playerId) {
    ...status
  }
}
    ${StatusFragmentDoc}`;
export type GameActionMutationFn = Apollo.MutationFunction<GameActionMutation, GameActionMutationVariables>;

/**
 * __useGameActionMutation__
 *
 * To run a mutation, you first call `useGameActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGameActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gameActionMutation, { data, loading, error }] = useGameActionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      action: // value for 'action'
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useGameActionMutation(baseOptions?: Apollo.MutationHookOptions<GameActionMutation, GameActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GameActionMutation, GameActionMutationVariables>(GameActionDocument, options);
      }
export type GameActionMutationHookResult = ReturnType<typeof useGameActionMutation>;
export type GameActionMutationResult = Apollo.MutationResult<GameActionMutation>;
export type GameActionMutationOptions = Apollo.BaseMutationOptions<GameActionMutation, GameActionMutationVariables>;
export const RestoreBalanceDocument = gql`
    mutation RestoreBalance($id: String!, $playerId: String) {
  restoreBalance(id: $id, playerId: $playerId)
}
    `;
export type RestoreBalanceMutationFn = Apollo.MutationFunction<RestoreBalanceMutation, RestoreBalanceMutationVariables>;

/**
 * __useRestoreBalanceMutation__
 *
 * To run a mutation, you first call `useRestoreBalanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreBalanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreBalanceMutation, { data, loading, error }] = useRestoreBalanceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function useRestoreBalanceMutation(baseOptions?: Apollo.MutationHookOptions<RestoreBalanceMutation, RestoreBalanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreBalanceMutation, RestoreBalanceMutationVariables>(RestoreBalanceDocument, options);
      }
export type RestoreBalanceMutationHookResult = ReturnType<typeof useRestoreBalanceMutation>;
export type RestoreBalanceMutationResult = Apollo.MutationResult<RestoreBalanceMutation>;
export type RestoreBalanceMutationOptions = Apollo.BaseMutationOptions<RestoreBalanceMutation, RestoreBalanceMutationVariables>;
export const RemoveGameDocument = gql`
    mutation RemoveGame($id: String!) {
  removeGame(id: $id)
}
    `;
export type RemoveGameMutationFn = Apollo.MutationFunction<RemoveGameMutation, RemoveGameMutationVariables>;

/**
 * __useRemoveGameMutation__
 *
 * To run a mutation, you first call `useRemoveGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeGameMutation, { data, loading, error }] = useRemoveGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveGameMutation(baseOptions?: Apollo.MutationHookOptions<RemoveGameMutation, RemoveGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveGameMutation, RemoveGameMutationVariables>(RemoveGameDocument, options);
      }
export type RemoveGameMutationHookResult = ReturnType<typeof useRemoveGameMutation>;
export type RemoveGameMutationResult = Apollo.MutationResult<RemoveGameMutation>;
export type RemoveGameMutationOptions = Apollo.BaseMutationOptions<RemoveGameMutation, RemoveGameMutationVariables>;
export const TestDocument = gql`
    query test {
  test
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: Apollo.QueryHookOptions<TestQuery, TestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
      }
export function useTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
        }
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;
export const GetUserDocument = gql`
    query getUser {
  getUser {
    id
    cash
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser {
  createUser
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;