import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import { IRootState } from '../../../../store';
// import axios from 'axios';
import axios from '../../../../utils/NetworkLayer';
import { environment } from '../../../../environments/environment';
import {
  selectActiveMenuName,
  setActiveMenuName,
  setSortedMenus,
} from './sortedMenuSlice';
import { getLocalStorage } from 'apps/react-host/src/utils/localStorageService';
import { useNavigate } from 'react-router-dom';
type _IRMenuList = EntityState<IMenuList>;
export interface IRMenuList extends _IRMenuList {
  activeMenuId: string;
}

export interface IcreatedBy {
  userId: string;
  emailId: string;
}

export interface IAuthorization {
  res: string;
  scope: string;
  roles: Array<string>;
}

export interface IPolicies {
  name: string;
  type: string;
  logic: string;
  decisionStrategy: string;
  config: any;
}

export interface IResources {
  name: string;
  ownerManagedAccess: boolean;
  resourceScope: Array<string>;
}

export interface IPermissions {
  name: string;
  type: string;
  logic: string;
  decisionStrategy: string;
  config: any;
}
export interface IMenuList {
  createdBy: IcreatedBy;
  _id: string;
  name: string;
  localName: string;
  description: string;
  authorization: Array<IAuthorization>;
  localDescription: string;
  icon: string;
  parentId: string;
  policies: Array<IPolicies>;
  resources: Array<IResources>;
  permissions: Array<IPermissions>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getAppMenu = createAsyncThunk(
  'features',
  async (menuParams: any, { dispatch }) => {
    const response: any = await axios.get(
      `${environment.NX_FEATURE_BASE_URL}/features`,
      { params: menuParams }
    );

    const data: any = response.data.result.data;

    const parents: any = {};
    const userInfo = getLocalStorage('userInfo');
    let sortedData: any = [];

    const createParent = (id: string, item: any) => {
      parents[id] = {
        child: [],
        data: { ...item },
      };
    };
    if (data && data.length > 0) {
      data.forEach((item: any) => {
        const parentId = item?.parentId || '';
        if (parentId === '') {
          if (!parents[parentId]) {
            createParent(item._id, item);
          }
        } else if (item.parentId) {
          if (parents[parentId]) {
            parents[parentId].child.push(item);
          } else {
            createParent(parentId, item);
          }
        }
      });
      const arrPar = [];
      for (const key in parents) {
        arrPar.push(parents[key]);
      }
      const payload: any = {
        _id: userInfo.projectId || '',
        data: arrPar,
      };
      dispatch(setSortedMenus(payload));
      // console.log(payload);
      if (
        payload &&
        payload.data &&
        payload.data.length > 0 &&
        payload.data[0].data
      ) {
        // console.log(payload.data[0].data.name);
        // dispatch(setActiveMenuName('nav3' || payload.data[0].data.name));
      }
      dispatch(setMenus(data));
      sortedData = payload;
    } else {
      dispatch(setMenus([]));
      const payload: any = {
        _id: '',
        data: [],
      };
      dispatch(setActiveMenuName(''));
      dispatch(setSortedMenus(payload));
      sortedData = payload;
    }

    return sortedData;
  }
);

const appMenuAdapter = createEntityAdapter<IMenuList>({
  selectId: ({ _id }) => _id,
});
export const { selectAll: selectAllMenu } = appMenuAdapter.getSelectors(
  (state: any) => state.containerApp.menuListSlice
);

const menuListSlice = createSlice({
  name: 'application-menu-store',
  initialState: appMenuAdapter.getInitialState({}),
  reducers: {
    setMenus: appMenuAdapter.setAll,
  },
});

export const { setMenus } = menuListSlice.actions;
export default menuListSlice.reducer;
