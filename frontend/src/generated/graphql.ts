/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type DataPoint = {
  __typename?: 'DataPoint';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  term: Term;
  termId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  randomDataPoints: Array<DataPoint>;
  term: Term;
  terms: Array<Term>;
};

export type QueryRandomDataPointsArgs = {
  count: Scalars['Int']['input'];
  termId: Scalars['Int']['input'];
};

export type QueryTermArgs = {
  id: Scalars['Int']['input'];
};

export type Term = {
  __typename?: 'Term';
  dataPoints: Array<DataPoint>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TermDataPointsArgs = {
  useRandomData?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GetTermsQueryVariables = Exact<{
  useRandomData?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type GetTermsQuery = {
  __typename?: 'Query';
  terms: Array<{
    __typename?: 'Term';
    id: number;
    name: string;
    dataPoints: Array<{ __typename?: 'DataPoint'; id: number; x: number; y: number }>;
  }>;
};

export const GetTermsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTerms' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'useRandomData' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'terms' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dataPoints' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'useRandomData' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'useRandomData' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'x' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'y' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTermsQuery, GetTermsQueryVariables>;
