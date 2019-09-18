import { combineEpics } from 'redux-observable';
import { keysIn } from 'lodash';
import * as postEpics from './postEpics';

const epics = keysIn(postEpics).map(key => postEpics[key]);

export const rootEpic = combineEpics(...epics);
