import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const postListState = atom({
  key: 'postListState',
  default: {
    posts: [],
  },
});