import { createWithEqualityFn } from 'zustand/traditional'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

import { categoriesSlice } from '~/store/categoriesSlice'
import { cookiesSlice } from '~/store/cookiesSlice'
import { postsSlice } from '~/store/postsSlice'
import { usersSlice } from '~/store/usersSlice'
import { visitsSlice } from '~/store/visitsSlice'
import { sessionSlice } from '~/store/sessionSlice'
import {
  type ICategoriesSlice,
  type ICookiesSlice,
  type IPostsSlice,
  type IUsersSlice,
  type IVisitsSlice,
  type ISessionSlice
} from '~/types'

interface IUseGlobalStore
  extends IPostsSlice,
    ICategoriesSlice,
    IUsersSlice,
    IVisitsSlice,
    ICookiesSlice,
    ISessionSlice {
  isLoading: boolean
}

const useGlobalStore = createWithEqualityFn<IUseGlobalStore>()(
  devtools(
    persist(
      (set, get, replace) => ({
        isLoading: false,
        ...postsSlice(set, get, replace),
        ...categoriesSlice(set, get, replace),
        ...usersSlice(set, get, replace),
        ...visitsSlice(set, get, replace),
        ...cookiesSlice(set, get, replace),
        ...sessionSlice(set, get, replace)
      }),
      {
        name: 'storage',
        storage: createJSONStorage(() => sessionStorage)
      }
    ),
    shallow
  )
)

export default useGlobalStore
