/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    COLUMN_WIDTH,
} from '@Core/defaults/grid';

import {
    Components,
} from './imports';

export default {
    dictionaries: [
        {
            stateProp: 'privileges',
            dataFormat: {},
            requestPath: '/dictionary/privileges',
        },
    ],
    extendComponents: {
        '@Core/Components/Grid/Layout/Table/Cells/Data': {
            PRIVILEGE_ROW_CHECK: Components.GridPrivilegeRowCheckDataCell,
        },
    },
};
