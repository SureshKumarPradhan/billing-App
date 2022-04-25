const initialBillReducers = {
  loading: false,
  data: [],
  bill:{}
};

const billReducers = (state = initialBillReducers, action) => {
  switch (action.type) {
    case "ADD_BILL": {
      return { ...state, data: [{ ...action.payload }, ...state.data] };
    }
    case "GET_ALL_BILLS": {
      return { ...state, data: [...action.payload, ...state.data] };
    }
    case "DELETE_BILL": {
      return {
        ...state,
        data: state.data.filter((bill) => {
          return bill._id !== action.payload._id;
        }),
      };
    }
    case ('GET_BILL'):{
        return {...state,bill:action.payload}
    }
    default: {
      return { ...state };
    }
  }
};

export default billReducers;
