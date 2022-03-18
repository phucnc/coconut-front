import { Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import { getProductList,getProductListM,GetProductListMReq, LIMIT_PER_PAGE, getTotalVolume, GetProductListReq,getListTotalVolume} from 'store/explore';
import axios from 'axios';
import { Sort, SortDefaultValue } from 'components/pages/explore/form';
import { isArray } from 'util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getProductsAPI = (params: GetProductListReq) => {
  const { filter, sort } = Sort[params.filterAndSort || SortDefaultValue];
  console.log("param category 33434343",params)
  if (params.category == 'Trend') {
    console.log("PASSS test")
    return axios.get(`${process.env.ADDRESS_API}/trend`)
  }
  else if (params.category == 'Best') {
    return axios.get(`${process.env.ADDRESS_API}/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=view&title=&address=${params.address}`)
  }
  else if (params.category == 'Most Profitable') {
    return axios.get(`${process.env.ADDRESS_API}/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=price&title=&address=${params.address}`)
  }
  else if (params.category == 'New') {
    console.log("test",params.address)
    return axios.get(`${process.env.ADDRESS_API}/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=created-date&title=&address=${params.address}`)
  }
  else if (params.category == 'Recently Traded') {
    return axios.get(`${process.env.ADDRESS_API}/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=trade&title=&address=${params.address}`)
  }
  else if (params.category !== null || params.category == 'All' || !params.category ) {
    console.log("param category11112222",params)
  return axios.get(
    `${process.env.ADDRESS_API}/nft/collectible-paging?cursor=${params.cursor || ''}&limit=${
      params.limit || LIMIT_PER_PAGE
    }&sort=${sort}&filter=${filter}${
      (params.category && params.category !== 'All' && `&categories=${params.category.toLocaleLowerCase()}`) || ''
    }${params.title ? `&title=${params.title}` : ''}&address=${params.address}`
  );

  }

  // return axios.get(
  //   `https://api.contenft.com/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=created-date&title=&address=0x7CF53e1089cF9F8D01Da050A24527b61090eeD33&options=creator
  //   `
  // );
};

// export const getProductsMAPI = (params: GetProductListMReq) => {
//   const { filter, sort } = Sort[params.filterAndSort || SortDefaultValue];
//   console.log("params",params)
//   return axios.get(
//     `https://api.contenft.com/nft/collectible-paging?cursor=&limit=10&sort=desc&filter=created-date&title=&address=0x7CF53e1089cF9F8D01Da050A24527b61090eeD33&options=creator`
//   );
// };
// const getProductListMEpic: Epic = action$ =>
//   action$.pipe(
//     filter(getProductListM.started.match),
//     mergeMap(action => {
//       const params = action.payload;
//       return from(getProductsMAPI(params)).pipe(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         map(res => {
//           console.log ("paramsparamsparams",params)
//           return getProductListM.done({
//             params: action.payload,
//             result: res.data,
//           });
//         }),
//         catchError(error => {
//           return of(getProductListM.failed({ params: action.payload, error: error }));
//         })
//       );
//     })
//   );
const getProductListEpic: Epic = action$ =>
  action$.pipe(
    filter(getProductList.started.match),
    mergeMap(action => {
      const params = action.payload;
      console.log("params getProductsAPI",params)
      console.log("params getProductsAPI action",action)
      return from(getProductsAPI(params)).pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map(res => {
          console.log ("paramsparamsparams2",params)
          return getProductList.done({
            params: action.payload,
            result: res.data,
          });
        }),
        catchError(error => {
          return of(getProductList.failed({ params: action.payload, error: error }));
        })
      );
    })
  );

const getTotalVolumeEpic: Epic = action$ =>
  action$.pipe(
    filter(getTotalVolume.started.match),
    mergeMap(action => {
      
      return from(
        axios.get(`${process.env.ADDRESS_API}/exchange/total-sold?duration=24h&quote_token=${action.payload.unit}`)
      ).pipe(
     
        map(res => {
          return getTotalVolume.done({
            params: action.payload,
            result: res.data,
          });
        }),
        catchError(error => {
          return of(getTotalVolume.failed({ params: action.payload, error: error }));
        })
      );
    })
  );

const getListTotalVolumeEpic: Epic = action$ =>
  action$.pipe(
    filter(getListTotalVolume.started.match),
    mergeMap(action => {
      if (isArray(action.payload)) {
        action.payload.map((item, index) => {
          let arr: any[] = [];
          let errs = [];
          from(axios.get(`${process.env.ADDRESS_API}/exchange/total-sold?duration=24h&quote_token=${item.unit}`))
          .pipe(
            map(res => {
              arr.push(res.data);
              // return getTotalVolume.done({
              //   params: action.payload,
              //   result: res.data,
            // console.log("arr",arr)
              // });
            //   return getListTotalVolume.done({
            //     params: action.payload,
            //     result: arr,
                
            // });
            
            return arr;
           
            }),
            catchError(error => {
              return error;
              // return of(getTotalVolume.failed({ params: action.payload, error: error }));
            })     
            );
        })
      }
      return from(
        axios.get(`${process.env.ADDRESS_API}/exchange/total-sold?duration=24h&quote_token=${action.payload.unit}`)
      ).pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map(res => {

          return getListTotalVolume.done({
            params: action.payload,
            result: res.data,
          });
        }),
        catchError(error => {
          return of(getListTotalVolume.failed({ params: action.payload, error: error }));
        })
      );
      
    })
  );
export default combineEpics(getProductListEpic, getTotalVolumeEpic, getListTotalVolumeEpic);
// export default combineEpics(getProductListEpic, getTotalVolumeEpic);

