/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export function getMappedCategoryValues(categories, selectedCategories) {
    return categories.filter(
        category => selectedCategories.some(
            selectedCategory => category.id === selectedCategory,
        ),
    ).map(category => category.code);
}

export function getMappedCategoryID(categories, selectedCategories) {
    return categories.filter(
        category => selectedCategories.some(
            selectedCategory => category.code === selectedCategory,
        ),
    ).map(category => category.id);
}

export default {
    getMappedCategoryValues,
    getMappedCategoryID,
};
