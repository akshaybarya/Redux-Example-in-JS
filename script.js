console.clear();

const createPolicy = (name,amount) =>{
  return {
    type: 'CREATE',
    payload: {
      name,
      amount
    }
  }
}

const deletePolicy = (name) =>{
  return {
    type: 'DELETE_POLICY',
    payload: {
      name
    }
  }
}

const createClaim = (name,amount) =>{
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name,
      amountOfMoneyToColect:amount
    }
  }
}

// Reducers

const claimsHistory = (oldListOfClaims = [],action) => {
  if(action.type === 'CREATE_CLAIM'){
    return [...oldListOfClaims, action.payload];
  }
  return oldListOfClaims;
}

const accounting = (bagOfMoney = 100,action) => {
  if(action.type === 'CREATE_CLAIM'){
    return bagOfMoney-action.payload.amountOfMoneyToColect;
  }else if(action.type === 'CREATE'){
    return bagOfMoney+action.payload.amount;
  }
  return bagOfMoney;
}

const policies = (listOfPolicies = [],action) => {
  if(action.type === 'CREATE'){
    return [...listOfPolicies, action.payload.name];
  }else if(action.type === 'DELETE_POLICY'){
    return listOfPolicies.filter((policy)=>policy !== action.payload.name);
  }
  return listOfPolicies;
}

const {createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting,
  claimsHistory,
  policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

store.dispatch(deletePolicy('Bob'))

console.log(store.getState());
