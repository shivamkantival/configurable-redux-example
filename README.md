# Configurable Redux

This projects aims at explaning how redux can be used in a configurable way. We also try to explain the differences between traditional approaches of using Redux in applications and a configurable store.

## Directory structure

```
  configurable-redux-example
  |
  |-- targetStateStructure.json // the final structure of store we want to achieve
  |
  |-- src
      |
      |-- reducers // contains two types of implementations to create reducers working on similar redux store
      |    |
      |    |-- notSoTraditionalReducer
      |    |   |
      |    |   |-- examples // contains example with sync and async reducers created using configurable reducer creator
      |    |   |
      |    |   |-- index.js // configurable reducer to simulate targetStateStructure.json
      |    |
      |    |-- traditionalReducer
      |        |
      |        |--index.js // traditional reducer to simulate targetStateStructure.json
      |
      |-- utils
          |
          |-- createReducer // util to create configurable reducers
          |
          |-- createActionCreators //util to generate standardiized action creators
          |
          |-- createActionTypes //util to generate standardized action types
```
