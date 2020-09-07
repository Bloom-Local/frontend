/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import FlashMessage from '@Core/components/Alerts/FlashMessage.vue';
import {
    createLocalVue,
    shallowMount,
} from '@vue/test-utils';
import {
    Store,
} from 'vuex-mock-store';

const localVue = createLocalVue();

const store = new Store({
    state: {
        alert: {
            alerts: [
                {
                    id: 1,
                    type: 'warning',
                    message: 'You better watch out!!!',
                },
            ],
        },
    },
});
const mocks = {
    $store: store,
};
afterEach(() => store.reset());
describe('Alerts/FlashMessage', () => {
    // eslint-disable-next-line no-unused-vars
    let wrapper;

    beforeEach(() => {
        // eslint-disable-next-line no-unused-vars
        wrapper = shallowMount(FlashMessage, {
            localVue,
            mocks,
        });
    });

    it('Component is named well', () => {
        expect(typeof FlashMessage.name).toBe('string');
        expect(FlashMessage.name).toEqual('FlashMessage');
    });
});
