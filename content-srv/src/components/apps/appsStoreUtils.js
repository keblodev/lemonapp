export const getLocalStore = store =>
	appRootReducerId =>
		store.app.rootAppsReducer[appRootReducerId];
