export const moduleHot = function () {
    if (module.hot) {
        module.hot.accept();
    }
};
