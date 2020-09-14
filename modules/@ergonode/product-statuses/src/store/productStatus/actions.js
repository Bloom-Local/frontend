/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default {
    getProductStatuses({
        commit, rootState,
    }, params) {
        const {
            language: userLanguageCode,
        } = rootState.authentication.user;
        return this.app.$axios.$get('status', {
            params,
        }).then(({
            collection: statuses,
        }) => {
            commit('__SET_STATE', {
                key: 'statuses',
                value: statuses.map(status => ({
                    id: status.id,
                    key: status.code,
                    value: status.name,
                    hint: status.name
                        ? `#${status.code} ${userLanguageCode}`
                        : '',
                })),
            });
        });
    },
    getProductStatus({
        commit, dispatch,
    }, path) {
        return this.app.$axios.$get(path).then(({
            id, code, color, name, description,
        }) => {
            const translations = {
                name,
                description,
            };

            commit('__SET_STATE', {
                key: 'id',
                value: id,
            });
            commit('__SET_STATE', {
                key: 'code',
                value: code,
            });
            commit('__SET_STATE', {
                key: 'color',
                value: color,
            });
            dispatch('tab/setTranslations', translations, {
                root: true,
            });
        });
    },
    getDefaultStatus({
        commit, state,
    }) {
        return this.app.$axios.$get('workflow/default').then(({
            default_status: defaultStatus,
        }) => {
            if (defaultStatus === state.code) {
                commit('__SET_STATE', {
                    key: 'isDefaultStatus',
                    value: true,
                });
            }
        });
    },
    updateDefaultStatus({
        state,
    }) {
        if (state.isDefaultStatus) {
            return this.app.$axios.$put(`workflow/default/status/${state.id}/default`);
        }
        return null;
    },
    async updateProductStatus({
        state, rootState,
    }, {
        onError,
    }) {
        const {
            translations: {
                name, description,
            },
        } = rootState.tab;
        const data = {
            color: state.color,
            name,
            description,
        };

        await this.$setLoader('footerButton');
        await this.app.$axios.$put(`status/${state.id}`, data).catch(e => onError(e.data));
        await this.$removeLoader('footerButton');
    },
    removeProductStatus({
        commit, state,
    }, {
        onSuccess,
    }) {
        const {
            id,
        } = state;
        return this.app.$axios.$delete(`status/${id}`).then(() => onSuccess());
    },
};
