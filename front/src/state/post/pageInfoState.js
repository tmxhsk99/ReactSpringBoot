import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import {DEFAULT_PAGE_COUNT} from "../../util/util";

export const pageInfoState = atom({
  key: 'pageInfoState',
  default: {
    currentPage: 1,
    pageCountSize: DEFAULT_PAGE_COUNT,
    totalCount: 0,
  },
});