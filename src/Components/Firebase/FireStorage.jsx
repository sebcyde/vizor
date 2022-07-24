import { useState, useEffect } from 'react';
import { initializeApp, getApp } from 'firebase/app';
import { firebaseConfig, auth } from './Firebase';
import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	list,
	getStorage,
} from 'firebase/storage';
import { v4 } from 'uuid';

const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
const storage = getStorage();

export { storage, app };
