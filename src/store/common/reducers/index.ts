import produce from 'immer';
import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';
import { commonStartFailed, tokenID , setAccount, closeConnectModal } from 'store/common';

type Common = {
  errorMessage: string;
  account: string;
  tokenid: string;
};

const initialValue: Common = { errorMessage: '', account: '',tokenid:'' };
const reducer: Reducer<Common> = (state = initialValue, action) => {
  if (isType(action, commonStartFailed)) {
    return produce(state, draft => {
      draft.errorMessage = action.payload.error;
    });
  }

  if (isType(action, setAccount)) {
    return produce(state, draft => {
      // console.log("actionset1111111111111",action.payload.account)
      draft.account = action.payload.account;
    });
  }
  if (isType(action, tokenID)) {
    return produce(state, draft => {
      // console.log("actionset2222222",action.payload.tokenid)
      draft.tokenid = action.payload.tokenid;
    });
  }

  if (isType(action, closeConnectModal)) {
    return produce(state, draft => {
      draft.errorMessage = '';
    });
  }
  return state;
};

export default reducer;
