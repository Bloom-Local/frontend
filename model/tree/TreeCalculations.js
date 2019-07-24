/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
const positionBetweenRows = 0.5;

export function getMinChildRow(parentChildren) {
    const childrenRows = parentChildren.map(e => e.row);
    return Math.min(...childrenRows);
}

export function getMaxChildRow(tree, column, row) {
    const [neighbor] = tree.filter(
        e => e.column <= column && e.row > row,
    );
    return neighbor ? neighbor.row : tree.length;
}

export function rebuildTreeWhenElementRemoved(treeData, index) {
    return treeData.filter((el, idx) => idx !== index).reduce((accumulator, current, i) => {
        if (i >= index) {
            accumulator.push({ ...current, row: current.row - 1 });
        } else {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}

export function rebuildTreeWhenGhostElementRemoved(treeData, index) {
    return treeData.reduce((accumulator, current, i) => {
        if (i === index && current.row !== 0) {
            accumulator.push({ ...current, row: current.row + positionBetweenRows });
        } else if (i > index) {
            accumulator.push({ ...current, row: current.row + 1 });
        } else {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}

export function rebuildTreeWhenElementCollapse(treeData, index) {
    return treeData.reduce((accumulator, current, i) => {
        if (i > index) {
            accumulator.push({ ...current, row: i });
        } else {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}

export function rebuildTreeWhenElementExpand(hiddenChildren, treeData, index) {
    return treeData.reduce((accumulator, current, i) => {
        let expandedTree = accumulator;
        if (i === index) {
            expandedTree = [...expandedTree, current, ...hiddenChildren];
        } else if (i > index) {
            expandedTree.push({ ...current, row: current.row + hiddenChildren.length });
        } else {
            expandedTree.push(current);
        }
        return expandedTree;
    }, []);
}

export function initializeRowBounds(elements) {
    const { length } = elements;
    const elementBounds = [];
    for (let i = 0; i < length; i += 1) {
        const bounds = elements[i].getBoundingClientRect();
        elementBounds.push(bounds);
    }
    return elementBounds;
}

export function getRowBellowMouse({ clientY, elements, elementBounds }, completion) {
    const { length } = elements;
    for (let i = 0; i < length; i += 1) {
        const { y, height } = elementBounds[i];
        if (y <= clientY && y + height >= clientY) {
            return completion({ index: i, category: elements[i] });
        }
    }
    return null;
}

export function rebuildFullTree(hiddenChildren, treeData) {
    let fullTree = treeData;
    Object.keys(hiddenChildren).reverse().forEach((key) => {
        const index = fullTree.findIndex(el => el.id === key);
        fullTree = rebuildTreeWhenElementExpand(hiddenChildren[key], fullTree, index);
    });
    return fullTree;
}
